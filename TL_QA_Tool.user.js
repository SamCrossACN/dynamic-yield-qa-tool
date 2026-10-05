// ==UserScript==
// @name         Myer QA Tool
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Myer DY QA Tool
// @author       Sam Cross scross@thelumery.com
// @match        *.myer.com.au/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dynamicyield.com
// @grant        none
// ==/UserScript==
"use strict";
(() => {
  // src/conditions.ts
  function conditionEval(conditionalValues) {
    let object = window;
    for (let i = 0; i < conditionalValues.length; i += 1) {
      const conditionalValue = conditionalValues[i];
      if (Object.prototype.hasOwnProperty.call(object, conditionalValue) && object[conditionalValue] !== void 0) {
        object = object[conditionalValue];
        continue;
      }
      return false;
    }
    return true;
  }
  function getUtil(conditionalValues, error) {
    return new Promise((resolve, reject) => {
      if (conditionEval(conditionalValues)) return resolve(true);
      let intervalCount = 0;
      const toolInterval = setInterval(() => {
        if (conditionEval(conditionalValues)) {
          clearInterval(toolInterval);
          resolve(true);
        }
        intervalCount += 1;
        if (intervalCount >= 50) {
          clearInterval(toolInterval);
          reject(new TypeError(error));
        }
      }, 100);
      return void 0;
    });
  }
  function waitForElement(selector) {
    return new Promise((resolve, reject) => {
      DYO.waitForElementAsync(selector, 1, 50, 100).then((elements) => {
        resolve(elements);
      }, () => {
        reject(new Error(`Element "${selector}" not loaded`));
      });
    });
  }
  async function getEvaluatorResult(conds) {
    function extractDYEvaluator(str) {
      const start = str.indexOf("DY Evaluator - ");
      if (start === -1) return null;
      const end = str.indexOf("\n", start);
      if (end === -1) return null;
      return str.slice(start, end).replace("\r", "");
    }
    return Promise.all(conds.map(async (cond) => {
      return DYO.Q(DYO.CoreUtils.safeEval(DYO.oevals[cond.parameter].code)).then((res) => {
        const value = String(res);
        let result = false;
        let matchType = "";
        switch (cond.selectMethod) {
          case "equals":
            result = value === cond.selectParameter;
            matchType = "equals";
            break;
          case "not_equals":
            result = value !== cond.selectParameter;
            matchType = "doesn't equal";
            break;
          case "ge":
            result = parseFloat(value) >= parseFloat(cond.selectParameter);
            matchType = "is at least";
            break;
          case "gt":
            result = parseFloat(value) > parseFloat(cond.selectParameter);
            matchType = "is greater than";
            break;
          case "Le":
            result = parseFloat(value) <= parseFloat(cond.selectParameter);
            matchType = "is at most";
            break;
          case "Lt":
            result = parseFloat(value) < parseFloat(cond.selectParameter);
            matchType = "is less than";
            break;
        }
        return {
          name: extractDYEvaluator(cond.jsCode ?? "") ?? cond.parameter,
          matchType,
          requiredValue: cond.selectParameter,
          actualValue: value,
          result
        };
      });
    }));
  }
  function getCurrentPageResult(conds) {
    return conds.map((cond) => {
      const url = cond.includeUrlParams ? window.location.href : window.location.origin + window.location.pathname;
      let result = false;
      switch (cond.selectMethod) {
        case "contains":
          result = url.includes(cond.selectParameter);
          break;
        case "equals":
          result = url === cond.selectParameter;
          break;
        case "startsWith":
          result = url.startsWith(cond.selectParameter);
          break;
        case "endsWith":
          result = url.endsWith(cond.selectParameter);
          break;
      }
      return { matchType: cond.selectMethod, requiredValue: cond.selectParameter, actualValue: url, result };
    });
  }
  async function getDateResult(conds) {
    return Promise.all(conds.map(async (cond) => {
      const now = /* @__PURE__ */ new Date();
      const target = new Date(cond.selectParameter);
      let result = false;
      switch (cond.selectMethod) {
        case "before":
          result = now < target;
          break;
        case "after":
          result = now > target;
          break;
        case "contains":
          result = now.getTime().toString().includes(target.getTime().toString());
          break;
      }
      return {
        matchType: cond.selectMethod,
        requiredValue: cond.selectParameter,
        actualValue: now.getTime().toString(),
        result
      };
    }));
  }
  async function getPreviewResult(conds) {
    return conds.map(() => ({ result: true }));
  }
  async function getEventResult(conds) {
    return conds.map(() => ({ result: true }));
  }
  async function getPageEventResult(conds) {
    return Promise.all(conds.map(async (cond) => {
      let result = false;
      switch (cond.selectMethod) {
        case "WaitForElement":
          await waitForElement(cond.selectParameter).then((elements) => {
            result = elements.length > 0;
          }).catch(() => {
            result = false;
          });
          break;
        case "ClickOnElement":
          await waitForElement(cond.selectParameter).then((elements) => {
            elements.forEach((el) => {
              el.addEventListener("click", () => {
              });
            });
          }).catch(() => {
            result = false;
          });
          break;
      }
      return { matchType: cond.selectMethod, requiredValue: cond.selectParameter, result };
    }));
  }
  async function conditionController(condition) {
    let results = { result: false, type: "", conditions: [] };
    switch (condition.condType) {
      case "_CurrentPage":
        results = { type: "Current Page", conditions: getCurrentPageResult(condition.conds), result: false };
        break;
      case "_Event":
        results = { type: "Event", conditions: await getEventResult(condition.conds), result: false };
        break;
      case "_PageEvent":
        results = { type: "Page Event", conditions: await getPageEventResult(condition.conds), result: false };
        break;
      case "_Evaluator":
        results = { type: "Evaluator", conditions: await getEvaluatorResult(condition.conds), result: false };
        break;
      case "_Date":
        results = { type: "Date", conditions: await getDateResult(condition.conds), result: false };
        break;
      case "_Preview":
        results = { type: "Preview", conditions: await getPreviewResult(condition.conds), result: false };
        break;
    }
    return {
      ...results,
      result: results.conditions.any((x) => x.result === true)
    };
  }

  // src/styles.scss
  var styles_default = `.TL-QA-Tool {
  width: 80px;
  height: 80px;
  position: fixed;
  left: 20px;
  bottom: 100px;
  z-index: 10000;
  border: none;
  background-color: #eae6e4;
  padding: 10px;
  touch-action: none;
  border-radius: 100px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  cursor: pointer;
  transform: rotate(315deg);
  transition: border-radius 0.5s ease-in-out;
}
.TL-QA-Tool.active {
  border-radius: 100px 25px 100px 100px;
}
.TL-QA-Tool svg {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transform: rotate(45deg);
}

div.TL-QA-Container {
  position: fixed;
  left: 20px;
  bottom: 215px;
  z-index: 10000;
  border: none;
  border-radius: 10px;
  background-color: #eae6e4;
  min-width: 250px;
  touch-action: none;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}
div.TL-QA-Container.active {
  max-height: calc(100vh - 255px);
  height: 100%;
  transition-delay: 0.5s !important;
}

.TL-QA-Title {
  font-family: Poppins Bold;
  font-size: 16px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.TL-QA-Header {
  padding: 10px 10px 0 10px;
  height: 45px;
}

.TL-QA-Body-Container {
  transition: max-height 0.5s ease-in-out;
  max-height: calc(100% - 175px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px 10px;
}
.TL-QA-Body-Container.hidden {
  max-height: 0;
}
.TL-QA-Body-Container.hidden ul.campaign-list {
  overflow: hidden;
}

.TL-QA-Button-Container {
  width: 100%;
  padding: 0 10px 10px;
}

button.TL-QA-Save,
button.TL-QA-Copy {
  width: 100%;
  height: 50px;
  min-height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #eae6e4;
  font-family: Poppins Regular;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 5px;
  margin-top: 10px;
  transition: box-shadow 0.5s;
}
button.TL-QA-Save:hover,
button.TL-QA-Copy:hover {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
}

button.TL-QA-Save {
  background-color: #49A4A8;
  color: #fff;
}

button.TL-QA-Copy {
  background-color: #7358FA;
  color: #fff;
}

ul.campaign-list {
  list-style: none;
  padding: 0;
  max-height: 950px;
  overflow: overlay;
  scrollbar-gutter: stable both-edges;
}
ul.campaign-list::-webkit-scrollbar {
  display: block;
  width: 8px;
  position: absolute;
  right: 0;
}
ul.campaign-list::-webkit-scrollbar-button {
  display: none;
}
ul.campaign-list::-webkit-scrollbar-track, ul.campaign-list::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
}
ul.campaign-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2509803922);
  border: 1px solid rgba(255, 255, 255, 0.2509803922);
  border-radius: 24px;
}

li.campaign-header {
  font-weight: bold;
  font-size: 10px;
  border-bottom: 1px solid #000;
}

li.campaign-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6px 0 24px;
  gap: 5px;
  align-items: flex-start;
}
li.campaign-item:not(:last-of-type) {
  border-bottom: 1px solid black;
}
li.campaign-item .campaign-name {
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}
li.campaign-item .campaign-name .campaign-conditions {
  width: 24px;
  height: 24px;
  display: block;
  position: relative;
  cursor: pointer;
}
li.campaign-item .campaign-name .campaign-conditions svg {
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  display: block;
}
li.campaign-item .button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 8px 25px;
}
li.campaign-item .button-container .experience-button {
  background-color: #fff;
  color: #333333;
  border: none;
  font-size: 16px;
  padding: 5px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in;
}
li.campaign-item .button-container .experience-button:hover {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
}
li.campaign-item .button-container .experience-button.active {
  background-color: #F26859;
  color: #fff;
}
li.campaign-item .campaign-conditions-container {
  display: flex;
  flex-direction: column;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-header {
  font-weight: bolder;
  font-size: 14px;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container {
  display: none;
  flex-direction: column;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container.active {
  display: block;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-header .experience-state {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-header .experience-state svg {
  width: 24px;
  height: 24px;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-header .experience-state .experience-condition-list-container {
  position: absolute;
  width: 1000px;
  background-color: red;
  top: 0;
  left: 0;
  display: none;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-header .experience-state:hover .experience-condition-list-container {
  display: block;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-list .experience-condition-list-item {
  border-bottom: 1px solid #b5b5b5;
  padding: 6px 0;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-list .experience-condition-list-item code {
  font-family: monospace;
  font-size: 12px;
  padding: 2px;
  background-color: #cacaca;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-list .experience-condition-list-item .condition-expected-value,
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-list .experience-condition-list-item .condition-actual-value {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-list .experience-condition-list-item .condition-result {
  width: 24px;
  height: 24px;
  display: block;
}
li.campaign-item .campaign-conditions-container .campaign-conditions-list-container .experience-conditions .experience-condition-list .experience-condition-list-item .condition-result svg {
  width: 24px;
  height: 24px;
}

.TL-QA-Condition-Container {
  position: fixed;
  top: 0;
  display: none;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 99999;
  background-color: rgba(100, 100, 100, 0.5);
}
.TL-QA-Condition-Container.active {
  display: flex;
}
.TL-QA-Condition-Container .TL-QA-Condition-Modal {
  max-width: 800px;
  max-height: 400px;
  margin: auto;
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.TL-QA-Condition-Container .TL-QA-Condition-Modal .TL-QA-Condition-Modal-Title {
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}

@media screen and (max-width: 425px) {
  div.TL-QA-Container {
    width: calc(100% - 40px);
  }
  li.campaign-item span.campaign-name {
    font-size: 14px;
  }
  li.campaign-item .button-container {
    gap: 8px;
  }
  li.campaign-item .button-container .experience-button {
    font-size: 12px;
    padding: 4px 10px;
  }
}`;

  // src/icons.ts
  var successIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; strokeLinecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <circle cx="45" cy="45" r="45" style="stroke: none; stroke-width: 1; stroke-dasharray: none; strokeLinecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(40,201,55); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
      <path d="M 38.478 64.5 c -0.01 0 -0.02 0 -0.029 0 c -1.3 -0.009 -2.533 -0.579 -3.381 -1.563 L 21.59 47.284 c -1.622 -1.883 -1.41 -4.725 0.474 -6.347 c 1.884 -1.621 4.725 -1.409 6.347 0.474 l 10.112 11.744 L 61.629 27.02 c 1.645 -1.862 4.489 -2.037 6.352 -0.391 c 1.862 1.646 2.037 4.49 0.391 6.352 l -26.521 30 C 40.995 63.947 39.767 64.5 38.478 64.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; strokeLinecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
    </g>
  </svg>
`;
  var failIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; strokeLinecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; strokeLinecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
      <path d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; strokeLinecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
      <path d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; strokeLinecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
    </g>
  </svg>
`;

  // src/campaigns.ts
  function getCampaignState(cookie) {
    return document.cookie.split("; ").includes(`${cookie}=true`);
  }
  function setCookie(name, value, exdays) {
    const d = /* @__PURE__ */ new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; secure; path=/;`;
  }
  function deleteCookie(cookie) {
    document.cookie = `${cookie}=true; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; path=/;`;
  }
  function clearCampaigns() {
    const allCookies = Array.from(document.querySelectorAll("[data-cookie]")).map((x) => x.getAttribute("data-cookie"));
    allCookies.forEach((cookie) => deleteCookie(cookie));
  }
  function copyCampaigns() {
    const activeCookies = Array.from(document.querySelectorAll("[data-cookie].active")).map((x) => x.getAttribute("data-cookie"));
    const d = /* @__PURE__ */ new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1e3);
    const expires = `expires=${d.toUTCString()}`;
    let campaignString = "";
    activeCookies.forEach((cookie) => {
      campaignString += `document.cookie="${cookie}=true; ${expires}; secure; path=/;";
`;
    });
    navigator.clipboard.writeText(`${campaignString}
window.location.reload();`);
  }
  function saveCampaigns() {
    clearCampaigns();
    const activeCookies = Array.from(document.querySelectorAll("[data-cookie].active")).map((x) => x.getAttribute("data-cookie"));
    copyCampaigns();
    activeCookies.forEach((cookie) => setCookie(cookie, "true", 1));
    window.location.reload();
  }
  function getCampaignData() {
    const qaCampaigns = [];
    const dyCampaigns = [];
    const dyConditions = [];
    const ids = Object.keys(window.DYO.otags);
    const campaigns = Object.values(window.DYO.otags);
    const ruleSets = campaigns.map((x) => x.rules.filter((y) => y.ruleDisjs));
    for (const [index, rule] of ruleSets.entries()) {
      const experiences = rule.map((x) => Object.values(x.ruleDisjs));
      for (const conditions of experiences) {
        if (conditions.some((j) => j.condType === "_CookieParam") && !qaCampaigns.includes(campaigns[index])) {
          qaCampaigns.push(campaigns[index]);
          const campaign = campaigns[index];
          const qaObject = {
            id: ids[index],
            name: campaign.displayName,
            experiences: [],
            active: false
          };
          for (const exp of campaign.rules) {
            const cookieRules = Object.values(exp.ruleDisjs ?? {}).filter((x) => x.condType === "_CookieParam");
            if (!cookieRules[0] || cookieRules[0].conds[0].selectMethod !== "equals") continue;
            const cookieParam = cookieRules[0].conds[0].selectParameter;
            qaObject.experiences.push({
              id: exp.smartObject.id,
              name: decodeURIComponent(exp.smartObject.name),
              cookie: cookieParam,
              active: getCampaignState(cookieParam)
            });
            dyConditions.push({
              campaignId: ids[index],
              experienceId: exp.smartObject.id,
              name: decodeURIComponent(exp.smartObject.name),
              conditions
            });
          }
          qaObject.active = qaObject.experiences.some((x) => x.active);
          qaObject.experiences.sort((a, b) => a.name.localeCompare(b.name));
          if (qaObject.experiences.length > 0) dyCampaigns.push(qaObject);
        }
      }
    }
    dyCampaigns.sort((a, b) => a.name.localeCompare(b.name));
    return { dyCampaigns, dyConditions };
  }

  // src/ui.ts
  function injectCSS() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles_default;
    document.head.appendChild(styleSheet);
  }
  function createExperienceModal() {
    const modal = document.createElement("div");
    modal.classList.add("TL-QA-Condition-Container");
    modal.innerHTML = `
    <div class="TL-QA-Condition-Modal">
      <span class="TL-QA-Condition-Modal-Title">Experience Condition Modal</span>
      <div class="TL-QA-Condition-Modal-Body">Experience Condition Modal</div>
    </div>
  `;
    document.body.prepend(modal);
    return modal;
  }
  function createQAContainer() {
    const state = sessionStorage.getItem("TL-QA-Tool-State");
    const bodyClass = state === "hidden" ? "TL-QA-Body-Container hidden" : "TL-QA-Body-Container";
    const container = document.createElement("div");
    container.classList.add("TL-QA-Container");
    container.innerHTML = `
    <div class="TL-QA-Header">
      <span class="TL-QA-Title">The Lumery QA Tool</span>
    </div>
    <div class="${bodyClass}"></div>`;
    return container;
  }
  function toggleActiveState(buttonContainer, experienceButton) {
    buttonContainer.querySelectorAll(".experience-button").forEach((btn) => btn.classList.remove("active"));
    experienceButton.classList.add("active");
  }
  function setButtonStateFromCookie(buttonContainer, experienceButton) {
    if (document.cookie.split("; ").includes(`${experienceButton.dataset.cookie}=true`)) {
      toggleActiveState(buttonContainer, experienceButton);
    }
  }
  function bindExperienceButtons(buttonContainer) {
    buttonContainer.querySelectorAll(".experience-button").forEach((btn) => {
      btn.onclick = () => toggleActiveState(buttonContainer, btn);
    });
  }
  async function injectConditions(conditionData, conditionBody) {
    const data = await Promise.all(conditionData.map(async (experience) => {
      const conditions = await Promise.all(experience.conditions.map((c) => conditionController(c)));
      return { name: experience.name, conditions, active: conditions.every((x) => x.result) };
    }));
    data.forEach((experience) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("experience-conditions");
      wrapper.innerHTML = `
      <div class="experience-condition-header">
        ${experience.name}
        <div class="experience-state">
          ${experience.active ? successIcon : failIcon}
          <div class="experience-condition-list-container"></div>
        </div>
      </div>
    `;
      const listContainer = wrapper.querySelector(".experience-condition-list-container");
      experience.conditions.forEach((condition) => {
        const list = document.createElement("ul");
        list.classList.add("experience-condition-list");
        condition.conditions.forEach((cond) => {
          const item = document.createElement("li");
          item.classList.add("experience-condition-list-item");
          item.innerHTML = `
          <div class="condition-expected-value ${cond.result ? "success" : "fail"}">
            <span class="condition-result">${cond.result ? successIcon : failIcon}</span>
            <span class="condition-type">${condition.type}</span>
            ${cond.name ? `<span class="condition-object"><code>${cond.name}</code></span>` : ""}
            <span class="condition-match-type">${cond.matchType}</span>
            <span class="condition-required-value"><code>${cond.requiredValue}</code></span>
          </div>
        `;
          if (!cond.result) {
            item.innerHTML += `
            <div class="condition-actual-value">
              <span class="condition-result"></span>
              <span class="condition-type">${condition.type}</span>
              ${cond.name ? `<span class="condition-object"><code>${cond.name}</code></span>` : ""}
              <span class="condition-match-type">is</span>
              <span class="condition-required-value"><code>${cond.actualValue}</code></span>
            </div>
          `;
          }
          list.appendChild(item);
        });
        listContainer.appendChild(list);
      });
      conditionBody.appendChild(wrapper);
    });
  }
  function injectQAButton() {
    return new Promise((resolve) => {
      const QAContainer = createQAContainer();
      const QAConditionModal = createExperienceModal();
      const bodyContainer = QAContainer.querySelector(".TL-QA-Body-Container");
      const conditionBody = QAConditionModal.querySelector(".TL-QA-Condition-Modal-Body");
      const { dyCampaigns, dyConditions } = getCampaignData();
      if (dyCampaigns.length > 0) {
        const campaignList = document.createElement("ul");
        campaignList.classList.add("campaign-list");
        const campaignHeader = document.createElement("li");
        campaignHeader.classList.add("campaign-header");
        campaignHeader.textContent = "Active Campaigns";
        campaignList.appendChild(campaignHeader);
        dyCampaigns.forEach((campaign) => {
          const campaignItem = document.createElement("li");
          campaignItem.classList.add("campaign-item");
          campaignItem.dataset.campaign = campaign.name;
          campaignItem.dataset.id = campaign.id;
          campaignItem.innerHTML = `
          <span class="campaign-name">${campaign.name}</span>
          <div class="button-container"></div>
          <div class="campaign-conditions-container">
            <div class="campaign-conditions-header">Campaign Conditions</div>
            <div class="campaign-conditions-list-container"></div>
          </div>
        `;
          campaignItem.querySelector(".campaign-conditions-header").addEventListener("click", async () => {
            QAConditionModal.classList.toggle("active");
            conditionBody.innerHTML = "";
            await injectConditions(dyConditions.filter((c) => c.campaignId === campaign.id), conditionBody);
          });
          const buttonContainer = campaignItem.querySelector(".button-container");
          if (!campaign.experiences.some((x) => x.name.includes("Experience 0"))) {
            buttonContainer.insertAdjacentHTML("afterbegin", '<button class="experience-button active">Control</button>');
          }
          campaign.experiences.forEach((experience) => {
            const btn = document.createElement("button");
            btn.classList.add("experience-button");
            btn.dataset.cookie = experience.cookie;
            let name = experience.name.includes(" | ") ? experience.name.split(" | ")[1] : experience.name;
            if (name === "Experience 0") {
              btn.classList.add("active");
              name = "Control";
            }
            btn.textContent = name;
            setButtonStateFromCookie(buttonContainer, btn);
            buttonContainer.appendChild(btn);
          });
          bindExperienceButtons(buttonContainer);
          campaignList.appendChild(campaignItem);
        });
        bodyContainer.appendChild(campaignList);
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("TL-QA-Button-Container");
        const saveBtn = document.createElement("button");
        saveBtn.classList.add("TL-QA-Save");
        saveBtn.textContent = "Save QA Experience";
        saveBtn.onclick = () => saveCampaigns();
        btnContainer.appendChild(saveBtn);
        const copyBtn = document.createElement("button");
        copyBtn.classList.add("TL-QA-Copy");
        copyBtn.textContent = "Copy QA Experience";
        copyBtn.onclick = () => copyCampaigns();
        btnContainer.appendChild(copyBtn);
        QAContainer.appendChild(btnContainer);
      }
      document.body.prepend(QAContainer);
      document.body.prepend(QAConditionModal);
      resolve(QAContainer);
    });
  }
  function injectIcon(QAContainer) {
    const iconButton = document.createElement("button");
    iconButton.classList.add("TL-QA-Tool");
    iconButton.innerHTML = `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 165.45332 123.58667" height="123.58667" width="165.45332" xml:space="preserve" id="svg2" version="1.1">
      <metadata id="metadata8">
        <rdf:RDF>
          <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <defs id="defs6" />
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,123.58667)" id="g10">
        <g transform="scale(0.1)" id="g12">
          <path id="path14" style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 415.172,308.977 H 365.09 c -26.629,34.816 -56.113,79.199 -56.113,154.503 0,75.262 29.484,119.676 56.113,154.473 h 50.082 c -33.383,-44.738 -60.027,-86.64 -60.027,-154.473 0,-67.5 26.644,-109.394 60.027,-154.503" />
          <path id="path16" style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none" d="m 825.703,617.953 h 50.434 c 26.281,-34.797 55.75,-79.211 55.75,-154.473 0,-75.304 -29.469,-119.687 -55.75,-154.503 h -50.434 c 33.387,45.109 59.668,87.003 60.016,154.503 -0.348,67.833 -26.629,109.735 -60.016,154.473" />
          <path id="path18" style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 431.09,572.484 H 617.172 V 532.707 H 546.855 V 354.438 H 501.043 V 532.707 H 431.09 v 39.777" />
          <path id="path20" style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 647.117,572.484 H 692.57 V 394.574 H 794.141 V 354.438 H 647.117 v 218.046" />
        </g>
      </g>
    </svg>`;
    iconButton.addEventListener("click", () => {
      iconButton.classList.toggle("active");
      QAContainer.classList.toggle("active");
    });
    document.body.prepend(iconButton);
  }

  // src/index.ts
  getUtil(["DYO", "otags"], "DY Utils not available").then(() => {
    if (!document.querySelector(".TL-QA-Container")) {
      injectQAButton().then((QAContainer) => {
        injectCSS();
        injectIcon(QAContainer);
        createExperienceModal();
      });
    }
  });
})();
