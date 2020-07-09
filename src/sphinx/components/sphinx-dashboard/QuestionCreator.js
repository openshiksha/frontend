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
  handleAddorSaveSubpartToQuestion,
  handleDeleteSubpart,
  handleEditSubpart
} from '../../actions'

const QuestionCreator = (props) => {
  const { tableSubparts = [], subpartCreator = {}, questionErrorText, questionSuccessText, editMode } = props.questionCreator
  return (
    <Row className='padding--sides width-100 background-offwhite'>
      <Col span={24} >
        <div className='f24 margin--bottom'>Question Creator</div>
        <Modal
          visible={questionErrorText.length || questionSuccessText.length}
          footer={null}
          onCancel={props.handleClosePreviewWindow}
        >
          {
            questionErrorText
              ? <Alert
                message='Error'
                description={questionErrorText}
                type='error'
                showicon
                className='margin-double--top'
              />
              : questionSuccessText
                ? <Alert
                  message='Success'
                  description={questionSuccessText}
                  type='success'
                  showicon
                  className='margin-double--top'
                />
                : null
          }
        </Modal>
        <SubpartTable
          dataSource={tableSubparts}
          handleDeleteSubpart={(subpart) => props.handleDeleteSubpart(subpart)}
          handleEditSubpart={(subpart) => props.handleEditSubpart(subpart)}
        />
        <Button className='margin--ends background-peach' onClick={() => props.handleTestAction('abc')}> Submit Question </Button>
        <SubpartCreator
          editMode={editMode}
          onChangeSubpartCreatorField={(changedField) => props.onChangeSubpartCreatorField(changedField)}
          onChangeVariableCreatorField={(changedIndex, changedField) => props.onChangeVariableCreatorField(changedIndex, changedField)}
          handleClosePreviewWindow={() => props.handleClosePreviewWindow()}
          onTriggerImagePreview={(filePreview, fileName) => props.onTriggerImagePreview(filePreview, fileName)}
          onChangeImageList={(imageList, imageType) => props.onChangeImageList(imageList, imageType)}
          onRemoveImageFromImageList={(removedFile, imageType) => props.onRemoveImageFromImageList(removedFile, imageType)}
          handleAddorSaveSubpartToQuestion={() => props.handleAddorSaveSubpartToQuestion()}
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
  handleAddorSaveSubpartToQuestion: PropTypes.func.isRequired,
  handleDeleteSubpart: PropTypes.func.isRequired,
  handleEditSubpart: PropTypes.func.isRequired
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
    handleAddorSaveSubpartToQuestion,
    handleDeleteSubpart,
    handleEditSubpart
  })(QuestionCreator)
