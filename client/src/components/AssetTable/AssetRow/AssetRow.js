import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import EditAsset from "../../EditAsset/EditAsset";
import Row from "react-bootstrap/esm/Row";
import ConditionalAlert from "../../CheckInUtilities/ConditionalAlert";
import { AccessControl } from "../../AccessControl/AccessControl";
import { deleteAsset } from "../../../api/AssetService";
import { Ranks } from "../../../constants/PermissionRanks";
import cartIcon from "../../../assets/shopping-cart.png";
import checkMark from "../../../assets/check-mark.png";
import crossedOut from "../../../assets/crossed-out.png";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import ExportOneAsset from "../../ExportCSV/ExportOneAsset";
import { getAssetByAssetTag } from "../../../api/AssetService";
import { CSVLink } from "react-csv";

function AssetRow(props) {
  const csvLinkEl = useRef(null);
  if (csvLinkEl.current) {
    csvLinkEl.current.link.click();
  }
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
  // Asset availability
  const [available, setAvailable] = useState(
    asset.checked_out || !asset.operational
  );
  const handleEditAssetTrue = () => setEditAsset(true);
  const handleEditAssetFalse = () => setEditAsset(false);
  const handleDeleteAssetTrue = () => setDeleteAsset(true);
  const handleDeleteAssetFalse = () => setDeleteAsset(false);

  const handleExportAssetTrue = () => setExportAsset(true);
  const handleExportAssetFalse = () => setExportAsset(false);
  const [exportAsset, setExportAsset] = useState(false);
  const [alertType3, setAlertType3] = useState(null);
  const [alertMessage3, setAlertMessage3] = useState(null);

  const [data, setData] = useState([]);
  
  async function handleExport() {
    console.log("Export Called");
  
    const AssetHeaders = [    
      { label: "Asset Tag", key: "asset_tag" },    
      { label: "Name", key: "name" },    
      { label: "Description", key: "description" },    
      { label: "Date Added", key: "date_added" },    
      { label: "Damage Notes", key: "damage_notes" },    
      { label: "Category", key: "category" },    
      { label: "Operational", key: "operational" },    
      { label: "Checked Out", key: "checked_out" },  
    ];
  
    // Call the API to get the asset details to export
    const result = await getAssetByAssetTag(asset.asset_tag);
  
    if (result === 400 || result === 404) {
      // Display an alert if the asset details could not be retrieved
      setAlertMessage3(
        "Warning this will download a CSV file. Are you sure you want to go through with exporting?"
      );
      setAlertType3(0);
    } else {
      // Export the asset details as a CSV file
      setExportAsset(true);
      setData(result);
      setAlertMessage3(
        "CSV file download started. Please wait for the download to complete."
      );
      setAlertType3(1);

      console.log(data);

      return (
        <CSVLink
          headers={AssetHeaders}
          filename="Beets_Asset_Report.csv"
          data={data}
          ref={csvLinkEl}
          target="_blank"
        />
      );
    }
  }
  
  useEffect(() => {
    setAlertMessage3(
      "Warning this will download an csv file. Are you sure you want to go through with exporting?"
    );
    setAlertType3(1);
  }, [asset, exportAsset]);

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
      return;
    }
    if (!selected) {
      //unselected elements should be added to the list of selected assets
      sessionStorage.setItem(asset.asset_tag, asset.asset_tag);
      setSelectList((prev) => prev.concat(asset.asset_tag));
    } else {
      //rows that are already selected should remove themselves from the selected list
      let tempList = selectList.slice(); //creates a temp list that isn't a state
      selectList.forEach((tag) => {
        if (asset.asset_tag === tag) {
          //check if the current asset is the passes in asset
          tempList.shift(); //removes the first element in the list which is the asset with the tag that was passed in
          sessionStorage.removeItem(tag);
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
  }, [selectList, selected, setSelectList, asset.asset_tag]); //calls on changes to select list to work with the Clear Selection Button

  var categoryLabel = cats.map((cat) =>
    cat.category_id === asset.category ? cat.catName : ""
  );

  // Refreshes the available state when the checked_out or operational states change
  useEffect(() => {
    setAvailable(asset.checked_out || !asset.operational);
  }, [asset.checked_out, asset.operational]);

  return (
    <tr className={selected ? "table-primary" : null}>
      <AccessControl allowedRank={Ranks.OPERATOR}>
        <td>
          {/*The button below creates a shopping cart icon next to the asset that changes on a successful add.*/}
          <Button
            variant={available ? "danger" : selected ? "success" : "secondary"}
            onClick={handleSelect}
            disabled={available ? true : false}
          >
            <img
              alt={
                available
                  ? "Unavailable"
                  : selected
                  ? "Added to Cart"
                  : "Add to Cart"
              }
              src={available ? crossedOut : selected ? checkMark : cartIcon}
              width="25"
              height="25"
            />
          </Button>
        </td>
      </AccessControl>
      <td>
        <Link to={`/asset/${asset.asset_tag}`} state={{ asset, categoryLabel }}>
          {asset.asset_tag}
        </Link>
      </td>
      <td>{asset.name}</td>
      <td>{asset.description}</td>
      <td>{formattedDate}</td>
      <td>{categoryLabel}</td>
      <td>
        {available ? (
          <FontAwesomeIcon icon={faCircleXmark} className={"icon red"} />
        ) : (
          <FontAwesomeIcon icon={faCircleCheck} className={"icon green"} />
        )}
      </td>
      <AccessControl allowedRank={Ranks.OWNER}>
        <td>
          <Button
            variant="primary"
            className="beets_buttons"
            onClick={handleEditAssetTrue}
            style={{ marginLeft: "1rem" }}
          >
            <FontAwesomeIcon icon={faPencil} />
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAssetTrue}
            style={{ marginLeft: "1rem" }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button
            variant="primary"
            className="beets_buttons"
            onClick={handleExportAssetTrue}
          >
            Export Asset
          </Button>
        </td>
      </AccessControl>
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

      <Modal
        backdrop="static"
        show={exportAsset}
        onHide={handleExportAssetFalse}
      >
        <Modal.Header closeButton>
          <Modal.Title>Export {asset.name} To CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="m-3">
            <ConditionalAlert type={alertType3} message={alertMessage3} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleExport}>
            Export
          </Button>
          <Button variant="secondary" onClick={handleExportAssetFalse}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}

export default AssetRow;
