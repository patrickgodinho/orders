import React, { Component } from "react";
import styled from "styled-components";
import Orders from "./screens/orders/orders";
import { Provider } from "react-redux";
import store from "./redux/store";

const Main = styled(Orders)`
  background-color: #eeeeee;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
