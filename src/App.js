import React, { useState } from "react";
import Chart from "./Chart";
import api from "./api";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormCard from "./FormCard";
import { Router, Route, useHistory } from "react-router-dom";
import history from "./history";

function App() {
  return (
    <Router history={history}>
      <Route render={props => <ChartAndForm {...props} />}></Route>
    </Router>
  );
}

function ChartAndForm(props) {
  const [data, getData, isFetching, error] = useFetchData();
  const history = useHistory();

  if (!data && !isFetching) {
    getData();
  }

  if (error) {
    return (
      <h1 style={{ color: "red" }}>An error occured while getting the data</h1>
    );
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center", padding: 20 }}>
            Water consumption
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={{ offset: 1, span: 10 }} md={{ offset: 1, span: 7 }}>
          <Chart data={data} />
        </Col>
        <Col xs={{ offset: 1, span: 10 }} md={{ offset: 0, span: 3 }}>
          <Button variant="primary" block onClick={() => history.push("/add")}>
            Add
          </Button>
          <div style={{ marginTop: 20 }}>
            <FormCard
              onSubmitted={() => {
                history.push("/");
                getData();
              }}
              onCloseButtonClicked={() => history.push("/")}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function useFetchData() {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getData = () => {
    setIsFetching(true);
    api
      .get()
      .then(response => {
        setData(response.data);
        setIsFetching(false);
      })
      .catch(e => {
        setIsFetching(false);
        setError("error in getting data");
      });
  };

  if (isFetching) {
  }

  return [data, getData, isFetching, error];
}

export default App;
