import * as React from 'react';

import './CheckedOutSwitch.css';
/*
<div class="checkedout">
<div class="switch_box checkedout">
  <div class="input_wrapper">
    <input type="checkbox" id="checkedOut" class="FilterByCheckedOut"></input>
    <svg class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
    <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
  </svg>
    <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
    <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
  </svg>
    </div>
</div>
</div>
*/


const CheckedOut = (props) => {
    const checked = props.state;
    const setChecked = props.update;
  
    const handleChange = () => {
      setChecked(!checked);
      console.log("Filtered By Checked Out");
    };
  
    return (
      <div className="filter-check">
        <Checkbox
          label="  Filter By Checked Out"
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