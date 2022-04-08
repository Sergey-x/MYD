import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"


const MapSvg = (props) => (
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
        <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <Circle cx={12} cy={10} r={3} />
    </Svg>
)

export default MapSvg;
