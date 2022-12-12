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

    const errHandler = (err) => {
        nonPreparedQuery(`ROLLBACK;`);
        next(err);
    }

    // begin a transaction in case everything gets screwed up
    await nonPreparedQuery("START TRANSACTION;").catch(next);

    // check that the asset(s) exist
    // select the individual assets from the DB and check if they are null
    let { asset_tags, student_id } = req.body;
    const operator_id = req.user.user_id;

    if (student_id === "") {
        errHandler({
            status: 400,
            message: "Student ID cannot be blank!"
        });
        return;
    }

    asset_tags ??= [];
    if (asset_tags.length === 0) {
        errHandler({
            status: 400,
            message: "Asset tag list cannot be empty!"
        });
        return;
    }

    const lotsOfOrs = asset_tags.map(() => "asset_tag=?").join(" OR ");

    let assetList = [];
    {
        // [a, b, c] >>>> "asset_tag=? OR asset_tag=? OR asset_tag=?"
        assetList = await query(`SELECT * FROM \`asset\` WHERE ${lotsOfOrs}`, asset_tags).catch(errHandler);
        // make sure same length as input
        // if not, 404
        if(assetList?.length !== asset_tags.length){
            errHandler({
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
        errHandler({
            status: 409,
            message: "One or more assets already checked out!",
            result: assetList
        })
        return;
    }

    const user = (await query("SELECT * FROM `user` WHERE `user`.`user_id`=?", [student_id]).catch(errHandler))[0];

    if (!user) {
        errHandler({
            status: 404,
            message: `The student with ID '${student_id}' does not exist in the DB!`
        })
        return;
    }

    // check whether the student has < 3 strikes
    if (user.strikes >= 3){
        errHandler({
            status: 401,
            message: `The student '${user.first_name} ${user.last_name}' has too many strikes!`
        })
        return;
    }

    // check whether the asset and student is advanced
    if (!user.advanced){
        if (assetList.some((asset) => asset.advanced)) {
            errHandler({
               status: 401,
               message: `The student '${user.first_name} ${user.last_name}' is not allowed to check out advanced assets!`
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