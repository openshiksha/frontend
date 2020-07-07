import React from 'react'
import { Row, Col, Button } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SubpartTable from './question-creator/SubpartTable'
import SubpartCreator from './question-creator/SubpartCreator'
import { handleTestAction } from '../../actions'

const QuestionCreator = (props) => {
  const { subparts = [], subpartCreator = {} } = props.questionCreator
  return (
    <Row className='padding--sides width-100 background-offwhite'>
      <Col span={24} >
        <div className='f24 margin--bottom'>Question Creator</div>
        <SubpartTable dataSource={subparts} />
        <Button className='margin--ends background-peach' onClick={() => props.handleTestAction('abc')}> Submit Question </Button>
        <SubpartCreator subpart={subpartCreator} />
      </Col>
    </Row>
  )
}

QuestionCreator.propTypes = {
  questionCreator: PropTypes.object.isRequired,
  handleTestAction: PropTypes.func.isRequired
}

const mapStateToProps = ({ questionCreator }) => {
  return {
    questionCreator
  }
}

export default connect(
  mapStateToProps, {
    handleTestAction
  })(QuestionCreator)
