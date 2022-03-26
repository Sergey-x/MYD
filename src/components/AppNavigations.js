import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "./screens/_unauthorized/SignInScreen";
import SignUpScreen from "./screens/_unauthorized/SignUpScreen";
import BottomTabNavigator from "./BottomTabNavigator";


export const Stack = createNativeStackNavigator();


export default function AppNavigations() {
    return (
        <Stack.Navigator
            // initialRouteName="UnauthorizedScreens"
            initialRouteName="AuthorizedScreens"
        >
            <Stack.Screen name="AuthorizedScreens" component={AuthorizedScreens} options={{ headerShown: false }} />
            <Stack.Screen name="UnauthorizedScreens" component={UnauthorizedScreens} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}


function UnauthorizedScreens() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
}


function AuthorizedScreens() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
