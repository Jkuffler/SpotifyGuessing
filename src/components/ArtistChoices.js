import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { guessCounterState } from "../GlobalState";

const ArtistChoices = () => {
    const [guessCounter, setGuessCounter] = useRecoilState(guessCounterState)

    return(
        <div>
            <button onClick={() => console.log(guessCounter)}>Test Guess Counter From Artist Choices</button>
        </div>
    )
}

export default ArtistChoices