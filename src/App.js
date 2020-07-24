import './App.css'

import React from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import SphinxBase from './sphinx/components/SphinxBase'

export const APP_ROOT = '/app'

const App = () => (
  <Router basename={APP_ROOT}>
    <div className='height-100'>
      <Switch>
        <Route path="/sphinx" component={SphinxBase} />
      </Switch>
    </div>
  </Router>
)
const mapStateToProps = ({ sphinx }) => {
  return {
    sphinx
  }
}

export default connect(
  mapStateToProps, {}
)(App)
