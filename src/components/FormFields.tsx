import React from "react";
import { Button, Form } from "react-bootstrap";
import { DataType, IField } from "../types/Form";
import { useAppDispatch } from "../store";

interface FormFieldsProps {
  field: IField;
  fieldIndex: number;
}

const FormFields: React.FC<FormFieldsProps> = ({ field, fieldIndex }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Field Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter field name"
          value={field.name}
          onChange={(e) =>
            dispatch.formStore.updateFieldByName({
              id: fieldIndex,
              field: { name: e.target.value },
            })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Field Type</Form.Label>

        <Form.Select
          required
          aria-label="Default select example"
          value={field.dataType}
          onChange={(e) => {
            dispatch.formStore.updateFieldByName({
              id: fieldIndex,
              field: { dataType: e.target.value as DataType },
            });
          }}
        >
          <option value={DataType.STRING}>String</option>
          <option value={DataType.NUMBER}>Number</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId={"formBasicCheckbox " + fieldIndex}>
        <Form.Check
          key={Math.random()}
          type="checkbox"
          label="Required field"
          checked={field.required}
          onChange={(e) =>
            dispatch.formStore.updateFieldByName({
              id: fieldIndex,
              field: { required: e.target.checked },
            })
          }
        />
      </Form.Group>
      <Button
        className="mt-3 w-100"
        variant="danger"
        onClick={() => {
          dispatch.formStore.deleteFieldByIds(fieldIndex);
        }}
      >
        Delete Field
      </Button>
    </div>
  );
};

export default FormFields;
