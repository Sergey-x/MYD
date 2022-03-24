import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Feather from "react-native-vector-icons/Feather";
// import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
// import MapScreen from "./screens/authorized/MapScreen";
import ProfileScreen from "./screens/authorized/ProfileScreen";
// import SettingsScreen from "./screens/authorized/SettingsScreen";
import PlaylistsStackNavigator from "./PlaylistsStackNavigator";


const Tab = createBottomTabNavigator();
export const Stack = createNativeStackNavigator();


export default function BottomTabNavigator() {
  useFocusEffect(
    React.useCallback(() => {
      return () => {
      };
    }, []),
  );

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      // initialRouteName="PlaylistsStackScreen"
      screenOptions={{
        tabBarActiveTintColor: "#ea2264",
        headerShown: false,
      }}
    >
      <Tab.Screen name="Profile"
                  component={ProfileScreen}
                  options={{
                    tabBarLabel: "Profile",
                    headerShown: true,
                    tabBarIcon: () => (
                      // <Feather name="user" size={24} color="#aaa" />
                      <></>
                    ),
                  }}
      />

      <Tab.Screen name="PlaylistsStackScreen"
                  component={PlaylistsStackNavigator}
                  options={{
                    tabBarLabel: "Playlists",
                    tabBarIcon: () => (
                      // <SimpleLineIcons name="playlist" size={24} color="#aaa" />
                      <></>
                    ),
                  }}
      />

      {/*      <Tab.Screen name="Map"
                  component={MapScreen}
                  options={{
                    tabBarLabel: "Map",
                    headerShown: true,
                    tabBarIcon: () => (
                      // <Feather name="map-pin" size={24} color="#aaa" />
                      <></>
                    ),
                  }}
      />*/}

      {/*      <Tab.Screen name="Settings"
                  component={SettingsScreen}
                  options={{
                    tabBarLabel: "Settings",
                    headerShown: true,
                    tabBarIcon: () => (
                      // <Feather name="settings" size={24} color="#aaa" />
                      <Image
                        style={{ width: 24, height: 24 }}
                        source={settingsSvg}
                      />
                    ),
                  }}
      />*/}
    </Tab.Navigator>
  );
}
