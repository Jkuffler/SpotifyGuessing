import React from "react"
/*
This is a shared component that will be set from Home and used inside Game
*/
const ArtistForm = () => {
  return (
    <section>
      <h2>How many Arists?</h2>

      <input type="radio" id="1"></input>
      <label>1</label>
      <br />
      <input type="radio" id="2"></input>
      <label>2</label>
      <br />
      <input type="radio" id="3"></input>
      <label>3</label>
      <br />
      <input type="radio" id="4"></input>
      <label>4</label>
    </section>
  )
}
export default ArtistForm
