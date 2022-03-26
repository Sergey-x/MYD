/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect } from "react";
import { BackHandler, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

import AppNavigations from "./src/components/AppNavigations";
import { closeDB, openDB } from "./src/db/$realm";
import { requestWriteExternalStoragePermission } from "./src/permissions/ExternalStorage";
import DB from "./src/db/db";


LogBox.ignoreLogs(["Require cycle:", "Remote debugger"]);


export default function App() {
    const onOpenApp = () => {
        openDB();
        DB.settings.init();
        DB.playlistLikes.init();
    };

    const onCloseApp = () => {
        closeDB();
        BackHandler.exitApp();
    };

    useEffect(() => {
        requestWriteExternalStoragePermission().then(onOpenApp);
        const backHandler = BackHandler.addEventListener("hardwareBackPress", onCloseApp);
        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaProvider>
            <NativeBaseProvider>
                <NavigationContainer>
                    <AppNavigations />
                </NavigationContainer>
            </NativeBaseProvider>
        </SafeAreaProvider>
    );
}

