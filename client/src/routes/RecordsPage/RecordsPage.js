import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import { useOutletContext } from "react-router-dom";
import CheckedOut from "../../components/CheckedOut.js";

export default function RecordsPage() {
  const [theme, setTheme] = useOutletContext();
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="header-container"></div>
      <div className="main-content">
        <CheckedOut></CheckedOut> {/*todo, add parameters here */}
        <RecordTable variant={theme}></RecordTable>
      </div>
    </>
  );
}
