import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, FormGroup, FormLabel } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const ContactScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const submitHandler = () => {
    if (name.length === 0) {
      alert("Name has left Blank!");
    } else if (email.length === 0) {
      alert("Email has left Blank!");
    } else if (text.length === 0) {
      alert("Text has left Blank!");
    } else {
      let fData = new FormData();
      fData.append("name", name);
      fData.append("email", email);
      fData.append("text", text);
      axios
        .post("/api/contact", fData)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
    }
  };

  return (
    <FormContainer>
      <h1>Contact Us</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <br></br>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <br></br>
        <FormGroup controlId="text">
          <FormLabel>Text</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <br></br>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      <Row className="py-3"></Row>
    </FormContainer>
  );
};

export default ContactScreen;
