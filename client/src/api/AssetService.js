import axios from 'axios';

/*
Calls the API endpoint for getting all assets, does not include due dates
@return collection of assets from the database, where each entry is one row. 
*/
export async function getAllAssets() {
    try {

        console.log("Getting Assets");

        const response = await axios.get('/api/asset/get_all');

        return response.data.result;
    } catch (error) {
        return "Error Getting Assets from API";
    }
}

/*
Calls the API endpoint for getting all assets with their due dates
@return collection of assets from the database, where each entry is one row. 
*/
export async function getAllAssetsWithDueDates() {
    try {

        console.log("Getting Assets with Due Dates");

        const response = await axios.get('/api/asset/get_all_due_dates');

        return response.data.result;
    } catch (error) {
        return "Error Getting Assets with Due Dates from API";
    }
}