import axios from "axios";


const $HitMOAxios = axios.create({
    baseURL: "https://ru.hitmotop.com/",
});


export default $HitMOAxios;
