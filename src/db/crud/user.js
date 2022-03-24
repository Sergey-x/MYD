import $realm from "../$realm";
import UserSchema from "../schemas/user";


export default class CrudUser {
    static schemaName = UserSchema.name;

    static get() {
        return $realm.objectForPrimaryKey(this.schemaName, 0);
    }

    static add(user) {
        let createdPlaylist = null;
        $realm.write(() => {
            createdPlaylist = $realm.create(this.schemaName, user, "modified");
        });
        return createdPlaylist;
    }

    static delete() {
        $realm.write(() => {
            $realm.delete(this.get());
        });
        return null;
    }
}

