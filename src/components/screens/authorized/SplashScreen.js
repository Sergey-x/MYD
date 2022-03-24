import React from "react";
import { Center, HStack, NativeBaseProvider, Spinner } from "native-base";
import { Text } from "react-native";


export default function SplashScreen() {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Text>
                    <HStack space={2} justifyContent="center">
                        <Spinner accessibilityLabel="Loading posts"
                                 size="lg"
                                 color="indigo.900"
                        />
                    </HStack>
                </Text>
            </Center>
        </NativeBaseProvider>
    );
}
