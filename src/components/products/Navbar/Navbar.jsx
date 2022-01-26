import React, { useState } from "react";
import { Navbar, Container, Badge, ListGroup, Col, Row } from "react-bootstrap";
import "../../../styles.css";
import {
  BasketFill,
  SendFill,
  SendPlusFill,
  SendCheckFill,
} from "react-bootstrap-icons";

const Nav = ({ totalCart, cartItems }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <Navbar bg="light" variant="light" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <SendFill style={{ marginRight: "-15px" }} size="3rem" color="" />
            <SendPlusFill
              style={{ marginRight: "-15px" }}
              size="3rem"
              color="#4686cf"
            />
            <SendCheckFill size="3rem" color="#cf3c68" />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="cart">
                <BasketFill
                  className="nav-btn"
                  size="2em"
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                />
              </a>
            </Navbar.Text>
            <Badge pill className="navbar-pill" bg="dark">
              {totalCart}
            </Badge>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isShown && cartItems && (
        <Container fluid style={{ position: "fixed", zIndex: "10" }}>
          <Row>
            <Col lg={9}></Col>
            <Col lg={2}>
              <ListGroup className="cart-pop-up">
                {cartItems.map((item) => {
                  return (
                    <ListGroup.Item style={{ textAlign: "center" }}>
                      {item.quantity}&nbsp;
                      {item.name}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Nav;
