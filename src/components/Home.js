import React, { useEffect, useState } from "react"
import fetchFromSpotify, { request } from "../services/api"
import ArtistForm from "./ArtistForm"
import SongForm from "./SongForm"
import { useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"
import { gameSongsState } from "../GlobalState"

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token"
const TOKEN_KEY = "whos-who-access-token"

const Home = () => {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("rock")
  const [tracks, setTracks] = useState([])
  const [selectedTrack, setSelectedTrack] = useState("")
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState("")
  const [artist, setArtist] = useState("")
  const [artistSongs, setArtistSongs] = useRecoilState(gameSongsState)

  const loadGenres = async t => {
    setConfigLoading(true)
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations/available-genre-seeds",
    })
    console.log(response)
    setGenres(response.genres)
    setConfigLoading(false)
  }

  const setArtistForGame = () => {
    const artist1 = tracks[0].artists[0].id
    loadArtistSongs(token, artist1)
    console.log(artistSongs)
  }

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

  const loadArtistSongs = async (t, artist) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `artists/${artist}/top-tracks`,
      params: {
        market: "US"
      },
    })
    .then(response => setArtistSongs(response))
  }

  const setGameData = (t) => {
    setTracks(loadTracks(t))
    console.log(tracks)
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
        loadGenres(storedToken.value)
        loadTracks(storedToken.value)
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
      loadGenres(newToken.value)
      loadTracks(newToken.value)
    })
  }, [])

  if (authLoading || configLoading) {
    return <div>Loading...</div>
  }

  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()
    localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre))
    // 👇️ redirect to game screen
    history.push("/game")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Genre:
          <select
            value={selectedGenre}
            onChange={event => setSelectedGenre(event.target.value)}
          >
            <option value="" />
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <ArtistForm />
        <SongForm />
        <br />
        <button  type="submit">
          P L A Y
        </button>
      </form>
      <button onClick={() => console.log(selectedGenre)}>Log</button>
      <button onClick={() => setGameData(token)}>Log Tracks</button>
      <button onClick={() => setArtistForGame()}>Get Artist Tracks</button>
      <button onClick={() => console.log(artistSongs)}>Log Artist Tracks</button>
    </div>
  )
}

export default Home
