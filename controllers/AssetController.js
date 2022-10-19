import { query } from "../utilities/DatabaseUtilities.js";

export const getAllAssets = async (req, res) => {
    try {
        console.log("Getting All Assets");

        const assets = await query("SELECT * FROM asset");

        res.send({ result: assets });
    } catch (error) {
        console.log("Error Getting All Assets");
        res.status(404).json({ message: error });
    }
}