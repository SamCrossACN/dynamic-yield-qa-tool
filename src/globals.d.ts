/// <reference types="vite/client" />

declare const DY: {
  audienceRules: DYAudience[];
  Audiences: Audiences;
}

interface DYAudience {
  audience: number;
  updatedAt: string;
  session: number;
  sticky: number;
  hidden: number;
  conditionDays: number;
  validDays: number;
  audienceType: string;
  name: string;
  rule: DYConditionGroup[];
}

declare const DYO: {
  otags: Record<string, DYCampaignTag>;
  waitForElementAsync: (selector: string, a: number, b: number, c: number) => Promise<Element[]>;
  Q: (val: unknown) => Promise<unknown>;
  CoreUtils: { safeEval: (code: string) => unknown };
  oevals: Record<string, { code: string }>;
  AudienceCookies: AudienceCookies;
};

interface DYCampaignTag {
  displayName: string;
  rules: DYRule[];
}

interface DYRule {
  ruleDisjs?: Record<string, DYConditionGroup>;
  smartObject: { id: string; name: string };
}

interface DYConditionGroup {
  id: string;
  condType: string;
  conds: DYCondItem[];
  subType?: string;
}

interface DYCondItem {
  id?: string;
  parameter?: string;
  selectMethod: string;
  selectParameter: string;
  selectParameter2?: string;
  includeUrlParams?: boolean;
  jsCode?: string;
  condMatched?: boolean;
  hitCountMethod?: string;
  hitCount?: number;
  [key: string]: any;
}

interface Audiences {
  getEventName: (id: number) => any;
  getUserAudiences: () => string[];
}

interface AudienceCookies {
  loadPageCookies: Function;
  loadCHCCookies: Function;
  loadSessionCookies: Function;
  savePageCookies: Function;
  saveCHCCookies: Function;
  saveSessionCookies: Function;
  load: Function;
  clear: Function;
}