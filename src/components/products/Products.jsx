import React from "react";
import Product from "./Product/Product";
import Carousel from "react-multi-carousel";
import { Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import "../../styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Products = ({ products, category, onAddToCart }) => {
  const CustomDot = ({ onClick, ...rest }) => {
    const {
      onMove,
      index,
      active,
      carouselState: { currentSlide, deviceType },
    } = rest;

    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return (
      <button
        className={active ? "active" : "inactive"}
        onClick={() => onClick()}
      >
        {React.Children.toArray(products)[index]}
      </button>
    );
  };

  return (
    <>
      <Carousel responsive={responsive} infinite={true} arrows={false}>
        {products.map((product) => {
          if (product.sku == category) {
            return <Product product={product} onAddToCart={onAddToCart} />;
          }
        })}
      </Carousel>
      <Row className="pt-5"></Row>
    </>
  );
};

export default Products;
