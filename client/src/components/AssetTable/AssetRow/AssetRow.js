import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { getCategories } from "../../../api/CategoryService";
import Modal from "react-bootstrap/Modal";
import EditAsset from "../../EditAsset/EditAsset";
import Row from "react-bootstrap/esm/Row";
import ConditionalAlert from "../../CheckInUtilities/ConditionalAlert";
import { format } from 'date-fns';

function AssetRow(props) {
  const [cats, setCats] = useState([]);
  const [asset, setAsset] = useState(props.item);
  const [editAsset, setEditAsset] = useState(false);
    const dates = asset.date_added;

    const [dateValues, timeValues] = dates.split('T');
    const [year, month, day] = dateValues.split('-');
    const formattedDate = [month, '/', day, '/', year];

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
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
      <td>{formattedDate}</td>
      <td>
        {cats.map((cat) =>
          cat.category_id === asset.category ? cat.catName : null
        )}
      </td>
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
    </tr>
  );
}

export default AssetRow;
