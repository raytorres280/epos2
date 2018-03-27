import * as React from 'react';
import { Form, Input } from "antd";
export interface IngredientFormProps {
}

export default class IngredientForm extends React.Component<IngredientFormProps, any> {
  constructor(props: any) {
      super(props);
      this.state = {
          name: props.ingredient.name || "",
          category: props.ingredient.category || "",
      }
  }
    render() {
    return (
        <Form>
        <Form.Item>
          <Input placeholder="name" value={this.state.name} />
        </Form.Item>
        <Form.Item>
          <Input placeholder="category" value={this.state.category} />
        </Form.Item>
      </Form>
    );
  }
}
