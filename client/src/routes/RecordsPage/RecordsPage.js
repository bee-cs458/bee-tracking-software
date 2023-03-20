import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import { AccountLink } from "../../components/AccountLink/AccountLink.js";
import { useOutletContext } from "react-router-dom";

import CheckoutRecordCSV from "../../components/ExportCSV/ExportRecordsCSV.js";

export default function RecordsPage() {
  const [theme, setTheme] = useOutletContext();

  return (
    <div className="App">
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>

      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">             
              {localStorage.getItem("userPerms") === "2" ? (
                <CheckoutRecordCSV></CheckoutRecordCSV>
              ) : (
                <></>
              )}
            </div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
          </div>         
        </div>

        <div className="record-table">
          <RecordTable 
            variant={theme}
          ></RecordTable>
        </div>        
      </div>

    </div>
  );
}
