import React from 'react'
import { Row, Col, Button, Modal, Card, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SubpartTable from './question-creator/SubpartTable'
import SubpartCreator from './question-creator/SubpartCreator'
import QuestionAlerts from './question-creator/QuestionAlerts'
import SubpartPreview from './question-creator/SubpartPreview'
import {
  handleSubmitQuestion,
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
  onChangeAnswerSelectorField,
  handlePreviewSubpart,
  handleSetPreviewType,
  onChangeQuestionCreatorField
} from '../../actions'

const { TextArea } = Input
const { Option } = Select

class QuestionCreator extends React.PureComponent {
  onChange (key, value) {
    const changedField = {
      [key]: value
    }
    this.props.onChangeQuestionCreatorField(changedField)
  }

  render () {
    const {
      tableSubparts = [],
      subpartCreator = {},
      questionErrorText,
      questionSuccessText,
      editMode,
      previewType,
      subpartPreview,
      questionPreview,
      subparts = [],
      showPreviewQuestionItem,
      hint,
      content,
      tags = [],
      board,
      language,
      subject,
      standard,
      chapter,
      subjectData = [],
      chapterData = [],
      tagData = []
    } = this.props.questionCreator
    const showQuestionAlerts = (questionErrorText.length || questionSuccessText.length)
    return (
      <Row className='padding--sides width-100 background-offwhite'>
        <Col span={24} >
          <div className='f24 margin--bottom'>Question Creator</div>
          <Modal
            visible={showQuestionAlerts || showPreviewQuestionItem}
            footer={null}
            width={previewType ? 1000 : 500}
            onCancel={this.props.handleClosePreviewWindow}
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
              showPreviewQuestionItem
                ? previewType === 'subpart'
                  ? <SubpartPreview
                    subpartPreview ={subpartPreview}
                  />
                  : <Card title={'Question Preview'} className='margin-double--top' >
                    {
                      questionPreview.map((subpart, index) => {
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
          <span className='margin--right' > Board: </span>

          <Select value={board} defaultValue={1} style={{ width: 120 }} onChange={(value) => this.onChange('board', value)}>
            <Option value={1}>CBSE</Option>
          </Select>
          <span className='margin--sides' > Language: </span>
          <Select value={language} defaultValue={1} style={{ width: 120 }} onChange={(value) => this.onChange('language', value)}>
            <Option value={1}>English</Option>
            <Option value={2}>Hindi</Option>
          </Select>
          <span className='margin--sides' > Standard: </span>
          <Select value={standard} defaultValue={8} style={{ width: 120 }} onChange={(value) => this.onChange('standard', value)}>
            <Option value={5}>5th</Option>
            <Option value={6}>6th</Option>
            <Option value={7}>7th</Option>
            <Option value={8}>8th</Option>
            <Option value={9}>9th</Option>
            <Option value={10}>10th</Option>
            <Option value={11}>11th</Option>
            <Option value={12}>12th</Option>
          </Select>
          <span className='margin--sides' > Subject: </span>
          <Select value={subject} style={{ width: 120 }} onChange={(value) => this.onChange('subject', value)}>
            {
              subjectData.map((subject, subjectIndex) => {
                return (
                  <Option key={subjectIndex} value={subject.value}>{subject.label}</Option>
                )
              })
            }
          </Select>
          <span className='margin--sides' > Chapter: </span>
          <Select value={chapter} style={{ width: 120 }} onChange={(value) => this.onChange('chapter', value)}>
            {
              chapterData.map((chapter, chapterIndex) => {
                return (
                  <Option key={chapterIndex} value={chapter.value}>{chapter.label}</Option>
                )
              })
            }
          </Select>
          <Row justify="space-between" className='margin--ends'>
            <Col span={11}>
              <span > Question Content: </span>
              <TextArea row={4} value={content} onChange={(e) => this.onChange('content', e.target.value)} />
            </Col>
            <Col span={11} >
              <span > Hint: </span>
              <TextArea row={4} value={hint} onChange={(e) => this.onChange('hint', e.target.value)} />
            </Col>
          </Row>
          <span className='margin--right' > Tags: </span>
          <Select mode="multiple" style={{ width: '100%' }} value={tags} placeholder="Please select the tags required" onChange={(value) => this.onChange('tags', value)}>
            {
              tagData.map((tag, tagIndex) => {
                return (
                  <Option key={tagIndex} value={tag.value}>{tag.label}</Option>
                )
              })
            }
          </Select>
          <Card className='margin--ends'>
            <SubpartCreator
              editMode={editMode}
              onChangeSubpartCreatorField={(changedField) => this.props.onChangeSubpartCreatorField(changedField)}
              onChangeVariableCreatorField={(changedIndex, changedField) => this.props.onChangeVariableCreatorField(changedIndex, changedField)}
              handleClosePreviewWindow={() => this.props.handleClosePreviewWindow()}
              onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
              onChangeImageList={(imageList, imageType) => this.props.onChangeImageList(imageList, imageType)}
              onRemoveImageFromImageList={(removedFile, imageType) => this.props.onRemoveImageFromImageList(removedFile, imageType)}
              handleAddorSaveSubpartToQuestion={() => this.props.handleAddorSaveSubpartToQuestion()}
              handleShowQuestionPreview={(previewType) => this.props.handleShowQuestionPreview(previewType)}
              onChangeMCQOptionImageList={(imageList, imageType, fieldSet, index) => this.props.onChangeMCQOptionImageList(imageList, imageType, fieldSet, index)}
              onRemoveMCQOptionImage={(removedFile, imageType, fieldSet, index) => this.props.onRemoveMCQOptionImage(removedFile, imageType, fieldSet, index)}
              onChangeMCQOptionField={(templateType, fieldSet, index, changedField) => this.props.onChangeMCQOptionField(templateType, fieldSet, index, changedField)}
              onChangeAnswerSelectorField={(templateType, changedField) => this.props.onChangeAnswerSelectorField(templateType, changedField)}
              handlePreviewSubpart={(subpart) => this.props.handlePreviewSubpart(subpart)}
              handleSetPreviewType={(previewType) => this.props.handleSetPreviewType(previewType)}
              subpart={subpartCreator}
            />
          </Card>
          <SubpartTable
            dataSource={tableSubparts}
            handleDeleteSubpart={(subpart) => this.props.handleDeleteSubpart(subpart)}
            handleEditSubpart={(subpart) => this.props.handleEditSubpart(subpart)}
          />
          <Button className='margin--ends background-peach' onClick={async () => {
            this.props.handleSetPreviewType()
            await Promise.all(subparts.map(async (subpart) => {
              await this.props.handlePreviewSubpart(subpart)
            }))
            this.props.handleShowQuestionPreview()
          }}> Preview Question </Button>
          <Button className='margin--sides background-green text-white' onClick={() => this.props.handleSubmitQuestion()}> Submit Question </Button>
        </Col>
      </Row>
    )
  }
}

QuestionCreator.propTypes = {
  questionCreator: PropTypes.object.isRequired,
  handleSubmitQuestion: PropTypes.func.isRequired,
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
  onChangeAnswerSelectorField: PropTypes.func.isRequired,
  handlePreviewSubpart: PropTypes.func.isRequired,
  handleSetPreviewType: PropTypes.func.isRequired,
  onChangeQuestionCreatorField: PropTypes.func.isRequired
}

const mapStateToProps = ({ questionCreator }) => {
  return {
    questionCreator
  }
}

export default connect(
  mapStateToProps, {
    handleSubmitQuestion,
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
    onChangeAnswerSelectorField,
    handlePreviewSubpart,
    handleSetPreviewType,
    onChangeQuestionCreatorField
  })(QuestionCreator)
