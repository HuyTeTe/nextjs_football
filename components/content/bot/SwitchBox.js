import React from "react";
import { useState } from "react";
import Switch from '@mui/material/Switch';
import Form from 'react-bootstrap/Form';

function SwitchBox(props) {
    // switch box filter have match on list today or not 
    return (
        <div>
            <Form.Control
                type="number"
                id="inputMinListFilter"
                value={props.matchDoneInList >= 0 ? props.matchDoneInList : ""}
                onChange={e => props.setMatchDoneInList(e.target.value)}
            />
            <Form.Text muted>
                Total match have done in bot list!
            </Form.Text>
        </div>
    );
}

export default SwitchBox;
