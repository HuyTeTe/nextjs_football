import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../../styles/bot/bot.module.scss";
import { getBotFilterData, getBotStatusData, getBotUI } from '../../model/entity/bot'
import ListModal from "./bot/ListModal";
import BotCard from "./bot/Card";
import { connect } from 'react-redux';
import BotPagination from "./bot/BotPagination";
import BotFilter from "./bot/BotFilter";

function AllBot(props) {
  const BOT_ENTITY_ID = 'entity_id';
  const [dataBotUI, setdataBotUI] = useState([]);
  const [dataBotStatus, setDataBotStatus] = useState({});
  const [show, setShow] = useState(false);
  const [matchdata, setMatchData] = useState([]);
  const [betInMatch, setBetInMatch] = useState('');
  const [botId, setBotId] = useState('');
  const [filter, setFilter] = useState({});
  const [canFilter, setCanFilter] = useState(false);
  const [inFilterMode, setInFilterMode] = useState(false);
  const [haveUser, setHaveUser] = useState(false);
  const [page, setPage] = useState(1);

  const handleClose = () => setShow(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBotUI();
      setdataBotUI(data);
    }
    fetchData().catch(console.error);
  }, []);

  // paging
  useEffect(() => {
    const fetchData = async () => {
      setCanFilter(false);
      let data;
      if (inFilterMode) {
        data = await getBotFilterData(filter, page);
      } else {
        data = await getBotUI(page);
      }
      setdataBotUI(data);
      setCanFilter(true);
    }
    fetchData().catch(console.error);
  }, [page]);

  useEffect(() => {
    if (typeof props.user === 'object' && props.user !== null) {
      setHaveUser(true);
    }
  }, [props.user]);

  useEffect(() => {
    if (dataBotUI.length > 0) {
      let email = '';
      if (typeof props.user === 'object' && props.user !== null) {
        email = props.user.email;
      }
      const fetchBotStatusData = async (botIds) => {
        const botStatus = await getBotStatusData(botIds, email);
        setDataBotStatus(botStatus);
      }

      let botIds = [];
      for (let idx in dataBotUI) {
        botIds.push(dataBotUI[idx][BOT_ENTITY_ID])
      }

      fetchBotStatusData(botIds).catch(console.error);
      setCanFilter(true);
    }
  }, [dataBotUI, props.user]);

  const showMatchData = (matches, betInMatch, botId) => {
    matches.sort(function(a,b) {
        return b.list_id - a.list_id;
    })
    setMatchData(matches);
    setShow(true);
    setBetInMatch(betInMatch);
    setBotId(botId);
  }

  const MockItem = ({ bot }) => {
    return (
      <BotCard
        showMatchData={showMatchData}
        bot={bot}
        dataBotStatus={dataBotStatus}
        setDataBotStatus={setDataBotStatus}
        haveUser={haveUser}
        user={props.user}
      />
    );
  };

  return (
    <>
      <BotFilter 
        canFilter={canFilter}
        setCanFilter={setCanFilter}
        setdataBotUI={setdataBotUI}
        setInFilterMode={setInFilterMode}
        setFilter={setFilter}
      />
      <Container gap={2} fluid className={styles["base-layout"]}>
        <div className={styles["h1-title"]}>
          <h1>Martingale Bot Streaks</h1>
          <p>
          - Here we have many football Prediction Matches. They are generated automatically by an AI Bot. <br/>
          - Free predictions for main and minor football leagues are updated every day. <br/>
          - Free analysis and statistics, the latest results will be updated instantly.<br/>
          - Check out all of our guides here.
          </p>
        </div>
        <Row className={styles["bot-background"]}>
          {dataBotUI.map( (bot) => {
              return (
                  <Col key={"col-" + bot.entity_id} xs={12} lg={4} xl={4} className="mb-5">
                    <MockItem bot= {bot} />
                  </Col>
              )
            })
          }
          {/* paging */}
          <BotPagination
            canFilter={canFilter}
            setPage={setPage}
          />
          {/* end paging */}
        </Row>
        <ListModal
          matchdata={matchdata}
          botId={botId}
          betInMatch={betInMatch}
          show={show} 
          handleClose={handleClose} 
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.userState.user };
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AllBot);