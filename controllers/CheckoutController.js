import { query, insert_params, insert_values, update_params, where_params_like } from "../utilities/DatabaseUtilities.js";

export const getAllCheckoutRecords = async (req, res, next) => {
    await query(`SELECT * FROM checkoutrecords`
    ).then(
        (result) => { res.send({ result }) }, // on success
        (reason) => {
            reason.message = `Error Getting All Checkout Records: ${reason.message}`;
            next(reason); // generic error handler
        } // on failure
    );
}

export const getCheckoutStatus = async (req, res, next) => {

    //const asset_tag = req.params.id;

    //var asset = await query(`SELECT * FROM`);

}

export const checkoutAsset = async (req, res, next) => {

    // check that the asset(s) exist
        // select the individual assets from the DB and check if they are null
    for(var tag in req.asset_tags){
        var exists = query(`SELECT 1 FROM assets WHERE asset_tag=${tag}`);
        if(exists == null){

            res.status(404);

        }
    }
        // if not, 404
    // check if the asset(s) are already checked out
        // get the latest checkout record(s) associated with the asset_tag(s)
            // if the in_date(s) are null, then they are checked out
            // if so, 409
    // check whether the student has < 3 strikes
        // if not, 401
    // if all above pass, create checkout record(s)
        // 201

    await query(``).then()
}