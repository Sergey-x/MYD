import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView, View } from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";


export default function MapScreen() {
    useEffect(() => {}, [Dimensions.get("window").width, Dimensions.get("window").height]);
    return (
        <ScrollView style={styles.mapScreen}>
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 55.994446,
                        longitude: 92.797586,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    showUserLocation={true}>
                    <Marker coordinate={{
                        latitude: 55.994446,
                        longitude: 92.797586,
                    }} />
                </MapView>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    mapScreen: {
        flexGrow: 1,
    },

    mapContainer: {
        flexGrow: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        justifyContent: "space-around",
        alignItems: "stretch",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
