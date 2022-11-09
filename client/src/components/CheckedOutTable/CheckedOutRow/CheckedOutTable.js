import { useEffect, useState } from 'react';
import { getCheckedOutAssets } from '../../api/CheckedOutService';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import CheckedOutAssetRow from './CheckedOutRow/CheckedOutRow';

function CheckedOutAssetTable() {

    const [checkedOutAssets, setAssets] = useState(null);

    // Tells the component to re-render when the assets variable changes
    useEffect(() => { }, [checkedOutAssets])

    async function checkedOutAssetButtonClick() {
        const checkedOutAssetResults = await getCheckedOutAssets();
        setAssets(checkedOutAssetResults);
    }

    return (
        <div>

            <button onClick={() => checkedOutAssetButtonClick()}>Filter By Checked Out</button>

            {checkedOutAssets != null ?

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
                            {checkedOutAssets != null && checkedOutAssets.map(asset => (
                                    <CheckedOutAssetRow key={asset.asset_tag} item={asset}></CheckedOutAssetRow>
                                ))
                            }
                        </tbody>
                    </Table>

                </div>

                : <Alert variant='warning'>No checked out assets found!</Alert>

            }
        </div>
    );
}

export default CheckedOutAssetTable;