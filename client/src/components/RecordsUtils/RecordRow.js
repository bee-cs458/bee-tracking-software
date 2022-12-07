import { useEffect, useState } from "react";
import { getAssetByAssetTag } from "../../api/AssetService";
import { getUserById } from "../../api/UserService";
import "./RecordRow.css";

export default function CheckInRow(props) {
  const record = props.record;

  const dueDate = new Date(record.due_date);

  return (
    <tr style={{ background: props.date > dueDate && !record.in_date ? "#ffb9b9" : "" }}>
      <td>{props.userName}</td>
      <td>{record.out_date}</td>
      <td>{props.assetName}</td>
      <td>{record.due_date}</td>
      <td>{record.in_date}</td>
      <td>{record.notes}</td>
    </tr>
  );
}
