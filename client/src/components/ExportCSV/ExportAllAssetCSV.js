import React, { components } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { getAllAssets } from "../../api/AssetService";
import { Ranks } from "../../constants/PermissionRanks";
import { AccessControl } from "../AccessControl/AccessControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

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

class AssetAsyncCSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.csvLinkEl = React.createRef();
  }

  // Gets all the assets
  downloadAssetsReport = async () => {
    const data = await getAllAssets();
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  };

  //Renders a button for the user to press and download a CSV with all Assets
  render() {
    const { data } = this.state;

    return (
      <AccessControl allowedRank={Ranks.OWNER}>
        <div>
          <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip" style={{ position: "fixed" }}>
            Export CSV
          </Tooltip>}>
            <div>
              <Button className="beets_buttons icon-button" onClick={this.downloadAssetsReport}>
                <FontAwesomeIcon
                  icon={faFileExport}
                  style={{ color: "#ffffff" }}
                />
              </Button>
              <CSVLink
                headers={AssetHeaders}
                filename="Beets_Assets_Report_Async.csv"
                data={data}
                ref={this.csvLinkEl}
              />
            </div>
          </OverlayTrigger>

        </div>
      </AccessControl>
    );
  }
}

export default AssetAsyncCSV;
