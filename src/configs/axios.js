import axios from 'axios'
import {store} from '@/redux/store'
const {VITE_BASE_API_URL} = import.meta.env
axios.defaults.baseURL = VITE_BASE_API_URL + '/api'
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(function (config) {
    if(config.headers.Authorization){

    }else{
        let token = store.getState().auth.token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axios