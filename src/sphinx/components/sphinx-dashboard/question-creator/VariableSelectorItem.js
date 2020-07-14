import React from 'react'
import { Collapse, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const { Panel } = Collapse
const { Option } = Select

class VariableSelectorItem extends React.Component {
  onChange (key, value, typeField = '') {
    let changedField = {
      [key]: value
    }
    if (typeField) {
      changedField = {
        [typeField]: {
          ...changedField
        }
      }
    }
    this.props.onChangeVariableCreatorField(this.props.index, changedField)
  }

  renderAddedtypeInfo (variable) {
    switch (variable.type) {
      case 'range': {
        return (
          <div className='margin-half--top'>
            <span className='margin-half--bottom' > Range to Include. Eg:15 or -20,20: </span>
            <Input className='margin-half--bottom' value={variable?.range?.rinclude} onChange={(e) => this.onChange('rInclude', e.target.value, 'range')} />
            <span className='margin-half--bottom' > Decimal Step. Eg: 2 =&gt; step of 0.01 (optional): </span>
            <Input className='margin-half--bottom' value={variable?.range?.step} onChange={(e) => this.onChange('step', e.target.value, 'range')} />
            <span className='margin-half--bottom' > Range to Exclude. Eg:0 or -5,5 (optional): </span>
            <Input className='margin-half--bottom' value={variable?.range?.rExclude} onChange={(e) => this.onChange('rExclude', e.target.value, 'range')} />
          </div>
        )
      }
      case 'options': {
        return (
          <div className='margin-half--top'>
            <span className='margin-half--bottom' > Options separated by commas. Eg:1,2,4,1: </span>
            <Input className='margin-half--bottom' value={variable?.options} onChange={(e) => this.onChange('options', e.target.value)} />
          </div>
        )
      }
      case 'fraction': {
        return (
          <div className='margin-half--top'>
            <span className='margin-half--bottom' > Numerator - Enter an integer range (eg:1,20): </span>
            <Input className='margin-half--bottom' value={variable?.fraction?.numerator} onChange={(e) => this.onChange('numerator', e.target.value, 'fraction')} />
            <span className='margin-half--bottom' > Denominator - Enter an integer range (eg:1,20): </span>
            <Input className='margin-half--bottom' value={variable?.fraction?.denominator} onChange={(e) => this.onChange('denominator', e.target.value, 'fraction')} />
          </div>
        )
      }
      default:
        return null
    }
  }

  render () {
    const { name = `variable${this.props.index}`, type } = this.props.variable
    return (
      <Collapse>
        <Panel header={name} key={this.props.index}>
          <span className='margin--bottom' > Variable Name: </span>
          <Input value={name} className='margin--bottom' onChange={(e) => this.onChange('name', e.target.value)} />
          <span className='margin--right' > Variable Type: </span>
          <Select defaultValue="default" value={type} style={{ width: 120 }} onChange={(value) => this.onChange('type', value)}>
            <Option value="default">Default(2-20)</Option>
            <Option value="range">Range</Option>
            <Option value="options">Options</Option>
            <Option value="fraction">Fractions</Option>
          </Select>
          {
            this.renderAddedtypeInfo(this.props.variable)
          }
        </Panel>
      </Collapse>
    )
  }
}

VariableSelectorItem.propTypes = {
  variable: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChangeVariableCreatorField: PropTypes.func.isRequired
}

export default VariableSelectorItem
