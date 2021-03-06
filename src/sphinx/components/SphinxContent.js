import React from 'react'
import { Row } from 'antd'
import {
  Route,
  Switch
} from 'react-router-dom'

import PageNotFound from '../../common/error-pages/PageNotFound'
import QuestionCreator from './sphinx-dashboard/QuestionCreator'
import AssignmentCreator from './sphinx-dashboard/AssignmentCreator'

function SphinxContent () {
  return (
    <Row className='height-100 overflow-auto'>
      <Switch>
        <Route exact path="/sphinx/question" component={QuestionCreator} />
        <Route exact path="/sphinx/assignment" component={AssignmentCreator} />
        <Route path="/sphinx" component={QuestionCreator} />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </Row>
  )
}

export default SphinxContent
