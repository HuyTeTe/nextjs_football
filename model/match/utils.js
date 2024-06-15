import {
    StyleTagOdd
  } from "../style";
import { getStarData } from "./getter";
import { prependStarMatch, appendMatch } from "./prepender";
import { processAfterUnstar, processStarCookieWhenUserLogin } from "./processor";
import { setAttributeTr, setStarMatchToCookie } from "./setter";
import { findReplaceMatchIdAfter } from "./finder";

async function StarMatchAtFirstLoad(cookies, user)
{
  await processStarCookieWhenUserLogin(user);
  let starData = getStarData(cookies);
  starData.forEach( (matchId) => {
    let mygame = document.querySelector(".mygame_" + matchId);
    if (mygame) {
      mygame.click();
    }
  })
}

function StarMatchOnclick(matchId, tableElem, jsonMatchPosition, cookies, user, sizeLiveMatch, location)
{
    let star = document.querySelector(".mygame_" + matchId);
    let table = document.querySelector(tableElem);
    let trElem = document.querySelector("[matchid='"+matchId+"'][class='tds align-middle']");
    let tmpPreviousTitle = trElem.previousSibling;

    star.onclick = async function(event) {
      if (trElem.getAttribute("star") !== "on") {
        let setToCookies = await setStarMatchToCookie(matchId, cookies);
        // check case open 2 page then set/unset
        if (!setToCookies && event.hasOwnProperty("isTrusted") && event.isTrusted) {
          ReloadPage(location, 10);
          return false;
        }
        prependStarMatch(table, tmpPreviousTitle, trElem);
        setAttributeTr(trElem, "on", "/images/star_on.png");
      } else {
          if (event.hasOwnProperty("isTrusted") && event.isTrusted) {
              await unStarMatch(table, matchId, trElem, tmpPreviousTitle, cookies, jsonMatchPosition, sizeLiveMatch, event);
          }
      }
    };
}

async function unStarMatch(table, matchId, trElem, tmpPreviousTitle, cookies, jsonMatchPosition, sizeLiveMatch, event)
{
  let starData = getStarData(cookies);
  if (!starData.includes(matchId) && event.hasOwnProperty("isTrusted") && event.isTrusted) {
    ReloadPage(location, 10);
    return false;
  }
  let attachElem = false;
  let matchIdAfter = findReplaceMatchIdAfter(matchId, jsonMatchPosition, sizeLiveMatch, starData);
  if (!matchIdAfter) {
    appendMatch(table, tmpPreviousTitle, trElem);
    await processAfterUnstar(trElem, tmpPreviousTitle, starData, matchId, cookies);
  }

  let trElemBefore = document.querySelector("[matchid='"+matchIdAfter+"'][class='Leaguestitle']");
  if (trElemBefore) {
    if (trElem?.nextSibling?.style?.display == "" && trElem?.nextSibling?.className.includes("adtext-bg")) {
      attachElem = trElem.nextSibling;
    }
    trElemBefore.parentNode.insertBefore(tmpPreviousTitle, trElemBefore);
    trElemBefore.parentNode.insertBefore(trElem, trElemBefore);
    // hiep phu checking
    if (attachElem) {
      trElemBefore.parentNode.insertBefore(attachElem, trElemBefore);
    }
    await processAfterUnstar(trElem, tmpPreviousTitle, starData, matchId, cookies);
  }
    console.log("unset cookies");
    console.log(starData);

  return;
}

function mergeStarMatchToCookie(matchId, jsonMatchPosition, cookies, user)
{
  
}

function CreateYellowCardElem(cardNumber)
{
    let node = document.createElement("span");
    node.classList.add("yellowcard");
    node.style.backgroundColor = "yellow";
    node.style.padding = "0px 2px";
    node.style.margin = "0px 2px";
    node.style.borderRadius = "0px 2px";
    node.textContent = cardNumber;
    return node;
}

function CreateRedCardElem(cardNumber)
{
    let node = document.createElement("span");
    node.classList.add("redcard");
    node.style.backgroundColor = "red";
    node.style.padding = "0px 2px";
    node.style.margin = "0px 2px";
    node.style.borderRadius = "0px 2px";
    node.textContent = cardNumber;
    return node;
}

function CreateOddTag(elem)
{
    if (elem.childNodes.length <= 1) {
        elem.removeChild(elem.firstChild);
        for (let i = 0; i < 2; i++) {
        let node = document.createElement("p");
        node = StyleTagOdd(node);
        elem.appendChild(node);
        }
    }
}

function ReloadPage(location, time)
{
    return setTimeout(() => {
        location.reload();
      }, time)
}

function HideToggleLeagueTitle(document)
{
    document.querySelectorAll('.tipsNum').forEach(function (elm) {
        elm.style.display = 'none';
    })
}

  export {
    StarMatchOnclick,
    CreateYellowCardElem,
    CreateRedCardElem,
    CreateOddTag,
    ReloadPage,
    HideToggleLeagueTitle,
    StarMatchAtFirstLoad
  };