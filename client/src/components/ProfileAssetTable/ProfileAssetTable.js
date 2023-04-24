import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import ProfileAssetRow from "./ProfileAssetRow";

export default function ProfileAssetTable(props) {
  const { assets, cats } = props;

  useEffect(() => {}, [assets]);

  return (
    <Table variant={props.variant} className="w-100">
      <thead>
        <tr>
          <th>Tag</th>
          <th>Name</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => {
          return (
            <ProfileAssetRow
              key={asset.asset_tag}
              asset={asset}
              cats={cats}
            ></ProfileAssetRow>
          );
        })}
      </tbody>
    </Table>
  );
}
