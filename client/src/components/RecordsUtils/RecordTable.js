import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import RecordRow from "./RecordRow";
import { useState, useEffect } from "react";
import { getAllRecords } from "../../api/RecordService";

export default function RecordTable() {
  const [records, setRecords] = useState();

  const getRecords = async () => {
    await getAllRecords().then((result) => {
      setRecords(result);
    });
  };

  var today = new Date();

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div>
      {records != null && records.length > 0 ? (
        <div>
          <Table bordered>
            <thead>
              <tr>
                <th>Student</th>
                <th>Check Out</th>
                <th>Asset</th>
                <th>Due Date</th>
                <th>Check In</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {records != null &&
                records.map((record) => (
                  <RecordRow key={record.record_id} data={record} date={today}></RecordRow>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="warning">No records found!</Alert>
      )}
    </div>
  );
}
