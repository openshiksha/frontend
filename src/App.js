import './App.css'

import React from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import SphinxBase from './sphinx/components/SphinxBase'
import PageNotFound from './common/error-pages/PageNotFound'

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={SphinxBase} />
        <Route path="/sphinx" component={SphinxBase} />
        <Route render={() => <PageNotFound />} />
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
