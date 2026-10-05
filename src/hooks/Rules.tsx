import React from 'react';
import { AudienceMessage, BrowserMessage, CategoryViewsMessage, DeviceTypeMessage, EventPropMessage, HomepageViewsMessage, IdentifiedUserMessage, MetadataMessage, PageViewsMessage, PageVisitedMessage, ProductFeaturesAddToCartMessage, ProductFeaturesPurchasesMessage, ProductFeaturesViewsMessage, RegionMessage, SiteEventMessage, TrackedValueMessage, TrafficSourceMessage, UrlParamMessage, UserAgentMessage } from "./Messages";
import { Cond, MessageProps, Rule } from "../types";

export const capitaliseFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getComparator = (hitCountMethod: string, match: boolean = false) => {
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

export const getOppositeComparator = (hitCountMethod: string, match: boolean = false) => {
  if (match) {
    if (hitCountMethod === '>=') {
      return 'is not';
    } else {
      return 'is';
    }
  }
  
  switch (hitCountMethod) {
    case "=":
    return 'not'
    case ">=":
    return 'less than';
    case "<=":
    return 'more than';
    case ">":
    return 'at most';
    case "<":
    return 'at least';
    default:
    return 'exactly'
  }
}

export const getDyBrowser = (parameter: string) => {
  const key = parseInt(parameter);
  
  switch (key) {
    case 12:
    return 'Chrome';
    case 18:
    return 'Firefox';
    case 34:
    return 'Safari';
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 39:
    return 'Internet Explorer';
    default:
    return '';
  }
}

export const createReport = (rule: Rule) => {
  let key = '';
  let message = (_messageProps: MessageProps) => <></>;
  switch (rule.condType) {
    case 'PageVisited':
      key = 'URL visit';
      message = PageVisitedMessage;;
      break;
    case 'TrafficSource':
      key = 'Traffic source';
      message = TrafficSourceMessage;;
      break;
    case 'DeviceType':
      key = 'Device Type';
      message = DeviceTypeMessage;;
      break;
    case 'Metadata':
      key = 'Metadata';
      message = MetadataMessage;;
      break;
    case 'SiteEvent':
      key = 'Event trigger';
      message = SiteEventMessage;;
      break;
    case 'Audience':
      key = 'Audience';
      message = AudienceMessage;;
      break;
    case 'Region':
      key = 'Region/State';
      message = RegionMessage;;
      break;
    case 'TrackedValue':
      key = 'Tracked Value';
      message = TrackedValueMessage;;
      break;
    case 'Browser':
      key = 'Browser';
      message = BrowserMessage;;
      break;
    case 'UserAgent':
      key = 'User Agent';
      message = UserAgentMessage;;
      break;
    case 'PageViews':
      key = 'Number of pageviews';
      message = PageViewsMessage;;
      break;
    case 'EventProp':
      key = 'Event trigger by property';
      message = EventPropMessage;;
      break;
    case 'IdentifiedUser':
      key = 'Identified User';
      message = IdentifiedUserMessage;;
      break;
    case 'HomepageViews':
      key = 'Homepage Visit';
      message = HomepageViewsMessage;;
      break;
    case 'CategoryViews':
      key = 'SM open and Category visit';
      message = CategoryViewsMessage;;
      break;
    case 'UrlParam':
      key = 'URL Parameter';
      message = UrlParamMessage;;
      break;
    case 'ProductFeaturesViews':
      key = 'Products Viewed';
      message = ProductFeaturesViewsMessage;;
      break;
    case 'ProductFeaturesPurchases':
      key = 'Products Purchases';
      message = ProductFeaturesPurchasesMessage;
      break;
    case 'ProductFeaturesAddToCarts':
      key = 'Products Added To Cart';
      message = ProductFeaturesAddToCartMessage;
      break;
  }

  return {
    key,
    match: rule.match!,
    conditions: rule.conds.map((cond: Cond) => ({
      id: cond.id!,
      match: cond.match!,
      message: message({ rule, condition: cond }),
      error: ''
    })),
  }
}