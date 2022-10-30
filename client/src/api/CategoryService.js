import axios from 'axios';

export default async () => {
    try {
        console.log("Getting Categories");

        const response = await axios.get('/api/categories/');

        return response.data.result;
    } catch (e) {
        return "Error big bad oof lol uwu\n" + e.message + "\n";
    }
}
