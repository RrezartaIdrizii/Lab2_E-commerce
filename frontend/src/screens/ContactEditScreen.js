import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getContactDetails, updateContact } from "../actions/contactActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const ContactEditScreen = () => {
  const { id: contactId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // Access Redux state
  const contactDetails = useSelector((state) => state.contactDetails);
  const { loading: loadingDetails, error, contact } = contactDetails;

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const {
    loading: updatingLoading,
    error: updateError,
    success: updateSuccess,
  } = contactUpdate;

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fetch contact details
  useEffect(() => {
    if (contactId) {
      dispatch(getContactDetails(contactId));
    }
  }, [dispatch, contactId]);

  // Set initial form values from contact details
  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setEmail(contact.email || "");
      setMessage(contact.message || "");
    }
  }, [contact]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateContact({ id: contactId, name, email, message }));
  };

  // Redirect on successful update
  useEffect(() => {
    if (updateSuccess) {
      history.push("/admin/contactlist");
    }
  }, [updateSuccess, history]);

  return (
    <>
      <Link to="/admin/contactlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Contact</h1>
        {updatingLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              disabled={updatingLoading} // Disable button while updating
            >
              {updatingLoading ? "Updating..." : "Update"}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ContactEditScreen;
