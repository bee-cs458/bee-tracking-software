import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { getAssetByAssetTag } from "../../api/AssetService";
import { Ranks } from "../../constants/PermissionRanks";
import { AccessControl } from "../AccessControl/AccessControl";

async function ExportOneAsset(props) {
  const { asset } = props;
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAssetByAssetTag(asset.asset_tag);
      setData(result);
    };
    fetchData();
  }, [asset]);

  const csvLinkEl = React.useRef(null);

  const handleClick = async () => {
    const result = await getAssetByAssetTag(asset.asset_tag);
    setData(result);
    csvLinkEl.current.link.click();
  };

  return (
    <AccessControl allowedRank={Ranks.OWNER}>
      <CSVLink
        headers={AssetHeaders}
        filename="Beets_Asset_Report.csv"
        data={data}
        ref={csvLinkEl}
        target="_blank"
      />
      <button onClick={handleClick} style={{ display: "none" }}>
        Export Asset
      </button>
    </AccessControl>
  );
}

export default ExportOneAsset;
