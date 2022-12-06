import Button from "react-bootstrap/esm/Button";
import * as React from 'react';
import './AddAsset.css';
import { createNewAsset } from "../../api/AssetService";


function AddAsset(props){
    const [advancedChecked, setAdvancedChecked] = React.useState(false);
    const [operationalChecked, setOperationalChecked] = React.useState(true);
    const [disabledState, setSubmitBtnDisabled] = React.useState(false);
    const handleClose = props.onSubmit;

    const changeAdvanced = () => {
        setAdvancedChecked(!advancedChecked);
    };

    const changeOperational = () => {
        setOperationalChecked(!operationalChecked);
    };

return(
    <>
    <div class="AddAsset">
        <h6>Asset Tag:</h6>
        <input type="text" id="assetTag" name="assetTag"></input> 
        <br></br><br></br>

        <h6>Name:</h6>
        <input type="text" id="assetName" name="assetName"></input> 
        <br></br><br></br>

        <h6>Description:</h6>
        <textarea rows="2" cols="50" id="description" name="description"></textarea>
        <br></br><br></br>

        <div id="div1">
            <h6 id="categorySelect">Select Category</h6>
            <select name="categories">
                <option value="first">First Value</option>
                <option value="second" selected>Second Value</option>
                <option value="third">Third Value</option>
            </select>
        </div>
        <div id="div2">
        <h6>Advanced Status</h6>
            <input id="advanced" type="checkbox" checked={advancedChecked} onChange={changeAdvanced}/>
        </div>
        <div id="div3">
            <h6>Operational Status</h6>
            <input id="operational" type="checkbox" checked={operationalChecked} onChange={changeOperational}/>
            <br></br><br></br>
        </div>

        <Button variant="primary" id="submitButton" disabled={disabledState} onClick={getInputValues}>Submit</Button>
    </div>
    </>
);


function getInputValues(){
    let assetTag = document.getElementById('assetTag').value;
    let name = document.getElementById('assetName').value;
    let description = document.getElementById('description').value;

    //Validate user inputs
    if(assetTag !== '' && name !== '' && description !== ''){
        console.log('Passed Validation');
        // disable submit btn
        setSubmitBtnDisabled(true);

        let advanced = advancedChecked ? 1 : 0;
        let operational = operationalChecked ? 1 : 0;

        console.log("Asset_Tag: " + assetTag);
        console.log("Name: " + name);
        console.log("Description: " + description);
        console.log("Advanced Check: " + advanced);
        console.log("Operational Check: " + operational);

        //Create Asset with given values
        createNewAsset(assetTag, name, description, 0, operational , advanced).then(
            (result) => {
                console.log(result);
                handleClose();
            },
            (err) => console.log(err)
        ).finally(
            // reenable the submit button
            () => setSubmitBtnDisabled(false)
        ); 
    }else{
        console.log("All Fields required");
    }

}

}

export default AddAsset;