import React from 'react'
import { Row, Col, Button, Alert, Modal } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SubpartTable from './question-creator/SubpartTable'
import SubpartCreator from './question-creator/SubpartCreator'
import {
  handleTestAction,
  onChangeSubpartCreatorField,
  onChangeVariableCreatorField,
  handleClosePreviewWindow,
  onTriggerImagePreview,
  onChangeImageList,
  onRemoveImageFromImageList,
  handleAddSubpartToQuestion,
  handleDeleteSubpart
} from '../../actions'

const QuestionCreator = (props) => {
  const { tableSubparts = [], subpartCreator = {}, questionError, hasAddedSubpartSuccessfully } = props.questionCreator
  return (
    <Row className='padding--sides width-100 background-offwhite'>
      <Col span={24} >
        <div className='f24 margin--bottom'>Question Creator</div>
        <Modal
          visible={questionError.length || hasAddedSubpartSuccessfully }
          footer={null}
          onCancel={props.handleClosePreviewWindow}
        >
          {
            !hasAddedSubpartSuccessfully
              ? <Alert
                message='Error'
                description={questionError}
                type='error'
                showicon
                className='margin-double--top'
              />
              : <Alert
                message='Success'
                description='You have successfully added the subpart to the question!'
                type='success'
                showicon
                className='margin-double--top'
              />
          }
        </Modal>
        <SubpartTable
          dataSource={tableSubparts}
          handleDeleteSubpart={(subpart) => this.props.handleDeleteSubpart(subpart)}
        />
        <Button className='margin--ends background-peach' onClick={() => props.handleTestAction('abc')}> Submit Question </Button>
        <SubpartCreator
          onChangeSubpartCreatorField={(changedField) => props.onChangeSubpartCreatorField(changedField)}
          onChangeVariableCreatorField={(changedIndex, changedField) => props.onChangeVariableCreatorField(changedIndex, changedField)}
          handleClosePreviewWindow={() => props.handleClosePreviewWindow()}
          onTriggerImagePreview={(filePreview, fileName) => props.onTriggerImagePreview(filePreview, fileName)}
          onChangeImageList={(imageList, imageType) => props.onChangeImageList(imageList, imageType)}
          onRemoveImageFromImageList={(removedFile, imageType) => props.onRemoveImageFromImageList(removedFile, imageType)}
          handleAddSubpartToQuestion={() => props.handleAddSubpartToQuestion()}
          subpart={subpartCreator} />
      </Col>
    </Row>
  )
}

QuestionCreator.propTypes = {
  questionCreator: PropTypes.object.isRequired,
  handleTestAction: PropTypes.func.isRequired,
  onChangeSubpartCreatorField: PropTypes.func.isRequired,
  onChangeVariableCreatorField: PropTypes.func.isRequired,
  handleClosePreviewWindow: PropTypes.func.isRequired,
  onTriggerImagePreview: PropTypes.func.isRequired,
  onChangeImageList: PropTypes.func.isRequired,
  onRemoveImageFromImageList: PropTypes.func.isRequired,
  handleAddSubpartToQuestion: PropTypes.func.isRequired,
  handleDeleteSubpart: PropTypes.func.isRequired
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
    onChangeVariableCreatorField,
    handleClosePreviewWindow,
    onTriggerImagePreview,
    onChangeImageList,
    onRemoveImageFromImageList,
    handleAddSubpartToQuestion,
    handleDeleteSubpart
  })(QuestionCreator)
