import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import PropTypes from 'prop-types'

function SphinxBase (props) {
  return (
    <>
      <Button type='primary'> Click me</Button>
      <p>{props.sphinx.toString()}</p>
    </>
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
