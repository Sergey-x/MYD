import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import YmAPI from "../../../api/ym/ym-api";
import renderTrack from "../../track/renderTrack";
import SplashScreen from "./SplashScreen";
import { Button } from "native-base";
import DB from "../../../db/db";
import HitMOApi from "../../../api/hitmo/hitmo";
import TrackManager from "../../../managers/track";
import PlaylistLikesManager from "../../../managers/playlistLikes";
import Queue from "queue-promise";


export default function LikesTracksScreen(props) {
    const [tracks, setTracks] = useState([]);
    const [findingLinksFlag, setFindingLinksFlag] = useState(false);
    const [readyFlag, setReadyFlag] = useState(false);
    const [activeLoadingFlag, setActiveLoadingFlag] = useState(false);

    const playlistKind = PlaylistLikesManager.PK;

    const findLinksQueue = new Queue({
        concurrent: 3,
        interval: 0,
    });

    findLinksQueue.on("start", () => {
        setFindingLinksFlag(true);
    });
    findLinksQueue.on("end", () => {
        setFindingLinksFlag(false);
    });
    findLinksQueue.on("stop", () => {
        setFindingLinksFlag(false);
    });

    const loadTracksQueue = new Queue({
        concurrent: DB.settings.get().concurrentLoadTrack,
        interval: 0,
    });

    loadTracksQueue.on("start", () => {
        setActiveLoadingFlag(true);
    });

    loadTracksQueue.on("end", () => {
        setActiveLoadingFlag(false);
    });

    loadTracksQueue.on("stop", () => {
        setActiveLoadingFlag(false);
    });

    // configure header
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "Мне нравится",
        });
    }, [props.navigation]);

    const initTracksData = () => {
        const oldRevision = +(DB.playlistLikes.get().revision);
        YmAPI.tracks.getShortLikesTracks().then(data => {
            const newRevision = +data["result"]["library"]["revision"];
            if (oldRevision !== newRevision) {
                // если список обновился
                const shortTracks = data["result"]["library"]["tracks"];
                console.log("shortTracks API");
                populateLikesTracksFromApi(shortTracks).then(() => {
                    DB.playlistLikes.setRevision(newRevision);
                });
            } else {
                console.log("shortTracks DB");
            }
        });
    };

    useEffect(() => {
        // set state to the initial value of your realm objects
        const listenTracks = DB.tracks.getByPlaylistKind(playlistKind);
        setTracks(listenTracks);

        listenTracks.addListener(() => {
            setTracks(listenTracks);
            setReadyFlag(true);
        });

        initTracksData();

        return () => {
            // Remember to remove the listener when you're done
            listenTracks.removeAllListeners();
        };
    }, []);

    const populateLikesTracksFromApi = (shortTracks) => {
        const fullTracks = [];

        shortTracks.forEach(shortTrack => {
            const trackId = shortTrack.id;
            console.log(trackId);
            const dbTrack = DB.tracks.get(TrackManager.genTrackPK(trackId, playlistKind));
            if (dbTrack) {
                // трек уже присутствует в БД
                fullTracks.push(dbTrack);
                setReadyFlag(true);
            } else {
                // трек новый
                // const fullTrackPromise = YmAPI.tracks.getFullTrack(trackId).then(data => {
                YmAPI.tracks.getFullTrack(trackId).then(data => {
                    const trackInfo = data["result"][0];
                    const newTrack = TrackManager.createNew(trackInfo, playlistKind);
                    fullTracks.push(newTrack);
                    DB.tracks.add(newTrack);
                    return newTrack;
                }).then(newTrack => {
                    if (newTrack.srcLinks.length === 0) {
                        setFindingLinksFlag(true);
                        let trackSearch = TrackManager.getSearchString(newTrack);
                        return HitMOApi.findTrackUrl(trackSearch).then(link => {
                            if (`${link}`.startsWith("http")) {
                                DB.tracks.addLink(newTrack.pk, link);
                            }
                        });
                    }
                });
            }
        });

        // Когда будут получены все треки - ищем ссылки
/*        return Promise.all(fullTrackPromises).then(() => {
            DB.tracks.addMany(fullTracks);
            setReadyFlag(true);

            fullTracks.forEach(track => {
                if (track.srcLinks.length === 0) {
                    setFindingLinksFlag(true);

                    let trackSearch = TrackManager.getSearchString(track);

                    const findLinkPromiseFunc = () => {
                        return HitMOApi.findTrackUrl(trackSearch).then(link => {
                            if (`${link}`.startsWith("http")) {
                                DB.tracks.addLink(track.pk, link);
                            }
                        });
                    };

                    findLinksQueue.enqueue(findLinkPromiseFunc);
                }
            });
        });*/
    };

    function onLoadTracks() {
        tracks.forEach(track => {
            loadTracksQueue.enqueue(() => {
                return TrackManager.load(track.pk);
            });
        });
    }

    function renderScreen() {
        return (
            <>
                <Button mb={3}
                        isLoadingText="Downloading"
                        onPress={onLoadTracks}
                        borderRadius={0}>
                    Load all available tracks
                </Button>

                {
                    activeLoadingFlag &&
                    <Button mb={3}
                            onPress={() => {
                                loadTracksQueue.stop();
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
