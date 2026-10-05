const CG_VALUE = 'Control Group';
const DY_VALUE = 'Dynamic Yield Experiences';

const win: any = (window as any).unsafeWindow ?? window;

export function getCampaignState(cookie: string): boolean {
  return document.cookie.split('; ').includes(`${cookie}=true`);
}

export function setCookie(name: string, value: string, exdays: number): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; secure; path=/;`;
}

export function deleteCookie(cookie: string): void {
  document.cookie = `${cookie}=true; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; path=/;`;
}

export function clearCampaigns(cookies: string[]): void {
  cookies.forEach((cookie) => deleteCookie(cookie));
}

export function copyCampaigns(activeCookies: string[]): void {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  let campaignString = '';
  activeCookies.forEach((cookie) => {
    campaignString += `document.cookie="${cookie}=true; ${expires}; secure; path=/;";\n`;
  });

  navigator.clipboard.writeText(`${campaignString}\nwindow.location.reload();`);
}

export function clearActiveCampaigns(allCookies: string[]) {
  clearCampaigns(allCookies);
  win.location.reload();
}

export function saveCampaigns(allCookies: string[], activeCookies: string[]): void {
  clearCampaigns(allCookies);
  copyCampaigns(activeCookies);
  activeCookies.forEach((cookie) => setCookie(cookie, 'true', 1));
  win.location.reload();
}

export function saveClickEvents(selectors: string[]) {
  selectors.forEach((selector: string) => {
    const elements = document.querySelectorAll(selectors.join());
    elements.forEach((element) => {
      element.addEventListener('click', () => {
        win.DY_CLICKED_ELEMENTS.push(selector);
      })
    })
  })
}

export function getControlGroup() {
  const dyGroup = win.DYO.StorageUtils.get('_dy_cs_dygroup', ['cookieStorage']) || win.DYO.StorageUtils.get('_dy_cs_gcg', ['cookieStorage']);
  return dyGroup === CG_VALUE;
}

export function setDYGroup(value: string) {
  const GCG_STORAGE_NAME = '_dy_cs_gcg';
  const STORAGE_TYPE = 'cookieStorage';

  win.DYO.StorageUtils.remove(GCG_STORAGE_NAME, [STORAGE_TYPE]);
  win.DYO.StorageUtils.set(GCG_STORAGE_NAME, value, [STORAGE_TYPE]);
}

export function toggleDYGroup() {
  const controlGroup = getControlGroup();
  const newValue = controlGroup ? DY_VALUE : CG_VALUE;

  setDYGroup(newValue);
}

export function getDebugLogState() {
  return sessionStorage.getItem('tl_debug_log') === 'true';
}

export function toggleDebugLogState() {
  const oldState = getDebugLogState();
  sessionStorage.setItem('tl_debug_log', oldState ? 'false': 'true');
}