import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col, Image, Modal, Spinner } from "react-bootstrap";

const Login = () => {
  const { isAuth, login, errorMsg, clearError } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isAuth) {
      setIsLoading(false);
      setShowSuccessModal(true);
      setTimeout(() => navigate("/"), 1500);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (errorMsg) {
      setShowErrorModal(true);
    }
  }, [errorMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(email, password);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setIsLoading(false);
    clearError(); // Reset error agar bisa muncul lagi jika login gagal berikutnya
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-dark-subtle"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('../assets/img/ktas.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <Card className="shadow-lg p-2" style={{ maxWidth: "800px", width: "100%", borderRadius: "12px" }}>
        <Row className="g-0">
          <Col md={6} className="d-none d-md-block">
            <Image
              src="../assets/img/ktasai.webp"
              alt="Login Illustration"
              fluid
              style={{ borderRadius: "12px 0 0 12px", height: "100%" }}
            />
          </Col>
          <Col md={6} className="py-1 d-flex align-items-center">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary fw-bold">Login Dashboard</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2"
                  />
                </Form.Group>
                {isLoading ? (
                  <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold" disabled={isLoading}>
                    Logging in...
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold">
                    Login
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Modal Error */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMsg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Success */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Redirecting to dashboard... <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Login;
