import RoundNumber from "./roundNumber";


export default class MemorySerializer {
    static serialize(bytes) {
        let kb = Math.floor(bytes / 1024);
        let mb = Math.floor(kb / 1024);
        let gb = Math.floor(mb / 1024);

        let res = "0 MB";
        if (gb !== 0) {
            res = gb + RoundNumber((mb - 1024 * gb) / 1024, 2) + " GB";
        } else if (mb !== 0) {
            res = mb + " MB";
        }

        return res;
    }
}
