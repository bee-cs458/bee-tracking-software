import { useEffect, useState } from "react";
import {
  getAssetFromCat,
  getAllAssets,
  searchingForAssests,
} from "../../api/AssetService";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import AssetRow from "./AssetRow/AssetRow";
import AddAsset from "../AddAsset/AddAsset";
import Modal from 'react-bootstrap/Modal';

import { getCategories } from "../../api/CategoryService";

export default function AssetTable(props) {
  const [assets, setAssets] = useState([]);
  const [updated, setUpdated] = useState(false);
  const setUp = () => {
    setUpdated(!updated);
  };
  
  //Displaying Add Asset
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Store Categories
  const [cats, setCats] = useState([]);

  useEffect(() => {
    getCategories()
      .then((value) => {
        setCats(value);
        return value;
      })
      .catch((err) => console.log(err));
  }, [assets, setAssets]);

  useEffect(() => {
    async function assetTableInit() {
      let assetResults = 0;
      console.log(props.cat);
      if (props.cat >= 0) {
        // Check if category is selected
        assetResults = await getAssetFromCat(props.cat); // Then only query for that category
      } else if (props.input !== undefined && props.input !== "") {
        //Include search results for asset_tags/descriptions/names
        assetResults = await searchingForAssests(props.input);
        setAssets(assetResults); // Set the assets data table to be the queried result
      } else {
        assetResults = await getAllAssets(); // If no filters are applied, just get all assets
      }
      setAssets(assetResults); // Set the assets data table to be the queried result
    }
    assetTableInit(); // Render that son of a gun
  }, [props.cat, props.input, props.filterByCheckedOut, updated]);



  return (
    <div>
      {localStorage.getItem("userPerms") === "2" ? (<button onClick={handleShow}>Add Asset</button>) : (<></>)}

      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{(localStorage.getItem("userPerms") === "2") ? <>Add Asset</> : <>Invalid Permissions</>}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {(localStorage.getItem("userPerms") === "2") ? <AddAsset cats={cats} onSubmit={handleClose}/> : <>Only Owner can Add Assets</>}
            </Modal.Body>
      </Modal>

      {(assets != null && assets.length > 0) ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td width="100px">Tag</td>
                <td width="200px">Name</td>
                <td width="400px">Description</td>
                <td width="200px">Date Added</td>
                <td width="150px">Category</td>
                <td width="150px">Checked Out</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {props.filterByCheckedOut
                ? assets
                    .filter((asset) => asset.checked_out === 1)
                    .map((asset) => (
                      <AssetRow
                        key={asset.asset_tag}
                        item={asset}
                        setUp={setUp}
                        categoryList={props.categoryList}
                        selectList={props.selectedList}
                        setSelectList={props.setSelectedList}
                      ></AssetRow>
                    ))
                : assets.map((asset) => (
                    <AssetRow
                      key={asset.asset_tag}
                      item={asset}
                      setUp={setUp}
                      categoryList={props.categoryList}
                      selectList={props.selectedList}
                      setSelectList={props.setSelectedList}
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
