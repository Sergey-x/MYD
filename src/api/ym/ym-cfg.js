import axios from "axios";


export const DOMAIN_YM_API_URL = 'https://api.music.yandex.net/';

const AXIOS_CONFIG = {
    baseURL: DOMAIN_YM_API_URL,
};


const $ymAxios = axios.create(AXIOS_CONFIG);


export default $ymAxios;
