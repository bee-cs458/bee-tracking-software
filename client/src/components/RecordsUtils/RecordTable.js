import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import RecordRow from "./RecordRow";
import { useState } from "react";

export default function RecordTable() {
  const [records, setRecords] = useState([
    {
      record_id: "John",
      out_date: "Doe",
      in_date: 44,
      notes: "hi",
    },
    {
      record_id: "jane",
      out_date: "corn",
      in_date: 50,
      notes: "blue",
    },
  ]);

  return (
    <div>
      {records != null && records.length > 0 ? (
        <div>
          <Table striped bordered>
            <thead>
              <tr>
                <td>Student</td>
                <td>Check Out</td>
                <td>Asset</td>
                <td>Due Date</td>
                <td>Check In</td>
                <td>Notes</td>
              </tr>
            </thead>
            <tbody>
              {records != null &&
                records.map((record) => (
                  <RecordRow
                    key={record.record_id}
                    data={record}
                  ></RecordRow>
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
