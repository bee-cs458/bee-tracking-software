import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import CheckInRow from "../CheckInUtilities/CheckInRow";

export default function CheckInTable(props) {
  return (
    <div>
      {props.assets != null && props.assets.length > 0 ? (
        <div>
          <Table striped bordered>
            <thead>
              <tr>
                <td>Damaged</td>
                <td>Tag</td>
                <td>Name</td>
                <td>Category</td>
                <td>Due Date</td>
                <td>Damage Notes</td>
              </tr>
            </thead>
            <tbody>
              {props.assets != null &&
                props.assets.map((asset) => (
                  <CheckInRow key={asset.asset_tag} item={asset}></CheckInRow>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="warning">No assets found!</Alert>
      )}
    </div>
  );
}
