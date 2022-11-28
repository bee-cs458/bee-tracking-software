
export default function CheckOutRow(props) {
    const { asset } = props;

    return (
        <tr>
            <td>{asset.asset_tag ?? "** ERROR **"}</td>
            <td>{asset.name ?? "** ERROR **"}</td>
            <td>{asset.category ?? "** ERROR **"}</td>
        </tr>
    );
}