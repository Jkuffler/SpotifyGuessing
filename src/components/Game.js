import React, { useEffect, useState } from "react";
import Score from "./Score";
import fetchFromSpotify, { request } from "../services/api";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token"
const TOKEN_KEY = "whos-who-access-token"

const Game = () => {
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState("")
  const [tracks, setTracks] = useState([])

  const selectedGenre = JSON.parse(localStorage.getItem('selectedGenre'))
  console.log(selectedGenre)

  const loadTracks = async t => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations",
      params: {
        market: "US",
        seed_genres: selectedGenre,
        limit: 10,
      },
    })
    // .then(({ artists }) => setArtists(artists))
    setTracks(response.tracks)
    console.log(response.tracks)
    // setConfigLoading(false)
  }

  useEffect(() => {
    setAuthLoading(true)

    const storedTokenString = localStorage.getItem(TOKEN_KEY)
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString)
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage")
        setAuthLoading(false)
        setToken(storedToken.value)
        loadTracks(storedToken.value)
        return
      }
    }
    console.log("Sending request to AWS endpoint")
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      }
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken))
      setAuthLoading(false)
      setToken(newToken.value)
      loadTracks(newToken.value)
    })
  }, [])

  if (authLoading || configLoading) {
    return <div>Loading...</div>
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
    </div>
  );
};

export default Game;
