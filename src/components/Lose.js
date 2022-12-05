import React from 'react';
import { useHistory } from "react-router-dom";
import { Loser } from './Button.jsx';

const Lose = () => {
    const history = useHistory()

    const goHome = event => {
        event.preventDefault()
        history.push("/")
    }

    return(
        <Loser>
            <form onSubmit={goHome}>
                <p>You Lose</p>
                <button type='submit'>Play again</button>
            </form>
        </Loser>
    )
}

export default Lose