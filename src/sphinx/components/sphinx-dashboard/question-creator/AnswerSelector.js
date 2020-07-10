import React from 'react'
import { Collapse, Input, InputNumber } from 'antd'
import PropTypes from 'prop-types'
import AnswerMCQItem from './answer-selector/AnswerMCQItem'

const { Panel } = Collapse

class AnswerSelector extends React.PureComponent {
  onChange (key, value) {
    const { templateType } = this.props
    const changedField = {
      [key]: value
    }
    this.props.onChangeAnswerSelectorField(templateType, changedField)
  }

  renderAddedtypeInfo (templateType, correctAnswer) {
    switch (templateType) {
      case 'MCMAQ': {
        return (
          <div className='margin-half--top'>
            <span className='margin-half--bottom' > Number of Correct Answers: </span>
            <InputNumber className='margin-half--bottom' value={correctAnswer[templateType].correctNumber} onChange={(value) => this.onChange('correctNumber', value)} />
            <div className='margin--ends'>
              {
                correctAnswer.MCMAQ.correct.map((mcqField, index) => {
                  return (
                    <AnswerMCQItem
                      key={index}
                      mcqField={mcqField}
                      index={index}
                      fieldSet='correct'
                      templateType={templateType}
                      onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
                      onChangeMCQOptionImageList={(imageList, imageType, fieldSet, index) => this.props.onChangeMCQOptionImageList(imageList, imageType, fieldSet, index)}
                      onRemoveMCQOptionImage={(removedFile, imageType, fieldSet, index) => this.props.onRemoveMCQOptionImage(removedFile, imageType, fieldSet, index)}
                      onChangeMCQOptionField={(templateType, fieldSet, index, changedField) => this.props.onChangeMCQOptionField(templateType, fieldSet, index, changedField)}
                    />
                  )
                })
              }
            </div>
            <span className='margin-half--bottom' > Number of Incorrect Answers: </span>
            <InputNumber className='margin-half--bottom' value={correctAnswer[templateType].incorrectNumber} onChange={(value) => this.onChange('incorrectNumber', value)} />
            <div className='margin--ends'>
              {
                correctAnswer.MCMAQ.incorrect.map((mcqField, index) => {
                  return (
                    <AnswerMCQItem
                      key={index}
                      mcqField={mcqField}
                      index={index}
                      fieldSet='incorrect'
                      templateType={templateType}
                      onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
                      onChangeMCQOptionImageList={(imageList, imageType, fieldSet, index) => this.props.onChangeMCQOptionImageList(imageList, imageType, fieldSet, index)}
                      onRemoveMCQOptionImage={(removedFile, imageType, fieldSet, index) => this.props.onRemoveMCQOptionImage(removedFile, imageType, fieldSet, index)}
                      onChangeMCQOptionField={(templateType, fieldSet, index, changedField) => this.props.onChangeMCQOptionField(templateType, fieldSet, index, changedField)}
                    />
                  )
                })
              }
            </div>
          </div>
        )
      }
      case 'MCSAQ': {
        return (
          <div className='margin-half--top'>
            <div className='margin--ends'>
              <AnswerMCQItem
                key={0}
                mcqField={correctAnswer.MCSAQ.correct[0]}
                index={0}
                fieldSet='correct'
                templateType={templateType}
                onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
                onChangeMCQOptionImageList={(imageList, imageType, fieldSet, index) => this.props.onChangeMCQOptionImageList(imageList, imageType, fieldSet, index)}
                onRemoveMCQOptionImage={(removedFile, imageType, fieldSet, index) => this.props.onRemoveMCQOptionImage(removedFile, imageType, fieldSet, index)}
                onChangeMCQOptionField={(templateType, fieldSet, index, changedField) => this.props.onChangeMCQOptionField(templateType, fieldSet, index, changedField)}
              />
            </div>
            <span className='margin-half--bottom' > Number of Incorrect Answers: </span>
            <InputNumber className='margin-half--bottom' value={correctAnswer[templateType].incorrectNumber} onChange={(value) => this.onChange('incorrectNumber', value)} />
            <div className='margin--ends'>
              {
                correctAnswer.MCSAQ.incorrect.map((mcqField, index) => {
                  return (
                    <AnswerMCQItem
                      key={index}
                      mcqField={mcqField}
                      index={index}
                      fieldSet='incorrect'
                      templateType={templateType}
                      onTriggerImagePreview={(filePreview, fileName) => this.props.onTriggerImagePreview(filePreview, fileName)}
                      onChangeMCQOptionImageList={(imageList, imageType, fieldSet, index) => this.props.onChangeMCQOptionImageList(imageList, imageType, fieldSet, index)}
                      onRemoveMCQOptionImage={(removedFile, imageType, fieldSet, index) => this.props.onRemoveMCQOptionImage(removedFile, imageType, fieldSet, index)}
                      onChangeMCQOptionField={(templateType, fieldSet, index, changedField) => this.props.onChangeMCQOptionField(templateType, fieldSet, index, changedField)}
                    />
                  )
                })
              }
            </div>
          </div>
        )
      }
      case 'textual': {
        return (
          <div className='margin-half--top'>
            <span className='margin-half--bottom' > Correct Answer: </span>
            <Input className='margin-half--bottom' value={correctAnswer[templateType].text} onChange={(e) => this.onChange('text', e.target.value)} />
          </div>
        )
      }
      case 'numerical': {
        return (
          <div className='margin-half--top'>
            <div className='margin-half--bottom' > Correct Answer: </div>
            <Input className='margin-half--bottom' value={correctAnswer[templateType].text} onChange={(e) => this.onChange('text', e.target.value)} />
            <div className='margin-half--bottom' > Tolerance(Optional): </div>
            <Input className='margin-half--bottom' value={correctAnswer[templateType].tolerance} onChange={(e) => this.onChange('tolerance', e.target.value)} />
            <div className='margin-half--bottom' > Unit (optional): </div>
            <Input className='margin-half--bottom' value={correctAnswer[templateType].unit} onChange={(e) => this.onChange('unit', e.target.value)} />
          </div>
        )
      }
      default:
        return null
    }
  }

  render () {
    const { templateType, correctAnswer } = this.props
    return (
      <Collapse>
        <Panel header={'Answer Selector'} key={`correct-answer-${templateType}`} >
          {
            this.renderAddedtypeInfo(templateType, correctAnswer)
          }
        </Panel>
      </Collapse>
    )
  }
}

AnswerSelector.propTypes = {
  templateType: PropTypes.string.isRequired,
  correctAnswer: PropTypes.object.isRequired,
  onChangeMCQOptionField: PropTypes.func.isRequired,
  onTriggerImagePreview: PropTypes.func.isRequired,
  onChangeMCQOptionImageList: PropTypes.func.isRequired,
  onRemoveMCQOptionImage: PropTypes.func.isRequired,
  onChangeAnswerSelectorField: PropTypes.func.isRequired
}

export default AnswerSelector
