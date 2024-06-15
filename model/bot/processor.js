const ODD = 'odd';
const OVER_UNDER = 'over_under';
const OVER = 'over';
const UNDER = 'under';
const FAVORITE = 'favorite';
const UNDERDOG = 'underdog';

const WIN_FULL = ['WIN FULL', 'bg-win-full'];
const LOSE_FULL = ['LOSE FULL', 'bg-lose-full'];
const WIN_A_HALF = ['WIN A HALF', 'bg-win-half'];
const LOSE_A_HALF = ['LOSE A HALF', 'bg-lose-half'];
const DRAW = ['DRAW', 'bg-draw'];
const UNDEFINED = ['UNDEFINED', 'bg-undefined'];

function processMatchResult(betInMatch, homeResult, awayResult, homePosition, awayPosition, odd, overUnder)
{
    // NOTE: for odd = 0 will get team has high position as stronger
    homeResult = parseFloat(homeResult);
    awayResult = parseFloat(awayResult);
    overUnder = parseFloat(overUnder);
    odd = parseFloat(odd);
    homePosition = parseFloat(homePosition);
    awayPosition = parseFloat(awayPosition);
    let absOdd = Math.abs(odd);
    let total = homeResult + awayResult;

    if (betInMatch === OVER) {
        if (total > overUnder) {
            if (total - overUnder > 0.25) {
                return WIN_FULL;
            } else {
                return WIN_A_HALF;
            }
        } else if (total === overUnder) {
            return DRAW;
        } else {
            if (overUnder - total > 0.25) {
                return LOSE_FULL;
            } else {
                return LOSE_A_HALF;
            }
        }
    } else if (betInMatch === UNDER) {
        if (total > overUnder) {
            if (total - overUnder > 0.25) {
                return LOSE_FULL;
            } else {
                return LOSE_A_HALF;
            }
        } else if (total === overUnder) {
            return DRAW;
        } else {
            if (overUnder - total > 0.25) {
                return WIN_FULL;
            } else {
                return WIN_A_HALF;
            }
        }
    } else if (betInMatch === FAVORITE) {
        if (odd === 0) {
            if (homePosition > awayPosition && homeResult > awayResult) {
                return LOSE_FULL;
            } else if (homePosition > awayPosition && homeResult < awayResult) {
                return WIN_FULL;
            } else if (homePosition < awayPosition && homeResult < awayResult) {
                return LOSE_FULL;
            } else if (homePosition < awayPosition && homeResult > awayResult) {
                return WIN_FULL;
            } else if ((homePosition > awayPosition || homePosition < awayPosition) && homeResult === awayResult) {
                return DRAW;
            } else {
                return UNDEFINED;
            }
        } else if (odd < 0) {
            if (homeResult < awayResult) {
                if (awayResult - homeResult - absOdd === 0.25) {
                    return WIN_A_HALF;
                } else if (awayResult - homeResult - absOdd > 0.25) {
                    return WIN_FULL;
                } else if (awayResult - homeResult - absOdd === 0) {
                    return DRAW;
                } else if (awayResult - homeResult - absOdd === -0.25) {
                    return LOSE_A_HALF;
                } else {
                    return LOSE_FULL;
                }
            } else if (homeResult === awayResult) {
                if (odd === -0.25) {
                    return LOSE_A_HALF;
                } else {
                    return LOSE_FULL;
                }
            } else {
                return LOSE_FULL;
            }
        } else {
            if (homeResult > awayResult) {
                if (homeResult - awayResult - absOdd === 0.25) {
                    return WIN_A_HALF;
                } else if (homeResult - awayResult - absOdd > 0.25) {
                    return WIN_FULL;
                } else if (homeResult - awayResult - absOdd === 0) {
                    return DRAW;
                } else if (homeResult - awayResult - absOdd === -0.25) {
                    return LOSE_A_HALF;
                } else {
                    return LOSE_FULL;
                }
            } else if (homeResult === awayResult) {
                if (odd === 0.25) {
                    return LOSE_A_HALF;
                } else {
                    return LOSE_FULL;
                }
            } else {
                return LOSE_FULL;
            }
        }
    } else if (betInMatch === UNDERDOG) {
        if (odd === 0) {
            if (homePosition > awayPosition && homeResult > awayResult) {
                return WIN_FULL;
            } else if (homePosition > awayPosition && homeResult < awayResult) {
                return LOSE_FULL;
            } else if (homePosition < awayPosition && homeResult < awayResult) {
                return WIN_FULL;
            } else if (homePosition < awayPosition && homeResult > awayResult) {
                return LOSE_FULL;
            } else if ((homePosition > awayPosition || homePosition < awayPosition) && homeResult === awayResult) {
                return DRAW;
            } else {
                return UNDEFINED;
            }
        } else if (odd < 0) {
            if (homeResult < awayResult) {
                if (awayResult - homeResult - absOdd === 0.25) {
                    return LOSE_A_HALF;
                } else if (awayResult - homeResult - absOdd > 0.25) {
                    return LOSE_FULL;
                } else if (awayResult - homeResult - absOdd === 0) {
                    return DRAW;
                } else if (awayResult - homeResult - absOdd === -0.25) {
                    return WIN_A_HALF;
                } else {
                    return WIN_FULL;
                }
            } else if (homeResult === awayResult) {
                if (odd === -0.25) {
                    return WIN_A_HALF;
                } else {
                    return WIN_FULL;
                }
            } else {
                return WIN_FULL;
            }
        } else {
            if (homeResult > awayResult) {
                if (homeResult - awayResult - absOdd === 0.25) {
                    return LOSE_A_HALF;
                } else if (homeResult - awayResult - absOdd > 0.25) {
                    return LOSE_FULL;
                } else if (homeResult - awayResult - absOdd === 0) {
                    return DRAW;
                } else if (homeResult - awayResult - absOdd === -0.25) {
                    return WIN_A_HALF;
                } else {
                    return WIN_FULL;
                }
            } else if (homeResult === awayResult) {
                if (odd === 0.25) {
                    return WIN_A_HALF;
                } else {
                    return WIN_FULL;
                }
            } else {
                return WIN_FULL;
            }
        }
    }


    return UNDEFINED;
}

export {
    processMatchResult
};