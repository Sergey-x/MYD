import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";


export function AuthFormFooter(props) {
    const navigation = useNavigation();

    return (
        <Button onPress={() => navigation.navigate(props.navigateTo)}>
            {props.text}
        </Button>
    );
}
