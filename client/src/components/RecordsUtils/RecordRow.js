import "./RecordRow.css";
import { useState } from "react";

export default function CheckInRow(props) {
  const record = props.record;
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const dueDate = new Date(record.due_date);

  function formatDate(input) {
    if (input != null) {
      const dateValues = input.split("T")[0];
      const [year, month, day] = dateValues.split("-");
      const formattedDate = [month, "/", day, "/", year];
      return formattedDate;
    } else {
      return input;
    }
  }

  const rowClicked = () => {
    toggleExpanded();
  };

  /**
   * <td>{props.userName}</td>
      <td>{props.opName}</td>
      <td>{formatDate(record.out_date)}</td>
      <td>{props.assetName}</td>
      <td>{formatDate(record.in_date)}</td>
      <td>{record.notes}</td>
   */

  return (
    <>
      <tr
        style={{
          background:
            record.in_date === null
              ? props.date > dueDate && !record.in_date
                ? "#ffb9b9"
                : "#55ff77"
              : "",
        }}
        onClick={() => rowClicked()}
      >
        <td>{record.record_id}</td>
        <td>{record.asset_tag}</td>
        <td>{record.student_id}</td>
        <td>{record.operator_id}</td>
        <td>{formatDate(record.due_date)}</td>
      </tr>
      {expanded ? (
        <tr className="dropdown">
          <td colSpan="5">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <span>
                    <b>Asset: </b>
                  </span>
                  {props.assetName}
                  <br />
                  <span>
                    <b>Student: </b>
                  </span>
                  {props.userName}
                  <br />
                  <span>
                    <b>Operator: </b>
                  </span>
                  {props.opName}
                </div>
                <div className="col">
                  <span>
                    <b>Checked Out:</b>
                  </span>
                  {formatDate(record.out_date)}
                  <br />
                  <span>
                    <b>Checked In:</b>
                  </span>

                  {record.in_date ? formatDate(record.in_date) : <>Still out</>}
                </div>
              </div>
            </div>
            <span>
              <b>Notes: </b>
            </span>
            {props.notes}
            <br />
            {props.damageNotes}
            {}
          </td>
        </tr>
      ) : null}
    </>
  );
}
