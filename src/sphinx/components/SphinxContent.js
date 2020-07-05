import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import {
  Route,
  Switch
} from 'react-router-dom'

import PageNotFound from '../../common/error-pages/PageNotFound'
import SphinxDashboard from './sphinx-dashboard'
import QuestionCreator from './sphinx-dashboard/QuestionCreator'
import AssignmentCreator from './sphinx-dashboard/AssignmentCreator'

function SphinxContent () {
  return (
    <Row style={{ height: '100%', overflow: 'auto' }}>
      <Switch>
        <Route exact path="/sphinx/question" component={QuestionCreator} />
        <Route exact path="/sphinx/assignment" component={AssignmentCreator} />
        <Route path="/sphinx" component={SphinxDashboard} />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </Row>
  )
}

SphinxContent.propTypes = {
  sphinx: PropTypes.object.isRequired
}

export default SphinxContent
