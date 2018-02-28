import * as React from "react";
import { Table } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export interface AppProps {}

class Orders extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      loadMore: false,
      columns: [{}],
      Orders: [{}]
    };
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.data.Orders) {
      let keys = Object.keys(newProps.data.Orders[0]).filter(key => key !== '__typename')
      let cols = keys.map(name => ({ title: name, dataIndex: name, key: name }))
      this.setState({
        columns: cols,
        Orders: newProps.data.Orders
      })
    }
  }

  render() {
    return (
      <Table
        columns={this.state.columns}
        expandedRowRender={() => (
          <p style={{ margin: 0 }}>hello world</p>
        )}
        dataSource={this.state.Orders}
      />
    );
  }
}

const query = gql`
  {
    Orders {
      id
      
    }
  }
`

export default graphql(query)(Orders)
