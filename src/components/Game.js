import React, { useEffect, useState } from "react";
import Score from "./Score";
import fetchFromSpotify, { request } from "../services/api";
import { useRecoilState } from "recoil";
import { gameSongsState } from "../GlobalState";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token"
const TOKEN_KEY = "whos-who-access-token"

const Game = () => {
  const [artistSongs, setArtistSongs] = useRecoilState(gameSongsState)
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState("")

  

   const notNullPreviews = []

   //Should destructure tracks for simplicity
   for(let i = 0; i < artistSongs['tracks'].length; i++){
    if(artistSongs.tracks[i].preview_url != null){
      notNullPreviews.push(artistSongs.tracks[i].preview_url)
    }
   }
  
  return (
    <div>
      
      <h2>Round /incremental/</h2>
      <section>
        {/*Buttons will be reworked and rendered through spreading out an array of tracks created by the returned data from 'GET tracks' -- we can make the key for the button element the tracks' ids and button innerHTML will be filled in by whatever values are assigned to variables we name we as required */}
        <button className="artistBtn"> Gary </button>
        <button className="artistBtn"> Axel </button>
        <button className="artistBtn"> Tres </button>
        <button className="artistBtn"> Botch </button>
      </section>
      <br />
      <section>
        {/* Tracks will also be refactored accordingly */}
        <button className="trackBtn"> P L A Y </button>
        <button className="trackBtn"> P L A Y </button>
        <button className="trackBtn"> P L A Y </button>
      </section>
      <br />
      <section>
        <button className="nextBtn"> N E X T </button>
      </section>
      <section>
        <Score />
      </section>
      <button onClick={() => console.log(artistSongs)}>Log Artist Tracks</button>
      <button onClick={() => console.log(artistSongs.tracks[0].preview_url)}>Log preview url</button>
      <button onClick={() => console.log(notNullPreviews)}>Log Not Null Tracks</button>
      {/* <button onClick={() => console.log(notNullTracks)}>Log Not Null Tracks</button> */}

    </div>
  );
};

export default Game;
