import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { getBestBotUIHomepage, getBotStatusData } from '../../../model/entity/bot';
import BotCard from "../bot/Card";
import Button from 'react-bootstrap/Button';
import Link from "@mui/material/Link";

function BestStreak(props) {
    const BOT_ENTITY_ID = 'entity_id';
    const [dataBestBotUI, setDataBestBotUI] = useState([]);
    const [haveUser, setHaveUser] = useState(false);
    const showMatchData = false;
    const [dataBotStatus, setDataBotStatus] = useState({});

    useEffect(() => {
        if (typeof props.user === 'object' && props.user !== null) {
          setHaveUser(true);
        }
    }, [props.user]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getBestBotUIHomepage();
            setDataBestBotUI(data);
        }
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        if (dataBestBotUI.length > 0) {
          let email = '';
          if (typeof props.user === 'object' && props.user !== null) {
            email = props.user.email;
          }
          const fetchBotStatusData = async (botIds) => {
            const botStatus = await getBotStatusData(botIds, email);
            setDataBotStatus(botStatus);
          }
    
          let botIds = [];
          for (let idx in dataBestBotUI) {
            botIds.push(dataBestBotUI[idx][BOT_ENTITY_ID])
          }
    
          fetchBotStatusData(botIds).catch(console.error);
        }
      }, [dataBestBotUI, props.user]);

    return (
        <Container gap={2}>
            <div className='h2 text-center mb-3 text-light font-weight-bold'>High Rate Winning Martingale Bot</div>
            <Row>
            {dataBestBotUI.map( (bot) => {
                return (
                    <Col key={"col-" + bot.entity_id} xs={12} lg={4} xl={4} className="mb-5">
                        <BotCard
                            showMatchData={showMatchData}
                            bot={bot}
                            dataBotStatus={dataBotStatus}
                            setDataBotStatus={setDataBotStatus}
                            haveUser={haveUser}
                            user={props.user}
                        />
                    </Col>
                )
                })
            }
            </Row>
            <Link color="inherit" href="/bot">
              <Button variant="outline-light" className='p-3'>View More Details ...</Button>
            </Link>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return { user: state.userState.user };
  }
  
  const mapDispatchToProps = (dispatch) => ({
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(BestStreak);