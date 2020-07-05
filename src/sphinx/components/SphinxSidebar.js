import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import { Link } from 'react-router-dom'

function SphinxSidebar (props) {
  return (
    <Row>
      <ul>
        <li><Link to='/sphinx'> Dashboard </Link></li>
        <li><Link to='/sphinx/question'> Create a Question </Link></li>
        <li><Link to='/sphinx/assignment'> Create an Assignment List </Link></li>
      </ul>
    </Row>
  )
}

SphinxSidebar.propTypes = {
  sphinx: PropTypes.object.isRequired
}

export default SphinxSidebar
