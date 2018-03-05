import * as React from "react";
import { Layout, List, Button } from "antd";
const { Sider, Content } = Layout;
import gql from "graphql-tag";
import { graphql } from "react-apollo";

// components
import MenuItem from './MenuItem'

// models
import CartItem from "../models/CartItemModel";
export interface AppProps {}

class NewOrder extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      cart: [],
      products: []
    };
    this.handleAddToCart = this.handleAddToCart.bind(this)
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

  handleCartItemDelete(item: CartItem) {
    this.setState({cart: this.state.cart.filter(cartItem => cartItem.id !== item.id)})
  }

  handleAddToCart(item: CartItem) {
    console.log('adding cart item', item)
    this.setState({
      cart: [...this.state.cart, item]
    })
  }

  handleCheckout() {
    console.log('checking out cart')
  }

  render() {
    return (
      <Layout>
        <Layout>
          <Content style={{ marginRight: 5, marginLeft: 5, marginTop: 5 }}>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={this.state.products}
              renderItem={item => (
                <List.Item>
                  <MenuItem id={item.id} name={item.name} handleAddToCart={this.handleAddToCart}/>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
        <Sider style={{ height: "100%", borderWidth: 1 }}>
          <List
            dataSource={this.state.cart}
            renderItem={item => (
              <List.Item
                key={item}
                style={styles.cartItem}
                actions={[
                  <Button
                    onClick={() => this.handleCartItemDelete(item)}
                    key={1}
                    type="danger"
                    icon="delete"
                  />
                ]}
              >
                <List.Item.Meta title={"prodName"} />
                <div>x3</div>
              </List.Item>
            )}
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
    }
  }
`;

export default graphql(query)(NewOrder);

const styles = {
  cartItem: {
    backgroundColor: "white",
    paddingRight: 5,
    paddingLeft: 5
  }
};
