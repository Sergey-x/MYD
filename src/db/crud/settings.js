import $realm from "../$realm";
import SettingsSchema from "../schemas/settings";


export default class SettingsCrud {
    static schemaName = SettingsSchema.name;

    static get() {
        return $realm.objectForPrimaryKey(this.schemaName, 0);
    }

    static init() {
        let createdSettings = this.get();
        if (!createdSettings) {
            $realm.write(() => {
                createdSettings = $realm.create(this.schemaName, {}, "modified");
            });
        }
        return createdSettings;
    }

    static setConcurrentLoadTrack(trackAmount) {
        let updatedSettings = null;
        $realm.write(() => {
            updatedSettings = this.get();
            updatedSettings.concurrentLoadTrack = trackAmount;
        });
        return updatedSettings;
    }

    static delete() {
        $realm.write(() => {
            $realm.delete(this.get());
        });
        return null;
    }
}

