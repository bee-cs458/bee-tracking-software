import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { getAssetByAssetTag } from "../../api/AssetService";
// import getAllRecords from "";

export default function CheckInRow(props) {
  const record = props.data;
  const [user, setUser] = useState();
  const [asset, setAsset] = useState();

  // To Be Implemented
  // const getUser = async () => {
  //   await getUserByID(record.student_id).then((result) => {
  //     setUser(result);
  //   })
  // };

  const getAsset = async () => {
    await getAssetByAssetTag(record.asset).then((result) => {
      setAsset(result);
    })
  }

  // getUser();
  getAsset();

  return (
    <tr>
      <td>{user.first_name + " " + user.last_name}</td>
      <td>{record.out_date}</td>
      <td>{+asset.name}</td>
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
