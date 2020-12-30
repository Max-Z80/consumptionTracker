import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import moment from "moment";
import api from "./api";

function FormCard(props) {
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [m3, setm3] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const { onSubmitted, onCloseButtonClicked } = props;

  const pathname = history.location.pathname;
  if (pathname !== "/add" && pathname !== "/edit") {
    return null;
  }

  if (pathname === "/edit") {
    const queryParameters = new URLSearchParams(history.location.search);
    const qpDate = queryParameters.get("date");
    const qpM3 = queryParameters.get("m3");
    qpDate !== date && setDate(qpDate);
    qpM3 !== m3 && setm3(qpM3);
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Card id="formCard">
      <Card.Header style={{ textAlign: "center", padding: 2 }}>
        {pathname === "/edit" ? "Edit" : "Add"}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSendButtonClicked}>
          <Form.Group controlId="dateFormGroup">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={onInputChanged}
              name="date"
              size="sm"
            />
          </Form.Group>
          <Form.Group controlId="m3FormGroup">
            <Form.Label>
              m<sup>3</sup>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="1234.1"
              value={m3}
              onChange={onInputChanged}
              name="m3"
              size="sm"
            />
          </Form.Group>
          <Button type="submit" size="sm">
            Send
          </Button>
          &nbsp;
          <Button size="sm" onClick={onCloseButtonClicked}>
            Close
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );

  function onInputChanged(e) {
    const target = e.target;
    target.name === "m3" && setm3(target.value);
    target.name === "date" && setDate(target.value);
  }

  function onSendButtonClicked(e) {
    debugger;
    let encodedData = new URLSearchParams();
    encodedData.append("date", date);
    encodedData.append("m3", m3);
    api
      .add(encodedData.toString())
      .then(() => {
        onSubmitted();
      })
      .catch(() => {
        setError("The data could not be sent to the server");
      });
    e.preventDefault();
  }
}

export default FormCard;
