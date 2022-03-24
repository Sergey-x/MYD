import CrudPlaylist from "./crud/playlist";
import CrudTrack from "./crud/track";
import CrudUser from "./crud/user";
import CrudPlaylistLikes from "./crud/playlistLikes";
import SettingsCrud from "./crud/settings";


export default class DB {
    static playlists = CrudPlaylist;
    static playlistLikes = CrudPlaylistLikes;
    static tracks = CrudTrack;
    static users = CrudUser;
    static settings = SettingsCrud;
}
