import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import { AccountLink } from "../../components/AccountLink/AccountLink.js";
import { useOutletContext } from "react-router-dom";

export default function RecordsPage() {
  const theme = useOutletContext();

  return (
    <>
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>
      <div className="main-content">
        <RecordTable variant={theme}></RecordTable>
      </div>
    </>
  );
}
