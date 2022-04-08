import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Spinner } from "native-base";
import FastImage from "react-native-fast-image";

import TrackManager from "../../managers/track";
import PlaylistSvg from "../svg/playlistSvg";


// TODO: optimize spinner
class EmptyTrack extends React.PureComponent {
    render() {
        return (
            <View style={styles.emptyTrack.trackRow}>

                {/* INFO */}
                <Pressable
                    onPress={() => TrackManager.load(this.props.pk)}
                    style={{ flexDirection: "row" }}>

                    {/* IMAGE */}
                    {
                        (this.props.imgSrc !== "") ?
                            <FastImage
                                style={styles.emptyTrack.imgCover}
                                source={{ uri: this.props.imgSrc }}
                                resizeMode={FastImage.resizeMode.contain}
                            /> :
                            // <Image source={trackStub} style={styles.emptyTrack.imgCover}/>
                            <PlaylistSvg width={50} />
                    }

                    {/* TITLES */}
                    <Text style={styles.emptyTrack.duration}>
                        {this.props.duration}
                    </Text>

                    <View style={styles.emptyTrack.mainInfoPart}>
                        <Text style={styles.emptyTrack.trackTitle}>{this.props.title}</Text>
                        <Text style={styles.emptyTrack.groupTitle}>{this.props.artistList}</Text>
                    </View>
                </Pressable>

                {/* TRACK STATE */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {
                        this.props.loading &&
                        <Spinner size="sm" color="indigo.900" />
                    }
                    {
                        !this.props.downloaded &&
                        <View
                            style={this.props.srcLinks.length ?
                                styles.emptyTrack.circleAvailable :
                                styles.emptyTrack.circleUnavailable}>{/**/}</View>
                    }
                </View>
            </View>
        );
    };
}

export default EmptyTrack;


const styles = StyleSheet.create({
    emptyTrack: {
        trackRow: {
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 1,
        },

        imgCover: {
            width: 50,
            height: 50,
        },

        mainInfoPart: {
            justifyContent: "center",
            paddingHorizontal: 10,
        },

        trackTitle: {
            color: "#000",
            fontSize: 16,
        },

        groupTitle: {
            color: "#575757",
            fontSize: 14,
        },

        duration: {
            color: "#000",
            alignSelf: "center",
            marginLeft: 10,
        },

        circleAvailable: {
            width: 8,
            height: 8,
            borderRadius: 50,
            backgroundColor: "#008300",
            marginHorizontal: 10,
        },

        circleUnavailable: {
            width: 8,
            height: 8,
            borderRadius: 50,
            backgroundColor: "#f00",
            marginHorizontal: 10,
        },
    },
});
