import React from 'react';
import type { IconProps } from '../../elements/Icon/Icon';

const ACTIVE_COLOR = '#F26859' as IconProps['color'];
const INACTIVE_COLOR = '#555555' as IconProps['color'];

export type TabBarProps = {
  screens: {
    title: string;
    icon: React.ComponentType<IconProps>;
    body: React.JSX.Element;
  }[];
  activeIndex: number;
  handleTabClick: (index: number) => void;
}

export const TabBar = ({ screens, activeIndex, handleTabClick }: TabBarProps) => {
  return (
    <div className='tab-container'>
      {screens.map((screen, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={index}
            className={`tab-button${active ? ' active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <screen.icon width='24px' height='24px' color={active ? ACTIVE_COLOR : INACTIVE_COLOR} />
            {screen.title}
          </button>
        );
      })}
    </div>
  );
}