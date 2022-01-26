import React from "react";
import { Container, Row } from "react-bootstrap";
import Products from "./Products";
import "../../styles.css";

const Categories = ({ products, onAddToCart }) => {
  console.log(products);
  if (products.length === 0)
    return (
      <div class="spinner d-flex justify-content-center">
        <div class="spinner-border mt-5 white" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );

  let distinctProducts = new Set();
  products.map((product) => {
    distinctProducts.add(product.sku);
  });

  const arr = [];
  distinctProducts.forEach((el) => arr.push(el));
  arr.sort();

  return (
    <>
      {arr.map((el) => (
        <>
          <Container className="">
            <Row className="mt-4 mb-3">
              <h1 className="white">{el}</h1>
            </Row>
            <Products
              products={products}
              category={el}
              onAddToCart={onAddToCart}
            />
          </Container>
        </>
      ))}
    </>
  );
};

export default Categories;
