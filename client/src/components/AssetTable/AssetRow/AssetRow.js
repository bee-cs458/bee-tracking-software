import { useEffect } from 'react';

function AssetRow(props) {

    const asset = props.item;

    const dates = asset.date_added;

    const [dateValues, timeValues] = dates.split('T');
    const [year, month, day] = dateValues.split('-');
    const formattedDate = [month, '/', day, '/', year];

    useEffect(() => { }, [asset])

    return (
        <tr>
            <td>{asset.asset_tag}</td>
            <td>{asset.name}</td>
            <td>{asset.description}</td>
            <td>{formattedDate}</td>
            <td>{asset.category}</td>
            <td>{asset.checked_out ? "yes" : "no"}</td>
            <td>{asset.due_date}</td>
        </tr>
    );

}

export default AssetRow;