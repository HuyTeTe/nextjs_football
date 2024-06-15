import React from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styles from "../../../styles/bot/bot.module.scss";
import Table from 'react-bootstrap/Table';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { connect } from 'react-redux';
import { saveBotUser } from "../../../model/entity/bot";

function BotCard(props) {
    const BET_IN_MATCH = 'bet_in_match';
    let bot = props.bot;
    let dataBotStatus = props.dataBotStatus;
    let betInMatch;
    const renderTooltip = (props) => (
      <Tooltip {...props}>
        For odd equal 0, will get the team have higher position as the stronger!
      </Tooltip>
    );

      //process add bot user
  const addBotUser = async (botId, action) => {
    let email = props.user.email;
    const result = await saveBotUser(email, botId, action);
    
    if (result !== true || !dataBotStatus.hasOwnProperty("bot_of_user")) {
      return;
    }
    let newDataBot = JSON.parse(JSON.stringify(dataBotStatus));
    if (action === "remove") {
      newDataBot.bot_of_user = removeElemArray(newDataBot.bot_of_user, botId);
    } else if (action === "add") {
      newDataBot.bot_of_user.push(botId);
    }
    props.setDataBotStatus(newDataBot);
  }

  const removeElemArray = (arr, value) => {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }
   // end process add bot user
  return (
    <Card className={styles["card-attribute"]}>
      <Card.Header className="h3 text-center">{bot.name} 
        {
          props.haveUser ? 
              dataBotStatus.hasOwnProperty("bot_of_user") && dataBotStatus.bot_of_user.includes(bot.entity_id) ? (
                <button 
                  className={styles["btn-user-bot"]}
                  onClick={() => addBotUser(bot.entity_id, "remove").catch(console.error)}
                >-</button>
              ) : (
                <button
                  className={styles["btn-user-bot"]}
                  onClick={() => addBotUser(bot.entity_id, "add").catch(console.error)}
                >+</button>
              )
           : (
            <></>
          )
        }
      </Card.Header>
      <Card.Body>
        <Table striped hover variant="dark" className="overflow-auto mw-100">
          <thead>
            <tr>
              <th className="text-center">Match Attribute</th>
              <th className="text-center">Value</th>
            </tr>
          </thead>
          <tbody>
            {bot["botEavValues"].map((eav) => {
              try {
                let value = JSON.parse(eav.value);
                let firstKey = Object.keys(value)[0];
                if (firstKey === BET_IN_MATCH) {
                  betInMatch = value[firstKey][0];
                }
                return (
                  <tr key={eav.value_id}>
                    <td className="text-center">
                      {firstKey}&nbsp;
                      {
                        (firstKey === 'odd' && value[firstKey].includes(0)) ?
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <TipsAndUpdatesIcon className="text-info h6" />
                        </OverlayTrigger> : 
                        <></>
                      }
                    </td>
                    <td className="text-center">{value[firstKey].join(" | ")}</td>
                  </tr>
                );
              } catch(err) {

              }
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between">
          {dataBotStatus.hasOwnProperty(bot["entity_id"]) ? (
            <Button className="bg-white btn-outline-light p-3 text-black font-weight-bold">
              <span className={styles["win-status"]}>
                W:{dataBotStatus[bot["entity_id"]]?.win ?? 0}
              </span>{" "}
              -{" "}
              <span className={styles["lose-status"]}>
                L:{dataBotStatus[bot["entity_id"]]?.lose ?? 0}
              </span>
            </Button>
          ) : (
            <Button className="bg-white btn-outline-light p-3 text-black font-weight-bold">
              <span className={styles["win-status"]}>W:0</span> -{" "}
              <span className={styles["lose-status"]}>L:0</span>
            </Button>
          )}
          {
            props.showMatchData === false ?
            <></> :
            <Button
              variant="outline-info"
              className="text-white border-4"
              onClick={() =>
                props.showMatchData(bot["botList"], betInMatch, bot["name"])
              }
            >
              View Lists Bot
          </Button>
          }
        </div>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return { user: state.userState.user };
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BotCard);
