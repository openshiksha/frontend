import React from 'react'
import { Row } from 'antd'
import {
  Route,
  Switch
} from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'

import PageNotFound from '../../common/error-pages/PageNotFound'
import QuestionCreator from './sphinx-dashboard/QuestionCreator'
import AssignmentCreator from './sphinx-dashboard/AssignmentCreator'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
})

function SphinxContent () {
  return (
    <Route
      render={({ location }) => (
        <Row className='height-100 overflow-auto'>
          <PoseGroup>
            <RouteContainer key={999999}>
              <Switch location={location}>
                <Route exact path="/sphinx/question" component={QuestionCreator} key="question"/>
                <Route exact path="/sphinx/assignment" component={AssignmentCreator} key="assignment" />
                <Route path="/sphinx" component={QuestionCreator} key="base" />
                <Route render={() => <PageNotFound />} key="notFound" />
              </Switch>
            </RouteContainer>
          </PoseGroup>
        </Row>
      )} />
  )
}

export default SphinxContent
