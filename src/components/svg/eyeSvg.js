import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

const EyeSvg = (props) => (
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
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <Circle cx={12} cy={12} r={3} />
    </Svg>
)

export default EyeSvg;
