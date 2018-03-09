import * as React from "react";
import { Row, Col, List, Button } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import CartItemModel from '../models/CartItemModel'

import OrderCreateOverview from "./OrderCreateOverview";

class OrderPay extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedOrder: null
    };
    console.log(props.match);
  }

  componentWillReceiveProps(newProps: any) {
    console.log(newProps.data);
  }
  render() {
    let { data } = this.props;
    return (
      <div>
        <Row>
          <Col span={6}>
            <List
              loading={false}
              itemLayout="horizontal"
              dataSource={data.ordersUnpaid || []}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button
                      key={1}
                      onClick={() => this.setState({ selectedOrder: item })}
                    >
                      Select
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.customer.first + " " + item.customer.last}
                    description={`member since: insert years here`}
                  />
                  {/* <div>content</div> */}
                </List.Item>
              )}
            />
          </Col>
          <Col span={6}>
            {this.state.selectedOrder ? (
              <OrderCreateOverview
                cart={this.state.selectedOrder.lineItems.map(item => 
                  new CartItemModel(item.product.id, item.product.name, 
                    item.purchasePrice, item.qty, item.instructions
                  ))
                }
                customer={this.state.selectedOrder.customer}
              />
            ) : (
              <div>no data</div>
            )}
          </Col>
          <Col span={12}>payments</Col>
        </Row>
      </div>
    );
  }
}

const query = gql`
  {
    ordersUnpaid {
      id
      lineItems {
        qty
        instructions
        purchasePrice
        product {
          id
          name
        }
      }
      customer {
        id
        first
        last
      }
    }
  }
`;
export default graphql<any, any>(query)(OrderPay);
