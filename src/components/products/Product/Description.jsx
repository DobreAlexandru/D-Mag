import React, { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="description-modal"
      centered
    >
      <Modal.Header style={{ textAlign: "center" }} closeButton>
        <Modal.Title
          style={{ textAlign: "center" }}
          id="contained-modal-title-vcenter"
        >
          {props.product.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            height: "250px",
            width: "250px",
            marginBottom: "20px",
          }}
          src={props.product.image.url}
        />
        <div
          dangerouslySetInnerHTML={{ __html: `${props.product.description}` }}
        />
      </Modal.Body>
    </Modal>
  );
}

const Description = ({ product }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        className="shadow-none"
        variant="transparent"
        onClick={() => setModalShow(true)}
      >
        <ThreeDots size="2em" />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </>
  );
};

export default Description;
