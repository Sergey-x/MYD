import replaceAllStr from "../utils/replaceAllStr";
import DB from "../db/db";
import HitMOApi from "../api/hitmo/hitmo";
import * as Console from "console";


export default class TrackManager {
    /**
     * Create new track instance (js object) for saving in database.
     * @param {object} mainTrackInfo - The data object with track fields.
     * @param {string} playlistKind - The kind of the playlist.
     */
    static createNew(mainTrackInfo, playlistKind) {
        try {
            var coverLink = `https://${mainTrackInfo.coverUri.split("%%")[0]}/50x50` || "";
        } catch (e) {
            console.log(mainTrackInfo.title);
        }


        return {
            pk: this.genTrackPK(+mainTrackInfo.id, playlistKind),
            id: +mainTrackInfo.id,
            title: mainTrackInfo.title,
            artistList: mainTrackInfo.artists.map(artist => artist.name),
            durationMs: +mainTrackInfo.durationMs || 0,
            imgSrc: coverLink,
            playlistKind: playlistKind,
            downloaded: false,
            srcLinks: [],
        };
    }

    static getTruncateArtistsLabel(artists) {
        const MAX_LEN = 25;
        let artistsStr = artists.join(", ");
        if (artistsStr.length > MAX_LEN) {
            artistsStr = artistsStr.slice(0, MAX_LEN) + "...";
        }
        return artistsStr;
    }

    static getTimeFromMs(durationMs) {
        const durationS = durationMs / 1000;
        let min = Math.floor(durationS / 60);
        let sec = Math.floor(durationS) % 60;
        if (sec < 10) {
            sec = "0" + sec;
        }
        return min + ":" + sec;
    }

    static getTitle(title) {
        const MAX_LEN = 25;
        if (title.length > MAX_LEN) {
            title = title.slice(0, MAX_LEN) + "...";
        }
        return title;
    }

    /**
     * Generate primary key by real_id of track and kind of playlist.
     * @param {string} id - The real_id of the track in Yandex Music.
     * @param {string} playlistKind - The kind of the playlist.
     */
    static genTrackPK(id, playlistKind) {
        return `${playlistKind}-${id}`;
    }

    static getSearchString(track) {
        let trackSearch = track.title + "+" + track.artistList.join(" ");
        return replaceAllStr(trackSearch, " ", "+");
    }

    /**
     * Generate track name for audio file with mp3 extension.
     * @param {object} track - The data object with track fields.
     */
    static getAudioFilename(track) {
        try {
            return track.title + " - " + track.artistList.join(", ") + ".mp3";
        } catch (e) {
            return track.title + " - " + track.artistList + ".mp3";
        }

    }

    /**
     * Get playlist name.
     * @param {object} track - The data object with track fields.
     */
    static getPlaylistName(track) {
        if (track.playlistKind) {
            return DB.playlists.get(track.playlistKind).title;
        }
        return "Мне нравится";
    }

    /**
     * Create new object with rendering data.
     * @param {object} track - The data object with track fields.
     */
    static prepared(track) {
        // console.log(track);
        return {
            key: track.pk,
            pk: track.pk,
            id: track.id,
            title: this.getTitle(track.title),
            artistList: this.getTruncateArtistsLabel(track.artistList),
            duration: this.getTimeFromMs(track.durationMs),
            imgSrc: track.imgSrc,
            playlistKind: track.playlistKind,
            downloaded: track.downloaded,
            srcLinks: track.srcLinks,
            loading: track.loading,
        };
    }

    static getItemLayout(data, index) {
        const TRACK_HEIGHT = 52;
        return {
            length: TRACK_HEIGHT,
            offset: TRACK_HEIGHT * index,
            index: index,
        };
    }

    static load(trackPk) {
        const track = DB.tracks.get(trackPk);
        if (track.srcLinks.length && !track.downloaded) {
            // start loading status
            console.log("start loading");
            DB.tracks.setLoading(trackPk);
            return HitMOApi.load(track).then(() => {
                // finish loading status
                DB.tracks.unsetLoading(trackPk);

                // track was loaded successfully
                DB.tracks.setDownloaded(trackPk);
            });
        }
    }
};
