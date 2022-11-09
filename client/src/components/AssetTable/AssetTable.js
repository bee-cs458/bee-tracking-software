import { useEffect, useState } from "react";
import {
  getAssetFromCat,
  getAllAssets,
  searchingForAssests
} from "../../api/AssetService";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import AssetRow from "./AssetRow/AssetRow";


export default function AssetTable(props) {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function assetTableInit() {
      let assetResults = 0;
      console.log(props.cat);
      if (props.cat >= 0) {
        // Check if category is selected
        assetResults = await getAssetFromCat(props.cat); // Then only query for that category
      } else if (props.input !== null && props.input !== "") {
        //Include search results for asset_tags/descriptions/names
        assetResults = await searchingForAssests(props.input);
        setAssets(assetResults); // Set the assets data table to be the queried result
      } else {
        assetResults = await getAllAssets(); // If no filters are applied, just get all assets
      }
      setAssets(assetResults); // Set the assets data table to be the queried result
    }
    assetTableInit(); // Render that son of a gun
  }, [props.cat, props.input, props.filterByCheckedOut]);

  return (
    <div>

      {(assets != null && assets.length > 0) ? (
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
                {props.filterByCheckedOut?
                    assets.filter( asset => asset.checked_out === 1).map((asset) => (
                        <AssetRow key={asset.asset_tag} item={asset}></AssetRow>
                ))
                :
                    assets.map((asset) => (
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