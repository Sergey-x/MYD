import apiInstance from "../apiInstance";


export default class PlaylistsApi {
    static getShortPlaylists() {
        return apiInstance.getUserPlaylists();
    }

    static getFullPlaylist(kind) {
        return apiInstance.getPlaylist(kind.toString());
    }
}
