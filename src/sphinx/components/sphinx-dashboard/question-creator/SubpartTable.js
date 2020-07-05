import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

const columns = [
  {
    title: 'Subpart Index',
    dataIndex: 'index',
    key: 'subpartIndex'
  },
  {
    title: 'Content',
    dataIndex: 'contentText',
    key: 'contentText',
    ellipsis: true
  },
  {
    title: 'Hint',
    dataIndex: 'hintText',
    key: 'hintText',
    ellipsis: true
  },
  {
    title: 'Solution',
    dataIndex: 'solutionText',
    key: 'solutionText',
    ellipsis: true
  },
  {
    title: 'No. of Variables',
    dataIndex: 'variablesNumber',
    key: 'variablesNumber'
  },
  {
    title: 'Template Type',
    dataIndex: 'templateType',
    key: 'templateType'
  }
]

const SubpartTable = (props) => {
  return (
    <Table dataSource={props.dataSource} columns={columns} />
  )
}

SubpartTable.propTypes = {
  dataSource: PropTypes.array.isRequired
}

export default SubpartTable
