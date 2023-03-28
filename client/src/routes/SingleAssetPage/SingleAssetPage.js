import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";

import { getAssetByAssetTag } from "../../api/AssetService";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import { SIDE_NAV_WIDTH, TOP_BAR_HEIGHT } from "../../constants/StyleConstants";

const SingleAssetPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [asset, setAsset] = useState();
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    if (state.asset) {
      setAsset(state.asset);
    } else {
      getAssetByAssetTag(id).then((result) => {
        setAsset(result[0]);
      });
    }
  }, []);

  useEffect(() => {
    if (asset) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [asset])

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>

      <Container
        fluid
        style={{
          marginLeft: `${SIDE_NAV_WIDTH}`,
          paddingTop: `${TOP_BAR_HEIGHT}`,
          textAlign: "left",
        }}
      >

        {isLoading ? (<>

          <p>Loading</p>

        </>) : (<>

          <p>{asset.asset_tag}</p>

        </>)}

      </Container>
    </div>
  );
};

export default SingleAssetPage;
