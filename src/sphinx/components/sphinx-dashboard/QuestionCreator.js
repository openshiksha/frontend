import React from 'react'
import { Row, Col, Button } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SubpartTable from './question-creator/SubpartTable'
import SubpartCreator from './question-creator/SubpartCreator'
import { handleTestAction, onChangeSubpartCreatorField, onChangeVariableCreatorField } from '../../actions'

const QuestionCreator = (props) => {
  const { subparts = [], subpartCreator = {} } = props.questionCreator
  return (
    <Row className='padding--sides width-100 background-offwhite'>
      <Col span={24} >
        <div className='f24 margin--bottom'>Question Creator</div>
        <SubpartTable dataSource={subparts} />
        <Button className='margin--ends background-peach' onClick={() => props.handleTestAction('abc')}> Submit Question </Button>
        <SubpartCreator
          onChangeSubpartCreatorField={(changedField) => props.onChangeSubpartCreatorField(changedField)}
          onChangeVariableCreatorField={(changedIndex, changedField) => props.onChangeVariableCreatorField(changedIndex, changedField)}
          subpart={subpartCreator} />
      </Col>
    </Row>
  )
}

QuestionCreator.propTypes = {
  questionCreator: PropTypes.object.isRequired,
  handleTestAction: PropTypes.func.isRequired,
  onChangeSubpartCreatorField: PropTypes.func.isRequired,
  onChangeVariableCreatorField: PropTypes.func.isRequired
}

const mapStateToProps = ({ questionCreator }) => {
  return {
    questionCreator
  }
}

export default connect(
  mapStateToProps, {
    handleTestAction,
    onChangeSubpartCreatorField,
    onChangeVariableCreatorField
  })(QuestionCreator)
