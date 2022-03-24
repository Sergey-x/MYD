const PlaylistLikesSchema = {
    name: "PlaylistLikes",
    properties: {
        pk: {type: "int", default: 0},
        revision: {type: "int", default: 0},
        tracksLen: {type: "int", default: 0},
    },
    primaryKey: "pk",
};


export default PlaylistLikesSchema;
