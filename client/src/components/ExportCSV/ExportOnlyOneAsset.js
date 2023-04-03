import React, { components, useState } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { getAssetByAssetTag } from "../../api/AssetService";
import { Ranks } from "../../constants/PermissionRanks";
import { AccessControl } from "../AccessControl/AccessControl";
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function ExportOneAsset(props) {
    const {asset} = props;
    const [exporData, setExportData] = useState([]);
    const [loading, setLoading] = useState(false);


    const DataSet = [
        {
            columns: [
                { title: "Asset Tag", key: "asset_tag" },
                { title: "Name", key: "name" },
                { title: "Description", key: "description" },
                { title: "Date Added", key: "date_added" },
                { title: "Damage Notes", key: "damage_notes" },
                { title: "Category", key: "category" },
                { title: "Operational", key: "operational" },
                { title: "Checked Out", key: "checked_out" },
                { title: "Operational", key: "operational" },
            ],
            data: exporData.map((data) => [
                {value: data.asset_tag},
                {value: data.name},
                {value: data.description},
                {value: data.data_added},
                {value: data.damage_notes},
                {value: data.category},
                {value: data.operational},
                {value: data.checked_out},
                {value: data.operational},
            ])
        }
    ]

    const downloadAssetsReport = async (asset) => {
        setExportData([]);
        setLoading(true);
        const data = await getAssetByAssetTag(asset.asset_tag);
        console.log(data);
        setExportData(data);
        setLoading(false);
    }
    return (
        <AccessControl allowedRank={Ranks.OWNER}>
          <div>
            <ExcelFile
            filename="Beets_Asset_Report.csv"
            element={<button type="button" className="beets_buttons">Export Asset</button>}>
                <ExcelSheet dataSet={DataSet} name="Beets_Asset_Report"/>
            </ExcelFile>
          </div>
        </AccessControl>
    );
}

export default ExportOneAsset;