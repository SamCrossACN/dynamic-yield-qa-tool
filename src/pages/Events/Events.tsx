import React from 'react';
import { useState, useEffect, useMemo } from 'react';

type EventPanelProps = {
  searchTerm: string;
}

const win: any = (window as any).unsafeWindow ?? window;

export const EventPanel = ({ searchTerm }: EventPanelProps) => {
  const [log, setLog] = useState<typeof win.eventLog>([...win.eventLog]);
  const [fading, setFading] = useState(false);
  const [data, setData] = useState(log);

  useEffect(() => {
    const handler = () => setLog([...win.eventLog]);
    win.addEventListener('dy:event-logged', handler);
    return () => win.removeEventListener('dy:event-logged', handler);
  }, []);

  useEffect(() => {
    setFading(true);
    setData(!searchActive ? log : filtered);
    const timer = setTimeout(() => {
      setFading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term ? log.filter((a: any) => a.args[0].name.toLowerCase().includes(term)) : log;
  }, [log, searchTerm]);

  const searchActive = searchTerm.trim() !== '';

  return (
    <section className='event-screen'>
      <div className='events-container' style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.15s ease' }} >
        <div className='events-list-container'>
          {data.length === 0 && (
            <p className='event-empty'>No events captured yet.</p>
          )}

          {[...data].reverse().map((entry, index) => {
            const payload = entry.args[0];
            if (payload.properties === undefined) return;
            
            return (
              <div key={index} className='event-entry'>
                <div className='event-header'>
                  <span className='event-name'>{payload.name}</span>
                  <span className='event-timestamp'>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                </div>
                {Object.keys(payload.properties).length > 0 && (
                  <ul className='event-properties'>
                    {Object.entries(payload.properties).map(([key, value]) => (
                      <li key={key} className='event-property'>
                        <span className='property-key'>{key}</span>
                        <span className='property-value'>
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}