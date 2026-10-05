import { getCampaignState } from './State';
import type { Campaign, CampaignData, ConditionData } from '../types';

const win: any = (window as any).unsafeWindow ?? window;

export function getCampaignData(): CampaignData {
  const qaCampaigns: DYCampaignTag[] = [];
  const dyCampaigns: Campaign[] = [];
  const dyConditions: ConditionData[] = [];
  const dyClickEventElements: string[] = [];

  const ids = Object.keys(win.DYO.otags);
  const campaigns = Object.values(win.DYO.otags);
  const ruleSets = campaigns.map((x: any) => x.rules.filter((y: any) => y.ruleDisjs));

  for (const [index, rule] of ruleSets.entries()) {
    const experiences = rule.map((x: any) => Object.values(x.ruleDisjs!));
    for (const conditions of experiences) {
      if (conditions.some((j: any) => j.condType === '_CookieParam') && !qaCampaigns.includes(campaigns[index] as any)) {
        qaCampaigns.push(campaigns[index] as DYCampaignTag);

        const campaign = campaigns[index] as DYCampaignTag;
        const qaObject: Campaign = {
          id: ids[index],
          name: campaign.displayName,
          experiences: [],
          active: false,
        };

        for (const exp of campaign.rules) {
          const cookieRules = Object.values(exp.ruleDisjs ?? {}).filter((x) => x.condType === '_CookieParam');
          if (!cookieRules[0] || cookieRules[0].conds[0].selectMethod !== 'equals') continue;

          const cookieParam = cookieRules[0].conds[0].selectParameter;

          qaObject.experiences.push({
            id: exp.smartObject.id,
            name: decodeURIComponent(exp.smartObject.name),
            cookie: cookieParam,
            active: getCampaignState(cookieParam),
            conditions: []
          });

          const pageEventConditions = conditions.filter((cond: DYConditionGroup) => cond.condType === '_PageEvent');
          const clickOnElementSelectors = pageEventConditions.flatMap((cond: DYConditionGroup) =>
            cond.conds.filter((item) => item.selectMethod === 'ClickOnElement').map((item) => item.selectParameter)
          );
          
          dyClickEventElements.push(...clickOnElementSelectors);

          dyConditions.push({
            campaignId: ids[index],
            experienceId: exp.smartObject.id,
            name: decodeURIComponent(exp.smartObject.name),
            conditions,
          });
        }

        qaObject.active = qaObject.experiences.some((x) => x.active);
        qaObject.experiences.sort((a, b) => Number(a.id) - Number(b.id));
        if (qaObject.experiences.length > 0) dyCampaigns.push(qaObject);
      }
    }
  }

  dyCampaigns.sort((a, b) => a.name.localeCompare(b.name));

  return { dyCampaigns, dyConditions, dyClickEventElements };
}
