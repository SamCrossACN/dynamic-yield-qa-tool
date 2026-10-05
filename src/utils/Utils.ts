import type { Campaign } from '../types';

type BrowserCookie = {
  cookie: string;
  value: string;
}

export function getCookies(campaigns: Campaign[]): string[] {
  return campaigns.flatMap((campaign) => campaign.experiences.map((experience) => experience.cookie));
}

export function getBrowserCookies() : BrowserCookie[] {
  return document.cookie.split(';').map((cookie) => {
    const values = cookie.split('=');
    return {
        cookie: values[0],
        value: values[1],
    }
  })
}

export function conditionEval(conditionalValues: string[]): boolean {
  const win: any = (window as any).unsafeWindow ?? window;
  let object: Record<string, unknown> = win;
  for (let i = 0; i < conditionalValues.length; i += 1) {
    const conditionalValue = conditionalValues[i];
    if (object[conditionalValue] !== undefined) {
      object = object[conditionalValue] as Record<string, unknown>;
      continue;
    }
    return false;
  }
  return true;
}

export function getLibrary(conditionalValues: string[], error: string): Promise<true> {
  return new Promise((resolve, reject) => {
    if (conditionEval(conditionalValues)) return resolve(true);

    let intervalCount = 0;
    const toolInterval = setInterval(() => {
      if (conditionEval(conditionalValues)) {
        clearInterval(toolInterval);
        return resolve(true);
      }

      intervalCount += 1;

      if (intervalCount >= 200) {
        clearInterval(toolInterval);
        return reject(new TypeError(error));
      }
    }, 100);

    return undefined;
  });
}