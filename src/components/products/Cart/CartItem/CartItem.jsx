import React from "react";
import {
  Container,
  ListGroup,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import "../../../../styles.css";
import { BagDashFill, BagPlusFill, BagXFill } from "react-bootstrap-icons";

const CartItem = ({ item, updateCart, removeFromCart }) => {
  return (
    <ListGroup.Item as="li" className="cart-item d-flex mt-5">
      <Container fluid>
        <Row>
          <Col xs={6} lg={4}>
            <img
              className="cart-item-image"
              variant="top"
              src={item.image.url}
            />
          </Col>
          <Col xs={6}>
            <h2>{item.name}</h2>
            <h4>€{item.line_total.formatted}</h4>
          </Col>
          <Col xs={7}></Col>
          <Col xs={4}>
            <ButtonGroup className="cart-item-btn-grp">
              <Button
                className="cart-item-button shadow-none"
                variant="transparent"
                onClick={() => updateCart(item.id, item.quantity - 1)}
              >
                <BagDashFill size="2em" />
              </Button>
              <h2 style={{ marginBottom: "0", alignSelf: "center" }}>
                {item.quantity}{" "}
              </h2>
              <Button
                className="cart-item-button shadow-none"
                variant="transparent"
                onClick={() => updateCart(item.id, item.quantity + 1)}
              >
                <BagPlusFill size="2em" />
              </Button>
              <Button
                className="cart-btn cart-item-button shadow-none"
                variant="transparent"
                onClick={() => removeFromCart(item.id)}
              >
                <BagXFill size="2em" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
};

export default CartItem;
