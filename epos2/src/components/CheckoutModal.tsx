import * as React from "react";
import { Modal } from "antd";

import CustomersList from "./CustomersList";
import OrderCreateOverview from "./OrderCreateOverview";

export interface CheckoutModalProps {}

export default class CheckoutModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedCustomer: null
    };
    this.selectCustomer = this.selectCustomer.bind(this);
  }

  selectCustomer(customer: any) {
    this.setState({ selectedCustomer: customer });
  }
  createOrder() {
    console.log("creating order from modal instead");
  }

  render() {
    let { toggleSelf, cart, showing } = this.props;
    return (
      <Modal
        title="Basic Modal"
        visible={showing}
        // onOk={this.handleOk}
        onCancel={() => toggleSelf()}
      >
        <CustomersList selectCustomer={this.selectCustomer} />
        <br/>
        <OrderCreateOverview
          cart={cart}
          customer={this.state.selectedCustomer}
        />
        <br/>
        {/* cancel or confirm/create */}
      </Modal>
    );
  }
}

// might need this for mutation createOrder later
// export default graphql<any, any>(query)(CheckoutModal);
