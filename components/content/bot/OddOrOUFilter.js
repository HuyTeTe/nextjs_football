import React from "react";
import Form from 'react-bootstrap/Form';
import styles from "../../../styles/bot/bot.module.scss";

function OddOrOUFilter(props) {
  return (
    <>
      <Form.Select
        className="mb-4"
        disabled={(props.canFilter)? "" : "disabled"}
        onChange={e => props.setOnlyOddOrOU(e.target.value)}
      >
        <option value="">No filter</option>
        <option value="odd" selected={props.onlyOddOrOU === "odd" ? true : false}>Only odd</option>
        <option value="ou" selected={props.onlyOddOrOU === "ou" ? true : false}>Only over/under</option>
      </Form.Select>
    </>
  );
}

export default OddOrOUFilter;
