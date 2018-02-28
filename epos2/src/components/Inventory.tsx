import * as React from "react";
import { Card, Row, Col, Icon, Button } from "antd";
const { Meta } = Card;

export interface InventoryProps {}

export default class Inventory extends React.Component<InventoryProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      inventory: ["cheese", "egg", "potato"]
    };
  }

  handleInvAdd() {
    this.setState({
      something: 'value'
    })
  }

  render() {
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}>
          <Card
            style={{ color: "red" }}
            cover={
              <img
                alt="example"
                src="http://superawesomevectors.com/wp-content/uploads/2016/02/fried-egg-flat-vector-800x566.jpg"
              />
            }
            actions={[
              <Button icon="plus" key={1} type="primary" size={'large'} />,
              <Button icon="minus" key={2} type="danger" size={'large'} />
            ]}
          >
            <Meta
              title="Eggs"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ color: "red" }}
            cover={
              <img
                alt="example"
                src="http://superawesomevectors.com/wp-content/uploads/2016/02/fried-egg-flat-vector-800x566.jpg"
              />
            }
            actions={[
              <Icon onClick={() => this.handleInvAdd()} style={{ color: "green" }} key={0} type="plus" />,
              <Icon style={{ color: "red" }} key={2} type="minus" />
            ]}
          >
            <Meta
              title="Eggs"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ color: "red" }}
            cover={
              <img
                alt="example"
                src="http://superawesomevectors.com/wp-content/uploads/2016/02/fried-egg-flat-vector-800x566.jpg"
              />
            }
            actions={[
              <Icon style={{ color: "green" }} key={0} type="plus" />,
              <Icon style={{ color: "red" }} key={2} type="minus" />
            ]}
          >
            <Meta
              title="Eggs"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ color: "red" }}
            cover={
              <img
                alt="example"
                src="http://superawesomevectors.com/wp-content/uploads/2016/02/fried-egg-flat-vector-800x566.jpg"
              />
            }
            actions={[
              <Icon style={{ color: "green" }} key={0} type="plus" />,
              <Icon style={{ color: "red" }} key={2} type="minus" />
            ]}
          >
            <Meta
              title="Eggs"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
