import React from "react"
/*
This is a shared component between Home and Gameplay home will set/pass props based on user selections
*/
const SongForm = () => {
  return (
    <section>
      <h2>How many Tracks?</h2>

      <input type="radio" id="1"></input>
      <label for="1">1</label>
      <br />
      <input type="radio" id="2"></input>
      <label for="2">2</label>
      <br />
      <input type="radio" id="3"></input>
      <label for="3">3</label>
      <br />
    </section>
  )
}
export default SongForm 