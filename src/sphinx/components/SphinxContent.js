import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import PageNotFound from '../../common/error-pages/PageNotFound'
import SphinxDashboard from './sphinx-dashboard'
import QuestionCreator from './sphinx-dashboard/QuestionCreator'
import AssignmentCreator from './sphinx-dashboard/AssignmentCreator'

function SphinxContent () {
  return (
    <Row className='background-peach f32 padding--sides' style={{ height: '100%', overflow: 'auto' }}>
      <Router>
        <Switch>
          <Route path="/sphinx/dashboard" component={SphinxDashboard} />
          <Route path="/sphinx/question" component={QuestionCreator} />
          <Route path="/sphinx/assignment" component={AssignmentCreator} />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Router>
    </Row>
  )
}

SphinxContent.propTypes = {
  sphinx: PropTypes.object.isRequired
}

export default SphinxContent
