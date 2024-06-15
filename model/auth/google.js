import { APICheckUserRegister, APICheckUserToken } from "../site-url";
import { USER_ENTITY_GOOGLE_MODEL } from "../entity/user";

async function saveUserData(userData)
{
    try {
        const dataPost = mapDataToUser(userData, USER_ENTITY_GOOGLE_MODEL);
        const token = userData.accessToken;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(dataPost)
        };
        let response = await fetch(APICheckUserRegister(), requestOptions);
        let res = await response.json();
        return res;
    } catch (err) {
        console.log("Error save user: " + err);
        throw err;
    }
}

async function checkUserToken(userData)
{
    if(!userData.accessToken) {
        return false;
    }
    let postParam = {};
    postParam.accessToken = userData.accessToken;
    const token = userData.accessToken;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(postParam)
    };
    let response = await fetch(APICheckUserToken(), requestOptions);
    let res = await response.json();
    return res;
}

function mapDataToUser(userData, userModel)
{
    let data = {};
    for (let keyEntity in userModel) {
        data[keyEntity] = userData[userModel[keyEntity]]
    }

    return data;
}

export {
    saveUserData,
    checkUserToken
  };