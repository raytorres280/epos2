import * as React from "react";
import { Card, Button } from "antd";
import CartItem from "../models/CartItemModel";
export interface MenuItemProps {
  id: string;
  name: string;
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

  render() {
    let { id, name, handleAddToCart } = this.props;
    let { qty, instructions } = this.state;
    return (
      <Card
        title={name}
        extra={[
          <Button
            key={1}
            onClick={() =>
              handleAddToCart(new CartItem(id, name, qty, instructions))
            }
            type="primary"
            icon="plus"
          />,
          <div key={2} style={styles.ticker}>
            {this.state.qty}
          </div>
        ]}
      >
        <p>{"item.ingredients, dairy meat white flour"}</p>
      </Card>
    );
  }
}

const styles = {
  ticker: {
    backgroundColor: "blue"
  }
};
