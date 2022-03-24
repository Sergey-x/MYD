import $realm from "../$realm";
import PlaylistLikesSchema from "../schemas/playlistLikes";


export default class CrudPlaylistLikes {
    static schemaName = PlaylistLikesSchema.name;

    /**
     * Get playlist with liked tracks.
     * */
    static get() {
        return $realm.objectForPrimaryKey(this.schemaName, 0);
    }

    /**
     * Create playlist object with liked tracks, if existed - do nothing.
     * */
    static init() {
        let createdPlaylist = null;
        $realm.write(() => {
            createdPlaylist = $realm.create(this.schemaName, { pk: 0 }, "modified");
        });
        return createdPlaylist;
    }

    /**
     * Update revision of playlist.
     * @param {int} revision - The revision of playlist, point to differ on server.
     * */
    static setRevision(revision) {
        let updatedPlaylist = null;
        $realm.write(() => {
            updatedPlaylist = this.get();
            updatedPlaylist.revision = revision;
        });
        return updatedPlaylist;
    }
}
