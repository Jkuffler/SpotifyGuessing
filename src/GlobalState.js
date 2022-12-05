import { atom } from "recoil"

export const selectedArtistSongsState = atom({
    key: "gameSongsState",
    default: []
})

export const numArtistsState = atom({
    key: "numArtistsState",
    default: 2
})

export const numSongsState = atom({
    key: "numSongsState",
    default: 1
})


export const selectedGenreState = atom({
    key: "selectedGenreState",
    default: "rock"
})

export const tracksState = atom({
    key: "tracksState",
    default: []
})

export const selectedArtistState = atom({
    key: "selectedArtistState",
    default: ""
})

export const notNullPreviewsState = atom({
    key: "notNullPreviewsState",
    default: []
})

export const selectedArtistNameState = atom({
    key: "selectedArtistNameState",
    default: ""
})

export const guessCounterState = atom({
    key: "guessCounterState",
    default: 3
})

export const artistNamesState = atom({
    key: "artistNamesState",
    default: 3
})

export const artistNamesForGameState = atom({
    key: "artistNamesForGameState",
    default: []
})