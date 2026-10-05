import { ConditionTypes } from "./enums";

interface Dictionary<T> {
  [key: string]: T;
}

export const ConditionType: Dictionary<string> = {
  '_CurrentPage': ConditionTypes.CURRENT_PAGE,
  '_Event': ConditionTypes.EVENT,
  '_PageEvent': ConditionTypes.PAGE_EVENT,
  '_Evaluator': ConditionTypes.EVALUATOR,
  '_Date': ConditionTypes.DATE,
  '_CookieParam': ConditionTypes.COOKIE,
};