import axios from 'axios';

export const getCategories = async () => {
    try {

        const response = await axios.get('/api/categories/');

        return response.data.result;
    } catch (e) {
        return "Error big bad oof lol uwu\n" + e.message + "\n";
    }
}

export const getCategoryById = async (id) => {
    try {
        const result = await getCategories();

        return result[id];
    } catch (e) {
        return "Provided category ID does not match a real category ID";
    }
}

export default getCategories;
