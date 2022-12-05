import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import { useState } from "react";

export default function RecordsPage() {

  return (
    <>
      <div className="header-container"></div>
      <div className="main-content">
        <RecordTable></RecordTable>
      </div>
    </>
  );
}
