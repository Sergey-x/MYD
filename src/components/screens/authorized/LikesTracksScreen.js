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
    const [readyFlag, setReadyFlag] = useState(false);
    const [findingLinksFlag, setFindingLinksFlag] = useState(false);

    const playlistKind = PlaylistLikesManager.PK;

    // configure header
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "Мне нравится",
        });
    }, [props.navigation]);

    const updateTracks = (tracks) => {
        setTracks(tracks);
        setReadyFlag(true);
    };

    const initTracksData = () => {
        const oldRevision = +(DB.playlistLikes.get().revision);
        YmAPI.tracks.getShortLikesTracks().then(data => {
            const newRevision = +data["result"]["library"]["revision"];
            if (oldRevision !== newRevision) {
                // если список обновился
                const shortTracks = data["result"]["library"]["tracks"];
                populateLikesTracksFromApi(shortTracks).then(() => {
                    DB.playlistLikes.setRevision(newRevision);
                });
            } else {
                // если список не менялся
                populateLikesTracksFromDb();
            }
        });
    };

    useEffect(() => {
        initTracksData();
    }, []);

    const populateLikesTracksFromDb = () => {
        updateTracks(DB.tracks.getByPlaylistKind(playlistKind).filter(item => item));
        console.log("skip downloading tracks for playlistLikes");
    };

    const populateLikesTracksFromApi = (shortTracks) => {
        const fullTracks = [];
        let fullTrackPromises = [];
        shortTracks.forEach(shortTrack => {
            const trackId = shortTrack.id;

            const dbTrack = DB.tracks.get(TrackManager.genTrackPK(trackId, playlistKind));
            if (dbTrack) {
                // трек уже присутствует в БД
                fullTracks.push(dbTrack);
            } else {
                // трек новый
                const fullTrackPromise = YmAPI.tracks.getFullTrack(trackId).then(data => {
                    const trackInfo = data["result"][0];
                    const newTrack = TrackManager.createNew(trackInfo, playlistKind);
                    fullTracks.push(newTrack);
                });
                fullTrackPromises.push(fullTrackPromise);
            }
        });

        // Когда будут получены все треки - ищем ссылки
        return Promise.all(fullTrackPromises).then(() => {
            let findLinksPromises = [];
            updateTracks(fullTracks);
            fullTracks.forEach(track => {
                if (track.srcLinks.length === 0) {
                    setFindingLinksFlag(true);

                    let trackSearch = TrackManager.getSearchString(track);
                    const findLinkPromise = HitMOApi.findTrackUrl(trackSearch).then(link => {
                        if (`${link}`.startsWith("http")) {
                            track.srcLinks.push(link);
                        }
                    });
                    findLinksPromises.push(findLinkPromise);
                }
            });

            // Когда все ссылки найдены
            return Promise.all(findLinksPromises).then(() => {
                setFindingLinksFlag(false);
                DB.tracks.addMany(fullTracks);
            });
        });
    };

    const onLoadTracks = () => {
        const newQueue = new Queue({
            concurrent: DB.settings.get().concurrentLoadTrack,
            interval: 0,
        });

        const oldTracks = tracks.slice();
        updateTracks(oldTracks.map(track => {
            track.onLoadTrack = (func) => newQueue.enqueue(func);
            track.triggerLoading = true;
            return track;
        }));
    };

    function renderScreen() {
        return (
            <>
                <Button mb={3} onPress={onLoadTracks} borderRadius={0}>Load all available tracks</Button>
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
                    initialNumToRender={125}
                    windowSize={10}
                    getItemLayout={TrackManager.getItemLayout}
                />
            </>
        );
    }

    return (readyFlag ? renderScreen() : <SplashScreen />);
}
