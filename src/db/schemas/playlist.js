const PlaylistSchema = {
    name: "Playlist",
    properties: {
        // pk and kind are same
        pk: "int",
        kind: "int",
        title: {type: "string", default: "playlist-title"},
        imgSrc: {type: "string", default: ""},
        imgLocalPath: {type: "string", default: ""},
        modified: "string?",
        shouldReload: {type: "bool", default: false},
        durationMs: {type: "int", default: 0},
    },
    primaryKey: "pk",
};


export default PlaylistSchema;
