import axios from "axios";

axios.defaults.params = {}
axios.defaults.params['api_key'] = '4237669ebd35e8010beee2f55fd45546';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    timeout: 1000,
});



export default instance;