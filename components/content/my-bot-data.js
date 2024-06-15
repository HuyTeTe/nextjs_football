import { useEffect, useState } from "react";
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../../styles/bot/bot.module.scss";
import { getMyBotUI, getBotStatusData } from '../../model/entity/bot'
import ListModal from "./bot/ListModal";
import BotCard from "./bot/Card";
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { NOT_LOGIN } from "../../actions/actionType";
import BotPagination from "./bot/BotPagination";

function MyBotData(props) {
  const BOT_ENTITY_ID = 'entity_id';
  const [dataBotUI, setdataBotUI] = useState([]);
  const [dataBotStatus, setDataBotStatus] = useState({});
  const [show, setShow] = useState(false);
  const [matchdata, setMatchData] = useState([]);
  const [betInMatch, setBetInMatch] = useState('');
  const [botId, setBotId] = useState('');
  const [canFilter, setCanFilter] = useState(false);
  const [haveUser, setHaveUser] = useState(false);
  const [test, setTest] = useState(false);
  const [page, setPage] = useState(1);
  const [curPage, setCurPage] = useState(0);
  const handleClose = () => setShow(false);
  const user = props.user;
  const router = useRouter();

  if (user == NOT_LOGIN) {
    router.push("/");
  }

  useEffect(() => {
    if (typeof props.user === 'object' && props.user !== null && props.user.hasOwnProperty("email") && page != curPage) {
      const fetchData = async () => {
        const data = await getMyBotUI(props.user.email, page);
        setdataBotUI(data);
      }
      setCanFilter(false);
      fetchData().catch(console.error);
      setCanFilter(true);
      setHaveUser(true);
      setCurPage(page);
    }
  }, [props.user, page]);

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
        test={test}
      />
    );
  };

  return (
    <Container gap={2} className={styles["base-layout"]} fluid>
      <Row className={styles["bot-background"]}>
        {
          dataBotUI.map( (bot) => {
            return (
                <Col xs={12} lg={4} xl={4} className="mb-5">
                  <MockItem bot= {bot} />
                </Col>
            )
          })
        }
      </Row>
      <BotPagination
        canFilter={canFilter}
        setPage={setPage}
      />
      <ListModal
        matchdata={matchdata}
        botId={botId}
        betInMatch={betInMatch}
        show={show} 
        handleClose={handleClose} 
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { user: state.userState.user };
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MyBotData);