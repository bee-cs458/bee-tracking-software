import { query, insert_params, insert_values, update_params } from "../utilities/DatabaseUtilities.js";

export const getAllAssetsWithDueDates = async (req, res, next) => {
    await query(`
        SELECT asset.*, checkoutrecord.due_date
        FROM asset
        JOIN checkoutrecord on asset.asset_tag=checkoutrecord.asset_tag`
    ).then(
        (result) => { res.send({ result }) }, // on success
        (reason) => {
            reason.message = `Error Getting All Assets with Due Dates: ${reason.message}`;
            next(reason); // generic error handler
        } // on failure
    );
}

export const getDueDateOfAsset = async (req, res, next) => {
    const assetTag = req.params.id;
    await query(`
        SELECT asset.*, checkoutrecord.due_date
        FROM asset
        JOIN checkoutrecord on asset.asset_tag=checkoutrecord.asset_tag
        WHERE asset.asset_tag = ?`, [assetTag]
    ).then(
        (result) => { res.send({ result }) }, // on success
        (reason) => {
            reason.message = `Error Getting Due Date Of Asset: ${reason.message}`;
            next(reason); // generic error handler
        } // on failure
    );
}

export const getAllAssets = async (req, res, next) => {
    await query(`SELECT * FROM asset;`).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error Getting All Assets: ${reason.message}`;
            next(reason);
        }
    )
}

export const getSpecificAsset = async (req, res, next) => {
    const assetTag = req.params.id;
    await query(`SELECT * FROM asset WHERE \`asset\`.\`asset_tag\`=?;`, [assetTag]).then(
        (result) => {
            if (result?.length <= 0) next({
                status: 404,
                message: `Asset with asset_tag of ${assetTag} was not found`
            });
            else {
                res.send({ result });
            }
        },
        (reason) => {
            reason.message = `Error Getting Asset: ${reason.message}`;
            next(reason);
        }
    )
}

export const createAsset = async (req, res, next) => {
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    await query(`INSERT INTO asset (${insert_params(fields)
        }) VALUES (${insert_values(fields)
        })`, values
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error Creating Asset: ${reason.message}`;
            next(reason);
        }
    )
}

export const updateAsset = async (req, res, next) => {
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const assetTag = req.params.id;
    await query(`UPDATE asset SET ${update_params(fields, "asset")
        } WHERE \`asset\`.\`asset_tag\`=?`,
        values.concat(assetTag)
    ).then(
        (result) => {
            if (result?.affectedRows <= 0) next({
                status: 404,
                message: `Asset with asset_tag of ${assetTag} was not found`
            })
            else {
                res.send({ result });
            }
        },
        (reason) => {
            reason.message = `Error Updating Asset: ${reason.message}`;
            next(reason);
        }
    )
}

export const deleteAsset = async (req, res, next) => {
    const assetTag = req.params.id;
    await query(
        `DELETE FROM \`asset\` WHERE \`asset\`.\`asset_tag\`=?`,
        [assetTag]
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error Updating Asset: ${reason.message}`;
            next(reason);
        }
    )
}