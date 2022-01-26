import React from "react";
import { Container, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import "../../../styles.css";
import { CartXFill, CartCheckFill, HouseFill } from "react-bootstrap-icons";

const Cart = ({ cart, updateCart, removeFromCart, emptyCart }) => {
  const EmptyCart = () => (
    <Card className="checkout-box">
      <Card.Header as="h5">Uh Oh!</Card.Header>
      <Card.Body>
        <Card.Title>
          You have no items in your cart, start adding some!
        </Card.Title>
        <Card.Text>
          You can come back here after you've added some items inside your cart.{" "}
        </Card.Text>
        <Link to="/">
          <Button className="shadow-none" variant="transparent">
            <HouseFill size="3em" />
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );

  const FilledCart = () => (
    <>
      <span></span>
      {cart.line_items.map((item) => (
        <CartItem
          item={item}
          updateCart={updateCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <Row className="cart-title pb-5">
        <Col xs={2}></Col>
        <Col xs={5}>
          <h1>Subtotal: €{cart.subtotal.formatted}</h1>
        </Col>
        <Col xs={2}>
          <Button
            className="shadow-none"
            variant="transparent"
            onClick={emptyCart}
          >
            <CartXFill size="2em" color="white" />
          </Button>
        </Col>
        <Col xs={2}>
          <Link to="/checkout">
            <Button className="shadow-none" variant="transparent">
              <CartCheckFill size="2em" color="white" />
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );

  if (!cart.line_items)
    return (
      <div class="spinner d-flex justify-content-center">
        <div class="spinner-border mt-5 white" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );

  return (
    <div>
      <Container>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
      </Container>
    </div>
  );
};

export default Cart;
