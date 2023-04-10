import { query } from "../utilities/DatabaseUtilities.js";

export const getAllRecords = async (req, res, next) => {
  let statement = `SELECT * FROM checkoutrecord ORDER BY record_id DESC;`;

  if (req.query.assetTag) {
    statement = `SELECT * FROM checkoutrecord WHERE checkoutrecord.asset_tag=${req.query.assetTag} ORDER BY record_id DESC;`;
  }

  await query(statement).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error Getting All records: ${reason.message}`;
      next(reason);
    }
  );
};

export const getAllCheckedOutRecords = async (req, res, next) => {
  await query(
    `SELECT * FROM checkoutrecord ORDER BY record_id DESC WHERE in_date = null;`
  ).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error Getting checked out records: ${reason.message}`;
      next(reason);
    }
  );
};
