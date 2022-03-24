const SettingsSchema = {
    name: "Settings",
    properties: {
        pk: {type: "int", default: 0},
        concurrentLoadTrack: {type: "int", default: 2},
    },
    primaryKey: "pk",
};


export default SettingsSchema;
