import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";

import { getAssetByAssetTag } from "../../api/AssetService";
import { getCategoryById } from "../../api/CategoryService";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { SIDE_NAV_WIDTH, TOP_BAR_HEIGHT } from "../../constants/StyleConstants";

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
    } else {
      getAssetByAssetTag(id).then((result) => {
        setAsset(result[0]);
      });
    }
  }, [id, state?.asset]);

  // Updates the loading flag
  useEffect(() => {
    if (asset) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [asset]);

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
        {isLoading ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            <p>{asset.asset_tag}</p>
            <p>{asset.name}</p>
            <p>{asset.description}</p>
            <p>{asset.damage_notes}</p>
          </>
        )}
      </Container>
    </div>
  );
};

export default SingleAssetPage;
