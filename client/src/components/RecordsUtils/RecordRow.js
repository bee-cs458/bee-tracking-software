import "./RecordRow.css";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function CheckInRow(props) {
  const record = props.record;
  // declare functions and var from the parent for ipc
  const setShow = props.setShow;
  const setPrintInfo = props.setPrintInfo;
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

  const handleShow = () => {
    // Create the formatted information to be sent back to the parent for printing
    var output =
      "<table><tr><td>Student:</td><td>" +
      props.userName +
      "</td></tr><tr><td>Out Date:</td><td>" +
      formatDate(record.out_date) +
      "</td></tr><tr><td>Asset Name:</td><td>" +
      props.assetName +
      "</td></tr><tr><td>Due Date:</td><td>" +
      formatDate(record.due_date) +
      "</td></tr><tr><td>In Date:</td><td>" +
      formatDate(record.in_date) +
      "</td></tr><tr><td>Notes:</td><td>" +
      record.notes +
      "</td></tr></table>";
    setPrintInfo(output);
    setShow(true);
  };

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
        <tr className="dropdown01">
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
                    <b>Checked Out: </b>
                  </span>
                  {formatDate(record.out_date)}
                  <br />
                  <span>
                    <b>Checked In: </b>
                  </span>

                  {record.in_date ? formatDate(record.in_date) : <>Still out</>}
                  <br />
                  <Button onClick={handleShow}>Print Record</Button>
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
