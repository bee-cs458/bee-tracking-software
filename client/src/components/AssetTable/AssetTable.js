import { useEffect, useState } from 'react';
import { getAllAssetsWithDueDates, getAssetFromCat, getAllAssets } from '../../api/AssetService';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import AssetRow from './AssetRow/AssetRow';

function AssetTable(props) {

    const [assets, setAssets] = useState(null);

    // Tells the component to re-render when the assets variable changes
    useEffect(() => { }, [assets])

    async function assetTableInit() {
        let assetResults = 0;
        console.log(props.cat)
        if( props.cat >= 0 ) {  // Check if category is selected
            assetResults = await getAssetFromCat(props.cat);    // Then only query for that category
        } else {
            assetResults = await getAllAssets();    // If no filters are applied, just get all assets
        }
        setAssets(assetResults);    // Set the assets data table to be the queried result
    }

    assetTableInit();   // Render that son of a gun

    return (
        <div>

            {assets != null ?

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
                                <td>Due Date</td>
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

                : <Alert variant='warning'>No assets found!</Alert>

            }
        </div>
    );
}

export default AssetTable;