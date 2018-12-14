import axios from 'axios';
import storage from "../common/Util"

// import storage from '@/utils/storage.js'

let base = 'http://192.168.31.60:8012';
let hotelBase = 'http://192.168.31.60:8013';
let AUTH_TOKEN = storage.getStorage('token');
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.timeout =  6000;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const requestLogin = params => {
    return axios.post(`${base}/login`, params).then(res => res.data);
};
export const requestRegister = params => {
    return axios.post(`${base}/user`, params).then(res => res.data);
};
export const userList = params => {
    return axios.get(`${base}/user`, {params: params});
};
export const removeUser = pathValue => {
    return axios.delete(`${base}/user/` + pathValue);
};
export const editUser = params => {
    return axios.put(`${base}/user`, params).then(res => res.data);
};


export const hotelTable = params => {
    return axios.get(`${hotelBase}/room`, {params: params});
};
export const addRoom = params => {
    return axios.post(`${hotelBase}/room`, params).then(res => res.data);
};
export const removeRoom = pathValue => {
    return axios.delete(`${hotelBase}/room/` + pathValue);
};
export const editRoom = (roomId,params) => {
    return axios.put(`${hotelBase}/room/`+roomId, params).then(res => res.data);
};