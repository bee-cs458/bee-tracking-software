import React, { components, useState } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { getAssetByAssetTag } from "../../api/AssetService";
import { Ranks } from "../../constants/PermissionRanks";
import { AccessControl } from "../AccessControl/AccessControl";

function ExportOneAsset(props) {
    const {asset} = props;
}

export default ExportOneAsset;