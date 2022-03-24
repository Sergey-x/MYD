import React from "react";
import { PermissionsAndroid } from "react-native";


export const requestReadExternalStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Доступ к памяти :)",
                message: "Без этого не сохранишь музло",
                buttonNeutral: "Я еще подумаю",
                buttonNegative: "Не сюда",
                buttonPositive: "СЮДА",
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the storage");
        } else {
            console.log("Storage's permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};


export const requestWriteExternalStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Доступ к памяти :)",
                message: "Без этого не сохранишь музло",
                buttonNeutral: "Я еще подумаю",
                buttonNegative: "Не сюда",
                buttonPositive: "СЮДА",
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can write to the storage");
        } else {
            console.log("Storage's permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};
