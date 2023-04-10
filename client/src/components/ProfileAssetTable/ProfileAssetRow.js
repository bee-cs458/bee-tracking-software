export default function ProfileAssetRow(props) {
    const { asset, cats } = props;

    return (
        <tr>
            <td>{asset.asset_tag ?? "** ERROR **"}</td>
            <td>{asset.name ?? "** ERROR **"}</td>
            <td>
        { cats.map((cat) =>
          cat.category_id === asset.category ? cat.catName : null
        ) ?? "** ERROR **"}
        </td>
        </tr>
    );
}