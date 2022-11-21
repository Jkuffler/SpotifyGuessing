import React, { useEffect, useState } from "react";
import Score from "./Score";
import fetchFromSpotify, { request } from "../services/api";

const Game = () => {
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
