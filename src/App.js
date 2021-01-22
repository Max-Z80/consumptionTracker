import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import Header from "./Header";
import ChartAndForm from "./ChartAndForm";

function App() {
  return (
    <Router history={history}>
      <Header />
      <Route render={(props) => <ChartAndForm {...props} />}></Route>
    </Router>
  );
}

export default App;
