import React from 'react';
import { getComparator, getOppositeComparator, getDyBrowser, capitaliseFirstLetter } from "./Rules";
import { MessageProps } from "../types";

export const AudienceMessage = ({ condition }: MessageProps) => {
  const { parameter, selectMethod } = condition;
  const audience = DY.audienceRules.find((a) => a.audience === parseInt(parameter as string))

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {selectMethod === 'equals' ? 'belongs to' : 'does not belong to'}
            </code>
            <code className='rule-report-section-value'>
              {audience!.name}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const BrowserMessage = ({ condition }: MessageProps) => {
  const { parameter, hitCountMethod } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {condition.match! ? getComparator(hitCountMethod!) : getOppositeComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {getDyBrowser(parameter!)}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CategoryViewsMessage = ({ condition }: MessageProps) => {
  const { selectParameter2, expectedCount } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {`${capitaliseFirstLetter(selectParameter2!)} Category`}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
            <code className='rule-report-section-value'>
              time(s)
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DeviceTypeMessage = ({ condition }: MessageProps) => {
  const { parameter } = condition;
    const deviceParam = parseInt(parameter!);
    const deviceType = deviceParam === 0 ? 'Smartphone' : deviceParam === 2 ? 'Tablet' : 'Desktop';

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {condition.match! ? 'is' : 'is not'}
            </code>
            <code className='rule-report-section-value'>
              {deviceType}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const EventPropMessage = ({ condition }: MessageProps) => {
  const { selectMethod, selectParameter, selectParameter2, hitCountMethod, expectedCount, eventName } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {eventName}
            </code>
            <code className='rule-report-section-value'>
              {selectParameter}
            </code>
            <code className='rule-report-section-value'>
              {selectMethod === "pair_equals" ? 'is' : 'is not'}
            </code>
            <code className='rule-report-section-value'>
              {selectParameter2}
            </code>
            <code className='rule-report-section-value'>
              {condition.match! ? getComparator(hitCountMethod!) : getOppositeComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
            <code className='rule-report-section-value'>
              time(s)
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const HomepageViewsMessage = ({ condition }: MessageProps) => {
  const { hitCountMethod, expectedCount } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {condition.match! ? getComparator(hitCountMethod!) : getOppositeComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
            <code className='rule-report-section-value'>
              time(s)
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const IdentifiedUserMessage = ({ condition } : MessageProps) => {
  const { expectedCount } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {expectedCount === 1 ? 'True' : 'False'}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MetadataMessage = ({ }: MessageProps) => {
  return (
    <></>
  )
}

export const PageViewsMessage = ({ condition }: MessageProps) => {
  const { hitCountMethod, expectedCount } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {condition.match! ? getComparator(hitCountMethod!) : getOppositeComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const PageVisitedMessage = ({ condition }: MessageProps) => {
  const { selectParameter, hitCountMethod, expectedCount, selectMethod } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {selectMethod}
            </code>
            <code className='rule-report-section-value'>
              {selectParameter}
            </code>
            <code className='rule-report-section-value'>
              {condition.match! ? getComparator(hitCountMethod!) : getOppositeComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
            <code className='rule-report-section-value'>
              time(s)
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProductFeaturesAddToCartMessage = ({ rule, condition } : MessageProps) => {
  const { selectParameter, hitCountMethod, expectedCount } = condition;

  if (!selectParameter) return <></>;

  const data = JSON.parse(selectParameter);
  if (!data?.conditions) return <></>;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {data.conditions.length === 0 ? 'Any product' : 'Product with property'}
            </code>
          </div>
        </div>
        {
          data.conditions.length > 0 && (
            <div className='rule-report-section'>
              {
                data.conditions.flatMap((condition: any, index: number) => {
                  const item = (
                    <div key={`condition-${index}`} className='rule-report-section-item'>
                      <code className='rule-report-section-value'>
                        {capitaliseFirstLetter(condition.field)}
                      </code>
                      <code className='rule-report-section-value'>
                        {condition.values[0]}
                      </code>
                    </div>
                  );

                  return index < data.conditions.length - 1
                    ? [item, <div key={`or-${index}`} className='rule-report-section-item-joiner'>OR</div>]
                    : [item];
                })
              }
            </div>
          )
        }
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            {!rule.match! && (
              <>
                <div className='rule-report-section-value error'>
                  IS
                </div>
                <code className='rule-report-section-value error'>
                  {condition.actualCount}
                </code>
                <div className='rule-report-section-value error'>
                  BUT SHOULD BE
                </div>
              </>
            )}
            <code className='rule-report-section-value'>
              {getComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
            <code className='rule-report-section-value'>
              time(s)
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProductFeaturesPurchasesMessage = ({ rule, condition }: MessageProps) => {
  const { selectParameter, hitCountMethod, expectedCount } = condition;

  if (!selectParameter) return <></>;
  const data = JSON.parse(selectParameter);
  if (!data?.conditions) return <></>;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {data.conditions.length === 0 ? 'Any product' : 'Product with property'}
            </code>
          </div>
        </div>
        {
          data.conditions.length > 0 && (
            <div className='rule-report-section'>
              {
                data.conditions.flatMap((condition: any, index: number) => {
                  const item = (
                    <div key={`condition-${index}`} className='rule-report-section-item'>
                      <code className='rule-report-section-value'>
                        {capitaliseFirstLetter(condition.field)}
                      </code>
                      <code className='rule-report-section-value'>
                        {condition.values[0]}
                      </code>
                    </div>
                  );

                  return index < data.conditions.length - 1
                    ? [item, <div key={`or-${index}`} className='rule-report-section-item-joiner'>OR</div>]
                    : [item];
                })
              }
            </div>
          )
        }
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            {!rule.match! && (
              <>
                <div className='rule-report-section-value error'>
                  IS
                </div>
                <code className='rule-report-section-value error'>
                  {condition.actualCount}
                </code>
                <div className='rule-report-section-value error'>
                  BUT SHOULD BE
                </div>
              </>
            )}
            <code className='rule-report-section-value'>
              {getComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
            <code className='rule-report-section-value'>
              time(s)
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProductFeaturesViewsMessage = ({ rule, condition }: MessageProps) => {
  const { selectParameter, hitCountMethod, expectedCount } = condition;

  if (!selectParameter) return <></>;
  const data = JSON.parse(selectParameter);
  if (!data?.conditions) return <></>;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {data.conditions.length === 0 ? 'Any product' : 'Product with property'}
            </code>
          </div>
        </div>
        {
          data.conditions.length > 0 && (
            <div className='rule-report-section'>
              {
                data.conditions.flatMap((condition: any, index: number) => {
                  const item = (
                    <div key={`condition-${index}`} className='rule-report-section-item'>
                      <code className='rule-report-section-value'>
                        {capitaliseFirstLetter(condition.field)}
                      </code>
                      <code className='rule-report-section-value'>
                        {condition.values[0]}
                      </code>
                    </div>
                  );

                  return index < data.conditions.length - 1
                    ? [item, <div key={`or-${index}`} className='rule-report-section-item-joiner'>OR</div>]
                    : [item];
                })
              }
            </div>
          )
        }
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            {!rule.match! && (
              <>
                <div className='rule-report-section-value error'>
                  IS
                </div>
                <code className='rule-report-section-value error'>
                  {condition.actualCount}
                </code>
                <div className='rule-report-section-value error'>
                  BUT SHOULD BE
                </div>
              </>
            )}
            <code className='rule-report-section-value'>
              {getComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
            <code className='rule-report-section-value'>
              time(s)
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const RegionMessage = ({ condition }: MessageProps) => {
  const { selectMethod, selectParameter2 } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {selectMethod === 'equals' ? 'is' : 'is not'}
            </code>
            <code className='rule-report-section-value'>
              {selectParameter2}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SiteEventMessage = ({ condition }: MessageProps) => {
  const { selectParameter, hitCountMethod, expectedCount } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {selectParameter}
            </code>
            <code className='rule-report-section-value'>
              {condition.match! ? getComparator(hitCountMethod!) : getOppositeComparator(hitCountMethod!)}
            </code>
            <code className='rule-report-section-value'>
              {expectedCount!.toString()}
            </code>
            <code className='rule-report-section-value'>
              time(s)
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TrackedValueMessage = ({ }: MessageProps) => {
  return (
    <></>
  )
}

export const TrafficSourceMessage = ({ condition }: MessageProps) => {
  const { selectParameter, selectMethod } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {selectMethod === 'equals' ? 'is' : 'is not'}
            </code>
            <code className='rule-report-section-value'>
              {selectParameter}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export const UrlParamMessage = ({ }: MessageProps) => {
  return (
    <></>
  )
}

export const UserAgentMessage = ({ condition }: MessageProps) => {
  const { selectParameter, selectMethod } = condition;

  return (
    <div className="condition-report-container">
      <div className="report-row">
        <div className='rule-report-section'>
          <div className='rule-report-section-item'>
            <code className='rule-report-section-value'>
              {selectMethod}
            </code>
            <code className='rule-report-section-value'>
              {selectParameter}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}