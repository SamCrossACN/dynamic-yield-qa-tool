export type BaseType = {
  type: string;
}

export interface ConditionResult {
  result: boolean | undefined;
  inProgress: boolean
  matchType?: string;
  requiredValue?: string | number;
  actualValue?: string | number;
  name?: string;
  message: JSX.Element;
};

export interface ConditionGroupResult {
  id?: string | number;
  name?: string;
  result: boolean | undefined;
  inProgress: boolean
  type: string;
  conditions: ConditionResult[];
}

export type Audience = {
  audience: number;
  updatedAt: string;
  session: number;
  sticky: number;
  hidden: number;
  conditionDays: number;
  validDays: number;
  audienceType: string;
  name: string;
  rule: Rule[];
  match?: boolean;
}

export type Rule = {
  id: string;
  condType: string;
  conds: Cond[];
  subType?: string;
  match?: boolean;
  report?: RuleReport;
}

export type RuleReport = {
  key: string;
  match: boolean;
  conditions: ReportRow[],
}

export type ReportRow = {
  id: string;
  match: boolean;
  error?: string;
  inProgress?: boolean;
  message: JSX.Element;
}

export type Cond = {
  id?: string;
  parameter?: string;
  selectMethod: string;
  selectParameter: string;
  selectParameter2?: string;
  includeUrlParams?: boolean;
  jsCode?: string;
  match?: boolean;
  hitCountMethod: string;
  hitCount?: number;
  actualCount?: number;
  expectedCount?: number;
  [key: string]: any;
}

export type Campaign = {
  id: string;
  name: string;
  experiences: Experience[];
  active: boolean;
}

export interface Experience {
  id: string;
  name: string;
  cookie: string;
  active: boolean;
  conditions: ConditionGroupResult[];
}

export interface Condition {
  id?: string | number;
  name?: string;
  result: boolean;
  inProgress: boolean;
  type: string;
  conditions: ConditionResult[];
}

export interface ConditionData {
  id?: string;
  campaignId: string;
  experienceId: string;
  name: string;
  conditions: DYConditionGroup[];
}



export interface CampaignData {
  dyCampaigns: Campaign[];
  dyConditions: ConditionData[];
  dyClickEventElements: string[];
}

export interface MessageProps {
  rule: Rule,
  condition: Cond,
}