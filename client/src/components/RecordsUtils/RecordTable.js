import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import RecordRow from "./RecordRow";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllRecords } from "../../api/RecordService";
import { getAllAssets } from "../../api/AssetService";
import { getAllUsers } from "../../api/UserService";
import { useOutletContext } from "react-router-dom";

export default function RecordTable(props) {
  const [records, setRecords] = useState();
  const [users, setUsers] = useState([{}]);
  const [assets, setAssets] = useState([{}]);
  const [show, setShow] = useState(false); // Modal Show State
  const [printInfo, setPrintInfo] = useState(""); // Info from the row for printing
  const [theme, setTheme] = useOutletContext();

  // Gets the information from the server
  // Dependant on the prop of if the checkbox for viewing only checked-out is selected
  // If it is, the records are set to be filtered by checked out
  // Gets the users and assets normally
  const getInfo = async () => {
    let allRecords = await getAllRecords();

    if (props.inputVal !== "") {
      allRecords = allRecords.filter(
        (record) =>
          record.student_id.toString().toLowerCase().includes(props.inputVal) ||
          record.operator_id
            .toString()
            .toLowerCase()
            .includes(props.inputVal) ||
          record.asset_tag.toString().toLowerCase().includes(props.inputVal.toLowerCase())
          
      );
    }
    //Filters Records table by only checked out items
    if (props.filterByCheckedOut) {
      allRecords = allRecords.filter((record) => record.in_date === null);
    }
    //Filters Records Table by range of selected dates
     if (props.startDate) {
      allRecords = allRecords.filter((record) => record.due_date >= props.startDate);
    } 
     if (props.endDate) {
      const selectedDate = new Date(props.endDate);
      selectedDate.setDate(selectedDate.getDate() + 1);
      allRecords = allRecords.filter((record) => record.due_date <= selectedDate.toISOString().slice(0, 10));
    }

    setRecords(allRecords);

    const allUsers = await getAllUsers();
    setUsers(allUsers);

    const allAssets = await getAllAssets();
    setAssets(allAssets);
  };

  // Close modal
  const handleClose = () => {
    setShow(false);
  };

  const today = new Date();

  // Filter the information when the checkbox is selected
  useEffect(() => {
    getInfo();
  }, [props]);

  /**
   * Determines whether to render the table of records or the error message
   * Depending on whether the "records" state has values
   * @returns JSX of the record table or the error message
   */
  function getTable() {
    if (Array.isArray(records) && records.length > 0) {
      return (
        <div>
          <Table bordered striped hover variant={theme}>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Asset Tag</th>
                <th>Student ID</th>
                <th>Operator ID</th>
                <th>Due Date</th>
                <th width="40"></th>
                {/* row for the arrow icon*/}
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <RecordRow
                  variant={
                    theme
                  } /*passes through the dark mode variable*/
                  key={record.record_id}
                  record={record}
                  damageNotes={
                    assets.find((obj) => {
                      return obj.asset_tag === record.asset_tag;
                    }) !== undefined
                      ? assets.find((obj) => {
                          return obj.asset_tag === record.asset_tag;
                        }).damage_notes
                      : "Loading Asset Tag..."
                  }
                  assetName={
                    assets.find((obj) => {
                      return obj.asset_tag === record.asset_tag;
                    }) !== undefined
                      ? assets.find((obj) => {
                          return obj.asset_tag === record.asset_tag;
                        }).name
                      : "Loading Asset Tag..."
                  }
                  userName={
                    users.find((obj) => {
                      return obj.user_id === record.student_id;
                    }) !== undefined
                      ? users.find((obj) => {
                          return obj.user_id === record.student_id;
                        }).first_name +
                        " " +
                        users.find((obj) => {
                          return obj.user_id === record.student_id;
                        }).last_name
                      : "Loading Student Name..."
                  }
                  opName={
                    users.find((obj) => {
                      return obj.user_id === record.operator_id;
                    }) !== undefined
                      ? users.find((obj) => {
                          return obj.user_id === record.operator_id;
                        }).first_name +
                        " " +
                        users.find((obj) => {
                          return obj.user_id === record.operator_id;
                        }).last_name
                      : "Loading Student Name..."
                  }
                  date={today}
                  setShow={setShow} // Allow row to show modal
                  setPrintInfo={setPrintInfo} // Allow row to set print info
                ></RecordRow>
              ))}
            </tbody>
          </Table>

          {/* Modal to show information for printing */}
          <Modal show={show} keyboard={false} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Print Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                // Parse string as html from the child
                <div
                  dangerouslySetInnerHTML={{
                    __html: printInfo.replaceAll(",", ""),
                  }}
                />
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {/* Print modal with information */}
              <Button
                className="beets_buttons"
                variant="primary"
                onClick={window.print}
              >
                Print Check Out Record
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      return <Alert variant="warning">No records found!</Alert>;
    }
  }
  return (
    <div>
      <>{getTable()}</>
    </div>
  );
}
