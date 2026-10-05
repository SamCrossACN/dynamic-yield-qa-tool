import React, { Fragment } from 'react';

import { Spinner, Success, Fail } from "../../elements/Icon/Icon";
import { Experience } from "../../types";

interface CampaignReportProps {
  experience: Experience;
}

export const CampaignReport = ({ experience }: CampaignReportProps) => {
  return (
    <>
      {experience.conditions.map((conditionGroup) => {
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
      })}
    </>
  )
}