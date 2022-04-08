import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, CheckIcon, Progress, ScrollView, Select, Text, View } from "native-base";
import { requestWriteExternalStoragePermission } from "../../../permissions/ExternalStorage";
import Destination from "../../../utils/Destination";
import { getFSInfo } from "react-native-fs";
import MemorySerializer from "../../../utils/MemorySerializer";
import { clearDB } from "../../../db/$realm";
import DB from "../../../db/db";


export default function SettingsScreen() {
    const [totalSpace, setTotalSpace] = useState(0);
    const [freeSpace, setFreeSpace] = useState(0);
    const [spacePart, setSpacePart] = useState(0);
    const [trackAmount, setTrackAmount] = useState(DB.settings.get().concurrentLoadTrack || 3);

    useEffect(() => {
        getFSInfo().then(FSInfoResult => {
            setTotalSpace(FSInfoResult.totalSpace);
            setFreeSpace(FSInfoResult.freeSpace);
        });
    }, []);

    useEffect(() => {
        if (totalSpace) {
            setSpacePart(100 - (freeSpace / totalSpace * 100));
        }
    }, [freeSpace, totalSpace]);

    const selects = [1, 2, 3, 4, 5].map(item => <Select.Item key={item} label={`${item}`} value={item} />);
    return (
        <ScrollView style={styles.settingsScreen}>
            <View style={styles.settings}>
                <Text color={"#fff"} fontSize={16}>Choose max track amount for loading</Text>
                <Select selectedValue={trackAmount}
                        accessibilityLabel="Choose Service"
                        placeholder="Choose max track amount for loading"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />,
                        }}
                        color={"lightText"}
                        mt={1}
                        mb={5}
                        onValueChange={itemValue => {
                            setTrackAmount(itemValue);
                            DB.settings.setConcurrentLoadTrack(itemValue);
                        }}
                        style={{
                            backgroundColor: "#aaa",
                            color: "#fff",
                        }}
                >
                    {
                        selects
                    }
                </Select>

                <Button onPress={requestWriteExternalStoragePermission} my={2}>
                    request storage permission
                </Button>

                <Text color="white" mt={5} fontSize={16}>Available storage size:</Text>
                <Text color="white"
                      mb={2}>{MemorySerializer.serialize(freeSpace)} / {MemorySerializer.serialize(totalSpace)}</Text>
                <Progress colorScheme={spacePart > 90 ? "warning" : "primary"} bg="coolGray.300" value={spacePart}
                          rounded="0" />

                <Text color="white" mt={5} fontSize={16}>Current folder:</Text>
                <Text color="white" mb={5}>{Destination.getPath()}</Text>

                <Button mt={2} size="md" colorScheme="secondary" onPress={clearDB}>
                    CLEAR ALL
                </Button>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    settingsScreen: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#010021",
        flex: 1,
        flexDirection: "column-reverse",
    },

    settings: {
        paddingHorizontal: 10,
    },
});
