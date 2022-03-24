import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SignInForm } from "../../auth/authForms";
import AuthFormHeader from "../../auth/authFormHeader";


export default function SignInScreen() {
    return (
        <ScrollView style={styles.authScreen} contentContainerStyle={styles.wrapper}>
            <AuthFormHeader />
            <SignInForm />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    authScreen: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#010021",
        flex: 1,
        flexDirection: "column-reverse",
    },
    wrapper: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
    authScreenText: {
        color: "#fff",
    },
});
