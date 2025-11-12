import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmModal({ show, onHide, onConfirm, message }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message || "¿Estás seguro de que quieres eliminar de favoritos?"}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
