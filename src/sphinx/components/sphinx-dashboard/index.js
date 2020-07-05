import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import assignmentListSrc from '../../../assets/images/assignment-list.png'
import questionMarkSrc from '../../../assets/images/question-transparent.png'

function SphinxDashboard () {
  return (
    <Row className='width-100'>
      <Col
        span={12}
        className='background-black text-white center on-hover-light f48 padding-double--top'
      >
        <p>Create a question </p>
        <img src={questionMarkSrc} alt='assignment-list image' width={250} height={250} />
      </Col>
      <Col span={12}
        className='background-white text-black center on-hover-light f48 padding-double--top'>
        <p>Create an Assignment </p>
        <img src={assignmentListSrc} alt='assignment-list image' width={250} height={250} />
      </Col>
    </Row>
  )
}

SphinxDashboard.propTypes = {
  sphinx: PropTypes.object.isRequired
}

const mapStateToProps = ({ sphinx }) => {
  return {
    sphinx
  }
}

export default connect(
  mapStateToProps, {}
)(SphinxDashboard)
