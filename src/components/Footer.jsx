import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Github, Facebook, Instagram, Linkedin } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <Container className="footer">
      <Row className="pt-5">
        <h4 style={{ textAlign: "center" }}>
          Personal project built by Dobre Alexandru using the React.js library
          and designed using Bootstrap 5
        </h4>
      </Row>
      <Row className="pt-2">
        <h6 style={{ textAlign: "center" }}>
          You can contact me using any of the following links
        </h6>
      </Row>
      <Row className="pt-2 pb-5">
        <Col xs={3} style={{ textAlign: "center" }}>
          <a target="_blank" href="https://github.com/DobreAlexandru">
            <Github size="4em" color="#cf3c68" />
          </a>
        </Col>
        <Col xs={3} style={{ textAlign: "center" }}>
          <a target="_blank" href="https://www.facebook.com/IAmDibber/">
            <Facebook size="4em" color="#4686cf" />
          </a>
        </Col>
        <Col xs={3} style={{ textAlign: "center" }}>
          <a target="_blank" href="https://www.instagram.com/iamdibber/">
            <Instagram size="4em" color="#cf3c68" />
          </a>
        </Col>

        <Col xs={3} style={{ textAlign: "center" }}>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/dobre-alexandru-dib/"
          >
            <Linkedin size="4em" color="#4686cf" />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
