import { useEffect, useState } from 'react';
import { getAllAssets } from '../../api/AssetService';
import Table from 'react-bootstrap/Table';
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

            {assets != null &&

                <div>

                    <Table striped bordered>
                        <thead>
                            <tr>
                                <td>Tag</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Date Added</td>
                                <td>Category</td>
                                <td>Checked Out</td>
                            </tr>
                        </thead>
                        <tbody>
                            {assets != null &&
                                assets.map(asset => (
                                    <AssetRow key={asset.asset_tag} item={asset}></AssetRow>

                                ))
                            }
                        </tbody>
                    </Table>

                </div>
            }
        </div>
    );
}

export default AssetTable;