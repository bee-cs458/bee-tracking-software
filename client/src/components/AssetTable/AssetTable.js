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
import { useOutletContext } from "react-router-dom";

export default function AssetTable(props) {
  const { selectList, setSelectList } = props;
  const [assets, setAssets] = useState([]);
  const { updated, setUpdated } = props;
  const setUp = () => {
    setUpdated(!updated);
  };
  const [theme, setTheme] = useOutletContext();

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
  }, [
    props.cat,
    props.input,
    props.filterByCheckedOut,
    props.filterByCart,
    updated,
  ]);

  return (
    <div>
      {assets != null && assets.length > 0 ? (
        <div>
          <Table striped bordered variant={theme} hover>
            <thead>
              <tr>
                <AccessControl allowedRank={Ranks.OPERATOR}>
                  <td>Cart</td>
                </AccessControl>
                <th>Tag</th>
                <th>Name</th>
                <th>Description</th>
                <th>Date Added</th>
                <th>Category</th>
                <th>Available</th>
                <AccessControl allowedRank={Ranks.OWNER}>
                  <th>Options</th>
                </AccessControl>
              </tr>
            </thead>
            <tbody>
              {props.filterByCart //if filter by cart (no need to filter by both, all cart assets are available)
                ? assets
                    .filter((asset) => selectList.includes(asset.asset_tag))
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
                : props.filterByCheckedOut //if filter by checked out
                ? assets
                    .filter(
                      (asset) =>
                        asset.checked_out === 0 && asset.operational === 1
                    )
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
                : assets.map(
                    (
                      asset //else, basic output
                    ) => (
                      <AssetRow
                        key={asset.asset_tag}
                        item={asset}
                        setUp={setUp}
                        selectList={selectList}
                        setSelectList={setSelectList}
                        categoryList={props.categoryList}
                      ></AssetRow>
                    )
                  )}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="warning">No assets found!</Alert>
      )}
    </div>
  );
}
