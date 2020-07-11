import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

class SubpartTable extends React.PureComponent {
  columns () {
    return [
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
      },
      {
        key: 'action-edit',
        // eslint-disable-next-line react/display-name
        render: (record) => (
          <a href='#subpartCreator' onClick={() => this.props.handleEditSubpart(record)}> Edit </a>
        )
      },
      {
        key: 'action',
        // eslint-disable-next-line react/display-name
        render: (record) => (
          <a href='#subpartCreator' onClick={() => this.props.handleDeleteSubpart(record)}> Delete </a>
        )
      }
    ]
  }

  render () {
    return (
      <Table dataSource={this.props.dataSource} columns={this.columns()} />
    )
  }
}

SubpartTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  handleDeleteSubpart: PropTypes.func.isRequired,
  handleEditSubpart: PropTypes.func.isRequired
}

export default SubpartTable
