import Button from "react-bootstrap/esm/Button";
import minus from "../../assets/minus.png";

export default function CheckOutRow(props) {
    const { asset, removeAsset, receipt, disabledButton } = props;

const handleRemove = (asset_tag) => {
    removeAsset(asset_tag);
}

    return (
        <tr>
            <td>{asset.asset_tag ?? "** ERROR **"}</td>
            <td>{asset.name ?? "** ERROR **"}</td>
            <td>{asset.category ?? "** ERROR **"}</td>
            <td>{asset.advanced ?? "** ERROR **"}</td>  
            {/*will not show remove if in the receipt*/ receipt ? <></> : <td><Button variant='danger'>
                <img alt='minus' src={minus} width="25" disabled={disabledButton} onClick={() => {handleRemove(asset.asset_tag)}}/>
                </Button></td>}
        </tr>
    );
}