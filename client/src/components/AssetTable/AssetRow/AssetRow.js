import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { getCategories } from "../../../api/CategoryService";
import Modal from "react-bootstrap/Modal";
import EditAsset from "../../EditAsset/EditAsset";

function AssetRow(props) {
  const [cats, setCats] = useState([]);
  const [asset, setAsset] = useState(props.item);
  const [editAsset, setEditAsset] = useState(false);
  const handleEditAssetTrue = () => setEditAsset(true);
  const handleEditAssetFalse = () => setEditAsset(false);
  useEffect(() => {
    getCategories()
      .then((value) => {
        setCats(value);
        return value;
      })
      .catch((err) => console.log(err));
    console.log(cats);
  }, [asset, editAsset]);

  return (
    <tr>
      <td>{asset.asset_tag}</td>
      <td>{asset.name}</td>
      <td>{asset.description}</td>
      <td>{asset.date_added}</td>
      <td>{asset.category}</td>
      <td>{asset.checked_out ? "Yes" : "No"}</td>
      <td>
        {localStorage.getItem("userPerms") == 2 ? (
          <Button onClick={handleEditAssetTrue}>Edit Asset</Button>
        ) : (
          <></>
        )}
      </td>
      <Modal show={editAsset} onHide={handleEditAssetFalse}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAsset cats ={cats} asset={asset} setUp={props.setUp} setAsset={setAsset}></EditAsset>
        </Modal.Body>
      </Modal>
    </tr>
  );
}

export default AssetRow;
