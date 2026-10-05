import { useState, useEffect, useMemo } from 'react';
import { AudienceItem } from '../../components/AudienceItem/AudienceItem';
import { Audience, Campaign } from '../../types';
import { Accordion } from '../../components/Accordion/Accordion';
import { Fail, Success } from '../../elements/Icon/Icon';
import { getAudiences } from '../../hooks/Audiences';

export type AudiencePanelProps = {
  searchTerm: string;
  onOpenConditions: (data: { audience?: Audience, campaign?: Campaign }) => void;
}

export const AudiencePanel = ({ searchTerm, onOpenConditions }: AudiencePanelProps) => {
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const audiences = getAudiences();
    setAudiences(audiences);
  }, [])

  useEffect(() => {
    setFading(true);
    const timer = setTimeout(() => {
      setFading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term ? audiences.filter(a => a.name.toLowerCase().includes(term)) : audiences;
  }, [audiences, searchTerm]);

  const matchedAudiences = filtered.filter(a => a.match);
  const unmatchedAudiences = filtered.filter(a => !a.match);
  const searchActive = searchTerm.trim() !== '';

  return (
    <section className="audience-screen">
      <div className='audience-container' style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.15s ease' }}>
        {!searchActive ? (
          <div className='audience-list-container'>
            <Accordion
              title={
                <>
                  <Success width="24px" height="24px"/>
                  Matched Audiences ({matchedAudiences.length})
                </>
              }
              open={openIndex === 0}
              onToggle={() => setOpenIndex(prev => prev === 0 ? null : 0)}
            >
              <ul className="audience-list">
                {matchedAudiences.map((audience) => (
                  <AudienceItem
                    key={audience.audience}
                    audience={audience}
                    onOpenConditions={onOpenConditions}
                  />
                ))}
              </ul>
            </Accordion>
            <Accordion
              title={
                <>
                  <Fail width="24px" height="24px"/>
                  Unmatched Audiences ({unmatchedAudiences.length})
                </>
              }
              open={openIndex === 1}
              onToggle={() => setOpenIndex(prev => prev === 1 ? null : 1)}
            >
              <ul className="audience-list">
                {unmatchedAudiences.map((audience) => (
                  <AudienceItem
                    key={audience.audience}
                    audience={audience}
                    onOpenConditions={onOpenConditions}
                  />
                ))}
              </ul>
            </Accordion>
          </div>
        ) : (
          <div className='search-results-container'>
            {filtered.map((audience) => (
              <AudienceItem
                key={audience.audience}
                audience={audience}
                onOpenConditions={onOpenConditions}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}