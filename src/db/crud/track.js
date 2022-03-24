/** A track db-crud operations module. Its name is db/crud/track.
 * @module db/crud/track
 */
import TrackSchema from "../schemas/track";
import $realm from "../$realm";


export default class CrudTrack {
    static schemaName = TrackSchema.name;

    /**
     * Get all tracks.
     */
    static all() {
        return $realm.objects(this.schemaName);
    }

    /**
     * Get all tracks associated with playlist.
     * @param {int} playlistKind - The kind of the associated playlist.
     */
    static getByPlaylistKind(playlistKind) {
        return $realm.objects(this.schemaName).filtered(`playlistKind = ${playlistKind}`);
    }

    /**
     * Get track with specified pk.
     * @param {string} pk - The primary key of the track.
     * */
    static get(pk) {
        return $realm.objectForPrimaryKey(this.schemaName, pk);
    }

    /**
     * Create new track in database.
     * @param {Object} track - The track object with determined fields.
     * */
    static add(track) {
        let createdTrack = null;
        if (this.get(track.pk)) {
            return null;
        }

        $realm.write(() => {
            createdTrack = $realm.create(this.schemaName, track, "modified");
        });
        return createdTrack;
    }

    /**
     * Create new tracks in database.
     * @param {Iterable} tracks - The iterable object with track objects.
     * */
    static addMany(tracks) {
        let createdTracks = [];
        tracks.forEach(track => {
            createdTracks.push(this.add(track));
        });
        return createdTracks;
    }

    /**
     * Set download flag = true (audio-file of track was loaded).
     * @param {string} pk - The primary key of the track.
     * */
    static setDownloaded(pk) {
        let updatedTrack;
        $realm.write(() => {
            updatedTrack = this.get(pk);
            updatedTrack.downloaded = true;
        });
        return updatedTrack;
    }

    /**
     * Set loading flag (if true audio-file of track is loading).
     * @param {string} pk - The primary key of the track.
     * @param {boolean} flag - The loading flag.
     * */
    static setLoadingStatus(pk, flag) {
        let updatedTrack;
        $realm.write(() => {
            updatedTrack = this.get(pk);
            updatedTrack.loading = flag;
        });
        return updatedTrack;
    }


    /**
     * Set loading flag = true (audio-file of track is loading).
     * @param {string} pk - The primary key of the track.
     * */
    static setLoading(pk) {
        return this.setLoadingStatus(pk, true);
    }

    /**
     * Set loading flag = false (audio-file of track was loaded).
     * @param {string} pk - The primary key of the track.
     * */
    static unsetLoading(pk) {
        return this.setLoadingStatus(pk, false);
    }

    /**
     * Add source link to mp3 file
     * @param {string} pk - The primary key of the track.
     * @param {string} link - The link to load audio-file.
     * */
    static addLink(pk, link) {
        let updatedTrack;
        $realm.write(() => {
            updatedTrack = this.get(pk);
            updatedTrack.srcLinks = [...updatedTrack.srcLinks.slice(), link];
        });
        return updatedTrack;
    }

    /**
     * Delete track by pk.
     * @param {string} pk - The primary key of the track.
     */
    static delete(pk) {
        let delTrack = this.get(pk);
        $realm.write(() => {
            $realm.delete(delTrack);
            delTrack = null;
        });
        return null;
    }

    /**
     * Delete all tracks associated with playlist.
     * @param {int} playlistKind - The kind of the associated playlist.
     */
    static delByPlaylistKind(playlistKind) {
        $realm.write(() => {
            const playlistTracks = $realm.objects(this.schemaName).filtered(`playlistKind = ${playlistKind}`);
            $realm.delete(playlistTracks);
        });
        return null;
    }

    /**
     * Delete all tracks.
     */
    static delAll() {
        $realm.write(() => {
            $realm.delete(this.all());
            console.log("Clear tracks!");
        });
        return null;
    }
}
