import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Form, Button, Modal, Row, Col, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import axios from "axios";

const DashboardNagari = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataNagari, setDataNagari] = useState({
    id: "",
    sambutan: "",
    yt_embed: "",
    email: "",
    telepon: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const [showModal, setShowModal] = useState(false);
  const sambutanToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Sambutan Walinagari
    </Tooltip>
  );
  const emailToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Email Resmi Nagari
    </Tooltip>
  );
  const teleponToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Telepon Resmi Nagari
    </Tooltip>
  );
  const facebookToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Facebook Resmi Nagari
    </Tooltip>
  );
  const instagramToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Instagram Resmi Nagari
    </Tooltip>
  );
  const youtubeToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Youtube Resmi Nagari
    </Tooltip>
  );
  const ytembedToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Youtube Untuk Homepage Website
    </Tooltip>
  );

  useEffect(() => {
    const getNagari = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/datanagari`);
        setDataNagari(response.data.dataNagari[0]);
        setIsLoadingData(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getNagari();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataNagari({ ...dataNagari, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/datanagari/${dataNagari.id}`, dataNagari);
      setShowModal(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  return (
    <div>
      <NavbarComponent />
      <Container
        fluid
        style={{
          minHeight: "100vh",
          backgroundImage: "url('../assets/img/ktasbg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <Container className="py-5">
          <div className="card p-2 shadow-lg">
            <section
              className="card shadow-lg p-4 border-0"
              style={{
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                color: "white",
                transition: "0.3s",
                borderRadius: "15px",
              }}
            >
              <Row
                className="rounded-3 shadow-lg m-1 py-3 px-4 align-items-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}
              >
                <Col md={8}>
                  <h1 className="fw-bold">Data Profile Website Nagari</h1>
                  <p className="text-light opacity-75">Edit tampilan website</p>
                </Col>
                <Col md={4} className="text-end">
                  <span
                    className="fw-semibold px-4 py-2 rounded-3"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      display: "inline-block",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    {new Date().toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </Col>
              </Row>
            </section>
            <section className="card shadow-lg p-4 border-0">
              <h2>Edit Data Nagari</h2>
              {isLoadingData ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                  <Spinner animation="grow" variant="secondary" size="xxl" />
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Sambutan Walinagari{" "}
                      <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={sambutanToolTip}>
                        <i className="bi bi-question-circle btn p-0 m-0"></i>
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="sambutan"
                      value={dataNagari.sambutan}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email{" "}
                      <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={emailToolTip}>
                        <i className="bi bi-question-circle btn p-0 m-0"></i>
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control type="email" name="email" value={dataNagari.email} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Telepon{" "}
                      <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={teleponToolTip}>
                        <i className="bi bi-question-circle btn p-0 m-0"></i>
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="telepon"
                      value={dataNagari.telepon}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Facebook{" "}
                      <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={facebookToolTip}>
                        <i className="bi bi-question-circle btn p-0 m-0"></i>
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control type="url" name="facebook" value={dataNagari.facebook} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Instagram{" "}
                      <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={instagramToolTip}>
                        <i className="bi bi-question-circle btn p-0 m-0"></i>
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control type="url" name="instagram" value={dataNagari.instagram} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      YouTube Channel{" "}
                      <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={youtubeToolTip}>
                        <i className="bi bi-question-circle btn p-0 m-0"></i>
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control type="url" name="youtube" value={dataNagari.youtube} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Embed YouTube{" "}
                      <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={ytembedToolTip}>
                        <i className="bi bi-question-circle btn p-0 m-0"></i>
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control type="text" name="yt_embed" value={dataNagari.yt_embed} onChange={handleChange} />
                    <Row className="justify-content-center">
                      <Col md={6} className="p-2">
                        <iframe
                          src={dataNagari.yt_embed || "https://www.youtube.com/embed/4G2ZiGqC7BU?si=kSevaN2fdRzLoxKI"}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          sandbox="allow-same-origin allow-scripts allow-popups"
                          style={{
                            position: "",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "400px",
                            borderRadius: "15px",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                            transition: "transform 0.3s ease-in-out",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        ></iframe>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Row>
                    <Col className="text-end">
                      {isLoading ? (
                        <Button className="px-5 py-2" type="submit" disabled>
                          Menyimpan... <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                        </Button>
                      ) : (
                        <Button className="px-5 py-2" type="submit">
                          Simpan
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              )}
            </section>
          </div>
        </Container>
      </Container>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil diperbarui!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardNagari;
