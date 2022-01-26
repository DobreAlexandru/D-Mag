import React from "react";
import { ListGroup, Col, Row } from "react-bootstrap";

const Review = ({ checkoutToken, back }) => {
  return (
    <>
      <h1 className="pt-3">Order summary</h1>
      <ListGroup>
        {checkoutToken.live.line_items.map((product) => (
          <ListGroup.Item>
            <Row>
              <Col xs={4} style={{ textAlign: "left" }}>
                <h5>{product.name}</h5>
              </Col>
              <Col xs={4} style={{ textAlign: "center" }}>
                <h6>{`Quantity: ${product.quantity}`}</h6>
              </Col>
              <Col xs={4} style={{ textAlign: "right" }}>
                <h4>€{product.line_total.formatted}</h4>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <h5 style={{ textAlign: "right" }}>
            Total: €{checkoutToken.live.subtotal.formatted}
          </h5>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Review;
