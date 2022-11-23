import { atom } from "recoil"

export const gameSongsState = atom({
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