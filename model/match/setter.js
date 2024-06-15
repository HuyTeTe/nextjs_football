import {getStarData, getUserTokenByCookie} from "./getter";
import { APISaveStarMatch } from "../site-url";
import Cookies from "universal-cookie";

function setAttributeTr(trElem, starStatus, imgAttr)
{
  trElem.setAttribute("star", starStatus);
  trElem.querySelector('img').setAttribute("src", imgAttr);
}

async function setStarMatchToCookie(matchId, cookies)
{
  let starData = getStarData(cookies);
  if (starData.includes(matchId)) {
    return false;
  }
  starData.push(matchId);
  starData = Array.from(new Set(starData));
  setStarData(cookies, starData);
  // set to db
  await setStarMatchToDb(cookies);
  console.log("set cookies");
  console.log(starData);
  return starData;
}

function setStarData(cookies, starData)
{
  let date = new Date();
  let expDays = 2;
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  cookies.set("starData", starData, { path: '/', expires: date });
}

function setUserId(cookies, id)
{
  cookies.set("user_id", id, { path: '/' });
}

function setUserToken(token)
{
    const cookies = new Cookies();
    cookies.set("user_token", token, { path: '/' });
}

function setUserTrackingBotMatch(token)
{
    const cookies = new Cookies();
    cookies.set("user_token", token, { path: '/' });
}

// merge cookie data
async function setStarMatchToDb(cookies)
{
  const userId = cookies.get("user_id");
  const token = await getUserTokenByCookie();
  if (!userId || !token) {
    return;
  }
  let starData = getStarData(cookies);
  try {
    const dataPost = {user_id: userId, match_id: starData};
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(dataPost)
    };
    let response = await fetch(APISaveStarMatch(), requestOptions);
    let res = await response.json();
    return res;
  } catch (err) {
      console.log(err);
      return false;
  }
}

export {
    setAttributeTr,
    setStarMatchToCookie,
    setStarMatchToDb,
    setStarData,
    setUserId,
    setUserToken,
    setUserTrackingBotMatch
};