import * as React from "react";
import Svg, { Path } from "react-native-svg";


const KeySvg = (props) => (
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
        <Path
            d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </Svg>
);

export default KeySvg;
