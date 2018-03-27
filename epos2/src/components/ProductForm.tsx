import * as React from 'react';
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Form, Input } from "antd";
export interface ProductFormProps {
}

class ProductForm extends React.Component<ProductFormProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: [null]
        }
    }
    onUpdate() {
        console.log('updating Product');
    }
    onCreate() {
        console.log('creating new Product with ingredients...')
    }
    onAddIngredient() {
        console.log('adding ingredient to existing product...')
    }
  render() {
    return (
        <Form>
        <Form.Item>
          <Input placeholder="first" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="last" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="street" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="city" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="state" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="zip" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="cardNum" />
        </Form.Item>
      </Form>
    );
  }
}

const addIngredientToProduct = gql`
mutation addIngredientToProduct($ingredientId: String!, $productId: String!) {
    addIngredientToProduct(ingredientId: $ingredientId, productId: $productId) {
        id
        name
        ingredients{
            id
            name
        }
    }
}
`
const createProduct = gql`
mutation createProduct($ingredientId: String!, $productId: String!) {
    createProduct(ingredientId: $ingredientId, productId: $productId) {
        id
        name
        ingredients{
            id
            name
        }
    }
}
`

const updateProduct = gql`
mutation updateProduct($ingredientId: String!, $productId: String!) {
    updateProduct(ingredientId: $ingredientId, productId: $productId) {
        id
        name
        ingredients{
            id
            name
        }
    }
}
`

export default compose(
    graphql(addIngredientToProduct),
    graphql(createProduct),
    graphql(updateProduct)
)(ProductForm)