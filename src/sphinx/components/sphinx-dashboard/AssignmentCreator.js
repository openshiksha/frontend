import React from 'react'
import { Row } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function AssignmentCreator (props) {
  return (
    <Row className='width-100 background-offwhite'>
      This is assignment creation
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
