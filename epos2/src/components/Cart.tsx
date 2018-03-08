import * as React from "react";
import { Button, List, Layout } from "antd";
// export interface CartProps {}

export default props => {
  let { list, removeItem } = props;
  return (
    <Layout>
      <Button onClick={() => props.checkout()}>
        Checkout
      </Button>
      <div style={{ flex: 1, justifyContent: "space-between" }}>
        <h3>Subtotal: {list.reduce((sum, item) => sum + (item.qty * item.price), 0)}</h3>
      </div>

      <List
        dataSource={list}
        renderItem={item => (
          <List.Item
            key={item}
            style={styles.cartItem}
            actions={[
              <Button
                onClick={() => removeItem(item.id)}
                key={1}
                type="danger"
                icon="delete"
              />
            ]}
          >
            <List.Item.Meta title={item.name} description={item.instructions} />
            <div>x{item.qty}</div>
          </List.Item>
        )}
      />
    </Layout>
  );
};

const styles = {
  cart: {
    height: "100%",
    maxWidth: "400",
    width: "400",
    maxHeight: "100%",
    borderWidth: 1,
    borderLeftStyle: "solid",
    backgroundColor: "#F0F2F5"
  },
  cartItem: {
    backgroundColor: "white",
    paddingRight: 5,
    paddingLeft: 5
  }
};
