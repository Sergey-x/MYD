import * as RNFS from "react-native-fs";
import { mkdir, writeFile } from "react-native-fs";


const DOC_DIR = RNFS.DocumentDirectoryPath;
const COVER_IMAGE_DIRNAME = "YMD Documents";
export const IMAGES_PATH = DOC_DIR + "/" + COVER_IMAGE_DIRNAME;


function LocaleFiles() {
    return {
        makeFile: function(filepath, data, encoding='utf8') {
            return writeFile(filepath, data, encoding);
        },

        makeDir: function(dirname) {
            return mkdir(dirname);
        },
    };
}

const LocaleFilesManager = LocaleFiles();
export default LocaleFilesManager;
