import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { commerce } from "../../lib/Commerce";
import { ArrowRightCircleFill } from "react-bootstrap-icons";

function Shipping({ checkoutToken, next, setCustomerData }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else next();

    console.log(event);

    const data = {
      firstName: event.target.firstName.value,
      secondName: event.target.secondName.value,
      email: event.target.email.value,
      address: event.target.address.value,
      city: event.target.city.value,
      postalCode: event.target.postalCode.value,
      country: event.target.country.value,
      region: event.target.region.value,
      option: event.target.option.value,
    };
    setCustomerData(data);

    setValidated(true);
  };

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

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

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <Container fluid className="checkout-box">
      <h1>Shipping Details</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} sm="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              className="shadow-none"
              required
              type="text"
              name="firstName"
              placeholder="First name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              className="shadow-none"
              required
              type="text"
              name="secondName"
              placeholder="Last Name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} sm="6" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="shadow-none"
              required
              type="email"
              name="email"
              placeholder="Email"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm="6" controlId="validationCustom04">
            <Form.Label>Address</Form.Label>
            <Form.Control
              className="shadow-none"
              required
              type="text"
              name="address"
              placeholder="Address"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} sm="6" controlId="validationCustom05">
            <Form.Label>City</Form.Label>
            <Form.Control
              className="shadow-none"
              required
              type="text"
              name="city"
              placeholder="City"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm="6" controlId="validationCustom06">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              className="shadow-none"
              required
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Label>Shipping Country</Form.Label>
            <Form.Select
              className="shadow-none"
              required
              name="country"
              aria-label="Default select example"
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              <option disabled>Shipping Country</option>
              {countries.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col sm={6}>
            <Form.Label>Shipping Region</Form.Label>
            <Form.Select
              className="shadow-none"
              required
              name="region"
              aria-label="Default select example"
              onChange={(e) => setShippingSubdivision(e.target.value)}
            >
              <option disabled>Shipping Region</option>
              {subdivisions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="pb-3">
          <Col sm={6} className="pt-3">
            <Form.Label>Shipping Option</Form.Label>
            <Form.Select
              className="shadow-none"
              required
              name="option"
              aria-label="Default select example"
              onChange={(e) => setShippingOption(e.target.value)}
              placeholder="Shipping Option"
            >
              <option disabled>Shipping Option</option>
              {shippingOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.description}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col sm={6} className="pt-4 ">
            <Button
              variant="transparent"
              className="mt-3 checkout-next-btn shadow-none"
              type="submit"
            >
              <ArrowRightCircleFill size="3em" />
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default Shipping;
