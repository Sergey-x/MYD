import React from "react";
import { StyleSheet, Text } from "react-native";


export default function AuthLabel(props) {
    return (
        <Text style={styles.authLabel}>{props.text}</Text>
    );
}


const styles = StyleSheet.create({
    authLabel: {
        color: "#fff",
        fontSize: 16,
    },
});
