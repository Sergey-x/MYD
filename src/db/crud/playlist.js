import PlaylistSchema from "../schemas/playlist";
import $realm from "../$realm";
import { IMAGES_PATH } from "../../localeFiles/documentDirConfig";


export default class CrudPlaylist {
    static schemaName = PlaylistSchema.name;

    /**
     * Get all playlists.
     */
    static all() {
        return $realm.objects(this.schemaName);
    };

    /**
     * Get playlist with specified pk.
     * @param {int} pk - The primary key of the playlist.
     * */
    static get(pk) {
        return $realm.objectForPrimaryKey(this.schemaName, pk);
    }

    /**
     * Create new playlist in database.
     * @param {Object} playlist - The track object with determined fields.
     * */
    static add(playlist) {
        let createdPlaylist = null;
        $realm.write(() => {
            createdPlaylist = $realm.create(this.schemaName, playlist, "modified");
        });
        return createdPlaylist;
    }

    /**
     * Create new playlists in database.
     * @param {Iterable} playlists - The iterable object with playlist objects.
     * */
    static addMany(playlists) {
        let createdPlaylists = [];
        playlists.forEach(playlist => {
            createdPlaylists.push(this.add(playlist));
        });
        return createdPlaylists;
    }

    /**
     * Set `shouldReload=true` (playlist is actual).
     * @param {int} pk - The primary key of the playlist.
     * */
    static setLoadedFlag(pk) {
        let updatedPlaylist;
        $realm.write(() => {
            updatedPlaylist = this.get(pk);
            updatedPlaylist.shouldReload = false;
        });
        return updatedPlaylist;
    }

    /**
     * Save cover image of playlist.
     * @param {int} pk - The primary key of the playlist.
     * */
    static saveImage(pk) {
        let updatedPlaylist = this.get(pk);
        $realm.write(() => {
            updatedPlaylist.imgLocalPath = `${IMAGES_PATH}/playlists/${pk}`;
        });
        return updatedPlaylist;
    }

    /**
     * Delete playlist by pk.
     * @param {int} pk - The primary key of the playlist.
     */
    static delete(pk) {
        $realm.write(() => {
            $realm.delete(this.get(pk));
        });
        return null;
    }

    /**
     * Delete all playlists.
     */
    static delAll() {
        $realm.write(() => {
            $realm.delete(this.all());
            console.log("Clear playlists!");
        });
        return null;
    }
}
