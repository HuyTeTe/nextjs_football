import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../../../styles/bot/bot.module.scss";
import { processMatchResult } from "../../../model/bot/processor";

function ListModal(props) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  var offset = new Date().getTimezoneOffset();
  const timeResolver = (datetime) => {
    let matchTime = new Date(datetime);
    let hoursDiff = matchTime.getHours() - matchTime.getTimezoneOffset() / 60;
    matchTime.setHours(hoursDiff);
    return matchTime.toLocaleString("es-MX", timeZone);
  };
  return (
    <Modal
      matchdata={props.matchdata}
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className={styles["base-layout"]}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>LIST OF {props.botId}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-0 overflow-auto p-1">
        <Table striped hover variant="dark" className="mw-100">
          <thead>
            <tr className="text-center">
              <th>Time/Teams</th>
              <th>Odd/OU</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.matchdata.map((data) => {
              return (
                <React.Fragment key={"list-" + data.list_id}>
                  <tr className="text-center align-middle border-bottom border-white h2">
                    <td colSpan={4} className={styles["list-title"]}>
                      LIST {data.list_id}
                    </td>
                  </tr>
                  {data["items"].map((item) => {
                    let homeResult = item.match.matchResult?.home_result;
                    let awayResult = item.match.matchResult?.away_result;
                    let odd = item.match.odd;
                    let overUnder = item.match.over_under;
                    let homePosition = item.match.home_position;
                    let awayPosition = item.match.away_position;
                    let resultData = processMatchResult(
                      props.betInMatch,
                      homeResult,
                      awayResult,
                      homePosition,
                      awayPosition,
                      odd,
                      overUnder
                    );
                    return (
                      <React.Fragment key={"match-" + item.match.entity_id}>
                        <tr
                          className="text-center align-middle"
                        >
                          {item.match.league != null ? (
                            <td colSpan="3" className={styles["league-time-title"]}>{item.match.league.name} <br /> {timeResolver(item.match.datetime)}</td>
                          ) : (
                            <td colSpan="3" className={styles["league-time-title"]}>{timeResolver(item.match.datetime)}</td>
                          )}
                          {item.match.matchResult == null ? (
                            <td rowSpan={2} className="fw-bold border border-success"></td>
                          ) : (
                            <td rowSpan={2} className={styles[resultData[1]]}>
                              {resultData[0]}
                            </td>
                          )}
                        </tr>
                        <tr
                          className="text-center align-middle"
                        >
                          <td>
                            <span className="fw-bold">
                              {item.match.home_name}
                            </span>
                            <br />
                            vs
                            <br />
                            <span className="fw-bold">
                              {item.match.away_name}
                            </span>
                          </td>
                          <td>
                            <span className="fw-bold">{odd}</span>
                            <br />
                            <span className="fw-bold">{overUnder}</span>
                          </td>
                          {item.match.matchResult == null ? (
                            <td className="fw-bold">Not Finish</td>
                          ) : (
                            <td className="fw-bold">
                              {homeResult}
                              <br />
                              {awayResult}
                            </td>
                          )}
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ListModal;
