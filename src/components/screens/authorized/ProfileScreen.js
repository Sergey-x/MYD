import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "native-base";
import { LogBox, StyleSheet } from "react-native";
import { PasswordInput, UsernameInput } from "../../auth/inputs";
import YMAPI from "../../../api/ym/initializerYMApi";
import DB from "../../../db/db";


// LogBox.ignoreLogs(["Require cycle:", "Remote debugger"]);


export default function ProfileScreen() {
    const [attached, setAttached] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function initApiWithYandexCredentials() {
        if (!attached) {
            YMAPI.init(email, password).then(setAttached);
            console.log("Email-pass auth");
        }
    }

    useEffect(() => {
        setAttached(YMAPI.prevInit());
    }, []);

    return (
        <ScrollView style={styles.profileScreen}>
            <View>
                {
                    !attached &&
                    <>
                        <Text style={styles.inputText}>Input yandex account credentials to load audio data</Text>

                        <UsernameInput valye={email} setValue={setEmail} placeholder="Yandex email" />
                        <PasswordInput valye={password} setValue={setPassword} placeholder="Yandex password" />

                        <Text style={styles.exceptionText}>Credentials will not be stored anywhere</Text>
                        <Button size="md" colorScheme="primary" onPress={initApiWithYandexCredentials}>
                            Attach account
                        </Button>
                    </>
                }

                {
                    attached &&
                        <Button size="md" colorScheme="primary" onPress={() => {
                            DB.users.delete();
                            setAttached(false);
                        }
                        }>
                            Detach account
                        </Button>
                }

                {
                    attached &&
                    <Text color={"green.300"} style={{ textAlign: "center" }}>Yandex account is enabled</Text>
                }

                {
                    !attached &&
                    <Text color={"red.400"} style={{ textAlign: "center" }}>Yandex account is disabled</Text>
                }
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    profileScreen: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#010021",
        flex: 1,
        flexDirection: "column-reverse",
    },

    inputText: {
        color: "#e8e8e8",
        textAlign: "center",
    },

    exceptionText: {
        color: "#0dcc00",
        marginVertical: 20,
        textAlign: "center",
    },
});
