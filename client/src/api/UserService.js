import axios from 'axios';

export async function verifyLogin(user, pass) {
    try {

        console.log("Checking Login Info");

        const response = await axios.get('/api/user/verifyLogin', {params: {
            user,
            pass
        }
    });

        return response.data.result[0];
    } catch (error) {
        console.log('help');
        return "Error Getting Login Info";
    }
}