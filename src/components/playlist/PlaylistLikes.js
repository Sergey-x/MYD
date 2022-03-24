import React from "react";
import { useNavigation } from "@react-navigation/native";
import playlist_likes from "../../assets/playlist_likes.png";
import { Image, Pressable, Text } from "react-native";
import styles from "./styles";


/*
* Default playlist for every user consisted of liked-tracks.
* */
export default function PlaylistLikes() {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.playlist} onPress={() => navigation.navigate("Likes")}>
            <Image
                style={styles.playlist_image}
                source={playlist_likes}
            />
            <Text style={styles.playlist_title}>Мне нравится</Text>
        </Pressable>
    );
}
