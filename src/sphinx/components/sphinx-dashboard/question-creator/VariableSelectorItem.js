import React from 'react'
import { Collapse, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const { Panel } = Collapse
const { Option } = Select

const renderAddedtypeInfo = (type) => {
  switch (type) {
    case 'range': {
      return (
        <div className='margin-half--top'>
          <span className='margin-half--bottom' > Range to Include. Eg:15 or -20,20: </span>
          <Input className='margin-half--bottom' />
          <span className='margin-half--bottom' > Decimal Step. Eg: 2 =&gt; step of 0.01 (optional): </span>
          <Input className='margin-half--bottom' />
          <span className='margin-half--bottom' > Range to Exclude. Eg:0 or -5,5 (optional): </span>
          <Input className='margin-half--bottom' />
        </div>
      )
    }
    case 'options': {
      return (
        <div className='margin-half--top'>
          <span className='margin-half--bottom' > Options separated by commas. Eg:1,2,4,1: </span>
          <Input className='margin-half--bottom' />
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
          >
          </Select>
        </div>
      )
    }
    case 'fraction': {
      return (
        <div className='margin-half--top'>
          <span className='margin-half--bottom' > Numerator - Enter an integer range (eg:1,20): </span>
          <Input className='margin-half--bottom' />
          <span className='margin-half--bottom' > Denominator - Enter an integer range (eg:1,20): </span>
          <Input className='margin-half--bottom' />
        </div>
      )
    }
    default:
      return null
  }
}

const VariableSelectorItem = (props) => {
  const { name = `variable${props.index}`, type } = props.variable
  return (
    <Collapse>
      <Panel header={name} key={props.index}>
        <span className='margin--bottom' > Variable Name: </span>
        <Input value={name} className='margin--bottom' />
        <span className='margin--right' > Variable Type: </span>
        <Select defaultValue="default" value={type} style={{ width: 120 }} onChange={(value) => this.onChange('templateType', value)}>
          <Option value="default">Default(2-20)</Option>
          <Option value="range">Range</Option>
          <Option value="options">Options</Option>
          <Option value="fractions">Fractions</Option>
        </Select>
        {
          renderAddedtypeInfo(type)
        }
      </Panel>
    </Collapse>
  )
}

VariableSelectorItem.propTypes = {
  variable: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default VariableSelectorItem
