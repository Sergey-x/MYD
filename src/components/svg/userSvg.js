import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

const UserSvg = (props) => (
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
        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <Circle cx={12} cy={7} r={4} />
    </Svg>
)

export default UserSvg;
