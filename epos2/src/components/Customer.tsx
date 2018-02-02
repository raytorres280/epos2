import * as React from 'react';
import { Col, Row, Button } from 'antd'
export interface AppProps {
}

const Customer = (props: any) => {
    return (
      <Row type="flex" justify="center">
          <Col span={8}>
            <span>{props.customer.last}, {props.customer.first}</span>
          </Col>
          <Col span={4}>
            <Button type="primary">View</Button>
          </Col>
          <Col span={4}>
            <span>Memeber since: 2015</span>
          </Col>
      </Row>
    );
}
export default Customer