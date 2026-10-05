import React from 'react';
import type { Audience, Campaign } from '../../types';
import { Fail, Success } from '../../elements/Icon/Icon';
import { Tooltip } from '../../elements/Tooltip/Tooltip';

interface Props {
  audience: Audience;
  onOpenConditions: (data: { audience?: Audience, campaign?: Campaign }) => void;
}

export const AudienceItem = ({ audience, onOpenConditions }: Props) => {
  return (
    <li className="audience-item" data-audience={audience.name} data-id={audience.audience}>
      <Tooltip text={`View targeting criteria for ${audience.name}`}>
        <button className='audience-criteria-button' onClick={() => onOpenConditions({ audience })}>
          <div className='audience-item-header'>
            <span className="audience-name">
              {audience.name}
            </span>
          </div>
          <div className='audience-criteria-icon'>
            {audience.match ? <Success width="24px" height="24px" /> : <Fail width="24px" height="24px" />}
          </div>
        </button>
        </Tooltip>
    </li>
  );
}
