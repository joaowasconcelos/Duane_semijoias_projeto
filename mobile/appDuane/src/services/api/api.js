import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.0.3.77:5050'

})

export default api;