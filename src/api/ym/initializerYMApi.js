import apiInstance from "./apiInstance";
import $ymAxios, { DOMAIN_YM_API_URL } from "./ym-cfg";
import DB from "../../db/db";


export default class YMAPI {
    static prevInit() {
        let res = false;
        try {
            const userDB = DB.users.get();
            if (userDB && userDB.token) {
                const cred = {
                    access_token: userDB.token,
                    uid: +userDB.uid,
                };
                apiInstance.init(cred).then(data => {
                    $ymAxios.defaults.baseURL = DOMAIN_YM_API_URL + `users/${data.uid}/`;
                });
                res = true;
            }
        } catch (e) {
            console.log(e);
        }
        return res;
    }

    static init(email, password) {
        return apiInstance.init({ username: email, password: password })
            .then(data => {
                DB.users.add({
                    pk: 0,
                    uid: +data.uid,
                    token: data.access_token,
                    username: email,
                });
                $ymAxios.defaults.baseURL = DOMAIN_YM_API_URL + `${data.uid}/`;
                return true;
            })
            .catch(error => {
                console.log(`api error ${error.message}`);
                return false;
            });
    }
}
