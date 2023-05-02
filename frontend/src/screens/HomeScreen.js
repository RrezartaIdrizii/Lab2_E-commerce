import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <>
      <br></br>
      <h1 style={{ textAlign: "center" }}>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <br></br>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <br></br>
    </>
  );
};

export default HomeScreen;
