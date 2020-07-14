import React from 'react'
import { Row, Col, Button, Modal, Card } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SubpartTable from './question-creator/SubpartTable'
import SubpartCreator from './question-creator/SubpartCreator'
import QuestionAlerts from './question-creator/QuestionAlerts'
import SubpartPreview from './question-creator/SubpartPreview'
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
  handleEditSubpart,
  handleShowQuestionPreview,
  onChangeMCQOptionField,
  onChangeMCQOptionImageList,
  onRemoveMCQOptionImage,
  onChangeAnswerSelectorField
} from '../../actions'

const QuestionCreator = (props) => {
  const { tableSubparts = [], subpartCreator = {}, questionErrorText, questionSuccessText, editMode, previewType, subparts = [], subpartPreview } = props.questionCreator
  const showQuestionAlerts = (questionErrorText.length || questionSuccessText.length)
  return (
    <Row className='padding--sides width-100 background-offwhite'>
      <Col span={24} >
        <div className='f24 margin--bottom'>Question Creator</div>
        <Modal
          visible={showQuestionAlerts || previewType}
          footer={null}
          width={previewType ? 1000 : 500}
          onCancel={props.handleClosePreviewWindow}
        >
          {
            showQuestionAlerts
              ? <QuestionAlerts
                questionSuccessText={questionSuccessText}
                questionErrorText={questionErrorText}
              />
              : null
          }
          {
            previewType
              ? previewType === 'subpart'
                ? <SubpartPreview
                  subpartPreview ={subpartPreview}
                />
                : <Card title={'Question Preview'} className='margin-double--top' >
                  {
                    subparts.map((subpart, index) => {
                      return (<SubpartPreview
                        key={index}
                        subpartPreview={subpart}
                        isInner={true}
                      />)
                    })
                  }
                </Card>
              : null

          }

        </Modal>
        <SubpartCreator
          editMode={editMode}
          onChangeSubpartCreatorField={(changedField) => props.onChangeSubpartCreatorField(changedField)}
          onChangeVariableCreatorField={(changedIndex, changedField) => props.onChangeVariableCreatorField(changedIndex, changedField)}
          handleClosePreviewWindow={() => props.handleClosePreviewWindow()}
          onTriggerImagePreview={(filePreview, fileName) => props.onTriggerImagePreview(filePreview, fileName)}
          onChangeImageList={(imageList, imageType) => props.onChangeImageList(imageList, imageType)}
          onRemoveImageFromImageList={(removedFile, imageType) => props.onRemoveImageFromImageList(removedFile, imageType)}
          handleAddorSaveSubpartToQuestion={() => props.handleAddorSaveSubpartToQuestion()}
          handleShowQuestionPreview={(previewType) => props.handleShowQuestionPreview(previewType)}
          onChangeMCQOptionImageList={(imageList, imageType, fieldSet, index) => props.onChangeMCQOptionImageList(imageList, imageType, fieldSet, index)}
          onRemoveMCQOptionImage={(removedFile, imageType, fieldSet, index) => props.onRemoveMCQOptionImage(removedFile, imageType, fieldSet, index)}
          onChangeMCQOptionField={(templateType, fieldSet, index, changedField) => props.onChangeMCQOptionField(templateType, fieldSet, index, changedField)}
          onChangeAnswerSelectorField={(templateType, changedField) => props.onChangeAnswerSelectorField(templateType, changedField)}
          subpart={subpartCreator}
        />
        <SubpartTable
          dataSource={tableSubparts}
          handleDeleteSubpart={(subpart) => props.handleDeleteSubpart(subpart)}
          handleEditSubpart={(subpart) => props.handleEditSubpart(subpart)}
        />
        <Button className='margin--ends background-peach' onClick={() => props.handleShowQuestionPreview()}> Preview Question </Button>
        <Button className='margin--sides background-green text-white' onClick={() => props.handleTestAction(subpartCreator)}> Submit Question </Button>
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
  handleEditSubpart: PropTypes.func.isRequired,
  handleShowQuestionPreview: PropTypes.func.isRequired,
  onChangeMCQOptionField: PropTypes.func.isRequired,
  onChangeMCQOptionImageList: PropTypes.func.isRequired,
  onRemoveMCQOptionImage: PropTypes.func.isRequired,
  onChangeAnswerSelectorField: PropTypes.func.isRequired
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
    handleEditSubpart,
    handleShowQuestionPreview,
    onChangeMCQOptionField,
    onChangeMCQOptionImageList,
    onRemoveMCQOptionImage,
    onChangeAnswerSelectorField
  })(QuestionCreator)
