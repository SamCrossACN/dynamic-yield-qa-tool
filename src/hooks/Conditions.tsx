import React from 'react';
import { ConditionType } from '../dictionaries.js';
import type { ConditionResult, ConditionGroupResult } from '../types.js';
import { getBrowserCookies } from '../utils/Utils.js';

const win: any = (window as any).unsafeWindow ?? window;

export function waitForElement(selector: string): Promise<Element[]> {
  return new Promise((resolve, reject) => {
    DYO.waitForElementAsync(selector, 1, 50, 100)
      .then((elements) => {
        resolve(elements);
      }, () => {
        reject(new Error(`Element "${selector}" not loaded`));
      });
  });
}

export async function getEvaluatorResult(conds: DYCondItem[], override: boolean = false): Promise<ConditionResult[]> {
  function extractDYEvaluator(str: string): string | null {
    const start = str.indexOf('DY Evaluator - ');
    if (start === -1) return null;
    const end = str.indexOf('\n', start);
    if (end === -1) return null;
    return str.slice(start, end).replace('\r', '');
  }

  if (override) {
    return Promise.all(conds.map(async (cond) => {
      const name = extractDYEvaluator(cond.jsCode ?? '') ?? cond.parameter;
        return {
          result: undefined,
          inProgress: true,
          message: <>
            <span>Evaluator</span>
            <code>{name}</code>
            <span>is being evaluated</span>
          </>
        };
    }));
  }

  return Promise.all(conds.map(async (cond) => {
    return DYO.Q(DYO.CoreUtils.safeEval(DYO.oevals[cond.parameter!].code))
      .then((res) => {
        const value = String(res);
        const name = extractDYEvaluator(cond.jsCode ?? '') ?? cond.parameter;
        const inProgress = false;
        let result = undefined;
        let matchType = '';
        let message : JSX.Element = <></>;

        switch (cond.selectMethod) {
          case 'equals':
            result = value === cond.selectParameter;
            matchType = 'equals';
            message = result ? <>
              <span>equals</span>
              <code>{cond.selectParameter}</code>
            </> : <>
              <span>should equal</span>
              <code>{cond.selectParameter}</code>
              <span>but it is</span>
              <code>{value}</code>
            </>;

            break;
          case 'not_equals':
            result = value !== cond.selectParameter;
            matchType = "doesn't equal";
            message = result ? <>
              <span>should not equal</span>
              <code>{cond.selectParameter}</code>
            </> : <>
              <span>should not equal</span>
              <code>{cond.selectParameter}</code>
              <span>but it does</span>
            </>;
            break;
          case 'ge':
            result = parseFloat(value) >= parseFloat(cond.selectParameter);
            matchType = 'is at least';
            message = result ? <>
              <span>is at least</span>
              <code>{parseFloat(cond.selectParameter)}</code>
            </> : <>
              <span>should be at least</span>
              <code>{parseFloat(cond.selectParameter)}</code>
              <span>but it is</span>
              <code>{parseFloat(value)}</code>
            </>;
            break;
          case 'gt':
            result = parseFloat(value) > parseFloat(cond.selectParameter);
            matchType = 'is greater than';
            message = result ? <>
              <span>is greater than</span>
              <code>{parseFloat(cond.selectParameter)}</code>
            </> : <>
              <span>should be greater than</span>
              <code>{parseFloat(cond.selectParameter)}</code>
              <span>but it is</span>
              <code>{parseFloat(value)}</code>
            </>;
            break;
          case 'Le':
            result = parseFloat(value) <= parseFloat(cond.selectParameter);
            matchType = 'is at most';
            message = result ? <>
              <span>is at most</span>
              <code>{parseFloat(cond.selectParameter)}</code>
            </> : <>
              <span>should be at most</span>
              <code>{parseFloat(cond.selectParameter)}</code>
              <span>but it is</span>
              <code>{parseFloat(value)}</code>
            </>;
            break;
          case 'Lt':
            result = parseFloat(value) < parseFloat(cond.selectParameter);
            matchType = 'is less than';
            message = result ? <>
              <span>is less than</span>
              <code>{parseFloat(cond.selectParameter)}</code>
            </> : <>
              <span>should be less than</span>
              <code>{parseFloat(cond.selectParameter)}</code>
              <span>but it is</span>
              <code>{parseFloat(value)}</code>
            </>;
            break;
        }

        return {
          name,
          matchType,
          requiredValue: cond.selectParameter,
          actualValue: value,
          result,
          inProgress,
          message: <>
            <span>Evaluator</span>
            <code>{name}</code>
            {message}
          </>,
        } as ConditionResult;
      });
  }));
}

export function getCurrentPageResult(conds: DYCondItem[]): ConditionResult[] {
  return conds.map((cond) => {
    const url = cond.includeUrlParams
      ? win.location.href
      : win.location.origin + win.location.pathname;

    const matchType = cond.selectMethod;
    const requiredValue = cond.selectParameter;
    const actualValue = url;
    const inProgress = false;

    let result = undefined;
    let message = <></>;

    switch (cond.selectMethod) {
      case 'contains':
        result = url.includes(cond.selectParameter);
        message = result ? <>
          <span>Page URL contains</span>
          <code>{cond.selectParameter}</code>
        </> : <>
          <span>Page URL does not contain</span>
          <code>{cond.selectParameter}</code>
        </>
        break;
      case 'not_contains':
        result = !url.includes(cond.selectParameter);
        message = result ? <>
          <span>Page URL does not contain</span>
          <code>{cond.selectParameter}</code>
        </> : <>
          <span>Page URL contains</span>
          <code>{cond.selectParameter}</code>
        </>;

        break;
      case 'equals':
        result = url === cond.selectParameter;
        message = result ? <>
          <span>Page URL equals</span>
          <code>{cond.selectParameter}</code>
        </> : <>
          <span>Page URL does not equal</span>
          <code>{cond.selectParameter}</code>
        </>;
        break;
      case 'startsWith':
        result = url.startsWith(cond.selectParameter);
        message = result ? <>
          <span>Page URL starts with</span>
          <code>{cond.selectParameter}</code>
        </> : <>
          <span>Page URL does not start with</span>
          <code>{cond.selectParameter}</code>
        </>
        break;
      case 'endsWith':
        result = url.endsWith(cond.selectParameter);
        message = result ? <>
          <span>Page URL ends with</span>
          <code>{cond.selectParameter}</code>
        </> : <>
          <span>Page URL does not end with</span>
          <code>{cond.selectParameter}</code>
        </>
        break;
    }

    return {
      matchType,
      requiredValue,
      actualValue,
      result,
      inProgress,
      message
    };
  });
}

export async function getDateResult(conds: DYCondItem[]): Promise<ConditionResult[]> {
  return Promise.all(conds.map(async (cond) => {
    const now = new Date();

    const target = new Date(Number(cond.selectParameter));

    const matchType = cond.selectMethod;
    const requiredValue = cond.selectParameter;
    const actualValue = now.getTime().toString();
    const inProgress = false;
    let result = undefined;
    let message : JSX.Element = <></>;

    switch (cond.selectMethod) {
      case 'before':
        result = now < target;
        message = result ? <>
          <span>Current date is before</span>
          <code>{target.toDateString()}</code>
        </> : <>
          <span>Current date is not before</span>
          <code>{target.toDateString()}</code>
        </>;
        break;
      case 'after':
        result = now > target;
        message = result ? <>
          <span>Current date is after</span>
          <code>{target.toDateString()}</code>
        </> : <>
          <span>Current date is not after</span>
          <code>{target.toDateString()}</code>
        </>;
        break;
      case 'contains':
        result = now.getTime().toString().includes(target.getTime().toString());
        message = result ? <>
          <span>Current date contains</span>
          <code>{target.toDateString()}</code>
        </> : <>
          <span>Current date does not contain</span>
          <code>{target.toDateString()}</code>
        </>;
        break;
    }

    return {
      matchType,
      requiredValue,
      actualValue,
      result,
      inProgress,
      message,
    };
  }));
}

export async function getPreviewResult(conds: DYCondItem[]): Promise<ConditionResult[]> {
  return conds.map(() => ({ result: true, inProgress: false, message: <></> }));
}

export async function getEventResult(conds: DYCondItem[]): Promise<ConditionResult[]> {
  return conds.map(() => ({ result: true, inProgress: false, message: <></> }));
}

export async function getPageEventResult(conds: DYCondItem[]): Promise<ConditionResult[]> {
  return Promise.all(conds.map(async (cond) => {
    const matchType = cond.selectMethod;
    const requiredValue = cond.selectParameter;
    const inProgress = false;
    let result = undefined;
    let message : JSX.Element = <></>;

    switch (cond.selectMethod) {
      case 'WaitForElement':
        const elements = document.querySelectorAll(cond.selectParameter);
        result = elements.length > 0;
        message = <span>
          {result ? 'has loaded' : 'has not loaded'}
        </span>;
        break;
      case 'ClickOnElement':
        result = (win.DY_CLICKED_ELEMENTS as string[]).includes(cond.selectParameter);
        message = <span>
          {result ? 'has been clicked' : 'has not been clicked'}
        </span>;
        break;
    }

    return {
      matchType,
      requiredValue,
      result,
      inProgress,
      message: <>
        <span>Element</span>
        <code>{cond.selectParameter}</code>
        {message}
      </>
    };
  }));
}

export async function getCookieParamResult(conds: DYCondItem[]): Promise<ConditionResult[]> {
  return conds.map((cond) => {
    const cookies = getBrowserCookies();
    const cookie = cookies.find(c => c.cookie === cond.selectParameter);
    const match = !!cookie && cookie.value === cond.selectParameter2;
    const inProgress = false;

    const message = (() => {
      if (!cookie) return <>
        <span>does not exist</span>
      </>;

      if (match) return <>
        <span>has value</span>
        <code>{cond.selectParameter2}</code>
      </>;

      return <>
        <span>has value</span>
        <code>{cookie.value}</code>
        <span>instead of</span>
        <code>{cond.selectParameter2}</code>
      </>;
    })();

    return {
      matchType: cond.selectMethod,
      requiredValue: cond.selectParameter2,
      actualValue: cookie?.value,
      result: match,
      inProgress,
      message: <>
        <span>Cookie</span>
        <code>{cond.selectParameter}</code>
        {message}
      </>,
    };
  });
}

async function getConditionResults(condition: DYConditionGroup, override: boolean): Promise<ConditionResult[]> {
  switch (condition.condType) {
    case '_CurrentPage':
      return getCurrentPageResult(condition.conds);
    case '_Event':
      return await getEventResult(condition.conds);
    case '_PageEvent':
      return await getPageEventResult(condition.conds);
    case '_Evaluator':
      return await getEvaluatorResult(condition.conds, override);
    case '_Date':
      return await getDateResult(condition.conds);
    case '_CookieParam':
      return await getCookieParamResult(condition.conds);
    default:
      return [];
  }
}

export async function conditionController(condition: DYConditionGroup, override: boolean = false): Promise<ConditionGroupResult> {  
  const conditions = await getConditionResults(condition, override);

  return { 
    id: condition.id,
    type: ConditionType[condition.condType] ?? condition.condType,
    conditions,
    inProgress: conditions.some((condition) => condition.inProgress),
    result: conditions.some((condition) => condition.result),
  };
}
