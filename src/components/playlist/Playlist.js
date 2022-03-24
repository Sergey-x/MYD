import React from "react";
import { Image, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CircleIcon } from "native-base";
import styles from "./styles";


export default function Playlist(props) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.playlist}
                   onPress={() => navigation.navigate("Tracks", { playlistKind: props.kind })}>
            <Image
                style={styles.playlist_image}
                source={{ uri: props.imgSrc }}
            />
            <Text style={styles.playlist_title}>{props.title}</Text>
            {
                props.shouldReload && <CircleIcon size={2.5} style={{ color: "green" }} />
            }

        </Pressable>
    );
}
