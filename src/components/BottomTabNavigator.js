import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapScreen from "./screens/authorized/MapScreen";
import ProfileScreen from "./screens/authorized/ProfileScreen";
import SettingsScreen from "./screens/authorized/SettingsScreen";
import PlaylistsStackNavigator from "./PlaylistsStackNavigator";
import MapSvg from "../assets/mapSvg";
import PlaylistSvg from "../assets/playlistSvg";
import SettingsSvg from "../assets/settingsSvg";
import UserSvg from "../assets/userSvg";


const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {
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
                            tabBarIcon: () => <UserSvg />,
                        }}
            />

            <Tab.Screen name="PlaylistsStackScreen"
                        component={PlaylistsStackNavigator}
                        options={{
                            tabBarLabel: "Playlists",
                            tabBarIcon: () => <PlaylistSvg />,
                        }}
            />

            <Tab.Screen name="Map"
                        component={MapScreen}
                        options={{
                            tabBarLabel: "Map",
                            headerShown: true,
                            tabBarIcon: () => <MapSvg />,
                        }}
            />

            <Tab.Screen name="Settings"
                        component={SettingsScreen}
                        options={{
                            tabBarLabel: "Settings",
                            headerShown: true,
                            tabBarIcon: () => <SettingsSvg />,
                        }}
            />
        </Tab.Navigator>
    );
}
