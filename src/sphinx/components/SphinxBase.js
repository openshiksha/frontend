import React from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SphinxSidebar from './SphinxSidebar'
import SphinxContent from './SphinxContent'

const { Sider, Content } = Layout

function SphinxBase (props) {
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed'
        }}
      >
        <SphinxSidebar />
      </Sider>
      <Content style={{ marginLeft: 250 }}>
        <SphinxContent />
      </Content>
    </Layout>
  )
}

SphinxBase.propTypes = {
  sphinx: PropTypes.object.isRequired
}

const mapStateToProps = ({ sphinx }) => {
  return {
    sphinx
  }
}

export default connect(
  mapStateToProps, {}
)(SphinxBase)
