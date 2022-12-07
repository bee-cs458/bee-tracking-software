import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { getCategories } from "../../../api/CategoryService";
import Modal from "react-bootstrap/Modal";
import EditAsset from "../../EditAsset/EditAsset";
import Row from "react-bootstrap/esm/Row";
import ConditionalAlert from "../../CheckInUtilities/ConditionalAlert";
import { deleteAsset } from "../../../api/AssetService";

function AssetRow(props) {
  const [cats, setCats] = useState([]);
  const [asset, setAsset] = useState(props.item);
  const [editAsset, setEditAsset] = useState(false);
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
    getCategories()
      .then((value) => {
        setCats(value);
        return value;
      })
      .catch((err) => console.log(err));
    console.log(cats);
    setAlertMessage2("Deleting this asset cannot be undone. Are you sure you want to go through with deleting it?");
    setAlertType2(1);
  }, [asset, editAsset, deleteAssetVar]);

async function handleDelete(){
  console.log("delete called");
  const error = await deleteAsset(asset.asset_tag);
  props.setUp();
if(error === 400){
  setAlertMessage2("Deleting this asset cannot be undone. Are you sure you want to go through with deleting it? \nError 400: The asset cannot be deleted. Try again later.")
  setAlertType2(0)
} else if(error === 404){
  setAlertMessage2("Deleting this asset cannot be undone. Are you sure you want to go through with deleting it? \nError 404: The asset was not found.")
  setAlertType2(0)
} else{ 
  handleDeleteAssetFalse();
  setAlertMessage2("Deleting this asset cannot be undone. Are you sure you want to go through with deleting it?");
  setAlertType2(1);
}
}

  return (
    <tr>
      <td>{asset.asset_tag}</td>
      <td>{asset.name}</td>
      <td>{asset.description}</td>
      <td>{asset.date_added}</td>
      <td>
        {cats.map((cat) =>
          cat.category_id === asset.category ? cat.catName : null
        )}
      </td>
      <td>{asset.checked_out ? "Yes" : "No"}</td>
      <td>
        {localStorage.getItem("userPerms") == 2 ? (
          <>
            <Button variant="primary" onClick={handleEditAssetTrue}>Edit Asset</Button>
            <> </>
            <Button variant="danger" onClick={handleDeleteAssetTrue}>Delete Asset</Button>
          </>
        ) : (
          <></>
        )}
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
      <Modal backdrop="static" show={deleteAssetVar} onHide={handleDeleteAssetFalse}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {asset.name}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="m-3">
            <ConditionalAlert type={alertType2} message={alertMessage2} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
          <> </>
          <Button variant="secondary" onClick={handleDeleteAssetFalse}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}

export default AssetRow;
