import React from "react"
import Score from "./Score" 

export const Game = () => {
  return (
    <container>
      <h2>Round /incremental/</h2>
      <section>
        {/*Buttons will be reworked and rendered through spreading out an array of artists created by the returned data from 'GET artists' -- we can make the key for the button element the artists' ids and button innerHTML will be filled in by whatever values are assigned to variables we name we as required */}
        <button className="artistBtn"> Gary </button>
        <button className="artistBtn"> Axel </button>
        <button className="artistBtn"> Tres </button>
        <button className="artistBtn"> Botch </button>
      </section>
      <br/>
      <section>
        {/* Tracks will also be refactored accordingly */}
        <button className="trackBtn"> P L A Y  </button>
        <button className="trackBtn"> P L A Y  </button>
        <button className="trackBtn"> P L A Y  </button>
      </section>
      <br/>
      <section>
        <button className="nextBtn"> N E X T </button>
      </section>
      <section><Score/></section>
    </container>
  )
}

export default Game
