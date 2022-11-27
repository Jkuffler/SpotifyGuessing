import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { notNullPreviewsState, numSongsState } from "../GlobalState";
import { PlaySongButton1, PlaySongButton2, PlaySongButton3 } from './Button.jsx'
import { Howl, Howler } from "howler";

const PlaySongButtons = () => {
    const [notNullPreviews, setNotNullPreviews] = useRecoilState(notNullPreviewsState)
    const [numSongs, setNumSongs] = useRecoilState(numSongsState);
    
    const randomizer = (arr) => {
        const index = Math.floor(Math.random() * arr.length);

        const item = arr[index];
        arr.slice(item)
        return item;
    }

    let notNullActual = notNullPreviews
    let sound1 = new Howl({
        src: [randomizer(notNullActual)],
        format: ['mp3'],
        html5: true,
        volume: 0.5,
    });
    let sound2 = new Howl({
        src: [randomizer(notNullActual)],
        format: ['mp3'],
        volume: 0.5,
    });
    let sound3 = new Howl({
        src: [randomizer(notNullActual)],
        format: ['mp3'],
        volume: 0.5,
    });

    return(
        <div>
            <button onClick={() => console.log(notNullPreviews)}>Test Not Null Previews From Play Song Buttons</button>
            <PlaySongButton1 onClick={() => sound1.play()}>Play1</PlaySongButton1>
            <PlaySongButton1 onClick={() => sound1.pause()}>Pause1</PlaySongButton1>

            <PlaySongButton2 onClick={() => sound2.play()} disabled={numSongs == 1}>Play2</PlaySongButton2>
            <PlaySongButton2 onClick={() => sound2.pause()} disabled={numSongs == 1}>Pause2</PlaySongButton2>

            <PlaySongButton3 onClick={() => sound3.play()} disabled={numSongs == 2 || numSongs == 1}>Play3</PlaySongButton3>
            <PlaySongButton3 onClick={() => sound3.pause()} disabled={numSongs == 1 || numSongs == 2}>Pause3</PlaySongButton3>

        </div>
    )
}

export default PlaySongButtons