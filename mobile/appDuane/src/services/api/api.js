import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.0.3.116:3000'

})

export default api;