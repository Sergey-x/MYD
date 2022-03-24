export default class PlaylistLikesManager {
    static PK = 0;

    static createNew(revision=0, tracksLen=0) {
        return {
            pk: this.PK,
            revision: revision,
            tracksLen: tracksLen,
        };
    }
};
