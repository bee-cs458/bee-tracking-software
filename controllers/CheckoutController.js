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
    await query(``).then()
}