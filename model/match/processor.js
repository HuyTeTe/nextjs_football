import { checkerHideTitle } from "./checker";
import { setAttributeTr } from "./setter";
import { getStarData, getStarDataOfLoginUser, getIdOfLoginUserByUid } from "./getter";
import Cookies from 'universal-cookie';
import { setStarMatchToDb } from "./setter";
import { setStarData, setUserId } from "./setter";

async function processAfterUnstar(trElem, tmpPreviousTitle, starData, matchId, cookies)
{
    checkerHideTitle(trElem, tmpPreviousTitle ,starData);
    setAttributeTr(trElem, "off", "/images/star_off.png");
    let matchIndex = starData.indexOf(matchId);
    starData.splice(matchIndex, 1);
    setStarData(cookies, starData);
    // set to db
    await setStarMatchToDb(cookies);
}

async function processAfterLoginSuccess(user, user_id)
{
    await processSaveUserIdToCookie(user_id);
    await processStarCookieWhenUserLogin(user, user_id);
}

// process when reload live match and after user login
async function processStarCookieWhenUserLogin(user, user_id = null)
{
    if (!user || typeof user != 'object' || user == null) {
        return;
    }

    const cookies = new Cookies();
    if (!user_id) {
        user_id = cookies.get("user_id");
    }

    if (user && !user_id) {
        //check google, facebook
        user_id = await getIdOfLoginUserByUid(user.uid);
    }

    if (!user_id) {
        return;
    }

    setUserId(cookies, user_id);
    let starData = getStarData(cookies);
    let starMatch = await getStarDataOfLoginUser(user, user_id);
    if (!starMatch) {
        return;
    }
    starMatch = starMatch.match_id;
    starMatch = JSON.parse(starMatch);
    // find different starMatch with starData
    let difference = starMatch.filter(x => !starData.includes(x));
    if (!difference) {
        return;
    }
    let newStarData = starData.concat(difference);
    setStarData(cookies, newStarData);
    setStarMatchToDb(cookies);
}

async function processSaveUserIdToCookie(user_id)
{
    const cookies = new Cookies();
    setUserId(cookies, user_id);
}

export {
    processAfterUnstar,
    processAfterLoginSuccess,
    processStarCookieWhenUserLogin
};