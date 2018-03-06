import * as React from "react";
import { Card, Button, Input } from "antd";
import CartItem from "../models/CartItemModel";
export interface MenuItemProps {
  id: string;
  name: string;
  price: number;
  handleAddToCart: Function;
}

export default class MenuItem extends React.Component<MenuItemProps, any> {
  constructor(props: MenuItemProps) {
    super(props);
    this.state = {
      qty: 1,
      instructions: ""
      // placeholder nocheese, etc
    };
  }
  addToCart(id: string, name: string, price: number, qty: number, instructions: string) {
    this.props.handleAddToCart(new CartItem(id, name, price, qty, instructions));
    this.setState({ qty: 1, instructions: "" });
  }
  render() {
    let { id, name, price } = this.props;
    let { qty, instructions } = this.state;
    return (
      <Card
        title={name}
        extra={<div style={styles.ticker}>{this.state.qty}</div>}
        actions={[
          <Button
            key={1}
            onClick={() => this.setState({ qty: this.state.qty + 1 })}
            type="primary"
            icon="caret-up"
          />,
          <Button
            key={2}
            onClick={() => this.setState({ qty: this.state.qty - 1 })}
            type="danger"
            icon="caret-down"
          />,
          <Button
            key={3}
            onClick={() => this.addToCart(id, name, price, qty, instructions)}
            type="primary"
            icon="plus"
          />
        ]}
      >
        <p>{"ingredients:" + "item.ingredients, dairy meat white flour"}</p>
        <p>instructions:</p>
        <Input
          size="large"
          placeholder="no pickles, no cheese, etc."
          value={this.state.instructions}
          onChange={e => this.setState({ instructions: e.target.value })}
        />
      </Card>
    );
  }
}

const styles = {
  ticker: {
    backgroundColor: "aliceblue",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    border: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5
  }
};
