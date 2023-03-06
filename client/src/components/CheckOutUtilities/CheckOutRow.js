import Button from "react-bootstrap/esm/Button";
import minus from "../../assets/minus.png";

export default function CheckOutRow(props) {
    const { asset, removeAsset, receipt, disabledButton, cats } = props;

const handleRemove = (asset_tag) => {
    removeAsset(asset_tag);
}

    return (
        <tr>
            <td>{asset.asset_tag ?? "** ERROR **"}</td>
            <td>{asset.name ?? "** ERROR **"}</td>
            <td>
        {cats.map((cat) =>
          cat.category_id === asset.category ? cat.catName : null
        )}
      </td>
            <td>{asset.advanced ? <>Yes</> : <>No</>}</td>  
            {/*will not show remove if in the receipt*/ receipt ? <></> : <td><Button variant='danger'>
                <img alt='minus' src={minus} width="25" disabled={disabledButton} onClick={() => {handleRemove(asset.asset_tag)}}/>
                </Button></td>}
        </tr>
    );
}