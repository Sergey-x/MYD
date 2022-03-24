/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigations from "./src/components/AppNavigations";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { closeDB, openDB } from "./src/db/$realm";
import { requestWriteExternalStoragePermission } from "./src/permissions/ExternalStorage";
import { BackHandler } from "react-native";
import DB from "./src/db/db";
import { IMAGES_PATH } from "./src/localeFiles/documentDirConfig";


export default function App() {
  const onOpenApp = () => {
    openDB();
    DB.settings.init();
    DB.playlistLikes.init();
  };

  const onCloseApp = () => {
    closeDB();
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    requestWriteExternalStoragePermission().then(onOpenApp);
    const backHandler = BackHandler.addEventListener("hardwareBackPress", onCloseApp);
    console.log(IMAGES_PATH);
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

