import React from 'react'
import { Row, Button, Col, InputNumber, Input, Select } from 'antd'
import PropTypes from 'prop-types'

import ImageUploader from './ImageUploader'
import VariableSelectorItem from './VariableSelectorItem'
import ImagePreviewModal from './ImagePreviewModal'
import AnswerSelector from './AnswerSelector'

const { Option } = Select
const { TextArea } = Input
class SubpartCreator extends React.Component {
  onChange (key, value) {
    const changedField = {
      [key]: value
    }
    this.props.onChangeSubpartCreatorField(changedField)
  }

  render () {
    const {
      contentImages,
      solutionImages,
      hintImages,
      variables,
      hintText,
      solutionText,
      contentText,
      index,
      templateType,
      variablesNumber,
      imagePreviewTitle,
      imagePreviewVisible,
      previewImage,
      correctAnswer,
      tags
    } = this.props.subpart

    const isEditing = this.props.editMode

    return (
      <Row name='subpartCreator' className='width-100'>
        <Col span={12} >
          <div className='f18 margin--bottom'>Subpart Creator</div>
          <div>
            <span className='margin--right'>Subpart Index: </span>
            <InputNumber disabled={isEditing} value={index} min={0} max={10} defaultValue={0} onChange={(value) => this.onChange('index', value)} />
            <span className='margin--sides' > Template Type: </span>
            <Select value={templateType} defaultValue="MCSAQ" style={{ width: 120 }} onChange={(value) => this.onChange('templateType', value)}>
              <Option value="MCMAQ">MCMAQ</Option>
              <Option value="MCSAQ">MCSAQ</Option>
              <Option value="textual">Textual</Option>
              <Option value="numerical">Numerical</Option>
            </Select>
            <span className='margin--sides'> No. of Variables: </span>
            <Select value={variablesNumber} defaultValue={0} style={{ width: 120 }} onChange={(value) => this.onChange('variablesNumber', value)}>
              {
                [...Array(21).keys()].map((value) => {
                  return (
                    <Option key={value} value={value}> {value} </Option>
                  )
                })
              }
            </Select>
          </div>
          <span className='margin--ends' > Tags: </span>
          <Select mode="multiple" style={{ width: '100%' }} value={tags} placeholder="Please select the tags required" onChange={(value) => this.onChange('tags', value)}>
            {
              this.props.tagsData.map((tag, tagIndex) => {
                return (
                  <Option key={tagIndex} value={tag.name}>{tag.name}</Option>
                )
              })
            }
          </Select>
          <div className='margin--top'>
            <span> Question Text: </span>
            <TextArea row={4} value={contentText} onChange={(e) => this.onChange('contentText', e.target.value)}/>
          </div>
          <span > Question Images: </span>

          <ImageUploader
            imageList={contentImages}
            imageType='contentImages'
            onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
            onChangeImageList={(imageList, imageType) => this.props.onChangeImageList(imageList, imageType)}
            onRemoveImageFromImageList={(removedFile, imageType) => this.props.onRemoveImageFromImageList(removedFile, imageType)}

          />
          <div>
            <span > Hint Text: </span>
            <TextArea row={4} value={hintText} onChange={(e) => this.onChange('hintText', e.target.value)} />
          </div>
          <span > Hint Images: </span>
          <ImageUploader
            imageList={hintImages}
            imageType='hintImages'
            onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
            onChangeImageList={(imageList, imageType) => this.props.onChangeImageList(imageList, imageType)}
            onRemoveImageFromImageList={(removedFile, imageType) => this.props.onRemoveImageFromImageList(removedFile, imageType)}

          />
          <div>
            <span > Solution Text: </span>
            <TextArea row={4} value={solutionText} onChange={(e) => this.onChange('solutionText', e.target.value)} />
          </div>
          <span > Solution Images: </span>
          <ImageUploader
            imageList={solutionImages}
            imageType='solutionImages'
            onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
            onChangeImageList={(imageList, imageType) => this.props.onChangeImageList(imageList, imageType)}
            onRemoveImageFromImageList={(removedFile, imageType) => this.props.onRemoveImageFromImageList(removedFile, imageType)}
          />
          <Button
            onClick={async () => {
              this.props.handleSetPreviewType('subpart')
              await this.props.handlePreviewSubpart(this.props.subpart)
              this.props.handleShowQuestionPreview()
            }}
            className='margin--top margin--right background-peach'
          >
            Preview Subpart
          </Button>
          <Button
            onClick={() => this.props.handleAddorSaveSubpartToQuestion()}
            className='margin--top margin--right background-green text-white'
          >
            {isEditing ? <span>Save Subpart</span> : <span>Add Subpart</span> }
          </Button>
        </Col>
        <Col span={12} className='padding--sides padding-double--top' >
          {
            variablesNumber
              ? <div className='strong margin--bottom'> Variable Selector </div>
              : null
          }
          {
            variables.map((variable, index) => {
              return (
                <VariableSelectorItem
                  key={index}
                  variable={variable}
                  index={index}
                  onChangeVariableCreatorField={(changedIndex, changedField) => this.props.onChangeVariableCreatorField(changedIndex, changedField)}
                />

              )
            })
          }
          <div className='margin--top' >
            <AnswerSelector
              templateType={templateType}
              correctAnswer={correctAnswer}
              onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
              onChangeMCQOptionImageList={(imageList, imageType, fieldSet, index) => this.props.onChangeMCQOptionImageList(imageList, imageType, fieldSet, index)}
              onRemoveMCQOptionImage={(removedFile, imageType, fieldSet, index) => this.props.onRemoveMCQOptionImage(removedFile, imageType, fieldSet, index)}
              onChangeMCQOptionField={(templateType, fieldSet, index, changedField) => this.props.onChangeMCQOptionField(templateType, fieldSet, index, changedField)}
              onChangeAnswerSelectorField={(templateType, changedField) => this.props.onChangeAnswerSelectorField(templateType, changedField)}
            />
          </div>
        </Col>
        <ImagePreviewModal
          previewTitle={imagePreviewTitle}
          previewImage={previewImage}
          previewVisible={imagePreviewVisible}
          handleClosePreviewWindow={() => this.props.handleClosePreviewWindow()}
        />
      </Row>
    )
  }
}

SubpartCreator.propTypes = {
  subpart: PropTypes.object.isRequired,
  onChangeSubpartCreatorField: PropTypes.func.isRequired,
  onChangeVariableCreatorField: PropTypes.func.isRequired,
  onChangeImageList: PropTypes.func.isRequired,
  handleClosePreviewWindow: PropTypes.func.isRequired,
  onTriggerImagePreview: PropTypes.func.isRequired,
  onRemoveImageFromImageList: PropTypes.func.isRequired,
  handleAddorSaveSubpartToQuestion: PropTypes.func.isRequired,
  handleShowQuestionPreview: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  onChangeMCQOptionField: PropTypes.func.isRequired,
  onChangeMCQOptionImageList: PropTypes.func.isRequired,
  onRemoveMCQOptionImage: PropTypes.func.isRequired,
  onChangeAnswerSelectorField: PropTypes.func.isRequired,
  handlePreviewSubpart: PropTypes.func.isRequired,
  handleSetPreviewType: PropTypes.func.isRequired,
  tagsData: PropTypes.array.isRequired
}

export default SubpartCreator
