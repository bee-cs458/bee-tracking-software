import * as React from "react";

import { Dropdown } from "react-bootstrap";

const CheckedOut = (props) => {
  const checked = props.state;
  const setChecked = props.update;

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Dropdown.Item active={checked} onClick={handleChange}>
      Filter by Available
    </Dropdown.Item>
  );
};

export default CheckedOut;
