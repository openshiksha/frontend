import React from 'react'
import { Layout } from 'antd'

import SphinxSidebar from './SphinxSidebar'
import SphinxContent from './SphinxContent'

const { Sider, Content } = Layout

function SphinxBase () {
  return (
    <Layout className='height-min-100'>
      <Sider
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed'
        }}
        theme='light'
      >
        <SphinxSidebar />
      </Sider>
      <Content theme='light' style={{ marginLeft: 200 }}>
        <SphinxContent />
      </Content>
    </Layout>
  )
}

export default SphinxBase
