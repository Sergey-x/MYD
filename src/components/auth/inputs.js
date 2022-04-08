import React from "react";
import { Center, Icon, Input } from "native-base";
import EyeSvg from "../svg/eyeSvg";
import EyeOffSvg from "../svg/eyeOffSvg";
import KeySvg from "../svg/KeySvg";
import EmailSvg from "../svg/EmailSvg";
import UserSvg from "../svg/userSvg";


const MARGIN_BETWEEN_INPUTS = 3;
const ICON_COLOR = "#fff";


export function UsernameInput(props) {
    return (
        <Center>

            <Input InputLeftElement={<Icon as={<UserSvg color={ICON_COLOR} />} />}
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
            <Input InputLeftElement={<EmailSvg color={ICON_COLOR} />}
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
        <Input InputLeftElement={<KeySvg color={ICON_COLOR} />}
               color={ICON_COLOR}
               size="lg" variant="underlined"
               placeholder={props.placeholder || "Password"}
               isFullWidth={true}
               mt={MARGIN_BETWEEN_INPUTS}
               value={props.value}
               onChangeText={props.setValue}
               type={show ? "text" : "password"}
               InputRightElement={
                   <Icon onPress={handleClick}
                         as={
                             show ? <EyeSvg color={ICON_COLOR} /> : <EyeOffSvg color={ICON_COLOR} />
                         }
                   />
               } />
    );
}
