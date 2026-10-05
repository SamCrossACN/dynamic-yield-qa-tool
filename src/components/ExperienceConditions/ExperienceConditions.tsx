import React from 'react';
import { useState } from 'react';
import type { Experience, Rule } from '../../types';
import { Success, Fail, Chevron } from '../../elements/Icon/Icon';
import { AudienceReport } from '../AudienceReport/AudienceReport';
import { CampaignReport } from '../CampaignReport/CampaignReport';

type ExperienceConditionsProps = {
  experience?: Experience;
  rule?: Rule;
  open?: boolean;
}

export const ExperienceConditions = ({ experience, rule, open = false }: ExperienceConditionsProps) => {
  const [expanded, setExpanded] = useState(open);

  const state = (!!experience && experience.active) || (!!rule && rule.match);
  const name = (!!experience && experience.name) || (!!rule && rule.condType)


  return (
    <div className={`experience-conditions${expanded ? ' active' : ''}`}>
      <div className="experience-condition-header-container" onClick={() => setExpanded(e => !e)}>
        <span className="experience-state">
          { state ? <Success /> : <Fail /> }
        </span>
        <span className="experience-condition-header">{name}</span>
        <span>
          {<Chevron />}
        </span>
      </div>
      <div className="experience-condition-wrapper">
        <div className={`experience-condition-list-container ${experience ? 'experience' : 'rule'}`}>
          {/* {
            experience && experience.conditions && experience.conditions.map((conditionGroup) => {
              if (conditionGroup.conditions.length === 0) return null;
              return (
                <ul key={conditionGroup.id} id={conditionGroup.id?.toString()} className="experience-condition-list" data-match={conditionGroup.result} data-in-progress={conditionGroup.inProgress} data-type="campaign">
                  {conditionGroup.conditions.map((condition, condIndex) => (
                    <Fragment key={condIndex}>
                      <li className="experience-condition-list-item">
                        <div className={`condition-expected-value ${condition.result ? 'success': 'fail'}`}>
                          <span className="condition-result" data-state={condition.result}>
                            { condition.inProgress ? <Spinner color={"#a52a2a"}/> : condition.result === true ? <Success /> : <Fail /> }
                          </span>
                          <span className="condition-message">
                            {condition.message}
                          </span>
                        </div>
                      </li>
                      {condIndex < conditionGroup.conditions.length - 1 && (
                        <li className="experience-condition-list-item">
                          <div className="condition-expected-value">
                            <span className="condition-result"></span>
                            <span className="condition-or">OR</span>
                          </div>
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
              );
            })
          } */}

          {
            rule && rule.report && (
              <AudienceReport rule={rule}/>
            )
          }

          {
            experience && experience.conditions && (
              <CampaignReport experience={experience} />
            )
          }
        </div>
      </div>
    </div>
  );
}
