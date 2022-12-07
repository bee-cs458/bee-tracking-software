import axios from 'axios';

/*
Calls the API endpoint for getting all assets, does not include due dates
@return collection of assets from the database, where each entry is one row. 
*/
export async function getAllRecords() {
    try {
        console.log("Getting Records");

        const response = await axios.get("/api/records/get_all");

        return response.data.result;
    } catch (error) {
        return "Error Getting Records from API";
    }
}