import { query, insert_params, insert_values, update_params, where_params_like } from "../utilities/DatabaseUtilities.js";

export const getAllCheckoutRecords = async (req, res, next) => {
    await query(``
    ).then(
        (result) => { res.send({ result }) }, // on success
        (reason) => {
            reason.message = `Error Getting All Checkout Records: ${reason.message}`;
            next(reason); // generic error handler
        } // on failure
    );
}

export const checkoutAsset = async (req, res, next) => {

    // check that the asset(s) exist
        // if not, 404
    // check if the asset(s) are already checked out
        // if so, 409
    // check whether the student has < 3 strikes
        // if not, 401
    // if all above pass, create checkout record(s)
        // 201

    await query(``).then()
}