import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import CheckOutRow from "./CheckOutRow";

export default function CheckOutTable(props) {
    const { assets, removeAsset, receipt, disabledButton } = props;

    useEffect(() => {}, [assets])
    return (
        <Table>
            <caption>Selected Assets</caption>
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Advanced</th>
                    {/*will not show remove if in the receipt*/ receipt ? <></> : <th>Remove</th>}
                </tr>
            </thead>
            <tbody>
                {
                    (assets.map((asset) => {
                        return (<CheckOutRow asset={asset} receipt={receipt} removeAsset={removeAsset} disabledButton={disabledButton}></CheckOutRow>);
                    }))
                }
            </tbody>
        </Table>
    );
}