import { useEffect, useState } from 'react';
import { getAssetFromCat, getAllAssets, getAssestsByDescription } from '../../api/AssetService';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import AssetRow from './AssetRow/AssetRow';

function AssetTable(props) {

    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function assetTableInit(input) {
            let assetResults = 0;
            //Search assets by description if user searches
            if(input != null && input != ""){
                assetResults = await getAssestsByDescription(input);
                setAssets(assetResults);    // Set the assets data table to be the queried result
            }else{
                //Queries all assets by default
                assetResults = await getAllAssets();
                setAssets(assetResults);
            }
        }
        assetTableInit(props.input);   // Render that son of a gun
    }, [props.input]);


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
                            {
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