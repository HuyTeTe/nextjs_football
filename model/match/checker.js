import { RESULT_STATUS } from "./data";

function checkerStatusMatchIsEnd(text)
{
    for (let index = 0; index < RESULT_STATUS.length; index++) {
        if (text.includes(RESULT_STATUS[index])) {
            return true;
        }
    }

    return false;
}

function checkerHideTitle(elem, tmpPreviousTitle, starData)
{
    let titleElem = tmpPreviousTitle?.childNodes[1]?.childNodes[0]?.childNodes[1]?.innerText;
    let flagElem = elem;
    let flagTitle = tmpPreviousTitle?.previousSibling;
    let isHiddenBefore = false;
    for (let i = 0; i < 1000; i++) {
        //check league has more than 2 matches to remove display none 
        if (flagTitle?.classList && flagTitle.classList.contains("Leaguestitle"))
        {
            let titlePreviousElem = flagTitle?.childNodes[1]?.childNodes[0]?.childNodes[1]?.innerText;
            let matchId = flagTitle.getAttribute("matchid");
            if (titleElem === titlePreviousElem && !starData.includes(matchId)) {
                isHiddenBefore = true;
            }
            break;
        }
        flagTitle = flagTitle?.previousSibling;
    }

    for (let i = 0; i < 1000; i++) {
        //check league has more than 2 matches to remove display none 
        if (flagElem?.classList && flagElem.classList.contains("Leaguestitle"))
        {
            let titleAfterElem = flagElem?.childNodes[1]?.childNodes[0]?.childNodes[1]?.innerText;
            let matchId = flagElem.getAttribute("matchid");
            if (titleElem === titleAfterElem && !starData.includes(matchId)) {
                flagElem.style.display = "none";
            }
            if (titleElem !== titleAfterElem && flagElem.style.display == "none" && !starData.includes(matchId)) {
                flagElem.style.display = "";
            }
            break;
        }
        flagElem = flagElem?.nextSibling;
    }

    if (isHiddenBefore && tmpPreviousTitle.style.display == "") {
        tmpPreviousTitle.style.display = "none";
    }
}

export {
    checkerStatusMatchIsEnd,
    checkerHideTitle
};