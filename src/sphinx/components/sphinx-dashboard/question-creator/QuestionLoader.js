
import React from 'react'
import { Modal, Select } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select

const QuestionLoader = (props) => {
  const { isVisible, school, standard, subject, chapter, questionList, selectedQuestionId } = props.questionLoader
  const { subjectData, chapterData, schoolData } = props
  return (
    <Modal
      visible={isVisible}
      title={'Question Loader'}
      footer={null}
      onCancel={() => props.handleChangeQuestionLoader('isVisible', false)}
    >
      <span className='margin--sides' > School: </span>
      <Select value={school} defaultValue={1} style={{ width: 120 }} onChange={(value) => props.handleChangeQuestionLoader('standard', value)}>
        {
          schoolData.map((school, schoolIndex) => {
            return (
              <Option key={schoolIndex} value={school.id}>{school.name}</Option>
            )
          })
        }
      </Select>
      <span className='margin--sides' > Standard: </span>
      <Select value={standard} defaultValue={8} style={{ width: 120 }} onChange={(value) => props.handleChangeQuestionLoader('standard', value)}>
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
      <Select value={subject} style={{ width: 120 }} onChange={(value) => props.handleChangeQuestionLoader('subject', value)}>
        {
          subjectData.map((subject, subjectIndex) => {
            return (
              <Option key={subjectIndex} value={subject.id}>{subject.name}</Option>
            )
          })
        }
      </Select>
      <span className='margin--sides' > Chapter: </span>
      <Select value={chapter} style={{ width: 240 }} onChange={(value) => props.handleChangeQuestionLoader('chapter', value)}>
        {
          chapterData.map((chapter, chapterIndex) => {
            return (
              <Option key={chapterIndex} value={chapter.id}>{chapter.name}</Option>
            )
          })
        }
      </Select>
      <div>
        <span className='margin--sides' > Question to select: </span>
        <Select value={selectedQuestionId} style={{ width: 240 }} onChange={(value) => props.handleChangeQuestionLoader('selectedQuestionId', value)}>
          {
            questionList.map((question, questionIndex) => {
              return (
                <Option key={questionIndex} value={question.id}>{question.name}</Option>
              )
            })
          }
        </Select>
      </div>
    </Modal >

  )
}

QuestionLoader.propTypes = {
  questionLoader: PropTypes.object,
  subjectData: PropTypes.array,
  chapterData: PropTypes.array,
  schoolData: PropTypes.array,
  handleChangeQuestionLoader: PropTypes.func.isRequired
}

export default QuestionLoader
