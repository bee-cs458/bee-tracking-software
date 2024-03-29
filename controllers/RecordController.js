import { query } from "../utilities/DatabaseUtilities.js";

export const getAllRecords = async (req, res, next) => {
  let statement = `SELECT * FROM checkoutrecord ORDER BY record_id DESC;`;

  // Checks whether an asset tag was passed in from the frontend
  // If there was, the query is changed to get all records for that specific asset tag
  if (req.query.assetTag) {
    statement = `SELECT * FROM checkoutrecord WHERE checkoutrecord.asset_tag='${req.query.assetTag}' ORDER BY record_id DESC;`;
  }

  if (req.query.student_id){
    statement = `SELECT * FROM checkoutrecord WHERE checkoutrecord.student_id='${req.query.student_id}'ORDER BY record_id DESC;`;
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
    `SELECT * FROM checkoutrecord  WHERE in_date IS null ORDER BY record_id DESC;`
  ).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error Getting checked out records: ${reason.message}`;
      next(reason);
    }
  );
};
