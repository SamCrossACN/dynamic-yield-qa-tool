import { useState } from 'react';
import { ToggleSwitch } from '../../elements/ToggleSwitch/ToggleSwitch';
import { getControlGroup, getDebugLogState, toggleDebugLogState, toggleDYGroup } from '../../hooks/State';

export const SettingsPanel = () => {  
  const [controlGroup, setControlGroup] = useState(getControlGroup());
  const [debugLog, setDebugLog] = useState(getDebugLogState());

  const win: any = (window as any).unsafeWindow ?? window;

  const handleToggleControl = () => {
    toggleDYGroup();
    setControlGroup(prev => !prev);
  }

  const handleToggleEventLog = () => {
    toggleDebugLogState();
    setDebugLog(prev => !prev);
  }

  const handleSaveSettings = () => {
    win.location.reload();
  }

  return (
    <section className='settings-screen'>
      <div className='settings-wrapper'>
        <div className='settings-row'>
          <span className="toggle-label">Control Group</span>
          <ToggleSwitch checked={controlGroup} onChange={handleToggleControl} />
        </div>
        <div className='settings-row'>
          <span className="toggle-label">Debug Log</span>
          <ToggleSwitch checked={debugLog} onChange={handleToggleEventLog} />
        </div>
      </div>
      <div className="qa-button-container">
        <button className="save-settings" onClick={handleSaveSettings}>Save Settings</button>
      </div>
    </section>
  );
}