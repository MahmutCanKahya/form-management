import React from "react";
import FormFields from "./FormFields";
import { Button, Container, Form } from "react-bootstrap";
import { IForm } from "../types/Form";
import { useAppDispatch, useAppSelector } from "../store";

interface FormControllerProps {
  onSubmit: () => void;
}

const FormController: React.FC<FormControllerProps> = ({ onSubmit }) => {
  const currentForm = useAppSelector((state) => state.formStore.currentForm);
  const dispatch = useAppDispatch();
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch.formStore.saveForm(currentForm!);
        onSubmit();
        dispatch.formStore.clearCurrentForm();
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Form Name</Form.Label>
        <Form.Control
          required
          key={"name"}
          type="text"
          placeholder="Enter form name"
          value={currentForm?.name}
          onChange={(e) => {
            dispatch.formStore.setCurrentForm({ name: e.target.value });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Form Description</Form.Label>
        <Form.Control
          key={"description"}
          required
          type="text"
          placeholder="Enter form description"
          value={currentForm?.description}
          onChange={(e) => {
            dispatch.formStore.setCurrentForm({ description: e.target.value });
          }}
        />
      </Form.Group>
      <Button
        className="mb-3 w-100"
        variant="secondary"
        onClick={() => {
          dispatch.formStore.addNewField();
        }}
      >
        Add New Field
      </Button>

      {currentForm?.fields.map((field, idx) => (
        <Container
          key={idx}
          style={{
            border: "2px solid #ced4da",
            borderRadius: 12,
            padding: 24,
            marginBottom: 12,
          }}
        >
          <FormFields field={field} fieldIndex={idx} />
        </Container>
      ))}
      <Button className="mt-3 w-100" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default FormController;
