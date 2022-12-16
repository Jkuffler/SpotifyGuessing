import React from 'react'
import { Route } from 'react-router-dom'
import '../style.css'
import Home from './Home'
import Game from './Game'
import Win from './Win'
import Lose from './Lose'

const App = () => (
  <div>
    <Route exact path='/' component={Home} />
    <Route exact path='/game' component={Game} />
    <Route exact path='/win' component={Win} />
    <Route exact path='/lose' component={Lose} />
  </div>
)

export default App
