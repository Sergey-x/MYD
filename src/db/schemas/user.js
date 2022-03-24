const UserSchema = {
    name: "User",
    properties: {
        pk: "int",
        uid: "int",
        token: {type: "string", default: ""},
        username: "string",
    },
    primaryKey: "pk",
};


export default UserSchema;
