import React from "react"
/*
This is a shared component that will be set from Home and used to set Game via props
*/
const ArtistForm = () => {
  return (
    <section>
      <h2>How many Artists?</h2>
      <input type="radio" name='numArtists' id="1"></input>
      <label>1</label>

      <input type="radio" name='numArtists' id="2"></input>
      <label>2</label>

      <input type="radio" name='numArtists' id="3"></input>
      <label>3</label>

      <input type="radio" name='numArtists' id="4"></input>
      <label>4</label>
    </section>
  )
}
export default ArtistForm
