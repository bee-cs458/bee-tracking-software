import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import RecordRow from "../CheckInUtilities/RecordRow";

export default function RecordTable(props) {
  return (
    <div>
      {props.records != null && props.records.length > 0 ? (
        <div>
          <Table striped bordered>
            <thead>
              <tr>
                <td>Student</td>
                <td>Check Out</td>
                <td>Assets</td>
                <td>Due Date</td>
                <td>Check In</td>
                <td>Notes</td>
                {/* <td>Damage</td> */}
              </tr>
            </thead>
            <tbody>
              {props.assets != null &&
                props.records.map((record) => (
                  <RecordRow key={record.asset_tag} item={record}></RecordRow>
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
