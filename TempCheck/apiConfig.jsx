import axios from axios;

const api = axios.create({
    baseUrl: "http://localhost:5000/",
    timeout: 5000,
})
export default api;