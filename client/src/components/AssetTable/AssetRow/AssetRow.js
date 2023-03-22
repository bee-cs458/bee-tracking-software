import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import EditAsset from "../../EditAsset/EditAsset";
import Row from "react-bootstrap/esm/Row";
import ConditionalAlert from "../../CheckInUtilities/ConditionalAlert";
import { AccessControl } from "../../AccessControl/AccessControl";
import { deleteAsset } from "../../../api/AssetService";
import { Ranks } from "../../../constants/PermissionRanks";

function AssetRow(props) {
  const cats = props.categoryList;
  const { selectList, setSelectList } = props;
  const [selected, setSelected] = useState(false);
  const [asset, setAsset] = useState(props.item);
  const [editAsset, setEditAsset] = useState(false);
  const dates = asset.date_added;

  const dateValues = dates.split("T")[0];
  const [year, month, day] = dateValues.split("-");
  const formattedDate = [month, "/", day, "/", year];

  const [deleteAssetVar, setDeleteAsset] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType2, setAlertType2] = useState(null);
  const [alertMessage2, setAlertMessage2] = useState(null);
  const handleEditAssetTrue = () => setEditAsset(true);
  const handleEditAssetFalse = () => setEditAsset(false);
  const handleDeleteAssetTrue = () => setDeleteAsset(true);
  const handleDeleteAssetFalse = () => setDeleteAsset(false);
  useEffect(() => {
    setAlertMessage2(
      "Deleting this asset cannot be undone. Are you sure you want to go through with deleting it?"
    );
    setAlertType2(1);
  }, [asset, editAsset, deleteAssetVar]);

  async function handleDelete() {
    console.log("delete called");
    const error = await deleteAsset(asset.asset_tag);
    props.setUp();
    if (error === 400) {
      setAlertMessage2(
        "Deleting this asset cannot be undone. Are you sure you want to go through with deleting it? \nError 400: The asset cannot be deleted. Try again later."
      );
      setAlertType2(0);
    } else if (error === 404) {
      setAlertMessage2(
        "Deleting this asset cannot be undone. Are you sure you want to go through with deleting it? \nError 404: The asset was not found."
      );
      setAlertType2(0);
    } else {
      handleDeleteAssetFalse();
      setAlertMessage2(
        "Deleting this asset cannot be undone. Are you sure you want to go through with deleting it?"
      );
      setAlertType2(1);
    }
  }

  async function handleSelect() {
    //on click, table rows should highlight and add themselves to the selected asset list
    if (asset.checked_out) {
      setAlertMessage("Asset is already checked out");
      setAlertType(1);
      return;
    }
    if (!selected) {
      //unselected elements should be added to the list of selected assets
      sessionStorage.setItem(asset.asset_tag, asset.asset_tag);
      setSelectList((prev) => prev.concat(asset.asset_tag));
    } else {
      //rows that are already selected should remove themselves from the selected list
      let tempList = selectList.slice(); //creates a temp list that isn't a state
      selectList.forEach((asset_tag) => {
        if (asset.asset_tag === asset_tag) {
          //check if the current asset is the passes in asset
          tempList.shift(); //removes the first element in the list which is the asset with the tag that was passed in
          sessionStorage.removeItem(asset_tag);
        } else tempList.push(tempList.shift()); //shifts the list so that the first element is now at the back
      });
      setSelectList(tempList);
    }
    setSelected(!selected);
  }

  useEffect(() => {
    //if item is in the Cart, select it
    let keys = Object.keys(sessionStorage);
    for (let key of keys) {
      //loops through session storage, using keys as the index
      if (asset.asset_tag === sessionStorage.getItem(key)) {
        if (!selected) {
          //this if statement prevents infinite loops
          setSelected(true);
          setSelectList((prev) => prev.concat(asset.asset_tag));
        }
        return;
      }
    }
    //if the item was not in the Cart, force the item to be unselected
    setSelected(false);
  }, [selectList]); //calls on changes to select list to work with the Clear Selection Button

  return (
    <tr onClick={handleSelect} className={selected ? "table-primary" : null}>
      <td>{asset.asset_tag}</td>
      <td>{asset.name}</td>
      <td>{asset.description}</td>
      <td>{formattedDate}</td>
      <td>
        {cats.map((cat) =>
          cat.category_id === asset.category ? cat.catName : null
        )}
      </td>
      <td>{asset.checked_out ? "No" : "Yes"}</td>
      <td>
        <AccessControl allowedRank={Ranks.OWNER}>
          <Button variant="primary" className="buttons" onClick={handleEditAssetTrue}>
            Edit Asset
          </Button>
          <Button variant="danger" onClick={handleDeleteAssetTrue}>
            Delete Asset
          </Button>
        </AccessControl>
      </td>
      <Modal backdrop="static" show={editAsset} onHide={handleEditAssetFalse}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="m-3">
            <ConditionalAlert type={alertType} message={alertMessage} />
          </Row>
          <EditAsset
            key={asset.asset_tag}
            cats={cats}
            asset={asset}
            setUp={props.setUp}
            setAsset={setAsset}
            setAlertType={setAlertType}
            setAlertMessage={setAlertMessage}
          ></EditAsset>
        </Modal.Body>
      </Modal>
      <Modal
        backdrop="static"
        show={deleteAssetVar}
        onHide={handleDeleteAssetFalse}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {asset.name}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="m-3">
            <ConditionalAlert type={alertType2} message={alertMessage2} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <> </>
          <Button variant="secondary" onClick={handleDeleteAssetFalse}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}

export default AssetRow;
