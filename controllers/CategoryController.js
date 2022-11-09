import { query } from "../utilities/DatabaseUtilities.js";

export default async (req, res, next) => {
  await query("SELECT * FROM category").then(
    (result) => res.send({ result }),
    (reason) => {
      reason.message = `Error getting all categories: ${reason.message}`;
      next(reason);
    }
  );
};
