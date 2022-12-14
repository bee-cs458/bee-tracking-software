import { query } from "../utilities/DatabaseUtilities.js";

export const getAllRecords = async (req, res, next) => {
    await query(`SELECT * FROM checkoutrecord ORDER BY record_id DESC;`).then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error Getting All records: ${reason.message}`;
            next(reason);
        }
    )
}
