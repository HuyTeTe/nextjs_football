const siteUrl = "https://www.footballee.com/";
const apiUrl = "https://www.footballee.com/api/";
// const siteUrl = "https://localhost:3000/";
// const apiUrl = "http://localhost:3002/";
// const siteUrl = "http://93.127.195.123:3000/";
// const apiUrl = "http://93.127.195.123:3002/";

function SiteUrl() {
  return siteUrl;
}

function APICheckUserRegister() {
  return apiUrl + "auth/login";
}

function APIGetLiveScore() {
  return apiUrl + "match/live-score";
}

function APIGetUpdateLiveScore() {
  return apiUrl + "match/update-live-score";
}

function APICheckUserToken() {
  return apiUrl + "auth/check-user-token";
}

function APIGetStarMatchOfUser() {
  return apiUrl + "star/get-star-match";
}

function APIGetUserId() {
  return apiUrl + "user/get-user-id";
}

function APISaveStarMatch() {
  return apiUrl + "star/save-star-match";
}

function APIGetBotUI() {
  return apiUrl + "bot/get-bot-ui/page/";
}

function APIGetBestBotUI() {
  return apiUrl + "bot/get-best-bot-ui-homepage";
}

function APIGetMyBotUI() {
  return apiUrl + "bot/get-my-bot";
}

function APIGetBotStatusData() {
  return apiUrl + "bot/get-bot-list-status";
}

function APIGetBotFilterData() {
  return apiUrl + "bot/get-bot-list-filter";
}

function SaveBotUser() {
  return apiUrl + "bot/save-bot-user";
}


export {
  SiteUrl,
  APIGetLiveScore,
  APIGetUpdateLiveScore,
  APICheckUserRegister, 
  APICheckUserToken, 
  APIGetStarMatchOfUser,
  APIGetUserId,
  APIGetBotUI,
  APIGetMyBotUI,
  APIGetBotStatusData,
  APISaveStarMatch,
  APIGetBotFilterData,
  APIGetBestBotUI,
  SaveBotUser
};
