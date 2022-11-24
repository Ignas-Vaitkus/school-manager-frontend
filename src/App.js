import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Schools from "./components/Schools";
import School from "./components/School";
import Requests from "./components/Requests";
import Request from "./components/Request";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="" element={<Navigate to="/schools" />} />
          <Route path="/" element={<Navigate to="/schools" />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request" element={<Request />} />
          <Route path="/request/:id" element={<Request />} />
          <Route path="/school" element={<School />} />
          <Route path="/school/:id" element={<Request />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
