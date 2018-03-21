import * as React from 'react';
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
export interface CustomerFormProps {
    
}

class CustomerForm extends React.Component<CustomerFormProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: [null]
        }
    }
    onUpdate() {
        console.log('updating customer');
    }
    onCreate() {
        console.log('creating new customer')
    }
  render() {
    return (
      <div>
          Customer Form
      </div>
    );
  }
}
const updateCustomer = gql`
mutation updateCustomer($ingredientId: String!, $productId: String!) {
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
const createCustomer = gql`
mutation createCustomer($ingredientId: String!, $productId: String!) {
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

export default compose(
    graphql(updateCustomer),
    graphql(createCustomer)
)(CustomerForm);