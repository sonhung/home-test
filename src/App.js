import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomePage from './views/HomePage'

import './styles/App.css'

const App = () => (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={HomePage} />
                <Route path='*' component={HomePage} />
            </Switch>
        </BrowserRouter>
    </div>
)

export default App