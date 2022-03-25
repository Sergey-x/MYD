import React from "react";
import EmptyTrack from "./EmptyTrack";


export default function renderTrack({ item }) {
    return (
        <EmptyTrack {...item} />
    );
}
