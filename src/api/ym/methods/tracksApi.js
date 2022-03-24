import $ymAxios, { DOMAIN_YM_API_URL } from "../ym-cfg";
import axios from "axios";


export default class TracksApi {
    static getShortLikesTracks() {
        return $ymAxios.get(`likes/tracks`).then(res => {
            return res.data;
        });
    }

    static getFullTrack(trackId) {
        const ax = axios.create({
            baseURL: DOMAIN_YM_API_URL,
        });
        return ax.get(`tracks/${trackId}`).then(res => {
            return res.data;
        });
    }
}
