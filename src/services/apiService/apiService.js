import axios from "axios";

const apiService = axios.create({
    baseURL: `${process.env.VUE_APP_BASE_URL}api`,
    headers: {"Authorization": localStorage.getItem("userToken") != undefined ? localStorage.getItem("userToken") : "" }
});

export default apiService;