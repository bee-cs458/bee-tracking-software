import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import AssetRow from "./AssetRow/AssetRow";

export default function AssetTable(props) {

  return (
    <div>

      {(props.assets != null && props.assets.length > 0) ? (
        <div>
          <Table striped bordered>
            <thead>
              <tr>
                <td>Tag</td>
                <td>Name</td>
                <td>Description</td>
                <td>Date Added</td>
                <td>Category</td>
                <td>Checked Out</td>
                <td>Due Date</td>
              </tr>
            </thead>
            <tbody>
              {props.assets != null &&
                props.assets.map((asset) => (
                  <AssetRow key={asset.asset_tag} item={asset}></AssetRow>
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