import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/authorized/ProfileScreen";
import SettingsScreen from "./screens/authorized/SettingsScreen";
import PlaylistsStackNavigator from "./PlaylistsStackNavigator";
import PlaylistSvg from "./svg/playlistSvg";
import SettingsSvg from "./svg/settingsSvg";
import UserSvg from "./svg/userSvg";


const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Profile"
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
