import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import { Register } from "./pages/Register";
// import { useState, useContext, createContext} from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Main />} />
    </Routes>
  );
}

export default App;
