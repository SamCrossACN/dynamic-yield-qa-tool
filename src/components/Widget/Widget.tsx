import React from 'react';
import { useState } from 'react';
import type { Audience, Campaign, CampaignData } from '../../types';
import { SettingsPanel } from '../../pages/Options/Options';
import { CampaignPanel } from '../../pages/Campaigns/Campaigns';
import { EventPanel } from '../../pages/Events/Events';
import { AudiencePanel } from '../../pages/Audiences/Audiences';
import { Screen } from '../Screen/Screen';
import { TabBar } from '../TabBar/TabBar';
import { ToggleSwitch } from '../../elements/ToggleSwitch/ToggleSwitch';
import { Team, Beaker, Code, Settings } from '../../elements/Icon/Icon';
import { SearchBar } from '../../elements/SearchBar/SearchBar';

interface Props {
  campaignData: CampaignData;
  panelOpen: boolean;
  controlGroup: boolean;
  selectedCookies: Set<string>;
  onToggleControl: () => void;
  onSelectExperience: (campaignId: string, cookie: string | null) => void;
  onClear: () => void;
  onSave: () => void;
  onCopy: () => void;
  onOpenConditions: (data: { audience?: Audience, campaign?: Campaign }) => void;
}

export const Widget = ({
  panelOpen,
  selectedCookies,
  onSelectExperience,
  onOpenConditions,
  onClear,
  onSave,
  onCopy,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBarActive, setSearchBarActive] = useState(true);
  const [placeholder, setPlaceholder] = useState('Search for a campaign');

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setPlaceholder(screens[index].placeholder);
    setSearchBarActive(screens[index].placeholder !== '');
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  }

  const handleClearSearch = () => {
    setSearchTerm('');
  }

  const screens = [
    {
      title: 'Campaigns',
      icon: Beaker,
      placeholder: 'Search for a campaign',
      body: (
        <CampaignPanel
          selectedCookies={selectedCookies}
          searchTerm={searchTerm}
          onSelectExperience={onSelectExperience}
          onOpenConditions={onOpenConditions}
          onClear={onClear}
          onSave={onSave}
          onCopy={onCopy}
        />
      )
    },
    {
      title: 'Events',
      icon: Code,
      placeholder: 'Search for an event',
      body: (
        <EventPanel searchTerm={searchTerm} />
      )
    },
    {
      title: 'Audiences',
      icon: Team,
      placeholder: 'Search for an audience',
      body: (
        <AudiencePanel searchTerm={searchTerm} onOpenConditions={onOpenConditions} />
      )
    },
    {
      title: 'Settings',
      icon: Settings,
      placeholder: '',
      body: (
        <SettingsPanel />
      )
    }
  ];

  return (
    <div className={`tl-qa-container ${panelOpen ? 'active' : ''}`}>
      <div className="widget-header">
        <span className="widget-title">The Lumery QA Tool</span>
      </div>
      <TabBar screens={screens} activeIndex={activeIndex} handleTabClick={handleTabClick} />
      <SearchBar placeholder={placeholder} handleClear={handleClearSearch} handleChange={handleSearchChange} active={searchBarActive}/>
      <div className="screen-container">
        {screens.map((screen, index) =>
          <Screen key={index} body={screen.body} index={index} activeIndex={activeIndex} />
        )}
      </div>
    </div>
  );
}
