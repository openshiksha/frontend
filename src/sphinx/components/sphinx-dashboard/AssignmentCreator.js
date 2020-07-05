import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function AssignmentCreator (props) {
  return (
    <Row>
      <Col span={12} className='background-green'>
        Create a question
      </Col>
      <Col span={12} className='background-cool-grey'>
        Create an Assignment
      </Col>
    </Row>
  )
}

AssignmentCreator.propTypes = {
  sphinx: PropTypes.object.isRequired
}

const mapStateToProps = ({ sphinx }) => {
  return {
    sphinx
  }
}

export default connect(
  mapStateToProps, {}
)(AssignmentCreator)
