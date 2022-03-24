import React, { useState } from "react";
import { View } from "react-native";
import { EmailInput, PasswordInput, UsernameInput } from "./inputs";
import { SubmitButton } from "./submitButton";
import { AuthFormFooter } from "./authFormFooter";
import { useNavigation } from "@react-navigation/native";
import appRealm from "../../db/_app";


export function SignInForm() {
    const navigation = useNavigation();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function onSignIn() {
        const credentials = Realm.Credentials.emailPassword(email, password);
        appRealm.logIn(credentials).then(user => {
            console.log("Successfully logged in!", user.id);
            navigation.navigate("AuthorizedScreens", { screen: "Playlists" });
            return user;
        }).catch(error => {
            console.error("Failed to log in", error.message);
        });
    }

    return (
        <View>
            <EmailInput valye={email} setValue={setEmail} />
            <PasswordInput valye={password} setValue={setPassword} />

            <SubmitButton title="Sign In" onPress={onSignIn} />
            <AuthFormFooter text="Does not have an account? Sign Up!" navigateTo="SignUp" />
        </View>
    );
}


export function SignUpForm() {
    const navigation = useNavigation();

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function onSignUp() {
        appRealm.emailPasswordAuth.registerUser({ email, password }).then(() => {
            navigation.navigate("SignIn");
        });
    }

    return (
        <View>
            <EmailInput valye={email} setValue={setEmail} />
            <UsernameInput valye={username} setValue={setUsername} />
            <PasswordInput valye={password} setValue={setPassword} />

            <SubmitButton title="Sign Up" onPress={onSignUp} />
            <AuthFormFooter text="Already have an account? Sign In!" navigateTo="SignIn" />
        </View>
    );
}
