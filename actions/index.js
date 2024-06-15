import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, browserPopupRedirectResolver } from "firebase/auth";
import { SET_USER, NOT_LOGIN } from "../actions/actionType";
import { saveUserData, checkUserToken } from "../model/auth/google";
import { processAfterLoginSuccess } from '../model/match/processor';
import { removeUserToken } from "../model/match/remover";
import { setUserToken, setUserTrackingBotMatch } from "../model/match/setter";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})
export function signInAPI() {

    return (dispatch) => {
            signInWithPopup(auth, provider, browserPopupRedirectResolver)
            .then(async (payload) => {
                dispatch(setUser(payload.user));
                let userData = await saveUserData(payload.user);
                if (!userData) {
                    await signOut(auth)
                        .then(() => {
                            // alert("Something went wrong with your account. Please re-check it. Your account will be logged out!");
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                } else {
                    setUserToken(userData.accessToken);
                    await processAfterLoginSuccess(payload.user, userData.user_id);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
}

export function getUserAuth() {
    return (dispatch) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user)
                let validData = await checkUserToken(user);
                if (validData == false) {
                    await signOut(auth)
                        .then(() => {
                            removeUserToken();
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                } else {
                    setUserToken(user.accessToken);
                    dispatch(setUser(user));
                    return user;
                }
            } else {
                dispatch(setUser(NOT_LOGIN));
                return null;
            }
        });
    }
}

export function signOutAPI() {
    return (dispatch) => {
        signOut(auth)
        .then(() => {
            dispatch(setUser(null));
            removeUserToken();
            window.location.assign("/");
        })
        .catch((error) => {
            console.log(error.message);
            window.location.assign("/");
        });
    };
}