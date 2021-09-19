import axios from 'axios';

const api = axios.create({
    baseURL: 'http://innvcar-com-br.umbler.net'
    //baseURL: 'http://192.168.0.6:3333'
});

export default api;