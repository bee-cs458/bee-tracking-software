import * as React from "react";

import "./CheckedOutSwitch.css";

const CheckedOut = (props) => {
  const checked = props.state;
  const setChecked = props.update;

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="filter-check">
      <Checkbox
        label="  Only Show Checked Out Records"
        value={checked}
        onChange={handleChange}
      />
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default CheckedOut;
