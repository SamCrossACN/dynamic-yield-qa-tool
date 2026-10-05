import React from 'react';
import type { Audience, Campaign, Experience } from '../../types';
import { Preview } from '../../elements/Icon/Icon';

interface CampaignItemProps {
  campaign: Campaign;
  selectedCookies: Set<string>;
  onSelectExperience: (campaignId: string, cookie: string | null) => void;
  onOpenConditions: (data: { audience?: Audience, campaign?: Campaign }) => void;
}

export const CampaignItem = ({ campaign, selectedCookies, onSelectExperience, onOpenConditions }: CampaignItemProps) => {
  const hasExperienceZero = campaign.experiences.some((experience: Experience) => experience.name.includes('Experience 0'));
  const isControlActive = !campaign.experiences.some((experience: Experience) => selectedCookies.has(experience.cookie));

  return (
    <li className="campaign-item" data-campaign={campaign.name} data-id={campaign.id}>
      <span className="campaign-name">{campaign.name}</span>
      <div className="button-container">
        {!hasExperienceZero && (
          <button
            className={`experience-button${isControlActive ? ' active' : ''}`}
            onClick={() => onSelectExperience(campaign.id, null)}
          >
            Control
          </button>
        )}
        {campaign.experiences.map((experience: Experience) => {
          let name = experience.name.includes(' | ') ? experience.name.split(' | ')[1] : experience.name;
          if (name === 'Experience 0') name = 'Control';

          return (
            <button
              key={experience.id}
              className={`experience-button${selectedCookies.has(experience.cookie) ? ' active' : ''}`}
              onClick={() => onSelectExperience(campaign.id, experience.cookie)}
            >
              {name}
            </button>
          );
        })}
      </div>
      <div className="campaign-conditions-container">
        <button className="campaign-conditions-button" onClick={() => onOpenConditions({ campaign })}>
          <Preview /> Preview Campaign Conditions
        </button>
      </div>
    </li>
  );
}
