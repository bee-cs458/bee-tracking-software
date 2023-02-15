import e from "express";
import { query, nonPreparedQuery, insert_params, insert_values, update_params, where_params_like } from "../utilities/DatabaseUtilities.js";

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

    const asset_tag = req.params.id;
    await query("SELECT `asset`.`checked_out` FROM `asset` WHERE `asset`.`asset_tag`=?", [asset_tag]).then(
        (rows) => {
            const result = rows[0];
            if (!result) {
                next({
                    status: 404,
                    message: `Asset with tag '${asset_tag}' not found!`
                });
                return;
            }
            res.status(200).send(result);
        }
    )
}

export const checkoutAsset = async (req, res, next) => {
    // begin a transaction in case everything gets screwed up

    let { asset_tag, student_id , opId} = req.body;

    const rightNow = new Date(); //today's date and time
    const twoDaysFromNow = new Date(Date.now() + 172800000); //the date and time in two days

    console.log([opId, student_id, asset_tag, rightNow, twoDaysFromNow]);

    await query(`
        INSERT INTO \`checkoutrecord\` (\`operator_id\`, \`student_id\`, \`asset_tag\`, \`out_date\`, \`due_date\`)
        VALUES (?, ?, ?, ?, ?)
    `, [opId, student_id, asset_tag, rightNow, twoDaysFromNow]).then(
        (result) => { res.send({ result }) }, // on success
        (reason) => {
            reason.message = `Error Getting All Checkout Records: ${reason.message}`;
            next(reason); // generic error handler
        } // on failure
    );
    console.log("Ending");
}

export const  makeAssetCheckedOut= async (req, res, next) => {
    const asset_tag = req.body.asset_tag;
    await query(`
    UPDATE \`asset\` 
    SET \`asset\`.\`checked_out\` = 1 
    WHERE asset_tag = ?`
    , [asset_tag]).then(
        (result) => { res.send({ result }) },
        (reason) => {
            reason.message = `Error Getting All Checkout Records: ${reason.message}`;
            next(reason); // generic error handler
        } // on failure
    )
}

