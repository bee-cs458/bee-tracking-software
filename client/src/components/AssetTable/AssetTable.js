import { useEffect, useState } from 'react';
import { getAllAssets } from '../../api/AssetService';
import AssetRow from './AssetRow/AssetRow';

function AssetTable() {

    const [assets, setAssets] = useState(null);

    // Tells the component to re-render when the assets variable changes
    useEffect(() => { }, [assets])

    async function assetButtonClick() {
        const assetResults = await getAllAssets();
        setAssets(assetResults);
    }

    return (
        <div>

            <button onClick={() => assetButtonClick()}>Get Assets</button>

            <div>

                <table>
                    <thead>
                        <tr>
                            <td>Tag</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Date Added</td>
                        </tr>
                    </thead>
                    <tbody>
                        {assets != null &&
                            assets.map(asset => (
                                <AssetRow key={asset.asset_tag} item={asset}></AssetRow>

                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default AssetTable;