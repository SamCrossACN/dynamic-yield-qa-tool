import ReactDOM from 'react-dom/client';
import { getLibrary } from './utils/Utils';

import { saveClickEvents } from './hooks/State';
import { getCampaignData } from './hooks/Campaigns';
import { eventLog } from './hooks/Events';

import { injectCSS } from './hooks/UI';
import { App } from './App';

const win: any = (window as any).unsafeWindow ?? window;
win.DY_CLICKED_ELEMENTS = [] as HTMLElement[];
eventLog();

Promise.all([
  getLibrary(['DYO', 'otags'], 'DY Utils not available'),
  getLibrary(['DY', 'audienceRules'], 'DY Audiences not available')
]).then(() => {
  if (!document.querySelector('.TL-QA-Root')) {
    const campaignData = getCampaignData();
    saveClickEvents(campaignData.dyClickEventElements);
    injectCSS();

    const root = document.createElement('div');
    root.classList.add('TL-QA-Root');
    document.body.prepend(root);

    ReactDOM.createRoot(root).render(
      <App campaignData={campaignData} />
    );
  }
})
