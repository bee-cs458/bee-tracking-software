import axios from "axios";

// This class is used to organize and contain all functions that
// use Axios to interact with the API

export async function getCounterValue() {
    try {
        // Calls the /api/count GET route from the API to get the current counter value
        const response = await axios.get('/api/count');
        // Returns the current counter value
        return response.data.result;
    } catch (error) {
        return "Error Getting Counter Value";
    }
}

export async function updateCounterValue(increment) {
    try {
        // Calls the /api/count POST route from the API to increment the counter value
        // Passes the incrementVal argument which tells the API how much to increase the counter by
        const response = await axios.post('/api/count', { incrementVal: increment });
        // Returns the current counter value after it has been updated
        return response.data.result;
    } catch (error) {
        return "Error Incrementing Counter Value";
    }
}