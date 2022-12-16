import { query } from "../utilities/DatabaseUtilities.js";

export const getAllCategories = (req, res, next) =>
    query( 'SELECT * FROM category').then(
        (result) => res.send({ result }),
        (reason) => {
            reason.message = `Error getting all categories: ${reason.message}`;
            next(reason);
        }
    )


export const createCategory = (req, res, next) => 
    query(`INSERT INTO \`category\` (\`category_id\`,\`catName\`) VALUES (?,?)`, [req.params.id,req.body.catName]).then(
        (result) => res.send({ result }),
        (reason) => next(reason)
    )

export const deleteCategory = (req, res, next) => 
    query(`DELETE FROM category WHERE category_id = ?`, [req.params.id]).then(
        (result) => {
            if (result.affectedRows <= 0) {
                next({
                    status: 404,
                    message: "Category wasn't found!"
                });
                return;
            }
            res.send({ result })
        },
        (reason) => next(reason)
    )