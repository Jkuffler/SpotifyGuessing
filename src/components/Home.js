import React, { useEffect, useState } from "react"
import fetchFromSpotify, { request } from "../services/api"
import { useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"
import { numArtistsState, numSongsState, selectedGenreState } from "../GlobalState"
import { SelectOption, SubmitPlayButton, SelectOptionForm, Selection, SelectionOption } from './Button.jsx'

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token"
const TOKEN_KEY = "whos-who-access-token"

const Home = () => {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useRecoilState(selectedGenreState)
  const [numArtists, setNumArtists] = useRecoilState(numArtistsState)
  const [numSongs, setNumSongs] = useRecoilState(numSongsState)
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState("")
  
  const loadGenres = async t => {
    setConfigLoading(true)
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations/available-genre-seeds",
    })
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

  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()
    // 👇️ redirect to game screen
    history.push("/game")
  }

  return (
    <div>
      <SelectOptionForm onSubmit={handleSubmit}>
        <SelectOption>
          Genre:
          <Selection
            value={selectedGenre}
            onChange={event => setSelectedGenre(event.target.value)}
          >
            <SelectionOption value="" />
            {genres.map(genre => (
              <SelectionOption key={genre} value={genre}>
                {genre.toUpperCase()}
              </SelectionOption>
            ))}
          </Selection>
        </SelectOption>
        <SelectOption>
          Number of Songs To Listen To:
          <Selection
            value={numSongs}
            onChange={event => setNumSongs(event.target.value)}
          >
            <SelectionOption value='1'>1</SelectionOption>
            <SelectionOption value='2'>2</SelectionOption>
            <SelectionOption value='3'>3</SelectionOption>

          </Selection>
        </SelectOption>
        <SelectOption>
          Number of Artist Choices:
          <Selection
            value={numArtists}
            onChange={event => setNumArtists(event.target.value)}
          >
            <SelectionOption value='2'>2</SelectionOption>
            <SelectionOption value='3'>3</SelectionOption>
            <SelectionOption value='4'>4</SelectionOption>

          </Selection>
        </SelectOption>

        <SubmitPlayButton type="submit">
          P L A Y
        </SubmitPlayButton>
      </SelectOptionForm>
    </div>
  )
}

export default Home