import { getKeyByValue } from "./getter";

function findReplaceMatchIdAfter(matchId, jsonMatchPosition, sizeLiveMatch, starMapData)
{
    if (jsonMatchPosition.hasOwnProperty(matchId)) {
        let position = jsonMatchPosition[matchId];
        position++;
        while (position <= sizeLiveMatch) {
            let key = getKeyByValue(jsonMatchPosition, position);
            if (key && !starMapData.includes(key)) {
                return key;
            }
            position++;
        }
    }

    return null;
}

export {
    findReplaceMatchIdAfter
};