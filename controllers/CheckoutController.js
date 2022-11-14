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
    const { asset_tags, student_id } = req.body;
    let assetList = [];
    {
        // [a, b, c] >>>> "asset_tag=? OR asset_tag=? OR asset_tag=?"
        const lotsOfOrs = asset_tags.map(() => "asset_tag=?").join(" OR ");
        assetList = query(`SELECT * FROM assets WHERE ${lotsOfOrs}`, asset_tags);
        // make sure same length as input
        // if not, 404
        if(assetList.length !== asset_tags.length){
            next({
                status: 404,
                message: "One or more assets not found in DB!",
                result: assetList
            })
            return;
        }
    }

    // check if the asset(s) are already checked out
        // get the latest checkout record(s) associated with the asset_tag(s)
            // if the in_date(s) are null, then they are checked out
            // if so, 409
    
    if (assetList.some((asset) => !asset.checked_out)) {
        next({
            status: 409,
            message: "One or more assets already checked out!",
            result: assetList
        })
        return;
    }

    const user = query("SELECT * FROM `user` WHERE `user`.`user_id`=?", [student_id])[0];
    if (!user) {
        next({
            status: 404,
            message: `The student '${student_id}' does not exist in the DB!`
        })
        return;
    }

    // check whether the student has < 3 strikes
    if (user.strikes >= 3){
        next({
            status: 401,
            message: `The student '${student_id}' has too many strikes!`
        })
        return;
    }

    // check whether the asset and student is advanced
    if (!user.advanced){
        if (assetList.some((asset) => asset.advanced)) {
            next({
               status: 401,
               message: `The student '${student_id}' is not allowed to check out advanced assets!`
            });
            return;

        }
    }
    // if not, 401

    // if all above pass, create checkout record(s)
        // 201


    await query(``).then()
}