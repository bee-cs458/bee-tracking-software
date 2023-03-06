import React, { components } from 'react';
import { CSVLink } from "react-csv";
import { getAllAssets } from '../../api/AssetService';

const AssetHeaders = [
    { label: "Asset Tag", key: "asset_tag"},
    { label: "Name", key: "name"},
    { label: "Description", key: "description"},
    { label: "Date Added", key: "date_added"},
    { label: "Damage Notes", key: "damage_notes"},
    { label: "Category", key: "category"},
    { label: "Operational", key: "operational"},
    { label: "Checked Out", key: "checked_out"},
    { label: "Operational", key: "operational"}
]

class AssetAsyncCSV extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
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
      }


      //Renders a button for the user to press and download a CSV with all Assets
      render() {
        const { data } = this.state;
    
        return (
          <div>
            <input type="button" value="Export all assets to CSV" onClick={this.downloadAssetsReport} />
            <CSVLink
              headers={AssetHeaders}
              filename="Beets_Assets_Report_Async.csv"
              data={data}
              ref={this.csvLinkEl}
            />
          </div>
        );
      }
    }
    
    export default AssetAsyncCSV; 