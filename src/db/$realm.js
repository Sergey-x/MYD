import Realm from "realm";
import PlaylistSchema from "./schemas/playlist";
import TrackSchema from "./schemas/track";
import UserSchema from "./schemas/user";
import PlaylistLikesSchema from "./schemas/playlistLikes";
import SettingsSchema from "./schemas/settings";


const REALM_CONF = {
    path: "myrealm",
    schema: [PlaylistSchema, TrackSchema, UserSchema, PlaylistLikesSchema, SettingsSchema],
    schemaVersion: 43,
};

export function openDB() {
    return new Realm(REALM_CONF);
}


export function isOpenDB() {
    return $realm !== null;
}


export function closeDB() {
    if ($realm) {
        $realm.close();
    }

    return null;
}


export function clearDB() {
    $realm.write(() => {
        $realm.deleteAll();
        console.log("Clear realm!");
    });
}

const $realm = openDB();
export default $realm;
