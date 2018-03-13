import * as React from "react";
import { Row, Col, Icon, Button } from "antd";
export interface AppProps {}

export default class App extends React.Component<any, any> {
  render() {
    let { total, payOrder } = this.props;
    return (
      <Row>
        <Col span={16} offset={4}>
          <Row>
            <Col span={24} style={styles.title}>
              <h3>Amount Tendered</h3>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={styles.total}>
              <div style={styles.totalDiv}>
                <Icon style={styles.numPadBtn} type="appstore-o" />
                <div style={styles.totalText}>{`${total / 100}`}</div>
              </div>
            </Col>
          </Row>
          <Row style={styles.btnContainer}>
            <Button type="primary" style={styles.buttons} onClick={payOrder}>
              Cash
            </Button>
            <Button type="primary" style={styles.buttons} onClick={payOrder}>
              Card
            </Button>
            {/* cash */}
            {/* card */}
          </Row>
        </Col>
      </Row>
    );
  }
}

const styles = {
  title: {
    display: "flex",
    color: "azure",
    justifyContent: "center",
    alignItems: "center"
  },
  total: {
    backgroundColor: "white"
  },
  totalDiv: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white"
  },
  numPadBtn: {
    fontSize: 36,
    marginRight: 20
  },
  totalText: {
    fontSize: 64,
    marginRight: 150
  },
  buttons: {
    height: "80%",
    width: "50%",
    margin: 10
  },
  btnContainer: {
    height: 100,
    display: "flex",
    flexDirection: "row"
  }
} as React.CSSProperties;
