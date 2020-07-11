import React from 'react'
import { Collapse, Input } from 'antd'
import PropTypes from 'prop-types'

import ImageUploader from '../ImageUploader'

const { Panel } = Collapse

class AnswerMCQItem extends React.PureComponent {
  onChange (key, value) {
    const { fieldSet, templateType, index } = this.props
    const changedField = {
      [key]: value
    }
    this.props.onChangeMCQOptionField(templateType, fieldSet, index, changedField)
  }

  render () {
    const { text, images } = this.props.mcqField
    const { fieldSet, index, templateType } = this.props
    return (
      <Collapse>
        <Panel header={`${fieldSet}-answer-${index}`} key={`${fieldSet}-answer-${index}`}>
          <span className='margin--bottom' > Text: </span>
          <Input value={text} className='margin--bottom' onChange={(e) => this.onChange('text', e.target.value)} />
          <span className='margin--bottom'> Images: </span>
          <ImageUploader
            imageList={images}
            imageType={templateType}
            onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
            onChangeImageList={(imageList, imageType) => this.props.onChangeMCQOptionImageList(imageList, imageType, fieldSet, index)}
            onRemoveImageFromImageList={(removedFile, imageType) => this.props.onRemoveMCQOptionImage(removedFile, imageType, fieldSet, index)}
          />
        </Panel>
      </Collapse>
    )
  }
}

AnswerMCQItem.propTypes = {
  fieldSet: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  templateType: PropTypes.string.isRequired,
  mcqField: PropTypes.object.isRequired,
  onChangeMCQOptionField: PropTypes.func.isRequired,
  onTriggerImagePreview: PropTypes.func.isRequired,
  onChangeMCQOptionImageList: PropTypes.func.isRequired,
  onRemoveMCQOptionImage: PropTypes.func.isRequired
}
export default AnswerMCQItem
