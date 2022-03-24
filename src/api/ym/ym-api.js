import PlaylistsApi from "./methods/playlistsApi";
import TracksApi from "./methods/tracksApi";


export default class YmAPI {
    static playlists = PlaylistsApi;
    static tracks = TracksApi;
}
