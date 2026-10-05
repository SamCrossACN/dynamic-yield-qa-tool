import React, { Fragment } from 'react';

import { Fail, Spinner, Success } from "../../elements/Icon/Icon";
import { ReportRow, Rule } from "../../types";

interface AudienceReportProps {
  rule: Rule;
}

export const AudienceReport = ({ rule }: AudienceReportProps) => {
  return (
    <ul key={rule.id} id={rule.id.toString()} className="experience-condition-list" data-match={rule.match} data-type="audience">
      {rule.report!.conditions.map((condition: ReportRow, index: number) => (
        <Fragment key={index}>
          <li className="experience-condition-list-item" data-match={condition.match}>
            <div className={`condition-expected-value ${condition.match ? 'success': 'fail'}`}>
              <span className="condition-result" data-state={condition.match}>
                {condition.inProgress ? <Spinner color={"#a52a2a"}/> : condition.match === true ? <Success /> : <Fail />}
              </span>
              <span className="condition-message">
                {condition.message}
              </span>
            </div>
          </li>
          {index < rule.conds.length - 1 && (
            <li className="experience-condition-list-item-joiner">
              AND
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  )
}