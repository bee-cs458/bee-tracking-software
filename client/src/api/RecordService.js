import axios from "axios";

/*
Calls the API endpoint for getting all assets, does not include due dates
@param assetTag - if we want all the records for a given asset, pass in an asset tag
@return collection of assets from the database, where each entry is one row. 
*/
export async function getAllRecords(assetTag) {
  try {
    // If an asset tag is provided, pass that along in the request
    // Otherwise, get all records from the database
    if (assetTag) {
      const response = await axios.get("/api/records/get_all", {
        params: { assetTag: assetTag },
      });
      return response.data.result;
    } else {
      const response = await axios.get("/api/records/get_all");
      return response.data.result;
    }
  } catch (error) {
    return "Error Getting Records from API";
  }
}
