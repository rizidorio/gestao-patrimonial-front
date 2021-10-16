import axios from "axios";

const apiService = axios.create({
    baseURL: `${process.env.BASE_URL}api`
});

export default apiService;