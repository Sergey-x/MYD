import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlaylistsScreen from "./screens/authorized/PlaylistsScreen";
import TracksScreen from "./screens/authorized/TracksScreen";
import LikesTracksScreen from "./screens/authorized/LikesTracksScreen";


const PlaylistsStack = createNativeStackNavigator();


export default function PlaylistsStackNavigator() {
    return (
        <PlaylistsStack.Navigator>
            <PlaylistsStack.Screen name="Playlists" component={PlaylistsScreen} />
            <PlaylistsStack.Screen name="Tracks" component={TracksScreen} />
            <PlaylistsStack.Screen name="Likes" component={LikesTracksScreen} />
        </PlaylistsStack.Navigator>
    );
}
