import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import CheckOutRow from "./CheckOutRow";

export default function CheckOutTable(props) {
    const { assets } = props;

    useEffect(() => {}, [assets])

    return (
        <Table>
            <caption>Selected Assets</caption>
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Name</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {
                    (assets.map((asset) => {
                        return (<CheckOutRow asset={asset}></CheckOutRow>);
                    }))
                }
            </tbody>
        </Table>
    );
}