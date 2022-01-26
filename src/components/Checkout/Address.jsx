import React, { useState, useEffect } from "react";
import { Form, Container, Col, Row, Button } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "./InputForm";
import { commerce } from "../../lib/Commerce";

const Address = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  return (
    <Container fluid className="checkout-box">
      <h1>Shipping Details</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            next({ ...data }, shippingCountry, shippingSubdivision);
            console.log(data);
          })}
        >
          <Row>
            <Col sm={6}>
              <InputForm type="text" placeholder="First Name" required />
            </Col>
            <Col sm={6}>
              <InputForm type="text" placeholder="Second Name" />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <InputForm type="email" placeholder="email@example.com" />
            </Col>
            <Col sm={6}>
              <InputForm type="text" placeholder="Address" />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <InputForm type="text" placeholder="City" />
            </Col>
            <Col sm={6}>
              <InputForm type="text" placeholder="Postal Code" />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                <option>Shipping Country</option>
                {countries.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={6}>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                <option>Shipping Region</option>
                {subdivisions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </form>
      </FormProvider>
    </Container>
  );
};

export default Address;
