import { useEffect, useState } from "react";
import {
  getAssetFromCat,
  getAllAssets,
  searchingForAssets,
} from "../../api/AssetService";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { AccessControl } from "../../components/AccessControl/AccessControl";
import { Ranks } from "../../constants/PermissionRanks";
import AssetRow from "./AssetRow/AssetRow";

export default function AssetTable(props) {
  const { selectList, setSelectList } = props;
  const [assets, setAssets] = useState([]);
  const [updated, setUpdated] = useState(false);
  const setUp = () => {
    setUpdated(!updated);
  };

  useEffect(() => {
    async function assetTableInit() {
      let assetResults = [];

      if (props.cat >= 0 && props.input !== undefined && props.input !== "") {
        // If category and input search are both present
        const categoryAssets = await getAssetFromCat(props.cat);
        assetResults = categoryAssets.filter(
          (asset) =>
            asset.asset_tag
              .toString()
              .toLowerCase()
              .includes(props.input.toLowerCase()) ||
            asset.name
              .toString()
              .toLowerCase()
              .includes(props.input.toLowerCase()) ||
            asset.description
              .toString()
              .toLowerCase()
              .includes(props.input.toLowerCase())
        );
      } else if (props.cat >= 0) {
        // If only category is present
        assetResults = await getAssetFromCat(props.cat);
      } else if (props.input !== undefined && props.input !== "") {
        // If only input search is present
        assetResults = await searchingForAssets(props.input);
      } else {
        // If no filters are applied, just get all assets
        assetResults = await getAllAssets();
      }
      setAssets(assetResults); // Set the assets data table to be the queried result
    }
    //Render which rows need to be selected

    assetTableInit(); // Render that son of a gun
  }, [props.cat, props.input, props.filterByCheckedOut, updated]);

  return (
    <div>
      {assets != null && assets.length > 0 ? (
        <div>
          <Table striped bordered variant={props.variant} hover>
            <thead>
              <tr>
              <AccessControl allowedRank={Ranks.OPERATOR}>
                <td width="50px">Cart</td>
              </AccessControl>
                <td width="100px">Tag</td>
                <td width="200px">Name</td>
                <td width="400px">Description</td>
                <td width="200px">Date Added</td>
                <td width="150px">Category</td>
                <td width="150px">Available</td>
                <AccessControl allowedRank={Ranks.OWNER}>
                <td></td>
                </AccessControl>
              </tr>
            </thead>
            <tbody>
              {props.filterByCheckedOut
                ? assets
                    .filter((asset) => asset.checked_out === 0)
                    .map((asset) => (
                      <AssetRow
                        key={asset.asset_tag}
                        item={asset}
                        setUp={setUp}
                        selectList={selectList}
                        setSelectList={setSelectList}
                        categoryList={props.categoryList}
                      ></AssetRow>
                    ))
                : assets.map((asset) => (
                    <AssetRow
                      key={asset.asset_tag}
                      item={asset}
                      setUp={setUp}
                      selectList={selectList}
                      setSelectList={setSelectList}
                      categoryList={props.categoryList}
                    ></AssetRow>
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
