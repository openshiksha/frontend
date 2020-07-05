import React from 'react'
import { Row, Button } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function QuestionCreator (props) {
  return (
    <Row className='padding--sides width-100 background-offwhite'>
      <p className='f24'>Question Creator</p>
      <Button type=''> Submit Question </Button>
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
