import React from "react";
import Track from "./Track";


export default function renderTrack({ item }) {
    return (
        <Track {...item} />
    );
}
