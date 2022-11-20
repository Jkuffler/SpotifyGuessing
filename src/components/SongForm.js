import React from "react"
/*
This is a shared component between Home and Gameplay home will set/pass props based on user selections
*/
const SongForm = () => {
  return (
    <section>
      <h2>How many Tracks?</h2>
      <form>
        <input type="radio"  value="1"/>
        <label>1</label>
        <br />
        <input type="radio" value="2"></input>
        <label>2</label>
        <br />
        <input type="radio" value="3" ></input>
        <label>3</label>
        <br />
      </form>
    </section>
  )
}
export default SongForm
