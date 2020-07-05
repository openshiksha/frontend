import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

function SphinxSidebar (props) {
  return (
    <Menu theme='light' defaultSelectedKeys={['1']}>
      <Menu.Item key="1"><Link to='/sphinx/dashboard'> Dashboard </Link> </Menu.Item>
      <Menu.Item key="2"><Link to='/sphinx/question'> Create a Question </Link></Menu.Item>
      <Menu.Item key="3"><Link to='/sphinx/assignment'> Create an Assignment List </Link></Menu.Item>
    </Menu>
  )
}

SphinxSidebar.propTypes = {
  sphinx: PropTypes.object.isRequired
}

export default SphinxSidebar
