import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "http://10.10.22.227:5000/api";
// const BASE_URL = "http://10.10.22.227:5000/api";
// const BASE_URL = "http://localhost:5000/api";
// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "http://192.168.1.69:5000/api";
export const PI_URL = "http://192.168.1.186:5001";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;

