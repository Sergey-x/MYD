import React from "react";
import { Center, Icon, Input } from "native-base";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Foundation from "react-native-vector-icons/Foundation";


const MARGIN_BETWEEN_INPUTS = 3;
const ICON_SIZE = 24;
const ICON_COLOR = "#fff";


export function UsernameInput(props) {
    return (
        <Center>

            <Input InputLeftElement={<Icon as={
                // <MaterialIcons name="person"
                //                style={{ color: ICON_COLOR }}
                //                size={ICON_SIZE} />
              <></>
            }

            />}
                   color={ICON_COLOR}
                   size="lg"
                   my={MARGIN_BETWEEN_INPUTS}
                   variant="underlined"
                   placeholder={props.placeholder || "Username"}
                   isFullWidth={true}
                   maxLength={30}
                   value={props.value}
                   onChangeText={props.setValue}
            />
        </Center>
    );
}


export function EmailInput(props) {
    return (
        <Center>
            <Input InputLeftElement={
                // <MaterialIcons name="alternate-email" size={ICON_SIZE} color={ICON_COLOR} />
              <></>
            }
                   color={ICON_COLOR}
                   size="lg"
                   my={MARGIN_BETWEEN_INPUTS}
                   variant="underlined"
                   placeholder="Email"
                   isFullWidth={true}
                   value={props.value}
                   maxLength={30}
                   onChangeText={props.setValue}
            />
        </Center>
    );
}


export function PasswordInput(props) {
    const [show, setShow] = React.useState(false);

    function handleClick() {
        setShow(!show);
    }

    return (
        <Input InputLeftElement={
            // <Foundation name="key" size={ICON_SIZE} color={ICON_COLOR} />
          <></>
        }
               color={ICON_COLOR}
               size="lg" variant="underlined"
               placeholder={props.placeholder || "Password"}
               isFullWidth={true}
               mt={MARGIN_BETWEEN_INPUTS}
               value={props.value}
               onChangeText={props.setValue}
               type={show ? "text" : "password"}
               InputRightElement={
                   <Icon as={
                       // <MaterialIcons name={show ? "visibility" : "visibility-off"}
                       //                onPress={handleClick}
                       //                size={ICON_SIZE}
                       //                style={{ color: ICON_COLOR }} />
                     <></>
                   } />
               } />
    );
}
