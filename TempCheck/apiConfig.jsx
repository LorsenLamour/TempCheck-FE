import axios from "axios";

const API_URL = `http://localhost:5000/api/temperature/`
const API_URL_mobile = `http://10.10.22.227:5000/api/temperature/`

export const api = async () => {
    try {
        const response = await axios.get(API_URL_mobile);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
