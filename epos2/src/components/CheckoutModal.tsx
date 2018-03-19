import * as React from "react";
import { Modal, Alert, Button } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import CustomersList from "./CustomersList";
import OrderCreateOverview from "./OrderCreateOverview";
import CartItemModel from "../models/CartItemModel";
import LineItemModel from "../models/LineItemModel";

export interface CheckoutModalProps {}

class CheckoutModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedCustomer: null,
      createdOrder: false,
      createError: false,
      loading: false
    };
    this.selectCustomer = this.selectCustomer.bind(this);
  }

  selectCustomer(customer: any) {
    this.setState({ selectedCustomer: customer });
  }
  createOrder() {
    console.log("creating order from modal instead");
    this.setState({ loading: true });
    // call graphql mutation here.
    this.props
      .mutate({
        variables: {
          customerId: this.state.selectedCustomer.id,
          lineItems: this.formatLineItems(this.props.cart)
        }
      })
      .then(res => {
        this.props.resetCart()
        this.setState({ createdOrder: res.data.createOrder, loading: false })
      })
      .catch(err => console.log(err));
  }
  formatLineItems(cart: CartItemModel[]) {
    return cart.map(
      item =>
        new LineItemModel(item.id, item.price, item.qty, item.instructions)
    );
  }

  render() {
    let { toggleSelf, cart, showing, navigateToPayOrder } = this.props;
    let message;
    let placeOrder;
    if (this.state.selectedCustomer) {
      placeOrder = (
        <div>
          <Alert message="place your order" type="info" />
          <Button
            type="primary"
            loading={this.state.loading}
            onClick={() => this.createOrder()}
          >
            Place Order
          </Button>
        </div>
      );
    }
    if (!this.state.createdOrder && this.state.createError) {
      console.log("you have an err assign err message to msg");
      message = <Alert message="place your order" type="info" />;
    } else if (this.state.createdOrder && !this.state.createError) {
      console.log("you created the order, close or go to payments");
      message = (
        <div>
          <Alert message="place your order" type="info" />
          <Button type="primary" onClick={() => toggleSelf()}>
            Close
          </Button>
          <Button
            type="primary"
            onClick={() => navigateToPayOrder(this.state.createdOrder.id)}
          >
            Go To Pay
          </Button>
        </div>
      );
    }
    return (
      <Modal
        title="Basic Modal"
        visible={showing}
        // onOk={this.handleOk}
        onCancel={() => toggleSelf()}
        footer={null}
      >
        <CustomersList selectCustomer={this.selectCustomer} />
        <br />
        <OrderCreateOverview
          cart={cart}
          customer={this.state.selectedCustomer}
        />
        <br />
        {/* cancel or confirm/create */}
        {placeOrder}
        {message}
      </Modal>
    );
  }
}

const createOrderMutation = gql`
  mutation createOrder($customerId: String!, $lineItems: [LineItemInput!]!) {
    createOrder(customerId: $customerId, lineItems: $lineItems) {
      id
      lineItems {
        product {
          name
        }
      }
      customer {
        first
        last
      }
    }
  }
`;

// might need this for mutation createOrder later
export default graphql<any, any>(createOrderMutation)(CheckoutModal);
