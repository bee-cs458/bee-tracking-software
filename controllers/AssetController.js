import {
  query,
  insert_params,
  insert_values,
  update_params,
  where_params_like,
} from "../utilities/DatabaseUtilities.js";

export const getAllAssetsWithDueDates = async (req, res, next) => {
  await query(`
        SELECT asset.*, checkoutrecord.due_date
        FROM asset
        JOIN checkoutrecord on asset.asset_tag=checkoutrecord.asset_tag`).then(
    (result) => {
      res.send({ result });
    }, // on success
    (reason) => {
      reason.message = `Error Getting All Assets with Due Dates: ${reason.message}`;
      next(reason); // generic error handler
    } // on failure
  );
};

export const getDueDateOfAsset = async (req, res, next) => {
  const assetTag = req.params.id;
  await query(
    `
        SELECT asset.*, checkoutrecord.due_date
        FROM asset
        JOIN checkoutrecord on asset.asset_tag=checkoutrecord.asset_tag
        WHERE asset.asset_tag = ?`,
    [assetTag]
  ).then(
    (result) => {
      res.send({ result });
    }, // on success
    (reason) => {
      reason.message = `Error Getting Due Date Of Asset: ${reason.message}`;
      next(reason); // generic error handler
    } // on failure
  );
};

export const getAllAssets = async (req, res, next) => {
  await query(`SELECT * FROM asset;`).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error Getting All Assets: ${reason.message}`;
      next(reason);
    }
  );
};

export const searchForAsset = async (req, res, next) => {
  // grab limit and offset from query
  const limit = req.query.limit;
  const offset = req.query.offset ?? "0";
  delete req.query.limit;
  delete req.query.offset;

  // get search parameter names/values
  const criteria = Object.keys(req.query);
  const searchTerms = Object.values(req.query);

  const whereStatement = `WHERE ${where_params_like(criteria, "asset")}`;

  // build statement
  let statement = `SELECT * FROM \`asset\``;
  // add where if criteria exist
  if (criteria.length > 0) {
    statement += `\n${whereStatement}`;
  }
  statement += `\nLIMIT ? OFFSET ?;`;

  // add limit and offset
  searchTerms.push(limit, offset);

  // ready to run the query
  await query(statement, searchTerms).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error Searching for Asset: ${reason.message}`;
      next(reason);
    }
  );
};

export const getSpecificAsset = async (req, res, next) => {
  const assetTag = req.params.id;
  await query(`SELECT * FROM asset WHERE \`asset\`.\`asset_tag\`=?;`, [
    assetTag,
  ]).then(
    (result) => {
      if (result?.length <= 0)
        next({
          status: 404,
          message: `Asset with asset_tag of ${assetTag} was not found`,
        });
      else {
        res.send({ result });
      }
    },
    (reason) => {
      reason.message = `Error Getting Asset: ${reason.message}`;
      next(reason);
    }
  );
};

export const getAssetFromCat = async (req, res, next) => {
  const assetCat = req.params.id;
  await query(`SELECT * FROM asset WHERE \`asset\`.\`category\`=?;`, [
    assetCat,
  ]).then(
    (result) => {
      if (result?.length <= 0)
        next({
          status: 404,
          message: `Asset with category of ${assetCat} was not found`,
        });
      else {
        res.send({ result });
      }
    },
    (reason) => {
      reason.message = `Error Getting Asset: ${reason.message}`;
      next(reason);
    }
  );
};

export const createAsset = async (req, res, next) => {
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);
  await query(
    `INSERT INTO asset (${insert_params(fields)}) VALUES (${insert_values(
      fields
    )})`,
    values
  ).then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error Creating Asset: ${reason.message}`;
      next(reason);
    }
  );
};

export const updateAsset = async (req, res, next) => {
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);
  const assetTag = req.params.id;
  await query(
    `UPDATE asset SET ${update_params(
      fields,
      "asset"
    )} WHERE \`asset\`.\`asset_tag\`=?`,
    values.concat(assetTag)
  ).then(
    (result) => {
      if (result?.affectedRows <= 0)
        next({
          status: 404,
          message: `Asset with asset_tag of ${assetTag} was not found`,
        });
      else {
        res.send({ result });
      }
    },
    (reason) => {
      reason.message = `Error Updating Asset: ${reason.message}`;
      next(reason);
    }
  );
};

export const deleteAsset = async (req, res, next) => {
  const assetTag = req.params.id;
  await query(`DELETE FROM \`asset\` WHERE \`asset\`.\`asset_tag\`=?`, [
    assetTag,
  ]).then(
    (result) => {
      if (result?.length <= 0)
        next({
          status: 404,
          message: `Asset with asset_tag of ${assetTag} was not found`,
        });
      else {
        res.send({ result });
      }
    },
    (reason) => {
      reason.message = `Error Deleting Asset: ${reason.message}`;
      next(reason);
    }
  );
};

export const editAsset = async (req, res, next) => {
const {oldTag} = req.params;
  const {
    asset_tag,
    name,
    description,
    damage_notes,
    category,
    operational,
    advanced
  } = req.body;
  await query(
    `
          UPDATE asset
          SET asset_tag = ?, name = ?, description = ?, damage_notes = ?,category = ?, operational = ?, advanced = ?
          WHERE asset_tag = ?
          `,
          [asset_tag, name, description, damage_notes, category, operational, advanced, oldTag]
      ).then(
    (result) => {
      if (result.affectedRows == 0) {
        next({
          status: 404,
          message: "Asset does not exist",
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

export const getAllAvailableAssetTags = async (req, res, next) => {
  await query(`
        SELECT asset_tag
        FROM asset
        WHERE checked_out = 0`,).then(
    (result) => {
      res.send({ result });
    }, // on success
    (reason) => {
      reason.message = `Error Getting All Available Assets: ${reason.message}`;
      next(reason); // generic error handler
    } // on failure
  );
};

export const getAllUnavailableAssetTags = async (req, res, next) => {
  await query(`
        SELECT asset_tag
        FROM asset
        WHERE checked_out = 1`,).then(
    (result) => {
      res.send({ result });
    }, // on success
    (reason) => {
      reason.message = `Error Getting All Unavailable Assets: ${reason.message}`;
      next(reason); // generic error handler
    } // on failure
  );
};
