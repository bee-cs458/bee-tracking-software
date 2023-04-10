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
import RecordTable from "../../components/RecordsUtils/RecordTable";
import { Ranks } from "../../constants/PermissionRanks";
import { SIDE_NAV_WIDTH, TOP_BAR_HEIGHT } from "../../constants/StyleConstants";
import styles from "./SingleAssetPage.css";
import { getAllRecords } from "../../api/RecordService";
import CheckoutHistoryTable from "../CheckoutHistoryTable/CheckoutHistoryTable";

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
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>

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
              <h2>{asset.name}</h2>
              <div className="seperator" />
              <Row>
                <Col xs={8}>
                  <table className="w-100">
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
                  </table>
                </Col>
                <Col xs={1} />
                <Col xs={2}>
                  <table className="w-100">
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
                      <th>Available</th>
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
                  </table>
                </Col>
                <Col xs={1} />
              </Row>
              <Row className="mt-3">
                <Col>
                  <table>
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
                  </table>
                </Col>
              </Row>

              <div className="seperator" />

              <div>
                <AccessControl allowedRank={Ranks.OPERATOR}>
                  <h3>Checkout History</h3>
                  <div className="seperator" />
                  <CheckoutHistoryTable />
                </AccessControl>
              </div>
            </>
          )}
        </section>
      </Container>
    </div>
  );
};

export default SingleAssetPage;
