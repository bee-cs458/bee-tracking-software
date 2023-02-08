import axios from 'axios';

/*
    Send a checkout request
*/
export async function doCheckout(asset_tags, student_id, opId) {
    try {
        const response = await axios.post("/api/checkout/checkout_assets", {
            asset_tags, student_id, opId
        });
        return response.data;
    } catch (error) {
        const errStr = "Error with checkout request: " + error.response?.data?.message ?? error.message;
        throw new Error(errStr);
    }
}

export async function getCheckoutStatus(asset_tag) {
    try {
        const response = await axios.get(`/api/checkout/status/${asset_tag}`);
        return response.data.result;
    } catch (error) {
        console.error("Error getting checkout status: " + error.response?.data?.message ?? error.message);
        return false;
    }
}