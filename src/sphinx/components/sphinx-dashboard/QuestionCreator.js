import React from 'react'
import { Row } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function QuestionCreator (props) {
  return (
    <Row>
      This is question creation
    </Row>
  )
}

QuestionCreator.propTypes = {
  sphinx: PropTypes.object.isRequired
}

const mapStateToProps = ({ sphinx }) => {
  return {
    sphinx
  }
}

export default connect(
  mapStateToProps, {}
)(QuestionCreator)
