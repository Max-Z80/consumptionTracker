import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Header() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center", padding: 20 }}>
            Water consumption
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
