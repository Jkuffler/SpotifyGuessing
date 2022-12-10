import React, { useEffect, useState } from "react";
import { ArtistChoice } from "./Button.jsx";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  artistNamesState,
  guessCounterState,
  numArtistsState,
  selectedArtistNameState,
} from "../GlobalState";

const ArtistChoices = () => {
  const [guessCounter, setGuessCounter] = useRecoilState(guessCounterState);
  const [selectedArtistName, setSelectedArtistName] = useRecoilState(
    selectedArtistNameState
  );
  const [artistNames, setArtistNames] = useRecoilState(artistNamesState);
  const [numArtists, setNumArtists] = useRecoilState(numArtistsState);

  let artistNamesForGame = [
    artistNames[0],
    artistNames[1],
    artistNames[2],
    artistNames[3],
  ];
  let guesses = guessCounter;

  const setName = (artistArray) => {
    const index = Math.floor(Math.random() * artistArray.length);
    let currentName = artistArray[index];
    artistNamesForGame.splice(index, 1);
    return currentName;
  };

  let artist1 = setName(artistNamesForGame);
  let artist2 = setName(artistNamesForGame);
  let artist3 = setName(artistNamesForGame);
  let artist4 = setName(artistNamesForGame);

  const history = useHistory();

  const checkGuess = (artist) => {
    if (artist != selectedArtistName) {
      guesses--;
      setGuessCounter(guesses);
      console.log("incorrect guess");
      if (guesses === 0) {
        history.push("/lose");
      }
    } else {
      history.push("/win");
    }
  };

  // Done
  const showOrHide1 = () => {
    if (numArtists === 4) {
      return false;
    }
    if (artist1 === selectedArtistName) {
      return false;
    } else if (
      (numArtists === 2 || numArtists === 3) &&
      artist1 != selectedArtistName
    ) {
      return false;
    }
  };

  // Should show up when correct or if 1 is correct when only 2 options
  // Should show up when correct or if 3 is correct when only 3 options
  // Only 2 options and 1 is incorrect then hide
  const showOrHide2 = () => {
    if (numArtists === 4) {
      return false;
    }
    if (artist2 === selectedArtistName) {
      return false;
    } else if (numArtists === 2 && artist1 != selectedArtistName) {
      return true;
    }
  };

  //Should show up when correct or if 1 is correct when only 3 options
  //Should show up when correct or if 2 is correct when only 3 options
  const showOrHide3 = () => {
    if (numArtists === 4) {
      return false;
    }
    if (artist3 === selectedArtistName) {
      return false;
    }
    if (numArtists === 2) {
      return true;
    }
    if (artist4 === selectedArtistName && numArtists === 3) {
      return true;
    }
  };

  // DONE
  const showOrHide4 = () => {
    if(numArtists > 3){
      return false;
    }
    if (artist4 === selectedArtistName) {
      return false;
    } 
    return true;
  };

  // Disable buttons depending on numArtists AND WATCH OUT for which button has the correctArtist
  // That buttons always needs to be SHOWN
  return (
    <div>
      <ArtistChoice
        onClick={() => checkGuess(artist1)}
        disabled={showOrHide1()}
      >
        {artist1}
      </ArtistChoice>
      <ArtistChoice
        onClick={() => checkGuess(artist2)}
        disabled={showOrHide2()}
      >
        {artist2}
      </ArtistChoice>
      <ArtistChoice
        onClick={() => checkGuess(artist3)}
        disabled={showOrHide3()}
      >
        {artist3}
      </ArtistChoice>
      <ArtistChoice
        onClick={() => checkGuess(artist4)}
        disabled={showOrHide4()}
      >
        {artist4}
      </ArtistChoice>
    </div>
  );
};

export default ArtistChoices;
