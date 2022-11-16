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

    //const asset_tag = req.params.id;

    //var asset = await query(`SELECT * FROM`);

}

export const checkoutAsset = async (req, res, next) => {

    const errHandler = (err) => {
        nonPreparedQuery(`ROLLBACK`);
        next(err);
    }

    // begin a transaction in case everything gets screwed up
    await nonPreparedQuery("START TRANSACTION;").catch(next);

    // check that the asset(s) exist
        // select the individual assets from the DB and check if they are null
    const { asset_tags, student_id } = req.body;
    const operator_id = req.user.user_id;

    const lotsOfOrs = asset_tags.map(() => "asset_tag=?").join(" OR ");

    let assetList = [];
    {
        // [a, b, c] >>>> "asset_tag=? OR asset_tag=? OR asset_tag=?"
        assetList = await query(`SELECT * FROM \`asset\` WHERE ${lotsOfOrs}`, asset_tags).catch(errHandler);
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
    
    if (assetList.some((asset) => asset.checked_out)) {
        next({
            status: 409,
            message: "One or more assets already checked out!",
            result: assetList
        })
        return;
    }

    const user = (await query("SELECT * FROM `user` WHERE `user`.`user_id`=?", [student_id]).catch(errHandler))[0];
    console.log(user);
    if (!user) {
        next({
            status: 404,
            message: `The student with ID '${student_id}' does not exist in the DB!`
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

    const rightNow = new Date();
    const twoDaysFromNow = new Date(Date.now() + 172800000);
    const questionMarksStr = assetList.map(x => "(?, ?, ?, ?, ?)").join(", ");
    const propsArr = assetList.map(
            (asset) => [operator_id, student_id, asset.asset_tag, rightNow, twoDaysFromNow]
        )
        .reduce((prev, curr) => prev.concat(curr));

    await query(`UPDATE \`asset\` SET \`asset\`.\`checked_out\`=1 WHERE ${lotsOfOrs}`, asset_tags).catch(errHandler);

    const insertionResult = await query(`
        INSERT INTO \`checkoutrecord\` (\`operator_id\`, \`student_id\`, \`asset_tag\`, \`out_date\`, \`due_date\`)
        VALUES ${questionMarksStr}
    `, propsArr).catch(errHandler);

    await nonPreparedQuery(`COMMIT;`).then(
        (_) => res.status(201).send(insertionResult)
    );
    
}