import React, { components } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { getAssetByAssetTag } from "../../api/AssetService";
import { Ranks } from "../../constants/PermissionRanks";
import { AccessControl } from "../AccessControl/AccessControl";

function ExportOneAsset(props){
    const {asset} = props;
    const { data } = this.state;

    const AssetHeaders = [
      { label: "Asset Tag", key: "asset_tag" },
      { label: "Name", key: "name" },
      { label: "Description", key: "description" },
      { label: "Date Added", key: "date_added" },
      { label: "Damage Notes", key: "damage_notes" },
      { label: "Category", key: "category" },
      { label: "Operational", key: "operational" },
      { label: "Checked Out", key: "checked_out" },
      { label: "Operational", key: "operational" },
    ];

    async function downloadAssetsReport() {
      const data = await getAssetByAssetTag(asset.asset_tag);
      this.setState({ data: data }, () => {
        setTimeout(() => {
          this.csvLinkEl.current.link.click();
        });
      });
    };
  
      return (
        <AccessControl allowedRank={Ranks.OWNER}>
          <div>
            <Button className="beets_buttons" onClick={this.downloadAssetsReport}>
              Export Asset
            </Button>
            <CSVLink
              headers={AssetHeaders}
              filename="Beets_Asset_Report.csv"
              data={data}
              ref={this.csvLinkEl}
            />
          </div>
        </AccessControl>
      );
    }
export default ExportOneAsset;