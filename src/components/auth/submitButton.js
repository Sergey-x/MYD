import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "native-base";


export function SubmitButton(props) {
    return (
        <Button onPress={props.onPress} style={styles.submitButton} size="lg" p={3}>{props.title}</Button>
    );
}


const styles = StyleSheet.create({
    submitButton: {
        marginTop: 30,
        marginBottom: 15,
        paddingVertical: 15,
        backgroundColor: "#416cc9",
    },
});
