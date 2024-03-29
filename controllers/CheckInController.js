import { query } from "../utilities/DatabaseUtilities.js";

export const getAllCheckedOutRecords = async (req, res, next) => {
  await query(`
                SELECT checkoutrecord.* 
                FROM checkoutrecord
                WHERE in_date IS NULL`).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error getting all checkoutrecords: ${reason.message}`;
      next(reason);
    }
  );
};

export const getCheckoutRecordsByTag = async (req, res, next) => {
  const assetTag = req.params.tag;
  await query(
    `
                SELECT checkoutrecord.* , asset.name, asset.category, asset.damage_notes
                FROM checkoutrecord
                JOIN asset on asset.asset_tag=checkoutrecord.asset_tag
                WHERE asset.asset_tag = ? AND checkoutrecord.in_date IS NULL
                ORDER BY record_id DESC
                LIMIT 1;`,
    [assetTag]
  ).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error getting checkout record for the asset: ${reason.message}`;
      next(reason);
    }
  );
};

export const getAssetsForRecordsByUser = async (req, res, next) => {
  const userId = req.params.id;
  await query(
    `
                SELECT asset.* 
                FROM checkoutrecord
                JOIN user on user.user_id=checkoutrecord.student_id
                join asset on asset.asset_tag = checkoutrecord.asset_tag
                WHERE user.user_id = ? AND in_date IS NULL
                ORDER BY record_id DESC;`,
    [userId]
  ).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error getting checkout record for the user: ${reason.message}`;
      next(reason);
    }
  );
};

export const getCheckoutRecordsByUser = async (req, res, next) => {
  const userId = req.params.id;
  await query(
    `
                SELECT checkoutrecord.* , asset.name, asset.category, asset.damage_notes
                FROM checkoutrecord
                JOIN user on user.user_id=checkoutrecord.student_id
                JOIN asset on asset.asset_tag = checkoutrecord.asset_tag
                WHERE user.user_id = ? AND in_date IS NULL
                ORDER BY record_id DESC;`,
    [userId]
  ).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error getting checkout record for the user: ${reason.message}`;
      next(reason);
    }
  );
};

export const checkInAsset = async (req, res, next) => {
  const recordId = req.params.id;
  const rightNow = new Date();
  await query(
    `
        UPDATE checkoutrecord, asset
        SET checkoutrecord.in_date = ?, asset.checked_out = 0
        WHERE checkoutrecord.record_id = ? and asset.asset_tag = checkoutrecord.asset_tag`,
    [rightNow, recordId]
  ).then(
    (result) => {
      if (result.affectedRows == 0) {
        next({
          status: 404,
          message: "CheckoutRecord or Asset does not exist",
        });
      } else {
        res.status(200).send({ result: [] });
      }
    },
    (reason) => {
      reason.message = `Error updating the database: ${reason.message}`;
      next(reason);
    }
  );
};

/**
 * for checking in assets that do not have any damage notes to be added to the database.
 * 
 */
export const checkInAssetWithNotes = async (req, res, next) => {
  const recordId = req.params.id;
  const notes = req.body.notes;
  const rightNow = new Date(); //the current date time
  await query(//query updates the database so that the asset is set as avaliable and adds the checkin date and notes to the checkout record
    `
        UPDATE checkoutrecord, asset
        SET checkoutrecord.in_date = ?, 
        asset.checked_out = 0, 
        checkoutrecord.notes = ?
        WHERE checkoutrecord.record_id = ? and asset.asset_tag = checkoutrecord.asset_tag`,
    [rightNow, notes, recordId]
  ).then(
    (result) => { //error handling
      if (result.affectedRows == 0) {
        next({ //eror that is sent when a 404 error is hit
          status: 404,
          message: "CheckoutRecord or Asset does not exist",
        });
      } else { //otherwise send a 200 message
        res.status(200).send({ result: [] });
      }
    },
    (reason) => { //generic error message
      reason.message = `Error updating the database: ${reason.message}`;
      next(reason);
    }
  );
};

export const checkInAssetWithDamageNotes = async (req, res, next) => {
  const recordId = req.params.id;
  const damage = req.body.damage;
  const notes = req.body.notes;
  const damageNotes = req.body.damageNotes;
  const rightNow = new Date();
  await query(
    `
        UPDATE checkoutrecord, asset
        SET checkoutrecord.in_date = ?, 
        asset.checked_out = 0, 
        checkoutrecord.notes = ?, 
        asset.operational = ?,
        asset.damage_notes = ?
        WHERE checkoutrecord.record_id = ? and asset.asset_tag = checkoutrecord.asset_tag`,
    [rightNow, notes, damage, damageNotes, recordId]
  ).then(
    (result) => {
      if (result.affectedRows == 0) {
        next({
          status: 404,
          message: "CheckoutRecord or Asset does not exist",
        });
      } else {
        res.status(200).send({ result: [] });
      }
    },
    (reason) => {
      reason.message = `Error updating the database: ${reason.message}`;
      next(reason);
    }
  );
};

export const getOverdueInfo = async (req, res, next) => {
  const recordId = req.params.id;
  await query(
    `SELECT in_date, due_date, student_id
        FROM checkoutrecord
        WHERE record_id = ?`,
    [recordId]
  ).then(
    (result) => {
      const record = result[0];
      if (!record)
        next({
          status: 404,
          message: `CheckoutRecord not found with ID ${recordId}`,
        });
      else
        res.send({
          student_id: record.student_id,
          overdue: new Date(record.in_date) > new Date(record.due_date),
        });
    },

    (reason) => {
      reason.message = `Error getting the checkout record: ${reason.message}`;
      next(reason);
    }
  );
};

export const incrementStudentStrikes = async (req, res, next) => {
  const userId = req.params.id;
  await query(
    `
        UPDATE user
        SET strikes = strikes + 1
        WHERE user_id = ?`,
    [userId]
  ).then(
    (result) => {
      if (result.affectedRows == 0) {
        next({
          status: 404,
          message: "user does not exist",
        });
      } else {
        res.status(200).send({ result: [] });
      }
    },
    (reason) => {
      reason.message = `Error updating the database: ${reason.message}`;
      next(reason);
    }
  );
};
