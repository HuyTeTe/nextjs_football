import React from "react";
import Form from 'react-bootstrap/Form';

function BaseFilter(props) {
  let baseFilterOption = props.baseFilterOption;
  return (
    <>
      <Form.Select 
        className="mb-4"
        disabled={(props.canFilter)? "" : "disabled"}
        onChange={e => props.setBaseFilterOption(e.target.value)}
      >
        <option value="">No filter</option>
        <option value="most_win_rate" selected={baseFilterOption === "most_win_rate" ? true : false}>Most winning rate</option>
        <option value="most_lose_rate" selected={baseFilterOption === "most_lose_rate" ? true : false}>Most losing rate</option>
        <option value="cannot_win_half" selected={baseFilterOption === "cannot_win_half" ? true : false}>Cannot win half</option>
      </Form.Select>
    </>
  );
}

export default BaseFilter;
