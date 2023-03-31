import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./store";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/forms" element={<HomePage />} />
              <Route path="/forms/:formName" element={<FormPage />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/forms" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
