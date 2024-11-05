import React, { useState } from "react";
import { Form, Button, Row, FormGroup, FormLabel } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const ContactScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    const contactData = {
      name: name, 
      email: email,
      message: text, 
    };

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Error submitting form'); 
      }

      
      setName('');
      setEmail('');
      setText('');
      setSuccessMessage('Your contact form submitted successfully!');
      setError(''); 
    } catch (error) {
      console.error('Error submitting form:', error.message); 
      setError(error.message); 
      setSuccessMessage(''); 
    }
  };

  return (
    <FormContainer>
      <h1>Contact Us</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup controlId="text">
          <FormLabel>Message</FormLabel>
          <Form.Control
            as="textarea"
            placeholder="Enter Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormGroup>
        <br />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      <Row className="py-3"></Row>
    </FormContainer>
  );
};

export default ContactScreen;
