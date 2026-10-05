const EVENT_LOG_KEY = 'dy:event-log';
const win: any = (window as any).unsafeWindow ?? window;

win.DY = win.DY || {};

try {
  const stored = sessionStorage.getItem(EVENT_LOG_KEY);
  win.eventLog = stored ? JSON.parse(stored) : [];
} catch {
  win.eventLog = [];
}

export interface DYEventPayload {
  name: string;
  properties: Record<string, string | number | boolean | string[]>;
}

export interface DYEventEntry {
  method: string;
  args: [DYEventPayload, ...unknown[]];
  timestamp: number;
}

declare global {
  interface Window {
    DY: {
      API?: (method: string, ...args: unknown[]) => unknown;
      [key: string]: unknown;
    };
    eventLog: DYEventEntry[];
  }
}

function wrapDYAPI(fn: (method: string, ...args: unknown[]) => unknown) {
  return function (method: string, ...args: unknown[]) {
    if (method === 'event') {
      win.eventLog.push({ method, args: args as [DYEventPayload, ...unknown[]], timestamp: Date.now() });
      try { sessionStorage.setItem(EVENT_LOG_KEY, JSON.stringify(win.eventLog)); } catch { /* quota exceeded */ }
      win.dispatchEvent(new CustomEvent('dy:event-logged'));
    }
    return fn.apply(win.DY, [method, ...args]);
  };
}

export const eventLog = () => {
  let _wrapped: ((method: string, ...args: unknown[]) => unknown) | undefined =
    win.DY.API ? wrapDYAPI(win.DY.API) : undefined;

  Object.defineProperty(win.DY, 'API', {
    configurable: true,
    get() { return _wrapped; },
    set(fn: (method: string, ...args: unknown[]) => unknown) { _wrapped = wrapDYAPI(fn); },
  });
}