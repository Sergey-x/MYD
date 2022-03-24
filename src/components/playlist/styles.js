import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    playlist: {
        paddingHorizontal: 10,
        maxWidth: "50%",
        alignItems: "center",
        paddingBottom: 30,
    },

    playlist_image: {
        resizeMode: "contain",
        aspectRatio: 1,
        width: 150,
        height: 150,
    },

    playlist_title: {
        textAlign: "center",
        color: "#000",
        fontSize: 18,
        fontWeight: "500",
    },
});

export default styles;
