import { APIGetBotUI, APIGetBotStatusData, APIGetBotFilterData, SaveBotUser, APIGetMyBotUI, APIGetBestBotUI } from "../site-url";

async function getBotUI(page = 1)
{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let response = await fetch(APIGetBotUI() + page, requestOptions);
        let res = {};
        if (response) {
            res = await response.json();
        }
        return res;
    } catch (err) {
        console.log("Error get UI: " + err);
        throw err;
    }
}

async function getBestBotUIHomepage()
{
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let response = await fetch(APIGetBestBotUI(), requestOptions);
        let res = {};
        if (response) {
            res = await response.json();
        }
        return res;
    } catch (err) {
        console.log("Error get best UI: " + err);
        throw err;
    }
}

async function getMyBotUI(email, page = 1)
{
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, page: page})
        };
        let response = await fetch(APIGetMyBotUI(), requestOptions);
        let res = {};
        if (response) {
            res = await response.json();
        }
        return res;
    } catch (err) {
        console.log("Error get UI: " + err);
        throw err;
    }
}

async function saveBotUser(email, botId, action)
{
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, bot_id: botId, action: action})
        };
        let response = await fetch(SaveBotUser(), requestOptions);
        let res = {};
        if (response) {
            res = await response.json();
        }
        return res;
    } catch (err) {
        console.log("Save bot user fail: " + err);
        throw err;
    }
}

async function getBotFilterData(filters, page = 1)
{
    try {
        filters = JSON.stringify(filters);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({filters: filters, page: page})
        };
        let response = await fetch(APIGetBotFilterData(), requestOptions);
        let res = {};
        if (response) {
            res = await response.json();
        }
        return res;
    } catch (err) {
        console.log("Error get bot filter: " + err);
        throw err;
    }
}

/**
 * count win/lose record 
 * @param {*} offset 
 * @param {*} limit 
 * @returns 
 */
async function getBotStatusData(botIds, email)
{
    try {
        botIds = JSON.stringify(botIds);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bot_ids: botIds, email: email})
        };
        let response = await fetch(APIGetBotStatusData(), requestOptions);
        let res = {};
        if (response) {
            res = await response.json();
        }
        return res;
    } catch (err) {
        console.log("Error get bot status data: " + err);
        throw err;
    }
}

export {
    getBotUI,
    getBotFilterData,
    saveBotUser,
    getMyBotUI,
    getBestBotUIHomepage,
    getBotStatusData
  };