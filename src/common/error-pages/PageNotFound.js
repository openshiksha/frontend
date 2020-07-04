import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'antd'

const PageNotFound = () => {
  return (
    <Row style={{ marginTop: 60, textAlign: 'center' }} >
      <Col span={12} offset={6} >
        <h1 style={{ fontSize: 48 }}> 404 </h1>
        <h2 style={{ fontSize: 36 }}> PAGE NOT FOUND </h2>
        <h3 style={{ color: '#C8CFD5' }}> &quot; Not all those who wander are lost &quot; </h3>
        <Button type='primary'>
          <Link to="/"> Go to Homepage </Link>
        </Button>
      </Col>
    </Row>
  )
}

export default PageNotFound
