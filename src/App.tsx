import React from 'react';
import { useState, useMemo } from 'react';
import { getControlGroup, toggleDYGroup, saveCampaigns, copyCampaigns, clearActiveCampaigns } from './hooks/State';
import { conditionController } from './hooks/Conditions';
import type { Audience, Campaign, CampaignData } from './types';
import { IconButton } from './components/IconButton/IconButton';
import { Widget } from './components/Widget/Widget';
import { Logo } from './elements/Icon/Icon';
import { Modal } from './components/Modal/Modal';
import { ConditionTypes } from './enums';

interface AppState {
  audiences: Audience[];
  campaigns: Campaign[];
}

interface ModalState {
  open: boolean;
  audience?: Audience;
  campaign?: Campaign;
  loading: boolean;
}

export function App({ campaignData }: { campaignData: CampaignData }) {
  const [state, setState] = useState<AppState>({ audiences: [], campaigns: [] });

  const [panelOpen, setPanelOpen] = useState(false);
  const [controlGroup, setControlGroup] = useState(getControlGroup());

  const [selectedCookies, setSelectedCookies] = useState<Set<string>>(() => {
    const set = new Set<string>();
    campaignData.dyCampaigns.forEach(campaign =>
      campaign.experiences.forEach(exp => {
        if (exp.active) set.add(exp.cookie);
      })
    );
    return set;
  });

  const [modal, setModal] = useState<ModalState>({ open: false, audience: undefined, campaign: undefined, loading: false });

  const allCookies = useMemo(
    () => campaignData.dyCampaigns.flatMap(c => c.experiences.map(e => e.cookie)),
    [campaignData]
  );

  function handleTogglePanel() {
    setPanelOpen(prev => !prev);
  }

  function handleToggleControl() {
    toggleDYGroup();
    setControlGroup(prev => !prev);
  }

  function handleSelectExperience(campaignId: string, cookie: string | null) {
    setSelectedCookies(prev => {
      const next = new Set(prev);
      const campaign = campaignData.dyCampaigns.find(c => c.id === campaignId);
      campaign?.experiences.forEach(e => next.delete(e.cookie));
      if (cookie !== null) next.add(cookie);
      return next;
    });
  }

  function handleClear() {
    clearActiveCampaigns(allCookies);
  }

  function handleSave() {
    saveCampaigns(allCookies, Array.from(selectedCookies));
  }

  function handleCopy() {
    copyCampaigns(Array.from(selectedCookies));
  }

  async function campaignModal(campaign: Campaign) {
    function setCampaignModal(campaign: Campaign) {
      setState(prev => ({ ...prev }));
      setModal(prev => {
        return { ...prev, campaign, loading: false };
      });
    }
    
    if (!campaign) return;

    // Resolve fast conditions (with placeholder flag) and show results
    const experienceConditions : {id: string, conditions: DYConditionGroup[]}[] = campaign.experiences.map(experience => {
      const conditionData = campaignData.dyConditions.find(
        c => c.campaignId === campaign!.id && c.experienceId === experience.id
      );

      return {
        id: experience.id,
        conditions: conditionData?.conditions.map((condition, index) => ({
          ...condition,
          id: `${experience.id}-${index}`,
        })) ?? [],
      }
    });
    
    for (const experience of campaign.experiences) {
      const experienceCondition = experienceConditions.find((cond) => cond.id === experience.id);

      if (experience.conditions) continue;
      
      experience.conditions = await Promise.all(
        experienceCondition!.conditions.map(async (cond) => {
          return await conditionController(cond, true);
        })
      );
    };

    setCampaignModal(campaign);

    // Start evaluators AFTER initial state is set — guarantees prev.conditionData is never null when they resolve
    for (const experience of campaign.experiences) {
      if (!experience.conditions) return;

      const evaluatorConditions = experience.conditions.filter((condition) => condition.type === ConditionTypes.EVALUATOR);
      
      evaluatorConditions.forEach(async (evaluator) => {
        const experienceCondition = experienceConditions.find((cond) => cond.id === experience.id);
        const evaluatorCondition = experienceCondition?.conditions.find((cond) => cond.id === evaluator.id);

        if (evaluatorCondition) {
          const result = await conditionController(evaluatorCondition);
          const index = experience.conditions.findIndex(condition => condition.id === result.id);
          if (index !== -1) experience.conditions[index] = result;

          setCampaignModal(campaign);
        }
      });
    };
  }

  async function handleOpenModal(data: { audience?: Audience, campaign?: Campaign }) {
    document.body.classList.add('modal-open');

    let audience = state.audiences.find(a => a.audience === data.audience?.audience);
    let campaign = state.campaigns.find(c => c.id === data.campaign?.id);

    if (data.audience) {
      if (!audience) {
        audience = data.audience
        state.audiences.push(data.audience)
      }

      setModal({ open: true, audience: audience, campaign: undefined, loading: true });
    }

    if (data.campaign) {
      if (!campaign) {
        campaign = data.campaign;
        state.campaigns.push(data.campaign)
      }

      setModal({ open: true, audience: undefined, campaign: campaign, loading: true });
      campaignModal(campaign);
    }
  }

  function handleCloseModal() {
    document.body.classList.remove('modal-open');
    setModal({ open: false, audience: undefined, campaign: undefined, loading: false });
  }

  return (
    <>
      <IconButton active={panelOpen} onToggle={handleTogglePanel} icon={<Logo />} />
      <Widget
        campaignData={campaignData}
        panelOpen={panelOpen}
        controlGroup={controlGroup}
        selectedCookies={selectedCookies}
        onToggleControl={handleToggleControl}
        onSelectExperience={handleSelectExperience}
        onClear={handleClear}
        onSave={handleSave}
        onCopy={handleCopy}
        onOpenConditions={handleOpenModal}
      />
      {modal.open && (modal.audience || modal.campaign) && (
        <Modal
          audience={modal.audience}
          campaign={modal.campaign}
          loading={modal.loading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
