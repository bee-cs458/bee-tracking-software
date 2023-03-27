import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getAssetByAssetTag } from "../../api/AssetService";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import { SIDE_NAV_WIDTH, TOP_BAR_HEIGHT } from "../../constants/StyleConstants";

const SingleAssetPage = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState();

  useEffect(() => {
    getAssetByAssetTag(id).then((result) => {
      setAsset(result);
      console.log(JSON.stringify(asset));
    });
  }, []);

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
      ></Container>
    </div>
  );
};

export default SingleAssetPage;
