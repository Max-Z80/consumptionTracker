import React from "react";
import Chart from "./Chart";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormCard from "./FormCard";
import { useHistory } from "react-router-dom";
import useFetchData from "./hooks/useFetchData";

function ChartAndForm(props) {
  const [data, getData, isFetching, error] = useFetchData();
  const history = useHistory();

  if (error) {
    return (
      <h1 style={{ color: "red" }}>An error occured while getting the data</h1>
    );
  }

  if (!data && !isFetching) {
    getData();
  }

  return (
    <Container fluid>
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

export default ChartAndForm;
