import { query } from "../utilities/DatabaseUtilities.js";

export const getAllAssetsWithDueDates = async (req, res) => {
    try {
        console.log("Getting All Assets with Due Dates");

        const assets = await query("SELECT asset.*, checkoutrecord.due_date FROM asset JOIN checkoutrecord on asset.asset_tag=checkoutrecord.asset_tag");

        res.send({ result: assets });
    } catch (error) {
        console.log("Error Getting All Assets with Due Dates");
        res.status(404).json({ message: error });
    }
}

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