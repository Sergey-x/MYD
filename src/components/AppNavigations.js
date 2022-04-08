import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";


export const Stack = createNativeStackNavigator();


export default function AppNavigations() {
    return (
        <Stack.Navigator initialRouteName="AuthorizedScreens">
            <Stack.Screen name="AuthorizedScreens" component={AuthorizedScreens} options={{ headerShown: false }} />
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
