import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CircleIcon, HStack, Spinner } from "native-base";
import FastImage from "react-native-fast-image";

import DB from "../../db/db";
import HitMOApi from "../../api/hitmo/hitmo";
import styles from "./styles";


export default function Track(props) {
    const [track, setTrack] = useState(props);

    useEffect(() => {
        // set state to the initial value of your realm objects
        const listenTrack = DB.tracks.get(props.pk);
        setTrack(listenTrack);

        listenTrack.addListener(() => {
            const updTrack = DB.tracks.get(props.pk);
            setTrack(updTrack);
        });

        return () => {
            listenTrack.removeAllListeners();
        };
    }, []);

    const onLoadEnd = () => {
        DB.tracks.unsetLoading(props.pk);
        DB.tracks.setDownloaded(props.pk);
    };

    const onLoadStart = () => {
        if (props.srcLinks.length && !track.downloaded) {
            DB.tracks.setLoading(props.pk);
        }
    };

    useEffect(() => {
        if (track.loading && track.srcLinks.length && !track.downloaded) {
            if (props.onLoad) {
                console.log("load in queue");
                props.onLoad(
                    () => HitMOApi.load(props, onLoadEnd).then(() => onLoadEnd()),
                );
            } else {
                console.log("single load");
                HitMOApi.load(props, onLoadEnd).then(() => onLoadEnd());
            }
        }
    }, [track.loading]);

    // TODO: preload images
    return (
        <Pressable style={styles.track} onPress={onLoadStart}>
            <View style={styles.leftSideWrapper}>
                <FastImage
                    style={{ width: 50, height: 50, marginRight: 15 }}
                    source={{
                        uri: props.imgSrc,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.titleWrapper}>
                    <Text style={styles.track_title}>{props.title}</Text>
                    <Text style={styles.track_groupTitle}>{props.artistList}</Text>
                </View>
            </View>
            <View style={styles.rightSideWrapper}>
                {
                    track.loading &&
                    <LoadTrackSpinner />
                }
                <Text style={styles.track_duration}>
                    {props.duration}
                </Text>

                {
                    !track.downloaded &&
                    <CircleIcon
                        size={2.5}
                        style={{
                            color: props.srcLinks.length ? "green" : "red",
                            marginTop: 5,
                            marginLeft: 5,
                        }}
                    />
                }

            </View>
        </Pressable>
    );
}


function LoadTrackSpinner() {
    return (
        <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading track" size="sm" color="indigo.900" />
        </HStack>
    );
}
