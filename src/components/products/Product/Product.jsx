import React from "react";
import { Card, Button } from "react-bootstrap";
import Description from "./Description";
import "../../../styles.css";
import { CartPlusFill } from "react-bootstrap-icons";

const Product = ({ product, onAddToCart }) => {
  return (
    <Card className="item-card m-2">
      <Card.Img className="item-image " variant="top" src={product.image.url} />
      <Card.Body>
        <h4 className="item-card-text">{product.name}</h4>
        <h6 className="item-card-text">€{product.price.formatted}</h6>
        <Description product={product} />
        <Button
          className="item-card-cart-btn shadow-none "
          variant="transparent"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <CartPlusFill className="item-btn" size="2em" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
