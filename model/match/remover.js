import Cookies from "universal-cookie";

function removeUserToken()
{
    const cookies = new Cookies();
    cookies.remove("user_token", { path: '/' });
}

export {
    removeUserToken
};