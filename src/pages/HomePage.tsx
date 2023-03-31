import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import CreateFormModal from "../components/CreateFormModal";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.formStore.formList).filter(
    (form) => form.name.includes(search)
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch.formStore.getForms();
  }, []);

  return (
    <div style={{ background: "#364F6B", height: "100vh", padding: 24 }}>
      <CreateFormModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      ></CreateFormModal>
      <h1
        className="text-center my-4"
        style={{
          color: "#3FC1C9",
        }}
      >
        Form Management
      </h1>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Control
          style={{ width: 250, height: 38 }}
          type="text"
          placeholder="Type to search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="secondary"
          className="mb-4 mr-auto"
          onClick={() => setOpen(true)}
        >
          Create New Form
        </Button>
      </div>
      {forms.length ? (
        <Table bordered hover>
          <thead>
            <tr style={{ color: "#3FC1C9" }}>
              <th>Photo</th>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Total Field</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ color: "#F5F5F5" }}>
            {forms.map((form, idx) => (
              <tr key={form.name}>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  {
                    <img
                      src={"https://picsum.photos/id/" + idx * 20 + "/90"}
                      alt="form img"
                    />
                  }
                </td>
                <td>{form.name}</td>
                <td>{form.description}</td>
                <td>{form.createdAt}</td>
                <td>{form.fields.length}</td>
                <td>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <Button
                      variant="primary"
                      onClick={() => navigate(form.name)}
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => dispatch.formStore.deleteForm(form.name)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <h2 style={{ color: "#3FC1C9" }}>Not Found Data</h2>
          <h4 style={{ color: "#F5F5F5" }}>Please enter a new form</h4>
        </div>
      )}
    </div>
  );
};

export default HomePage;
