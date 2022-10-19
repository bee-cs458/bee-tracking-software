import { useEffect } from 'react';

function AssetRow(props) {

    const asset = props.item;

    useEffect(() => { }, [asset])

    return(
        <tr>
            <td>{asset.asset_tag}</td>
            <td>{asset.name}</td>
            <td>{asset.description}</td>
            <td>{asset.date_added}</td>
            <td>{asset.category}</td>
            <td>{asset.checked_out ? "yes" : "no"}</td>
        </tr>
    );

}

export default AssetRow;