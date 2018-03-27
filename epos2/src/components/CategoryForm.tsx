import * as React from "react";
import { Form, Input } from "antd";
export interface CategoryFormProps {}

export default class CategoryForm extends React.Component<
  CategoryFormProps,
  any
> {
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
