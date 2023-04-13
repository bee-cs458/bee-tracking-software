import * as React from "react";

import "./CheckedOutSwitch.css";

const CheckedOut = (props) => {
  const checked = props.state;
  const setChecked = props.update;

  const handleChange = () => {
    setChecked(!checked);
    //console.log("Filtered By Checked Out");
  };

  return (
    <div className="filter-check">
      <Checkbox
        label="  Available Only"
        value={checked}
        onChange={handleChange}
      />
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <div id="inputPreview">
      <input name="cssCheckbox" id="checkedout" type="checkbox" className="css-checkbox" checked={value} onChange={onChange} />
      <label for="checkedout">{label}</label>
    </div>
  );
};

export default CheckedOut;
