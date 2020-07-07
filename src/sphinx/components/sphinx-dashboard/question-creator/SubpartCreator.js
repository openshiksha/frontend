import React from 'react'
import { Row, Button, Col, InputNumber, Input, Select } from 'antd'
import PropTypes from 'prop-types'

import ImageUploader from './ImageUploader'
import VariableSelectorItem from './VariableSelectorItem'

const { Option } = Select
const { TextArea } = Input
class SubpartCreator extends React.Component {
  onChange (key, value) {
    const changedField = {
      [key]: value
    }
    this.props.onChangeSubpartCreatorField(changedField)
  }

  render () {
    const {
      contentImages,
      solutionImages,
      hintImages,
      variables,
      hintText,
      solutionText,
      contentText,
      subpartIndex,
      templateType,
      variablesNumber
    } = this.props.subpart

    return (
      <Row className='width-100 padding-double--bottom'>
        <Col span={12} >
          <div className='f18 margin--bottom'>Subpart Creator</div>
          <div>
            <span className='margin--right'>Subpart Index: </span>
            <InputNumber value={subpartIndex} min={0} max={10} defaultValue={0} onChange={(value) => this.onChange('subpartIndex', value)} />
            <span className='margin--sides' > Template Type: </span>
            <Select value={templateType} defaultValue="MCSAQ" style={{ width: 120 }} onChange={(value) => this.onChange('templateType', value)}>
              <Option value="MCMAQ">MCMAQ</Option>
              <Option value="MCSAQ">MCSAQ</Option>
              <Option value="textual">Textual</Option>
              <Option value="numerical">Numerical</Option>
            </Select>
            <span className='margin--sides'> No. of Variables: </span>
            <Select value={variablesNumber} defaultValue={0} style={{ width: 120 }} onChange={(value) => this.onChange('variablesNumber', value)}>
              {
                [...Array(21).keys()].map((value) => {
                  return (
                    <Option key={value} value={value}> {value} </Option>
                  )
                })
              }
            </Select>
          </div>
          <div>
            <span> Question Text: </span>
            <TextArea row={4} value={contentText} onChange={(e) => this.onChange('contentText', e.target.value)}/>
          </div>
          <span > Question Images: </span>

          <ImageUploader
            imageList={contentImages}
            imageType={'content'}
          />
          <div>
            <span > Hint Text: </span>
            <TextArea row={4} value={hintText} onChange={(e) => this.onChange('hintText', e.target.value)} />
          </div>
          <span > Hint Images: </span>
          <ImageUploader
            imageList={hintImages}
            imageType={'hint'}
          />
          <div>
            <span > Solution Text: </span>
            <TextArea row={4} value={solutionText} onChange={(e) => this.onChange('solutionText', e.target.value)} />
          </div>
          <span > Solution Images: </span>
          <ImageUploader
            imageList={solutionImages}
            imageType={'solution'}
          />

          <Button className='margin--top margin--right background-green text-white'> Add a Subpart </Button>
        </Col>
        <Col span={12} className='padding--sides padding-double--top' >
          <div className='strong margin--bottom'> Variable Selector </div>
          {
            variables.map((variable, index) => {
              return (
                <VariableSelectorItem
                  key={index}
                  variable={variable}
                  index={index}
                  onChangeVariableCreatorField={(changedIndex, changedField) => this.props.onChangeVariableCreatorField(changedIndex, changedField)}
                />

              )
            })
          }
        </Col>
      </Row>
    )
  }
}

SubpartCreator.propTypes = {
  subpart: PropTypes.object.isRequired,
  onChangeSubpartCreatorField: PropTypes.func.isRequired,
  onChangeVariableCreatorField: PropTypes.func.isRequired
}

export default SubpartCreator
