import React from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import FormController from "./FormController";
import { DataType, IField, IForm } from "../types/Form";

interface CreateFormModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateFormModal: React.FC<CreateFormModalProps> = ({ open, onClose }) => {
  return (
    <>
      <Modal show={open} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{"Create New Form"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <FormController onSubmit={() => onClose()} />
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CreateFormModal;
