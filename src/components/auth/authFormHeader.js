import React from "react";
import { StyleSheet } from "react-native";
import { Heading } from "native-base";


export default function AuthFormHeader() {
    return (
        <Heading size="xl" style={styles.formHeader}>Welcome!</Heading>
    );
}


const styles = StyleSheet.create({
    formHeader: {
        textAlign: "center",
        color: "#fff",
        paddingVertical: 10,
    },
});
