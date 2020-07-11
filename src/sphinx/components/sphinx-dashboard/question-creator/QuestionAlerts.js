import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

const QuestionAlerts = ({ questionErrorText, questionSuccessText }) => {
  return (
    <>
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
    </>
  )
}

QuestionAlerts.propTypes = {
  questionErrorText: PropTypes.string.isRequired,
  questionSuccessText: PropTypes.string.isRequired
}

export default QuestionAlerts
