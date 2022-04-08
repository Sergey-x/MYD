import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";


const PlaylistSvg = (props) => {
    const w = props.width || 24;

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w}
            height={w}
            fill={props.fill}
            stroke={props.color || "#aaa"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox={`${0} ${0} ${24} ${24}`}
            {...props}
        >
            <Path d="M9 18V5l12-2v13" />
            <Circle cx={6} cy={18} r={3} />
            <Circle cx={18} cy={16} r={3} />
        </Svg>
    );
};

export default PlaylistSvg;
