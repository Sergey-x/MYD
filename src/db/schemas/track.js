const TrackSchema = {
    name: "Track",
    properties: {
        // pk is a combo of playlist's kind and track id: `playlistKind-trackId`
        pk: "string",
        id: "int",
        title: {type: 'string', default: 'track-title'},
        artistList: {type: 'list', objectType: 'string', default: []},
        durationMs: {type: 'int', default: 0},
        downloaded: {type: 'bool', default: false},
        loading: {type: 'bool', default: false},
        srcLinks: {type: 'list', objectType: 'string', default: []},
        imgSrc: {type: 'string', default: ""},
        imgLocalPath: {type: 'string', default: ""},
        playlistKind: {type: 'int'},
    },
    primaryKey: "pk",
};


export default TrackSchema;
