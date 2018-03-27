import * as React from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Modal, Form, Input, Button, Alert } from "antd";
export interface CustomerFormProps {
  visible: boolean;
  customer: any;
  toggleCustomerForm: Function;
  updateCustomer: Function;
  createCustomer: Function;
}
class CustomerForm extends React.Component<CustomerFormProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      first: "",
      last: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      cardNum: "",
      loading: false,
      responseReceived: false,
      created: false,
      updated: false
    };
  }
  componentWillReceiveProps(newProps: any) {
    //   if (newProps.customer.id) {
    //   }
  }
  onUpdate() {
    console.log("updating customer");
  }
  onCreate() {
    console.log("creating new customer");
  }
  submit() {
    console.log("do something with passed in customer...");
    if (this.props.customer.id) {
      // update
      this.setState({ loading: true });
      this.props
        .updateCustomer({
          variables: { ...this.state, customerId: this.props.customer.id }
        })
        .then(customer => {
          this.setState({
            responseReceived: true,
            updated: true,
            loading: false
          });
          this.props.toggleCustomerForm();
        });
    } else {
      this.props
        .createCustomer({
          variables: { ...this.state }
        })
        .then(customer => {
          this.setState({
            responseReceived: true,
            updated: true,
            loading: false
          });
          this.props.toggleCustomerForm();
        });
    }
  }
  _renderResponseMessage() {
    if (this.state.created) {
      console.log("render created message");
      return <Alert message="created!" type="success" />;
    } else if (this.state.updated) {
      return <Alert message="updated!" type="success" />;
    } else if (
      this.state.responseReceived &&
      !this.state.created &&
      !this.state.updated
    ) {
      return <Alert message="Error" type="error" />;
    } else {
      return null;
    }
  }
  handleCancel() {
    this.props.toggleCustomerForm();
  }
  handleOk() {
    if (this.state.selectedCustomerForEdit.id) {
      console.log("do an update");
    } else {
      console.log("do a create");
    }
  }
  render() {
    return (
      <Modal
        destroyOnClose={true}
        visible={this.props.visible}
        onCancel={() => this.handleCancel()}
        onOk={() => this.handleOk()}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={this.state.loading}
            onClick={this.submit}
            disabled={
                this.state.responseReceived &&
                (this.state.created || this.state.updated)
              }
          >
            {this.props.customer.id ? "Update" : "Create"}
          </Button>
        ]}
      >
        <div style={styles.container}>
          <Form>
            <Form.Item>
              <Input
                placeholder="first"
                defaultValue={this.props.customer.first}
                onChange={e => this.setState({ first: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="last"
                defaultValue={this.props.customer.last}
                onChange={e => this.setState({ last: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="street"
                defaultValue={this.props.customer.street}
                onChange={e => this.setState({ street: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="city"
                defaultValue={this.props.customer.city}
                onChange={e => this.setState({ city: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="state"
                defaultValue={this.props.customer.state}
                onChange={e => this.setState({ state: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="zip"
                defaultValue={this.props.customer.zip}
                onChange={e => this.setState({ zip: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="cardNum"
                defaultValue={this.props.customer.cardNum}
                onChange={e => this.setState({ cardNum: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              {this._renderResponseMessage()}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
}
const updateCustomer = gql`
  mutation updateCustomer(
    $first: String
    $last: String
    $street: String
    $city: String
    $state: String
    $zip: String
    $cardNum: String
    $customerId: String!
  ) {
    updateCustomer(
      first: $first
      last: $last
      street: $street
      city: $city
      state: $state
      zip: $zip
      cardNum: $cardNum
      customerId: $customerId
    ) {
      id
      name
      ingredients {
        id
        name
      }
    }
  }
`;
const createCustomer = gql`
  mutation createCustomer(
    $first: String
    $last: String
    $street: String
    $city: String
    $state: String
    $zip: String
    $cardNum: String
  ) {
    createCustomer(
      first: $first
      last: $last
      street: $street
      city: $city
      state: $state
      zip: $zip
      cardNum: $cardNum
    ) {
      id
      name
      ingredients {
        id
        name
      }
    }
  }
`;

export default compose(graphql(updateCustomer), graphql(createCustomer))(
  CustomerForm
);

const styles = {
  container: {
    marginTop: 20
  }
} as React.CSSProperties;
