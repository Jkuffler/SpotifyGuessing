import React from "react"
/*
This is a shared component between Gameplay and Home used to set Game via props
*/
const SongForm = () => {
  return (
    <section>
      <h2>How many Tracks?</h2>

      <input type="radio" name='numTracks' value="1" />
      <label>1</label>
      <br />
      <input type="radio" name='numTracks' value="2"></input>
      <label>2</label>
      <br />
      <input type="radio" name='numTracks' value="3"></input>
      <label>3</label>
      <br />
    </section>
  )
}
export default SongForm
