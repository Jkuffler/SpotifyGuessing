import React, { useEffect, useState } from "react"
import fetchFromSpotify, { request } from "../services/api"
import ArtistForm from "./ArtistForm"
import SongForm from "./SongForm"
import { useHistory } from 'react-router-dom'

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token"
const TOKEN_KEY = "whos-who-access-token"

const Home = () => {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState("")

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
      loadGenres(newToken.value)
    })
  }, [])

  if (authLoading || configLoading) {
    return <div>Loading...</div>
  }

  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre))
    // 👇️ redirect to game screen
    history.push('/game');
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
      <section>
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
      </section>
        <ArtistForm />
        <SongForm />
        <br />
        <button type="submit">P L A Y</button>
      </form>
    </main>
  )
}

export default Home
