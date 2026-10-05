import React from 'react';
import { Audience, Campaign } from '../../types';
import { CampaignItem } from '../../components/CampaignItem/CampaignItem';
import { getCampaignData } from '../../hooks/Campaigns';
import { Clear, Copy, Save } from '../../elements/Icon/Icon';
import { useState, useEffect, useMemo } from 'react';

export type CampaignPanelProps = {
  selectedCookies: Set<string>;
  onSelectExperience: (campaignId: string, cookie: string | null) => void;
  onOpenConditions: (data: { audience?: Audience, campaign?: Campaign }) => void;
  onClear: () => void;
  onSave: () => void;
  onCopy: () => void;
  searchTerm: string;
}

export const CampaignPanel = ({ selectedCookies, searchTerm, onSelectExperience, onOpenConditions, onClear, onSave, onCopy } : CampaignPanelProps) => {
  const { dyCampaigns } = getCampaignData();
  const [fading, setFading] = useState(false);
  const [data, setData] = useState(dyCampaigns);

  useEffect(() => {
    setFading(true);
    setData(!searchActive ? dyCampaigns : filtered);
    const timer = setTimeout(() => {
      setFading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term ? dyCampaigns.filter(campaign => campaign.name.toLowerCase().includes(term)) : dyCampaigns;
  }, [dyCampaigns, searchTerm]);

  const searchActive = searchTerm.trim() !== '';


  return (
    <section className="campaign-screen">
      <div className='campaign-container' style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.15s ease' }}>
        <div className='campaign-list-container'>
          <ul className="campaign-list">
            {data.map(campaign => (
              <CampaignItem
                key={campaign.id}
                campaign={campaign}
                selectedCookies={selectedCookies}
                onSelectExperience={onSelectExperience}
                onOpenConditions={onOpenConditions}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="qa-button-container">
        <button className="qa-clear" onClick={onClear}>
          <Clear /> Clear
        </button>
        <button className="qa-save" onClick={onSave}>
          <Save /> Save
        </button>
        <button className="qa-copy" onClick={onCopy}>
          <Copy /> Copy
        </button>
      </div>
    </section>
  )
}