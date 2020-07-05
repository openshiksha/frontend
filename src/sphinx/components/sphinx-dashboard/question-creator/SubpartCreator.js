import React from 'react'
import { Row, Button, Col, InputNumber } from 'antd'
import PropTypes from 'prop-types'

class SubpartCreator extends React.Component {
  onChange (key, value) {
    console.log(key + value)
  }

  render () {
    return (
      <Row className='width-100'>
        <Col span={24} >
          <div className='f18 margin--bottom'>Subpart Creator</div>
          <div>
            <span className='margin--right'>Subpart Index: </span>
            <InputNumber min={0} max={10} defaultValue={0} onChange={(value) => this.onChange('subpartIndex', value)} />
          </div>
          <Button className='margin--top margin--right background-green text-white'> Add a Subpart </Button>
        </Col>
      </Row>
    )
  }
}

SubpartCreator.propTypes = {
  subpartCreator: PropTypes.object.isRequired
}

export default SubpartCreator
