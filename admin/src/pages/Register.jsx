import React, { useState } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "User",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    pin: "",
    confirmPin: "",
  });
  const [modal, setModal] = useState({ show: false, message: "", success: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setModal({ show: true, message: "Password tidak cocok", success: false });
      return;
    }
    if (formData.pin !== formData.confirmPin) {
      setModal({ show: true, message: "Pin tidak cocok", success: false });
      return;
    }
    try {
      setIsLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        pin: formData.pin,
        role: formData.role,
      });
      setModal({ show: true, message: "Registrasi berhasil!", success: true });
      setIsLoading(false);
    } catch (error) {
      setModal({ show: true, message: error.response?.data?.message || "Terjadi kesalahan", success: false });
    }
  };

  const handleClose = () => {
    setModal({ show: false, message: "", success: false });
    if (modal.success) navigate("/dashboarduser");
  };

  return (
    <div>
      <NavbarComponent />{" "}
      <Container
        fluid
        style={{
          minHeight: "100vh",
          backgroundImage: "url('../assets/img/ktasbg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <Container className="py-5 ">
          <Row className="justify-content-center ">
            <Col md={6} className="card p-2 shadow-lg">
              <section className="card shadow-lg p-4 border-0 mt-3">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>User Role</Form.Label>
                        <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Konfirmasi Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Pin</Form.Label>
                        <Form.Control
                          type="password"
                          name="pin"
                          placeholder="6 digit Angka"
                          value={formData.pin}
                          onChange={handleChange}
                          onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6))}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Pin</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPin"
                          placeholder="Konfirmasi Pin"
                          value={formData.confirmPin}
                          onChange={handleChange}
                          onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6))}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-end">
                      {isLoading ? (
                        <Button type="submit" variant="primary" disabled>
                          Registering...
                          <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                        </Button>
                      ) : (
                        <Button type="submit" variant="primary">
                          Register
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </section>
            </Col>
          </Row>
        </Container>
      </Container>
      <Modal show={modal.show} onHide={handleClose} centered>
        <Modal.Body>
          <p>{modal.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={modal.success ? "success" : "danger"} onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
