import React, { components } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { getAssetByAssetTag } from "../../api/AssetService";
import { Ranks } from "../../constants/PermissionRanks";
import { AccessControl } from "../AccessControl/AccessControl";

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

function Clueless(props){
    const {asset} = props;
class ExportOneAsset extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
      this.csvLinkEl = React.createRef();
    }
  
    // Gets the single asset
    downloadAssetsReport = async () => {
      const data = await getAssetByAssetTag(asset.asset_tag);
      this.setState({ data: data }, () => {
        setTimeout(() => {
          this.csvLinkEl.current.link.click();
        });
      });
    };
  
    //Renders a button for the user to press and download a CSV with the one asset
    render() {
      const { data } = this.state;
  
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
  }
}
export default Clueless;