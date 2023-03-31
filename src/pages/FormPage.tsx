import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { Button, Form } from "react-bootstrap";
import { DataType } from "../types/Form";

const FormPage = () => {
  let { formName } = useParams();
  const dispatch = useAppDispatch();

  const forms = useAppSelector((state) => state.formStore.formList);
  const currentForm = forms.find((form) => form.name === formName!);

  const [fields, setFields] = useState<{ [key: string]: string }>({});

  const updateField = (val: string, name: string) => {
    console.log(val);
    console.log(name);
    console.log(fields);
    console.log(fields[name]);
    const _fields = fields;
    _fields[name] = val;
    setFields(_fields);
  };

  console.log(currentForm);
  useEffect(() => {
    dispatch.formStore.getForms();
  }, []);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("fields: ", fields);
  };

  return (
    <div style={{ background: "#364F6B", height: "100vh", padding: 24 }}>
      {!!currentForm ? (
        <>
          <h1 style={{ color: "#3FC1C9" }}>{currentForm.name}</h1>
          <h3 style={{ color: "#F5F5F5" }}>{currentForm.description}</h3>
          <Form onSubmit={onSubmitForm} style={{ marginTop: 32 }}>
            {currentForm.fields.map((field, idx) => {
              return (
                <Form.Group className="mb-3" key={"form" + field.name}>
                  <Form.Label
                    style={{ color: "#3FC1C9", textTransform: "capitalize" }}
                  >
                    {field.name}
                  </Form.Label>
                  <Form.Control
                    key={"formcontrol" + field.name}
                    required={field.required}
                    type={
                      field.dataType === DataType.NUMBER ? "number" : "text"
                    }
                    placeholder={"Enter " + field.name}
                    value={fields[field.name]}
                    onChange={(e) => updateField(e.target.value, field.name)}
                  />
                </Form.Group>
              );
            })}
            <Button className="mt-3 w-100" variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <div>Form Not Found</div>
      )}
    </div>
  );
};

export default FormPage;
