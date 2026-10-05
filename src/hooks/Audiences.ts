import { Audience, Cond, Rule } from "../types";
import { createReport } from "./Rules";


const getDyBrowser = (parameter: string) => {
  const key = parseInt(parameter);

  switch (key) {
    case 12:
      return 'Chrome';
    case 18:
      return 'Firefox';
    case 34:
      return 'Safari'
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 39:
      return 'Internet Explorer'
  }
}

function capitaliseFirstLetter(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getProductEventMessage = (_audience: Audience, rule: Rule, condition: Cond) => {
  const eventTypes : {[key: string]: string} = {
    'ProductFeaturesViews': 'Products Viewed',
    'ProductFeaturesAddToCarts': 'Products Added To Cart',
    'ProductFeaturesPurchases': 'Products Purchased'
  }
  
  const data = JSON.parse(condition.selectParameter);
  if (data.conditions.length === 0) {
    return `${eventTypes[rule.condType]} <code>Any product</code>`;
  }

  const message =  `
    <ul>
      ${
        data.conditions.map((cond: any) => {
          const field = capitaliseFirstLetter(cond.field || '');
          const value = cond.values[0] || '';
          const body = cond.match ? `${getComparator(cond.hitCountMethod!)} <code>${cond.expectedCount}</code> time(s)` : `<code>is</code> <code>${cond.actualCount}</code> instead of ${getComparator(cond.hitCountMethod!)} <code>${cond.expectedCount}</code> time(s)`;
          return `<li>${eventTypes[rule.condType]} <code>Product with property</code> <code>${field}</code> <code>${value}</code> ${body}</li>`;
        }).join(`<li>${data.relation}</li>`)
      }
    </ul>`;

    return message;
}

const getComparator = (hitCountMethod: string, match: boolean = false) => {
  if (match) {
    if (hitCountMethod === '>=') {
      return 'is';
    } else {
      return 'is not';
    }
  }
  
  switch (hitCountMethod) {
    case "=":
      return 'exactly'
    case ">=":
      return 'at least';
    case "<=":
      return 'at most';
    case ">":
      return 'more than';
    case "<":
      return 'less than';
    default:
      return 'not'
  }
}

export const getMessage = (audience: Audience, rule: Rule, condition: Cond) => {
  const { parameter, selectMethod, selectParameter, selectParameter2, hitCountMethod, actualCount, expectedCount, match, eventName } = condition;
  switch (rule.condType) {
    case 'PageVisited':
      return match ? `URL visit <code>${selectMethod}</code> ${selectParameter} ${getComparator(hitCountMethod!)} <code>${expectedCount}</code>time(s)` : `URL visit <code>${selectMethod}</code> ${selectParameter} is <code>${actualCount}</code> instead of <code>${hitCountMethod}</code> <code>${expectedCount}</code>time(s)`;
    case 'TrafficSource':
      return match ? `Traffic source ${getComparator(hitCountMethod!, true)} <code>${selectParameter}</code>` : `Traffic source ${hitCountMethod === '>=' ? 'is not' : 'is'} <code>${selectParameter}</code>`;
    case 'DeviceType':
      const deviceParam = parseInt(condition.parameter!);
      const deviceType = deviceParam === 0 ? 'Smartphone' : deviceParam === 2 ? 'Tablet' : 'Desktop';
      return match ? `Device type is <code>${deviceType}</code>` : `Device type is not <code>${deviceType}</code>`;
    case 'Metadata':
      return match ? `` : ``;
    case 'SiteEvent':
      return match ? `Event trigger <code>${selectParameter}</code> ${getComparator(hitCountMethod!)} <code>${expectedCount}</code> time(s)` : `Event trigger <code>${selectParameter}</code> is <code>${actualCount}</code> instead of <code>${hitCountMethod}</code> <code>${expectedCount}</code> time(s)`;
    case 'Audience':
      const a = DY.audienceRules.find((a) => a.audience === parseInt(parameter as string))
      return match ? `Audience <code>${hitCountMethod === '>=' ? 'belongs to' : 'does not belong to'}</code> <code>${a!.name}</code>` : `Audience <code>${hitCountMethod === '>=' ? 'does not belong to' : 'belongs to'}</code> <code>${a!.name}</code>`;
    case 'Region':
      return match ? `Region/State <code>${getComparator(hitCountMethod!, true)}</code> <code>${selectParameter2}</code>` : `Region/State <code>${hitCountMethod === '>=' ? 'is not' : 'is'}</code> <code>${selectParameter2}</code>`;
    case 'TrackedValue':
      let key;
      switch (selectParameter) {
        case 'PURCHASE':
          key = 'Purchase value';
          break;
        default:
      }

      return match ? `${key} ${getComparator(hitCountMethod!)} <code>$${(expectedCount ?? 0) / 10}</code>` : `${key} <code>is</code> <code>${actualCount}</code> instead of <code>${hitCountMethod}</code> <code>$${(expectedCount ?? 0) / 10}</code>`;
    case 'Browser':
      return match ? `Browser <code>${getComparator(hitCountMethod!, true)}</code> <code>${getDyBrowser(parameter!)}</code>` : `Browser <code>${hitCountMethod === '>=' ? 'is not' : 'is'}</code> <code>${getDyBrowser(parameter!)}</code>`;
    case 'UserAgent':
      return match ? `User Agent <code>${selectMethod}</code> <code>${selectParameter}</code>` : `User Agent does not <code>${selectMethod}</code> <code>${selectParameter}</code>`;
    case 'PageViews':
      return match ? `Number of pageviews ${getComparator(hitCountMethod!)} <code>${expectedCount}</code>` : `Number of pageviews <code>is</code> <code>${actualCount}</code> instead of <code>${hitCountMethod}</code> <code>${expectedCount}</code>`;
    case 'EventProp':
      return match ? `Event trigger by property <code>${eventName}</code> <code>${selectParameter}</code> ${selectMethod === 'pair_equals' ? 'is' : 'is not'} <code>${selectParameter2}</code> ${getComparator(hitCountMethod!)} <code>${expectedCount}</code> time(s)` : `Event trigger by property <code>${eventName}</code> <code>${selectParameter}</code> ${selectMethod === 'pair_equals' ? 'is not' : 'is'} <code>${selectParameter2}</code> ${getComparator(hitCountMethod!)} <code>${expectedCount}</code> time(s)`;
    case 'IdentifiedUser':
      return `Identified user <code>${match ? 'True' : 'False'}</code>`
    case 'HomepageViews':
      return match ? `Homepage Visit <code>is</code> <code>${actualCount}</code> instead of <code>${hitCountMethod}</code> <code>${expectedCount}</code> time(s)` : `Homepage Visit <code>${hitCountMethod}</code> <code>${expectedCount}</code> time(s)`;
    case 'CategoryViews':
      return match ? `Category Page Visit <code>${selectParameter2 === 'any' ? 'any category' : 'of category'}</code> ${getComparator(hitCountMethod!)} <code>${expectedCount}</code> time(s)` : `Category Page Visit <code>${selectParameter2 === 'any' ? 'any category' : 'of category'}</code> <code>is</code> <code>${actualCount}</code> instead of ${getComparator(hitCountMethod!)} <code>${expectedCount}</code> time(s)`;
    case 'UrlParam':
      return match ? `` : ``;
    case 'ProductFeaturesViews':
    case 'ProductFeaturesPurchases':
    case 'ProductFeaturesAddToCarts':
      // if (audience.name === 'Coupon Overlay Test Audience') {
      //   const conditionData = JSON.parse(selectParameter);
      //   const data : ConditionData = [
      //     [
      //       [
      //         [
      //           'Product with property'
      //         ]
      //       ]
      //     ],
      //     [
      //       conditionData.conditions.map((condition: any) => {
      //         return [
      //           capitaliseFirstLetter(condition.field),
      //           capitaliseFirstLetter(condition.values[0]),
      //         ]
      //       })
      //     ],
      //     [
      //       [
      //         [
      //           getComparator(hitCountMethod!),
      //           expectedCount,
      //           'time(s)'
      //         ]
      //       ]
      //     ]
      //   ];
      // }

      return getProductEventMessage(audience, rule, condition);
    default:
  }
}

export const isInAudience = ( audience: Audience ) : Audience => {
  const audienceCookies = DYO.AudienceCookies;
  const chcData = audienceCookies.loadCHCCookies();
  const todayHitCounts = chcData.tchc;
  const cumulativeHitCounts = chcData.chc;
  const sessionHitCounts = audienceCookies.loadSessionCookies().schc;

  
  for ( let ruleGroupIndex = 0; ruleGroupIndex < audience.rule.length; ruleGroupIndex++ ) {
    const rule = audience.rule[ruleGroupIndex];
    rule.id = `${audience.audience}-${ruleGroupIndex}`;
    
    if (!!rule && !!rule.condType && !!rule.conds) {
      for ( let condIndex = 0; condIndex < rule.conds.length; condIndex++ ) {
        const condition = rule.conds[condIndex];
        let result : boolean = false;

        if ("_" === rule.condType[0]) {
          if (rule.conds[condIndex].id?.toString() === '3618470') {
          }
          continue;
        } else if ("Metadata" === rule.condType) {
          if (rule.conds[condIndex].id?.toString() === '3618470') {
          }
          continue;
        } else if ('TrackedHits' === rule.condType) {
          continue;
        } else if (!condition || !condition.id || !condition.hitCountMethod || condition.hitCount === undefined) {
          continue;
        } else {
          const hitCount = audience.session ? sessionHitCounts[condition.id] || 0 : ((parseInt(cumulativeHitCounts[condition.id]) || 0) + parseInt(todayHitCounts[condition.id] || 0));
          

          rule.conds[condIndex].actualCount = hitCount;
          rule.conds[condIndex].expectedCount = condition.hitCount;
          
          switch (condition.hitCountMethod) {
            case "=":
            result = hitCount == condition.hitCount;
            break;
            case ">=":
            result = hitCount >= condition.hitCount;
            break;
            case "<=":
            result = hitCount <= condition.hitCount;
            break;
            case ">":
            result = hitCount > condition.hitCount;
            break;
            case "<":
            result = hitCount < condition.hitCount;
            break;
            default:
            result = false;
          }

          rule.conds[condIndex].match = result;
        }
        
        rule.conds[condIndex].match = result;
      }
    }

    audience.rule[ruleGroupIndex].report = createReport(rule);
    audience.rule[ruleGroupIndex].match = rule.conds.some((cond) => cond.match);
  }
  
  audience.match = audience.rule.every((rule) => rule.match);
  audience.rule = audience.rule.filter((rule: Rule) => rule.condType !== 'TrackedHits');
  audience.rule = audience.rule.filter((rule: Rule) => rule.condType !== 'MetaData');
  
  return audience;
}

export const getAudiences = () : Audience[] => {
  if (!DY.audienceRules) return [];
  return (DY.audienceRules as unknown as Audience[])
    .filter((audience: Audience) => audience.name !== 'SMART_AUDIENCE_FOR_TAG')
    .map((audience: Audience) => isInAudience(audience));
}
