import DB from "../db/db";


const AVATARS_SIZE = 200;


export default class PlaylistManager {
    static createNew(data) {
        const existedPlaylist = DB.playlists.get(data.kind);

        let playlist = {
            pk: +data.kind,
            kind: +data.kind,
            title: data.title,
            modified: data.modified,
            shouldReload: true,
            durationMs: data.durationMs,
        };

        if (existedPlaylist) {
            playlist.shouldReload = (data.modified !== existedPlaylist.modified) || existedPlaylist.shouldReload;
        }

        playlist.imgSrc = "";
        try {
            if (data.cover.uri.length) {
                playlist.imgSrc = `https://${data.cover.uri.split("%%")[0]}/${AVATARS_SIZE}x${AVATARS_SIZE}`;
            } else if (data.cover.itemsUri) {
                playlist.imgSrc = `https://${data.cover.itemsUri[0].split("%%")[0]}/${AVATARS_SIZE}x${AVATARS_SIZE}`;
            }
        } catch (e) {
            if (data.cover.itemsUri) {
                playlist.imgSrc = `https://${data.cover.itemsUri[0].split("%%")[0]}/${AVATARS_SIZE}x${AVATARS_SIZE}`;
            }
        }
        return playlist;
    }
};
