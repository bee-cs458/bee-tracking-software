import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import { useOutletContext } from "react-router-dom";

export default function RecordsPage() {
  const [theme, setTheme] = useOutletContext();

  return (
    <>
      <div className="header-container"></div>
      <div className="main-content">
        <RecordTable variant={theme}></RecordTable>
      </div>
    </>
  );
}
