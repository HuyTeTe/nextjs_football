import { useEffect, useState } from "react";
import { SiteUrl } from "../../model/site-url";
import Container from 'react-bootstrap/Container';
import {
  StyleEleCenter,
  StyleElePadding,
  StyleEleTextColor,
  StyleEleBackground,
  CheckImgLazy,
  FilterScore,
  AddBlingBackgroud,
  IsTimeHidden,
  StyleTagOdd
} from "../../model/style";

import {CreateHeadTable} from "../../model/table/utils";
import {
  StarMatchOnclick,
  CreateYellowCardElem,
  CreateRedCardElem,
  CreateOddTag,
  HideToggleLeagueTitle,
  StarMatchAtFirstLoad,
  ReloadPage} from "../../model/match/utils";
import styles from "../../styles/match/live-score.module.scss";
import Button from "react-bootstrap/Button";
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { getLiveScoreContent, getUpdateJsonLiveScoreContent } from "../../model/match/getter";
import { BACKGROUND_COLOR_TITLE, BACKGROUND_COLOR_SCORE, BACKGROUND_COLOR_HOME, BACKGROUND_COLOR_AWAY } from "../../model/baseColor";

function LiveScoreContent(props) {
  const NULL_STATUS = "undefined";
  const [dataResponse, setdataResponse] = useState([]);
  const siteUrl = SiteUrl();
  const cookies = new Cookies();
  let allLeagueTitle;
  const COLOR_TIME_STATUS = "#00a6fb";
  var resultArray = ["FT", "Treo", "Hoãn"];
  useEffect(() => {
    ReloadPage(location, 1200000);
    document.getElementById("live-content").style.display = "none";
    async function getPageData() {
      try {
          let res = await getLiveScoreContent();
          setdataResponse(res?.content);
      } catch (err) {
        alert("Something went wrong with the server!" + JSON.stringify(res));
        window.location.assign("/");
      }
    }
    getPageData();
  }, []);

  //handle scroll
  const handleScroll = () => {
    cookies.set("current_postion", window.scrollY, { path: '/' });
  };

  //update real time
  var updateData;
  async function getUpdateData()
  {
    try {
      let res = await getUpdateJsonLiveScoreContent();
      if (res.hasOwnProperty("match_data_json")) {
        updateData = res.match_data_json;
        JSON.parse(res.match_data_json);
      }
    } catch (e) {

    }
  }
  var isProcess = false;

  function updateSessionData(matchid, key, storageData, updateData, sessionStorage)
  {
    storageData[matchid][key] = updateData[matchid][key];
    sessionStorage.setItem("jsonMatchData", JSON.stringify(storageData));
  }

  function updateSessionOddData(matchid, odd, data, storageData, updateData, sessionStorage)
  {
    storageData[matchid][odd][data] = updateData[matchid][odd][data];
    sessionStorage.setItem("jsonMatchData", JSON.stringify(storageData));
  }

  function updateSessionBookingData(matchid, obj, card, storageData, updateData, sessionStorage)
  {
    storageData[matchid]["booking"][obj][card] = updateData[matchid]["booking"][obj][card];
    sessionStorage.setItem("jsonMatchData", JSON.stringify(storageData));
  }

  useEffect(() => {
    //need to check if the previous process has done or not
    var timerUpdate = setInterval(() => {
      try {
        getUpdateData();
        let storageData = sessionStorage.getItem("jsonMatchData");
        let storagePositionData = sessionStorage.getItem("jsonMatchPosition");
        if (isProcess) {
          return;
        }
        if (storageData && updateData) {
          isProcess = true;
          storageData = JSON.parse(storageData);
          updateData = JSON.parse(updateData);
          for(var i in storageData) {
            if(!updateData.hasOwnProperty(i)) {
              location.reload();
            }
            let trElem = document.querySelector("[matchid='"+i+"'][class='tds align-middle']");
            let tdElms = trElem.querySelectorAll('td');

            //move done match
            // MoveDoneMatchToBottom(i, updateData[i].status_time, storagePositionData, "#live-content table");
            //move done match
            if(updateData[i].status_time != storageData[i].status_time) {

              let isHidden = IsTimeHidden(tdElms[1]);
              if (tdElms[2].querySelector('span')?.innerText.includes("FT")) {
                tdElms.remove();
              }
              else if (isHidden) {
                tdElms[2].innerHTML = updateData[i].status_time;
                updateSessionData(i, "status_time", storageData, updateData, sessionStorage);
              } else {
                trElem.insertCell(2);
                tdElms = trElem?.querySelectorAll('td');
                tdElms[2].style.textAlign = "center";
                tdElms[2].style.color = COLOR_TIME_STATUS;
                tdElms[2].innerHTML = updateData[i].status_time;
                updateSessionData(i, "status_time", storageData, updateData, sessionStorage);
              }
            }
            if(updateData[i].score_live != storageData[i].score_live) {
              tdElms[4].innerHTML = FilterScore(updateData[i].score_live);
              if (storageData[i].score_live != "-") {
                AddBlingBackgroud(tdElms[4], BACKGROUND_COLOR_SCORE);
              }
              updateSessionData(i, "score_live", storageData, updateData, sessionStorage);
            }

            //BOOKING BOOKING BOOKING BOOKING BOOKING BOOKING BOOKING BOOKING BOOKING BOOKING
            let bookingIndex;
            if (tdElms[2].classList.contains("handpoint")) {
              bookingIndex = 3;
            } else {
              bookingIndex = 2;
            }
            if(updateData[i].booking.home.yellow != storageData[i].booking.home.yellow
              && storageData[i].booking.home.yellow
              && tdElms[bookingIndex]?.firstChild?.childNodes[1]) {
              let yellowCardElm = CreateYellowCardElem(updateData[i].booking.home.yellow);
              tdElms[bookingIndex].firstChild.childNodes[1].innerHTML = "";
              tdElms[bookingIndex].firstChild.childNodes[1].appendChild(yellowCardElm);
              updateSessionBookingData(i, "home", "yellow", storageData, updateData, sessionStorage);
            }
            if(updateData[i].booking.home.red != storageData[i].booking.home.red
              && storageData[i].booking.home.red
              && tdElms[bookingIndex]?.firstChild?.childNodes[2]) {
              let redCardElm = CreateRedCardElem(updateData[i].booking.home.red);
              tdElms[bookingIndex].firstChild.childNodes[2].innerHTML = "";
              tdElms[bookingIndex].firstChild.childNodes[2].appendChild(redCardElm);
              updateSessionBookingData(i, "home", "red", storageData, updateData, sessionStorage);
            }

            if(updateData[i].booking.away.yellow != storageData[i].booking.away.yellow 
              && tdElms[bookingIndex]?.childNodes[1]?.childNodes[3]
              && storageData[i].booking.away.yellow
              ) {
              let yellowCardElm = CreateYellowCardElem(updateData[i].booking.away.yellow);
              tdElms[bookingIndex].childNodes[1].childNodes[3].innerHTML = "";
              tdElms[bookingIndex].childNodes[1].childNodes[3].appendChild(yellowCardElm);
              updateSessionBookingData(i, "away", "yellow", storageData, updateData, sessionStorage);
            }
            if(updateData[i].booking.away.red != storageData[i].booking.away.red
              && storageData[i].booking.away.red
              && tdElms[bookingIndex]?.childNodes[1]?.childNodes[2]) {
              let redCardElm = CreateRedCardElem(updateData[i].booking.away.red);
              tdElms[bookingIndex].childNodes[1].childNodes[2].innerHTML = "";
              tdElms[bookingIndex].childNodes[1].childNodes[2].appendChild(redCardElm);
              updateSessionBookingData(i, "away", "red", storageData, updateData, sessionStorage);
            }
            //CORNER CORNER CORNER CORNER CORNER CORNER CORNER CORNER CORNER
            if(updateData[i].corner != storageData[i].corner && updateData[i].corner != NULL_STATUS) {
              if (storageData[i].corner != "undefined") {
                AddBlingBackgroud(tdElms[5].childNodes[0]);
              }
              tdElms[5].childNodes[0].innerText = updateData[i].corner;
              updateSessionData(i, "corner", storageData, updateData, sessionStorage);
            }
            if(updateData[i].ht_score != storageData[i].ht_score && updateData[i].ht_score != NULL_STATUS) {
              tdElms[5].childNodes[1].innerText = updateData[i].ht_score;
              updateSessionData(i, "ht_score", storageData, updateData, sessionStorage);
            }

            let startOddIndex = 0;
            if (tdElms.length == 9) {
              startOddIndex = 6;
            } else if (tdElms.length == 10) {
              startOddIndex = 7;
            }

            if (!startOddIndex) {
              continue;
            }

            if(updateData[i].odd1.data1 != storageData[i].odd1.data1 && updateData[i].odd1.data1 != "undefined") {
              CreateOddTag(tdElms[startOddIndex]);
              tdElms[startOddIndex].childNodes[0].innerText = updateData[i].odd1.data1;
              updateSessionOddData(i, "odd1", "data1", storageData, updateData, sessionStorage);
            }
            if(updateData[i].odd1.data2 != storageData[i].odd1.data2 && updateData[i].odd1.data2 != "undefined") {
              CreateOddTag(tdElms[startOddIndex]);
              tdElms[startOddIndex].childNodes[1].innerText = updateData[i].odd1.data2;
              updateSessionOddData(i, "odd1", "data2", storageData, updateData, sessionStorage);
            }

            if(updateData[i].odd2.data1 != storageData[i].odd2.data1 && updateData[i].odd2.data1 != "undefined") {
              CreateOddTag(tdElms[startOddIndex + 1]);
              tdElms[startOddIndex + 1].childNodes[0].innerText = updateData[i].odd2.data1;
              updateSessionOddData(i, "odd2", "data1", storageData, updateData, sessionStorage);
            }
            if(updateData[i].odd2.data2 != storageData[i].odd2.data2 && updateData[i].odd2.data2 != "undefined") {
              CreateOddTag(tdElms[startOddIndex + 1]);
              tdElms[startOddIndex + 1].childNodes[1].innerText = updateData[i].odd2.data2;
              updateSessionOddData(i, "odd2", "data2", storageData, updateData, sessionStorage);
            }

            if(updateData[i].odd3.data1 != storageData[i].odd3.data1 && updateData[i].odd3.data1 != "undefined") {
              CreateOddTag(tdElms[startOddIndex + 2]);
              tdElms[startOddIndex + 2].childNodes[0].innerText = updateData[i].odd3.data1;
              updateSessionOddData(i, "odd3", "data1", storageData, updateData, sessionStorage);
            }
            if(updateData[i].odd3.data2 != storageData[i].odd3.data2 && updateData[i].odd3.data2 != "undefined") {
              CreateOddTag(tdElms[startOddIndex + 2]);
              tdElms[startOddIndex + 2].childNodes[1].innerText = updateData[i].odd3.data2;
              updateSessionOddData(i, "odd3", "data2", storageData, updateData, sessionStorage);
            }
          }

          isProcess = false;
        }
      } catch(err) {
        console.log("catch");
        clearInterval(timerUpdate);
      }
    }, 5000);
  }, []);

  function filterEmptyValueOdd(odd) {
    if (odd == 0 && odd.length == 1) {
      odd = "";
    }

    return odd;
  }

  useEffect(() => {
    let jsonMatchData = {};
    let jsonMatchPosition = {};
    let position = 1;
    document.querySelectorAll('[matchid]').forEach(function (elm) {
      if (elm.className.includes('Leaguestitle')) {
        return;
      }
      let matchId = elm.getAttribute("matchid");
      jsonMatchPosition[matchId] = position;
      position++;
      let TdData = elm.querySelectorAll('td');

      //check status time
      let statusTime = TdData[3]?.innerHTML ? TdData[3]?.innerHTML : NULL_STATUS;
      // statusTime = " " ? "" : statusTime;
      jsonMatchData[matchId] = {};
      jsonMatchData[matchId].status_time = statusTime;

      //check booking
      //yellow home 1
      //yellow away 2
      //red home 2
      //red away 1
      let bookingHomeYellow = TdData[5]?.childNodes[1]?.innerText ? TdData[5]?.childNodes[1]?.innerText : ''
      let bookingHomeRed = TdData[5]?.childNodes[2]?.innerText ? TdData[5]?.childNodes[2]?.innerText : ''
      let bookingAwayYellow = TdData[7]?.childNodes[3]?.innerText ? TdData[7]?.childNodes[3]?.innerText : ''
      let bookingAwayRed = TdData[7]?.childNodes[2]?.innerText ? TdData[7]?.childNodes[2]?.innerText : ''
      // let bookingAway = TdData[7]?.innerHTML ? TdData[7]?.innerHTML : NULL_STATUS;
      jsonMatchData[matchId].booking = {};
      jsonMatchData[matchId].booking = {};
      jsonMatchData[matchId].booking.home = {};
      jsonMatchData[matchId].booking.away = {};
      jsonMatchData[matchId].booking.home.yellow = bookingHomeYellow;
      jsonMatchData[matchId].booking.home.red = bookingHomeRed;
      jsonMatchData[matchId].booking.away.yellow = bookingAwayYellow;
      jsonMatchData[matchId].booking.away.red = bookingAwayRed;
      //check score live
      let score = TdData[6]?.firstChild.innerText ? TdData[6]?.firstChild.innerText : NULL_STATUS;
      if (score == " - ") {
        score = "-";
      }
      jsonMatchData[matchId].score_live = score;
      //check corner
      let corner = TdData[8]?.firstChild.innerText ? TdData[8]?.firstChild.innerText : NULL_STATUS;
      if (corner == " - ") {
        corner = "-";
      }
      jsonMatchData[matchId].corner = corner;
      // check ht score
      let htScore = TdData[8]?.childNodes[1]?.innerText ? TdData[8]?.childNodes[1].innerText : NULL_STATUS;
      if (htScore == " - ") {
        htScore = "-";
      }
      jsonMatchData[matchId].ht_score = htScore;
      // check odd1
      let data11 = TdData[10]?.firstChild.innerText ? TdData[10]?.firstChild.innerText : NULL_STATUS;
      let data12 = TdData[10]?.childNodes[1]?.innerText ? TdData[10]?.childNodes[1]?.innerText : NULL_STATUS;
      jsonMatchData[matchId].odd1 = {};
      data11 = filterEmptyValueOdd(data11);
      data12 = filterEmptyValueOdd(data12);
      jsonMatchData[matchId].odd1.data1 = data11;
      jsonMatchData[matchId].odd1.data2 = data12;
      // check odd2
      let data21 = TdData[11]?.firstChild.innerText ? TdData[11]?.firstChild.innerText : NULL_STATUS;
      let data22 = TdData[11]?.childNodes[1]?.innerText ? TdData[11]?.childNodes[1]?.innerText : NULL_STATUS;
      jsonMatchData[matchId].odd2 = {};
      jsonMatchData[matchId].odd2.data1 = data21;
      jsonMatchData[matchId].odd2.data2 = data22;
      // check odd3
      let data31 = TdData[12]?.firstChild.innerText ? TdData[12]?.firstChild.innerText : NULL_STATUS;
      let data32 = TdData[12]?.childNodes[1]?.innerText ? TdData[12]?.childNodes[1]?.innerText : NULL_STATUS;
      jsonMatchData[matchId].odd3 = {};
      data31 = filterEmptyValueOdd(data31);
      data32 = filterEmptyValueOdd(data32);
      jsonMatchData[matchId].odd3.data1 = data31;
      jsonMatchData[matchId].odd3.data2 = data32;
    });

    document.querySelectorAll('[matchid]').forEach(function (elm) {
      let matchId = elm.getAttribute("matchid");
      let sizeLiveMatch = Object.keys(jsonMatchPosition).length;
      StarMatchOnclick(matchId, "#live-content table tbody", jsonMatchPosition, cookies, props.user, sizeLiveMatch, location);
    });

    sessionStorage.setItem("jsonMatchData", JSON.stringify(jsonMatchData));
    sessionStorage.setItem("jsonMatchPosition", JSON.stringify(jsonMatchPosition));
    console.log(JSON.stringify(jsonMatchPosition));
  }, [dataResponse]);

  const [isCreateHeaderTable, setIsCreateHeaderTable] = useState(false);
  const [isPopulateMatchDone, setIsPopulateMatchDone] = useState(false);

  useEffect(() => {
    // start style CSS
    allLeagueTitle = document.querySelectorAll(".Leaguestitle");
    if (!allLeagueTitle) {
      return;
    }
    allLeagueTitle.forEach(function (elm) {
      if (elm.hasChildNodes()) {
        elm.children[0].style.display = 'none';
      }
    });
    document.querySelectorAll("tr").forEach(function (elm) {
      if (!elm.classList.contains("Leaguestitle") && elm.style.display === 'none') {
        elm.remove();
      }
    })
    StyleEleCenter([".add-div", ".handpoint", ".scoretitle td", ".result-split"]);
    StyleElePadding([
      { key: ".Leaguestitle td", value: "8px 0" },
      { key: ".scoretitle td", value: "6px 0" },
    ]);
    StyleEleBackground([
      { key: ".Leaguestitle", value: BACKGROUND_COLOR_TITLE },
      { key: ".scoretitle", value: BACKGROUND_COLOR_TITLE },
    ]);
    StyleEleTextColor([{ key: ".scoretitle", value: "#ffffff" }]);
    StyleEleTextColor([{ key: ".Leaguestitle", value: "#ffffff" }]);
    CheckImgLazy(".Leaguestitle .cImg");

    if (!isCreateHeaderTable) {
      CreateHeadTable("#live-content table");
      setIsCreateHeaderTable(true);
    }

    HideToggleLeagueTitle(document);

    document.querySelectorAll(".yellowcard").forEach(function (elm) {
      elm.style.backgroundColor = "yellow";
      elm.style.padding = "0 2px";
      elm.style.margin = "0 2px";
      elm.style.borderRadius = "0 2px";
    })
    document.querySelectorAll(".redcard").forEach(function (elm) {
      elm.style.backgroundColor = "red";
      elm.style.padding = "0 2px";
      elm.style.margin = "0 2px";
      elm.style.borderRadius = "0 2px";
    })

    let homeNameTmp, awayNameTmp, matchHomeName, matchAwayName;

    let countStyleElem = 0;
    document.querySelectorAll(".tds").forEach(function (elm) {
      elm.style.borderBottom = "4px solid #f2f2e1";
      let allTdData = elm.querySelectorAll('td');
      allTdData[1].remove();
      allTdData[4].remove();
      allTdData[5].style.width = "25%";
      allTdData[0].style.width = "16px";
      allTdData[0].style.marginRight = "2px";

      if (allTdData[3].innerHTML == "&nbsp;") {
        allTdData[3].remove();
      }


      //check Result and add it to time
      let resultStatus;
      if (resultArray.includes(allTdData[3].innerText)) {
        allTdData[3].remove();
        resultStatus = allTdData[3].innerText;
        allTdData[2].innerHTML = allTdData[2].innerHTML + "<br>" + resultStatus;

      }

      //check position team
      matchHomeName = allTdData[5].innerHTML.match(/\[(.*?)\]/);
      homeNameTmp = allTdData[5].innerHTML;
      homeNameTmp = homeNameTmp.replace(/\[(.*?)\]/g, "");
      if (matchHomeName && matchHomeName[1] != undefined) {
        allTdData[5].innerHTML = homeNameTmp + "<span style='font-size: 10px'>[" + matchHomeName[1] + "]</span>";
      }

      matchAwayName = allTdData[7].innerHTML.match(/\[(.*?)\]/);
      awayNameTmp = allTdData[7].innerHTML;
      awayNameTmp = awayNameTmp.replace(/\[(.*?)\]/g, "");
      if (matchAwayName && matchAwayName[1] != undefined) {
        allTdData[7].innerHTML = awayNameTmp + "<span style='font-size: 10px'>[" + matchAwayName[1] + "]</span>";
      }
      allTdData[5].innerHTML = "<span style='display:block;margin-bottom:6px;background:" + BACKGROUND_COLOR_HOME + ";padding-right:15px;height:75px;font-weight:bold'>" + allTdData[5].innerHTML
                                + "</span><span style='display:block;margin-top:6px;background:" + BACKGROUND_COLOR_AWAY + ";padding-right:15px;height:75px;font-weight:bold'>" + allTdData[7].innerHTML + "</span>";
      allTdData[7].remove();
      //end check position team

      //check score
      if(allTdData[6].innerText === '-') {
        allTdData[6].innerText = '';
      } else {
        allTdData[6].innerHTML = FilterScore(allTdData[6].innerText);
      }
      allTdData[6].style.padding = "0 12px";
      allTdData[6].style.background = BACKGROUND_COLOR_SCORE;
      allTdData[6].style.fontWeight = "bold";
      allTdData[6].style.width = "5%";
      //end check score
      allTdData[8].style.textAlign = "center";

      // allTdData[8] is corner
      allTdData[8].style.fontSize = "12px";
      allTdData[8].style.borderRight = "1px solid #f0f1f2";
      allTdData[8].style.width = "10%";
      allTdData[8].style.fontWeight = "bold";
      allTdData[8].innerHTML = allTdData[8].innerHTML + allTdData[9].innerHTML;
      // allTdData[9] is HT score
      allTdData[9].remove();

      //update style handpoint
      document.querySelectorAll('.handpoint.status span').forEach(function (elm) {
        StyleTagOdd(elm)
      })
      document.querySelectorAll('.handpoint.status').forEach(function (elm) {
        StyleTagOdd(elm)
      })

      allTdData[11].querySelectorAll('p').forEach(function (elm) {
        elm = StyleTagOdd(elm);
      })
      allTdData[12].querySelectorAll('p').forEach(function (elm) {
        elm = StyleTagOdd(elm);
      })
      allTdData[13].querySelectorAll('p').forEach(function (elm) {
        elm = StyleTagOdd(elm);
      })
      allTdData[3].style.color = COLOR_TIME_STATUS;
      countStyleElem++;
    });
    if (countStyleElem > 0) {
      setIsPopulateMatchDone(true);
    }
  }, [dataResponse]);

  useEffect(() => {
    if (isPopulateMatchDone && props.user) {
      const populateAfterLoadData = async () => {
        await StarMatchAtFirstLoad(cookies, props.user);

        let liveContent = document.querySelector("#live-content");
        let loadingContent = document.querySelector("#loading");
        if (liveContent && loadingContent) {
          //load star match from cookie
          liveContent.style.display = "";
          loadingContent.style.display = "none";
          //scroll function
          window.addEventListener("scroll", handleScroll);
          if (cookies.get("current_postion")) {
            window.scrollTo(0, cookies.get("current_postion"));
          }
        }
      }

      populateAfterLoadData();
    }
  }, [isPopulateMatchDone, props.user]);

  const scrollBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  const scrollTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <Container gap={2} fluid className={styles["base-layout"]}>
      <div className={styles["h1-title"]}>
        <h1>Live Scores</h1>
        <p>
        Football live scores page on Footballee.com offers all the latest football results from more than 1000+ football leagues all around the world.<br/>
        We cover all Countries, Leagues and Competitions in unbeatable detail.<br/>
        </p>
      </div>
      <Button className={styles["button-scroll-bottom"]} onClick={() => scrollBottom(true)}>Scroll to bottom</Button>
      <Button className={styles["button-scroll-top"]} onClick={() => scrollTop(true)}>Scroll to<br/> top</Button>
      <span className={styles["loading"]} id="loading">
        <img src="/images/spin-bean.gif" />
        <div>Loading data...</div>
      </span>
      <div className={styles["live-content"]} id="live-content"
      dangerouslySetInnerHTML={{ __html: dataResponse }}></div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { user: state.userState.user };
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LiveScoreContent);
