import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import logoSrc from '../../assets/images/logo.png'

function SphinxSidebar () {
  return (
    <>
      <div className='background-black center'>
        <img src={logoSrc} height={200} width={200} alt='openshiksha logo' />
      </div>
      <p className='f24 strong center no-margin--bottom padding-half--sides'> Openshiksha Sphinx</p>
      <Menu theme='light' defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to='/sphinx/dashboard'> Dashboard </Link> </Menu.Item>
        <Menu.Item key="2"><Link to='/sphinx/question'> Create a Question </Link></Menu.Item>
        <Menu.Item key="3"><Link to='/sphinx/assignment'> Create an Assignment List </Link></Menu.Item>
      </Menu>
    </>
  )
}

export default SphinxSidebar
