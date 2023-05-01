import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";

import { getAssetByAssetTag } from "../../api/AssetService";
import { getCategoryById } from "../../api/CategoryService";
import { AccessControl } from "../../components/AccessControl/AccessControl";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Ranks } from "../../constants/PermissionRanks";
import { SIDE_NAV_WIDTH, TOP_BAR_HEIGHT } from "../../constants/StyleConstants";
import styles from "./SingleAssetPage.css";
import CheckoutHistoryTable from "../../components/CheckoutHistoryTable/CheckoutHistoryTable";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ConditionalAlert from "../../components/CheckInUtilities/ConditionalAlert";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";



const SingleAssetPage = () => {
  // Gets the Asset Tag from the URL
  const { id } = useParams();
  // If we came from a link in the asset table, this gets the asset data from that link
  const { state } = useLocation();
  // Stores the asset information for this page
  const [asset, setAsset] = useState(state?.asset);
  // Stores the text version of the asset's category
  const [categoryLabel, setCategoryLabel] = useState();
  // Used to prevent crashes if the asset data hasn't loaded yet
  const [isLoading, setLoading] = useState(state?.asset ? false : true);

  // Handles the export of single asset
  const handleExportAssetTrue = () => setExportAsset(true);
  const handleExportAssetFalse = () => setExportAsset(false);
  const [exportAsset, setExportAsset] = useState(false);
  const [alertType3, setAlertType3] = useState(null);
  const [alertMessage3, setAlertMessage3] = useState(null);
  const [csvName, setCsvName] = useState('assets.csv');


  function handleExport() {
    // Flatten the asset data
    const flattenedAssets = flattenObject(asset);
      
    // Create the CSV file
    let csvContent = 'data:text/csv;charset=utf-8,';
    flattenedAssets.forEach(asset => {
      csvContent += Object.values(asset).join(',') + '\n';
    });
  
    handleExportAssetFalse();
  
    // Download the CSV file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', csvName); // Use the user inputted CSV file name
    document.body.appendChild(link);
    link.click();
  }
  
  // A simple function to flatten a 2d array to a single array to read better
  function flattenObject(obj, path = []) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const currentPath = path.concat(key);
      if (typeof value === "object" && value !== null) {
        return [...acc, ...flattenObject(value, currentPath)];
      } else {
        return [...acc, [currentPath.join("."), value]];
      }
    }, []);
  }


  useEffect(() => {
    setAlertMessage3(
      "Warning this will download an csv file. Are you sure you want to go through with exporting?"
    );
    setAlertType3(1);
  }, [asset, exportAsset]);


  // Sets the state of the page using information passed in from the link
  // If the page wasn't loaded from a link, it uses the ID from the URL to get the info from the db
  useEffect(() => {
    if (state?.asset) {
      setAsset(state.asset);
      setCategoryLabel(state.categoryLabel);
    } else {
      getAssetByAssetTag(id).then((result) => {
        setAsset(result[0]);
        getCategoryById(result[0].category).then((result) => {
          setCategoryLabel(result.catName);
        });
      });
    }
  }, [id, state?.asset]);

  // Updates the loading flag
  useEffect(() => {
    if (asset && categoryLabel) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [asset, categoryLabel]);

  return (
    <div className="d-flex flex-column" style={{ overflow: "hidden" }}>
      <Container
        fluid
        style={{
          paddingLeft: `${SIDE_NAV_WIDTH}`,
          paddingTop: `${TOP_BAR_HEIGHT}`,
        }}
      >
        <section>
          {isLoading ? (
            <>
              <LoadingSpinner />
            </>
          ) : (
            <>
              <Row>
                <table className="w-100">
                  <tbody>
                    <tr>
                      <h2>{asset.name} </h2>
                      <td>
                      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip" style={{ position: "fixed" }}>
                        Export CSV
                      </Tooltip>}>
                          <Button className="beets_buttons icon-button" onClick={handleExportAssetTrue} style={{marginLeft: "auto", marginRight: "auto"}}>
                            <FontAwesomeIcon
                              icon={faFileExport}
                              style={{ color: "#ffffff" }}
                            />
                          </Button>
                      </OverlayTrigger>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Row>
              <div className="seperator" />
              <Row>
                <Col xs={8}>
                  <table className="w-100">
                    <tbody>
                      <tr>
                        <th>Asset Tag</th>
                        <td>{asset.asset_tag}</td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{categoryLabel}</td>
                      </tr>
                      <tr>
                        <th>Date Added</th>
                        <td>{asset.date_added}</td>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <td>{asset.description}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col xs={1} />
                <Col xs={2}>
                  <table className="w-100">
                    <tbody>
                      <tr>
                        <th>Operational</th>
                        <td>
                          {asset.operational ? (
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className={"icon green"}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className={"icon red"}
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th className="pr-10">Available</th>
                        <td>
                          {!asset.checked_out ? (
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className={"icon green"}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className={"icon red"}
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Advanced</th>
                        <td>
                          {asset.advanced ? (
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className={"icon blue"}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className={"icon gray"}
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col xs={1} />
              </Row>
              <Row className="mt-3">
                <Col>
                  <table>
                    <tbody>
                      <tr>
                        <th>Damage Notes</th>
                      </tr>
                      <tr>
                        <td>
                          {asset.damage_notes === null
                            ? "No damage notes have been recorded. "
                            : asset.damage_notes}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>

              <div className="seperator" />

              <div>
                <AccessControl allowedRank={Ranks.OPERATOR}>
                  <h3>Checkout History</h3>
                  <div className="seperator" />
                  <CheckoutHistoryTable asset={asset.asset_tag} />
                </AccessControl>
              </div>
            </>
          )}
        </section>
      </Container>

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
          <label>CSV File Name:</label>
          <input type="text" value={csvName} onChange={(e) => setCsvName(e.target.value)} />
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

    </div>
  );
};

export default SingleAssetPage;
