import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./screens/authorized/ProfileScreen";
import SettingsScreen from "./screens/authorized/SettingsScreen";
import MapScreen from "./screens/authorized/MapScreen";
import PlaylistsStackNavigator from "./PlaylistsStackNavigator";
import UserSvg from "../assets/userSvg";
import SettingsSvg from "../assets/settingsSvg";
import MapSvg from "../assets/mapSvg";
import PlaylistSvg from "../assets/playlistSvg";


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
