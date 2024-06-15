import { APIGetStarMatchOfUser, APIGetUserId, APIGetLiveScore, APIGetUpdateLiveScore } from "../site-url";
import Cookies from "universal-cookie";

function getStarData(cookies)
{
  let starData = cookies.get("starData");
  if (!starData || (starData && typeof starData !== 'object')) {
    starData = [];
  }

  return starData;
}

async function getLiveScoreContent()
{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let response = await fetch(APIGetLiveScore(), requestOptions);
        let res = {};
        if (response) {
            res = await response.json();
        }
        return res;
    } catch (err) {
        console.log("Error live score UI: " + err);
        throw err;
    }
}

async function getUpdateJsonLiveScoreContent()
{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let response = await fetch(APIGetUpdateLiveScore(), requestOptions);
        let res = {};
        if (response) {
            res = await response.json();
        }
        return res;
    } catch (err) {
        console.log("Error update live score UI: " + err);
        throw err;
    }
}

async function getStarDataOfLoginUser(user, user_id)
{
  try {
    const dataPost = {user_id: user_id};
    const token = user.accessToken;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(dataPost)
    };
    let response = await fetch(APIGetStarMatchOfUser(), requestOptions);
    let res = await response.json();
    return res;
  } catch (err) {
      // console.log("Error get star match: " + err);
      // throw err;
  }
}

async function getUserTokenByCookie()
{
    const cookies = new Cookies();
    return cookies.get("user_token");
}

async function getIdOfLoginUserByUid(uid)
{
  try {
    const dataPost = {uid: uid};
    const token = await getUserTokenByCookie();

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(dataPost)
    };
    let response = await fetch(APIGetUserId(), requestOptions);
    let res = await response.json();
    return res;
  } catch (err) {
      // console.log("Error get star match: " + err);
      // throw err;
  }
}

function getPreviousElement(elem)
{
  // previous element should not a star match
  let matchIdBefore = null;
  elem = elem?.previousSibling?.previousSibling;
  for (let i = 0; i < 30; i++) {
    console.log(elem);
    //check league has more than 2 matches to remove display none 
    if (elem?.classList && elem.hasAttribute("matchid") && elem.getAttribute("matchid"))
    {
        matchIdBefore = elem.getAttribute("matchid");
        break;
    }
    elem = elem?.previousSibling;
  }

  return matchIdBefore;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function getArrayKeysByValue(object, value) {
  return Object.keys(object).filter(function(key) {
    return object[key] === value;
  });
}

export {
    getKeyByValue,
    getStarData,
    getUpdateJsonLiveScoreContent,
    getArrayKeysByValue,
    getStarDataOfLoginUser,
    getIdOfLoginUserByUid,
    getLiveScoreContent,
    getUserTokenByCookie
  };