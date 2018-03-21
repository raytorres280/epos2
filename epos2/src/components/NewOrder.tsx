import * as React from "react";
import { Layout, List } from "antd";
const { Sider, Content } = Layout;
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

// components
import MenuItem from "./MenuItem";
import Cart from "./Cart";
// import CustomersModal from "./CustomersModal";
// import OrderCreateOverview from "./OrderCreateOverview";
import CheckoutModal from "./CheckoutModal";
// models
import CartItem from "../models/CartItemModel";

class NewOrder extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      cart: [],
      products: [],
      customersVisible: false,
      overviewVisible: false,
      checkoutVisible: false,
      customerId: "" // selected customer to place order, later default to guest?
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleCartItemDelete = this.handleCartItemDelete.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.toggleCustomersModal = this.toggleCustomersModal.bind(this);
    this.toggleOverviewModal = this.toggleOverviewModal.bind(this);
    this.toggleCheckoutModal = this.toggleCheckoutModal.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.navigateToPayOrder = this.navigateToPayOrder.bind(this);
    this.resetCart = this.resetCart.bind(this);
  }
  componentWillUnmount() {
    console.log('new order unmounting')
  }
  handleCartItemDelete(id: string) {
    this.setState({
      cart: this.state.cart.filter(cartItem => cartItem.id !== id)
    });
  }

  handleAddToCart(item: CartItem) {
    console.log("adding cart item", item);
    this.setState({
      cart: [...this.state.cart, item]
    });
  }

  handleCheckout() {
    console.log("checking out cart");
    // show customers
  }

  createOrder() {
    console.log("completing order, create row");
    // complete order after selecting customer
  }

  selectCustomer(id: string) {
    this.setState({ customerId: id });
    this.toggleCustomersModal();
    this.toggleOverviewModal();
  }

  toggleCustomersModal() {
    this.setState({ customersVisible: !this.state.customersVisible });
  }

  toggleOverviewModal() {
    console.log("final overview before checkout");
    this.setState({ overviewVisible: !this.state.overviewVisible });
  }

  toggleCheckoutModal() {
    console.log("toggling checkout modal");
    // do hook or query here to determine if there are enough
    // ingredients in inventory...
    this.setState({ checkoutVisible: !this.state.checkoutVisible });
  }

  navigateToPayOrder(orderId: string) {
    console.log("going to payment screen with order...", orderId);
    this.props.history.push(`payments/${orderId}`)
  }

  resetCart() {
    this.setState({ cart: [] })
  }
  render() {
    let { cart, checkoutVisible } = this.state;
    return (
      <Layout>
        <Content style={{ marginRight: 5, marginLeft: 5, marginTop: 5 }}>
          {/* <CustomersModal
            toggleSelf={this.toggleCustomersModal}
            selectCustomer={this.selectCustomer}
            showing={customersVisible}
          />
          <OrderCreateOverview
            showing={this.state.overviewVisible}
            cart={cart}
            customerId={customerId}
            toggleSelf={this.toggleOverviewModal}
            createOrder={this.createOrder}
          /> */}
          {/* checkout modal here */}
          <CheckoutModal
            navigateToPayOrder={this.navigateToPayOrder}
            toggleSelf={this.toggleCheckoutModal}
            cart={cart}
            resetCart={this.resetCart}
            showing={checkoutVisible}
          />
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={this.props.data.products || []}
            renderItem={item => (
              <List.Item>
                <MenuItem
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  handleAddToCart={this.handleAddToCart}
                />
              </List.Item>
            )}
          />
        </Content>
        <Sider style={styles.cart}>
          <Cart
            list={cart}
            removeItem={this.handleCartItemDelete}
            checkout={this.toggleCheckoutModal}
          />
        </Sider>
      </Layout>
    );
  }
}
const query = gql`
  query {
    products {
      id
      name
      price
      ingredients {
        id
        name
        qty
      }
    }
  }
`;

export default graphql(query)(withRouter(NewOrder));

const styles = {
  cart: {
    height: "100%",
    maxWidth: "400",
    width: "400",
    maxHeight: "100%",
    borderWidth: 1,
    borderLeftStyle: "solid",
    backgroundColor: "#F0F2F5"
  }
};
