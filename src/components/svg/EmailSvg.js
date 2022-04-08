import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";


const EmailSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || 24}
        height={props.height || 24}
        fill={props.fill}
        stroke={props.color || "#aaa"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <Circle cx={12} cy={12} r={4} />
        <Path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </Svg>
);

export default EmailSvg;
