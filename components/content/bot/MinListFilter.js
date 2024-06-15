import React from "react";
import Form from 'react-bootstrap/Form';
import styles from "../../../styles/bot/bot.module.scss";

function MinListFilter(props) {
  return (
    <div className="mb-4">
      <Form.Control
        type="number"
        id="inputMinListFilter"
        value={props.minListFilter ? props.minListFilter : ""}
        onChange={e => props.setMinListFilter(e.target.value)}
        disabled={(props.canFilter)? "" : "disabled"}
      />
      <Form.Text muted>
        The min list number of bot
      </Form.Text>
    </div>
  );
}

export default MinListFilter;
