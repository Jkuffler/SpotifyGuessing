import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { notNullPreviewsState } from "../GlobalState";

const PlaySongButtons = () => {
    const [notNullPreviews, setNotNullPreviews] = useRecoilState(notNullPreviewsState)

    return(
        <div>
            <button onClick={() => console.log(notNullPreviews)}>Test Not Null Previews From Play Song Buttons</button>
        </div>
    )
}

export default PlaySongButtons