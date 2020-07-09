import React from 'react'
import { Row, Button, Col, InputNumber, Input, Select } from 'antd'
import PropTypes from 'prop-types'

import ImageUploader from './ImageUploader'
import VariableSelectorItem from './VariableSelectorItem'
import ImagePreviewModal from './ImagePreviewModal'
// import AnswerSelector from './AnswerSelector'

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
      previewImage
    } = this.props.subpart

    const isEditing = this.props.editMode

    return (
      <Row name='subpartCreator' className='width-100 padding-double--bottom'>
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
          <div>
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
            onClick={() => this.props.handleShowQuestionPreview('subpart')}
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
          <div className='strong margin--bottom'> Variable Selector </div>
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
          <div className='strong margin--ends'> Answer Selector </div>
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
  editMode: PropTypes.bool.isRequired
}

export default SubpartCreator
