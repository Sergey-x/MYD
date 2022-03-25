import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Button } from "native-base";

import DB from "../../../db/db";
import YmAPI from "../../../api/ym/ym-api";
import HitMOApi from "../../../api/hitmo/hitmo";
import SplashScreen from "./SplashScreen";
import TrackManager from "../../../managers/track";
import renderTrack from "../../track/renderTrack";
import Queue from "queue-promise";


export default function TracksScreen(props) {
    const { playlistKind } = props.route.params;
    const currentPlaylist = DB.playlists.get(playlistKind);

    const [tracks, setTracks] = useState([]);
    const [findingLinksFlag, setFindingLinksFlag] = useState(false);
    const [readyFlag, setReadyFlag] = useState(false);
    const [activeLoadingFlag, setActiveLoadingFlag] = useState(false);

    const findLinksQueue = new Queue({
        concurrent: 6,
        interval: 0,
    });

    findLinksQueue.on("start", () => {
        setFindingLinksFlag(true);
    });
    findLinksQueue.on("end", () => {
        setFindingLinksFlag(false);
        DB.playlists.setLoadedFlag(playlistKind);
    });
    findLinksQueue.on("stop", () => {
        setFindingLinksFlag(false);
    });

    const newQueue = new Queue({
        concurrent: DB.settings.get().concurrentLoadTrack,
        interval: 0,
    });

    newQueue.on("start", () => {setActiveLoadingFlag(true)});
    newQueue.on("end", () => {setActiveLoadingFlag(false)});
    newQueue.on("stop", () => {setActiveLoadingFlag(false)});

    React.useLayoutEffect(() => {
        // configure header
        props.navigation.setOptions({
            title: currentPlaylist.title,
        });
    }, [props.navigation]);

    useEffect(() => {
        // set state to the initial value of your realm objects
        const listenTracks = DB.tracks.getByPlaylistKind(playlistKind);
        setTracks(listenTracks);

        listenTracks.addListener(() => {
            const updTracks = DB.tracks.getByPlaylistKind(playlistKind).map(track => {
                track.onLoad = (f) => newQueue.enqueue(f);
                return track;
            });
            setTracks(updTracks);
        });

        initTracksData();

        return () => {
            // Remember to remove the listener when you're done
            listenTracks.removeAllListeners();
        };
    }, []);

    const initTracksData = () => {
        if (currentPlaylist && currentPlaylist.shouldReload) {
            populateTracksFromApi();
            DB.playlists.setLoadedFlag(playlistKind);
        } else {
            console.log("skip downloading tracks for playlist " + playlistKind);
            setReadyFlag(true);
        }
    };

    const populateTracksFromApi = () => {
        YmAPI.playlists.getFullPlaylist(playlistKind)
            .then(data => {
                return data.tracks.map(trackItem => {
                    const dbTrack = DB.tracks.get(TrackManager.genTrackPK(trackItem.track.id, playlistKind));
                    if (dbTrack) {
                        return dbTrack;
                    }
                    return TrackManager.createNew(trackItem.track, playlistKind);
                });
            }).then(loadedTracks => {
            // add tracks to DB
            DB.tracks.addMany(loadedTracks);
            setReadyFlag(true);
            return loadedTracks;
        }).then(loadedTracks => {
            // find links for loading
            const findLinksPromises = [];
            loadedTracks.forEach(track => {
                if (track.srcLinks.length === 0) {
                    setFindingLinksFlag(true);

                    const promiseLinkFunc = () => {
                        const trackSearch = TrackManager.getSearchString(track);
                        return HitMOApi.findTrackUrl(trackSearch).then(link => {
                            if (link && link.toString().startsWith("http")) {
                                DB.tracks.add(track);
                                DB.tracks.addLink(track.pk, link);
                            }
                        });
                    };
                    findLinksQueue.enqueue(promiseLinkFunc);
                }
            });

            // delete all removed tracks from DB
            // JSON.parse(JSON.stringify(DB.tracks.getByPlaylistKind(playlistKind))).forEach(playlistTrack => {
            //     const trackPK = playlistTrack.pk.toString();
            //     if (!loadedTracks.find(elem => elem.pk.toString() === trackPK)) {
            //         DB.tracks.delete(trackPK);
            //     }
            // });
        });
    };


    function onLoadTracks() {
        const oldTracks = tracks.slice().map(track => {
            track.onLoad = (f) => newQueue.enqueue(f);
            return track;
        });

        setTracks(oldTracks);

        oldTracks.forEach(track => {
            if (track.srcLinks.length && !track.downloaded) {
                DB.tracks.setLoading(track.pk);
            }
        });
    }


    function renderScreen() {
        return (
            <>
                <Button mb={3}
                        isLoading={activeLoadingFlag}
                        isLoadingText="Downloading"
                        onPress={onLoadTracks}
                        borderRadius={0}>
                    Load all available tracks
                </Button>

                {
                    activeLoadingFlag &&
                    <Button mb={3}
                            onPress={() => {
                                newQueue.stop();
                            }}
                            borderRadius={0}>
                        Cancel downloading
                    </Button>
                }

                {
                    findingLinksFlag &&
                    <Button isLoading
                            isLoadingText="Find links"
                            backgroundColor="#eeeeee">
                    </Button>
                }
                <FlatList
                    data={tracks.map(track => TrackManager.prepared(track))}
                    renderItem={renderTrack}
                    initialNumToRender={25}
                    getItemLayout={TrackManager.getItemLayout}
                />
            </>
        );
    }

    return (readyFlag ? renderScreen() : <SplashScreen />);
}
