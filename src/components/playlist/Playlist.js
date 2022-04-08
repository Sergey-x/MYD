import React from "react";
import { Image, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CircleIcon } from "native-base";

import styles from "./styles";
import PlaylistSvg from "../svg/playlistSvg";


export default function Playlist(props) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.playlist}
                   onPress={() => navigation.navigate("Tracks", { playlistKind: props.kind })}>
            {
                props.imgSrc !== "" ?
                    <Image
                        style={styles.playlist_image}
                        source={{ uri: props.imgSrc }}
                    /> :
                    <PlaylistSvg width={125}/>
            }

            <Text style={styles.playlist_title}>{props.title}</Text>
            {
                props.shouldReload && <CircleIcon size={2.5} style={{ color: "green" }} />
            }

        </Pressable>
    );
}
