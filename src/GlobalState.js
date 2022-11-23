import { atom } from "recoil"

export const gameSongsState = atom({
    key: "gameSongsState",
    default: []
})

export const numArtistsState = atom({
    key: "numArtistsState",
    default: 2
})