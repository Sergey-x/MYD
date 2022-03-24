import cheerio from "react-native-cheerio";
import $HitMOAxios from "./hitmoCfg";
import Destination from "../../utils/Destination";
import RNFetchBlob from "rn-fetch-blob";
import TrackManager from "../../managers/track";


export default class HitMOApi {
    static findTrackPage(search) {
        return $HitMOAxios.get(`search?q=${search}`).then(res => {
            return res.data;
        });
    }

    static findTrackUrl(trackSearch) {
        return this.findTrackPage(trackSearch).then(data => {
            const $ = cheerio.load(data);
            return $("a").filter(".track__download-btn").eq(0).attr("href");
        });
    }

    static load(track) {
        const destinationFolder = Destination.getPath(TrackManager.getPlaylistName(track));
        return Destination.create(destinationFolder)
            .then(() => {
                return RNFetchBlob
                    .config({
                        fileCache: true,
                        path: destinationFolder + TrackManager.getAudioFilename(track),
                    })
                    .fetch("GET", track.srcLinks[0])
                    .then(res => {
                        console.log("The file saved to ", res.path());
                        return res;
                    })
                    .catch(e => {
                        console.log("Error", e.message);
                    });
            });
    }
}
