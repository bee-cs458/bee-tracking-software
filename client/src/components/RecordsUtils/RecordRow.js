import { useEffect, useState } from "react";
import { getAssetByAssetTag } from "../../api/AssetService";
import { getUserById } from "../../api/UserService";
import "./RecordRow.css";

export default function CheckInRow(props) {
  const record = props.data;
  const [user, setUser] = useState({ first_name: "Loading User..." });
  const [asset, setAsset] = useState({ name: "Loading Asset..." });
  const [overDue, setOverDue] = useState("notOverdue");

  const getInfo = async () => {
    await getUserById(record.student_id).then((result) => {
      setUser(result[0]);
    });
    await getAssetByAssetTag(record.asset_tag).then((result) => {
      setAsset(result[0]);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <tr className={overDue}>
      <td>{user.first_name + " " + user.last_name}</td>
      <td>{record.out_date}</td>
      <td>{asset.name}</td>
      <td>{record.due_date}</td>
      <td>{record.in_date}</td>
      <td>{record.notes}</td>
    </tr>
  );
}

{
  /* <td>Student</td>
<td>Check Out</td>
<td>Assets</td>
<td>Due Date</td>
<td>Check In</td>
<td>Notes</td> */
}
