import React from 'react'
import { useHistory } from "react-router-dom"
import { Winner } from './Button.jsx'

const Win = () => {
    const history = useHistory()

    const goHome = event => {
        event.preventDefault()
        history.push("/")
    }
     
    return(
        <Winner>
            <form onSubmit={goHome}>
                <p>You win</p>
                <button type='submit'>Play again</button>
            </form>
        </Winner>
    )
}

export default Win