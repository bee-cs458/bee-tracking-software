import axios from 'axios';

export const getCategories = async () => {
    try {

        const response = await axios.get('/api/categories/');

        return response.data.result;
    } catch (e) {
        return "Error big bad oof lol uwu\n" + e.message + "\n";
    }
}

export default getCategories;
