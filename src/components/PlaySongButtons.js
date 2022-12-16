import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { notNullPreviewsState, numSongsState } from "../GlobalState";
// import { PlaySongButton, PauseSongButton } from './Button.jsx'
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
            <PlaySongButton onClick={() => sound1.play()}>Play Song 1</PlaySongButton>
            <PlaySongButton onClick={() => sound1.pause()}>Pause Song 1</PlaySongButton>
            <PlaySongButton onClick={() => sound2.play()} disabled={numSongs == 1}>Play Song 2</PlaySongButton>
            <PlaySongButton onClick={() => sound2.pause()} disabled={numSongs == 1}>Pause Song 2</PlaySongButton>
            <PlaySongButton onClick={() => sound3.play()} disabled={numSongs == 2 || numSongs == 1}>Play Song 3</PlaySongButton>
            <PlaySongButton onClick={() => sound3.pause()} disabled={numSongs == 1 || numSongs == 2}>Pause Song 3</PlaySongButton>
        </div>
    )
}

export default PlaySongButtons