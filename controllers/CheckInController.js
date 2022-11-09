import { query } from "../utilities/DatabaseUtilities.js";

export const getAllCheckedOutRecords = async (req, res, next) => {
    await query(`
                SELECT checkoutrecord.* 
                FROM checkoutrecord
                WHERE in_date IS NULL`
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error getting all categories: ${reason.message}`;
            next(reason);
        }
    )
}

export const getCheckoutRecordsByTag = async (req, res, next) => {
    const assetTag = req.params.tag;
    await query(`
                SELECT checkoutrecord.* 
                FROM checkoutrecord
                JOIN asset on asset.asset_tag=checkoutrecord.asset_tag
                WHERE asset.asset_tag = ?
                ORDER BY record_id DESC
                LIMIT 1;`, [assetTag]
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error getting all categories: ${reason.message}`;
            next(reason);
        }
    )
}

export const getCheckoutRecordsByUser = async (req, res, next) => {
    const userId = req.params.id;
    await query(`
                SELECT checkoutrecord.* 
                FROM checkoutrecord
                JOIN user on user.user_id=checkoutrecord.student_id
                WHERE user.user_id = ? AND in_date IS NULL
                ORDER BY record_id DESC;`, [userId]
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error getting all categories: ${reason.message}`;
            next(reason);
        }
    )
}

export const checkInAsset = async (req, res, next) => {
    const recordId = req.params.id;
    await query(`
        UPDATE checkoutrecord, asset
        SET checkoutrecord.in_date = CURRENT_TIMESTAMP(), asset.checked_out = 0
        WHERE checkoutrecord.record_id = ? and asset.asset_tag = checkoutrecord.asset_tag`, [recordId]
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error updating the database: ${reason.message}`;
            next(reason);
        }
    )
}

export const checkInAssetWithNotes = async (req, res, next) => {
    const recordId = req.params.id;
    const notes = req.params.notes;
    await query(`
        UPDATE checkoutrecord, asset
        SET checkoutrecord.in_date = CURRENT_TIMESTAMP(), asset.checked_out = 0, checkoutrecord.notes = ?
        WHERE checkoutrecord.record_id = ? and asset.asset_tag = checkoutrecord.asset_tag`, [notes, recordId]
    ).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error updating the database: ${reason.message}`;
            next(reason);
        }
    )
}