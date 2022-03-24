import RNFetchBlob from "rn-fetch-blob";
import { mkdir } from "react-native-fs";


const SEP = "/";
const ROOT_FOLDER = "YandexMusicTracks";


export default class Destination {
    static getPath(playlistName=null) {
        let downloadDirPaths = RNFetchBlob.fs.dirs.DownloadDir.split(SEP);
        downloadDirPaths.pop();
        downloadDirPaths.push(ROOT_FOLDER);
        if (playlistName) {
            downloadDirPaths.push(playlistName);
        }
        return downloadDirPaths.join(SEP) + SEP;
    };

    static create(folderPath) {
        return mkdir(folderPath);
    };
}
