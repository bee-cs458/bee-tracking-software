import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import { AccountLink } from "../../components/AccountLink/AccountLink.js";
import { useOutletContext } from "react-router-dom";
import CheckedOut from "../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutRecords.js";
import React, { useState } from "react";

export default function RecordsPage() {
  const theme = useOutletContext();
  const [checked, setChecked] = useState(false);
  const [selectList, setSelectList] = useState([]);

  function clearSelection() {
    sessionStorage.clear();
    setSelectList([]);
  }

  return (
    <>
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>
      <div className="main-content">
        <CheckedOut state={checked} update={setChecked} />
        <RecordTable
          variant={theme}
          filterByCheckedOut={checked}
          selectList={selectList}
          setSelectList={setSelectList}
        />
      </div>
    </>
  );
}
