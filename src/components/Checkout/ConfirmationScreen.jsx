import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";

const ConfirmationScreen = ({ customerData }) => {
  return (
    <Card className="checkout-box">
      <Card.Header as="h5">Order Completed!</Card.Header>
      <Card.Body>
        <Card.Title>
          {" "}
          Thank you for your purchase, {customerData.firstName}&nbsp;
          {customerData.secondName}!
        </Card.Title>
        <Card.Text>
          Your order will be delivered at {customerData.address},{" "}
          {customerData.city} soon.
        </Card.Text>
        <Link to="/">
          <Button className="shadow-none" variant="transparent">
            <HouseFill size="3em" />
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ConfirmationScreen;
