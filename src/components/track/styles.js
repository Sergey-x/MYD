import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    track: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        marginBottom: 2,
        backgroundColor: "#eeeeee",
        height: 50,
    },

    leftSideWrapper: {
        flexDirection: "row",
    },

    rightSideWrapper: {
        flexDirection: "row",
    },

    track_image: {
        resizeMode: "contain",
        aspectRatio: 1,
        width: 50,
        maxWidth: 150,
        marginRight: 15,
    },

    titleWrapper: {
        paddingVertical: 3,
        flexDirection: "column",
        justifyContent: "space-between",
    },

    track_title: {
        color: "#000",
        fontSize: 16,
    },

    track_groupTitle: {
        color: "#0009",
        fontSize: 16,
    },

    track_duration: {
        color: "#000",
        fontSize: 16,
        marginLeft: 10,
    },
});

export default styles;
