import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import DB from "../../../db/db";
import Playlist from "../../playlist/Playlist";
import PlaylistLikes from "../../playlist/PlaylistLikes";
import PlaylistManager from "../../../managers/playlist";
import SplashScreen from "./SplashScreen";
import YmAPI from "../../../api/ym/ym-api";


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};


export default function PlaylistsScreen() {
    const [playlists, setPlaylists] = useState([]);
    const [ready, setReady] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

    const updatePlaylists = (playlists) => {
        setPlaylists(playlists);
        setReady(true);
    };

    const populatePlaylistsFromDB = () => {
        const dbP = JSON.parse(JSON.stringify(DB.playlists.all()));
        updatePlaylists(dbP);
    };

    const populatePlaylistsFromApi = () => {
        // TODO: catch error
        YmAPI.playlists.getShortPlaylists().then(playlists => {
            const dbPlaylists = playlists.map(playlist => PlaylistManager.createNew(playlist));
            updatePlaylists(dbPlaylists);

            // save playlists in DB
            DB.playlists.addMany(dbPlaylists);
        }).catch((e) => {
            console.log(e);
            populatePlaylistsFromDB();
        });
    };

    const initPlaylists = () => {

        try {
            populatePlaylistsFromApi();
        } catch (e) {
            console.log("DB");
            populatePlaylistsFromDB();
        }
    };

    useFocusEffect(React.useCallback(() => {
        if (refreshing) {
            initPlaylists();
        }
    }, [refreshing]));

    useEffect(() => {
        initPlaylists();
    }, []);

    const playlistList = playlists.map(playlist => <Playlist key={playlist.pk} {...Object.assign({}, playlist)} />);

    function renderScreen() {
        return (
            <ScrollView
                style={styles.playlistScreen}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.playlistList}>
                    <PlaylistLikes />
                    {playlistList}
                </View>
            </ScrollView>
        );
    }

    return (ready ? renderScreen() : <SplashScreen />);
}


const styles = StyleSheet.create({
    playlistScreen: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
    },

    playlistList: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        justifyContent: "space-between",
    },
});
