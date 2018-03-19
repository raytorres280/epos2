import * as React from "react";
import { Row, Col, List, Button } from "antd";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import CartItemModel from "../models/CartItemModel";

import OrderCreateOverview from "./OrderCreateOverview";
import PayTerminal from './PayTerminal';
class OrderPay extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedOrder: null
    };
    this.payOrder = this.payOrder.bind(this)
  }

  componentWillReceiveProps(newProps: any) {
    console.log(newProps);
  }

  handlePayWithCash() {
    console.log("open register dispense change");
    // this.state.
  }

  handlePayWithCard() {
    console.log("insert card into reader");
  }

  payOrder() {
    console.log('paying order...')
    let { selectedOrder } = this.state
    if (selectedOrder) {
      this.props.updateOrderMutation({
        variables: { id: selectedOrder.id },
        refetchQueries: [{ query }]
      })
      .then(data => {
        if (data.data.updateOrderPaidStatus.paid) {
          this.setState({ selectedOrder: null })
        }
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    let { unpaidOrdersQuery } = this.props;
    console.log(this.state.selectedOrder);
    let total;
    if (this.state.selectedOrder) {
      total = this.state.selectedOrder.lineItems.reduce((counter, item) => {
        return counter + item.purchasePrice;
      }, 0);
    } else {
      total = 0;
    }
    return (
      <div>
        <Row>
          <Col span={6}>
            <List
              loading={false}
              itemLayout="horizontal"
              dataSource={unpaidOrdersQuery.ordersUnpaid || []}
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
          <Col span={7}>
            {this.state.selectedOrder ? (
              <OrderCreateOverview
                cart={this.state.selectedOrder.lineItems.map(
                  item =>
                    new CartItemModel(
                      item.product.id,
                      item.product.name,
                      item.purchasePrice,
                      item.qty,
                      item.instructions
                    )
                )}
                customer={this.state.selectedOrder.customer}
              />
            ) : (
              <div>no data</div>
            )}
          </Col>
          <Col span={11}>
          <PayTerminal payOrder={this.payOrder} total={total} />
          </Col>
        </Row>
      </div>
    );
  }
}
const updateOrderPaidStatusMutation = gql`
  mutation updateOrderPaidStatus($id: String!) {
    updateOrderPaidStatus(id: $id) {
      id
      paid
    }
  }
`;
const query = gql`
  {
    ordersUnpaid {
      id
      paid
      prepared
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
export default compose(
  graphql<any, any>(query, { name: "unpaidOrdersQuery" }),
  graphql<any, any>(updateOrderPaidStatusMutation, {
    name: "updateOrderMutation"
  })
)(OrderPay);