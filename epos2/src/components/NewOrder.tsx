import * as React from "react";
import { Layout, List } from "antd";
const { Sider, Content } = Layout;
import gql from "graphql-tag";
import { graphql } from "react-apollo";

// components
import MenuItem from "./MenuItem";
import CustomersModal from './CustomersModal'
import Cart from './Cart'
// models
import CartItem from "../models/CartItemModel";
export interface AppProps {}

class NewOrder extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      cart: [],
      products: [],
      customersVisible: false,
      customerId: '' // selected customer to place order, later default to guest?
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleCartItemDelete = this.handleCartItemDelete.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.createOrder = this.createOrder.bind(this)
    this.selectCustomer = this.selectCustomer.bind(this)
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.data.products !== this.props.data.products) {
      let keys = Object.keys(newProps.data.products[0]).filter(
        key => key !== "__typename"
      );
      let cols = keys.map(name => ({
        title: name,
        dataIndex: name,
        key: name
      }));
      this.setState({
        columns: cols,
        products: newProps.data.products
      });
    }
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
    console.log('completing order, create row')
    // complete order after selecting customer
  }

  selectCustomer(id: string) {
    this.setState({ customerId: id })
  }

  render() {
    let { cart, customersVisible } = this.state
    return (
      <Layout>
        <Content style={{ marginRight: 5, marginLeft: 5, marginTop: 5 }}>
          <CustomersModal selectCustomer={this.selectCustomer} showing={customersVisible} />
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={this.state.products}
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
          <Cart list={cart} removeItem={this.handleCartItemDelete} checkout={this.handleCheckout} />
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
    }
  }
`;

export default graphql(query)(NewOrder);

const styles = {
  cart: {
    height: '100%',
    maxWidth: '400',
    width: '400',
    maxHeight: '100%',
    borderWidth: 1,
    borderLeftStyle: 'solid',
    backgroundColor: "#F0F2F5"
  },
  cartItem: {
    backgroundColor: "white",
    paddingRight: 5,
    paddingLeft: 5
  }
};
