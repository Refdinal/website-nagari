import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import truncateText from "../../../function/truncateText";
import axios from "axios";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import "./Event.css";

const Event = () => {
  const [dataEvent, setDataEvent] = useState([]);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/informasigrup/event`;
        const response = await axios.get(url);
        setDataEvent(response.data.event);
        console.log(response.data.event);
      } catch (error) {
        setDataEvent([]);
      }
    };
    fetchEvent();
  }, []);
  const handleEventClick = async (category, slug) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/views/${slug}`;
      await axios.post(url); // Tambahkan views saat tombol diklik
    } catch (error) {
      console.error("Gagal menambahkan views:", error);
    }
    window.location.href = `/informasi/${category}/${slug}`;
  };
  return (
    <section className="bg-danger-subtle py-5">
      <Container className="py-4">
        <Row>
          <Col className="border p-4 shadow-lg bg-light rounded-3">
            <h3 className="text-center mb-4 text-primary fw-bold">Event Nagari</h3>
            {dataEvent.length > 0 ? (
              <Row className="g-2">
                {dataEvent.map((item) => (
                  <Col md={6} className="mb-0" key={item.id}>
                    <Card
                      className="bg-light shadow-lg border-0 rounded-3 overflow-hidden"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Card.Body className="d-flex flex-column p-4">
                        <Row className="g-0">
                          <Col md={5} className="d-flex align-items-center justify-content-center">
                            <img
                              src={
                                item.image
                                  ? `${import.meta.env.VITE_UPLOAD_URL + item.image}`
                                  : "/assets/img/berita/Event.png"
                              }
                              alt="Event"
                              className="card-img rounded-3"
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "200px",
                                transition: "transform 0.3s ease-in-out",
                              }}
                            />
                          </Col>
                          <Col md={7} className="d-flex flex-column justify-content-between ps-md-4">
                            <div>
                              <Card.Title className="fs-4 fw-bold mb-2 text-primary">{item.title}</Card.Title>
                              <Card.Text className="text-secondary">{truncateText(item.paragraph1, 200)}</Card.Text>
                            </div>
                            <Row className="d-flex  text-muted">
                              <Col md={4} className="fw-bold">
                                {item.author}
                              </Col>
                              <Col md={6} className="d-flex justify-content-start">
                                <p className="small">
                                  {new Date(item.time_stamp).toLocaleString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </Col>
                              <Col md={2} className="d-flex align-items-center">
                                <AiOutlineEye size={20} className="me-1" />
                                <p className="fw-bold mb-0">{item.views}</p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row className=" d-flex justify-content-between align-items-end">
                          <Col md={4}>
                            <p className="fw-semibold"> {item.category}</p>
                          </Col>

                          <Col md={8} className="d-flex justify-content-end">
                            <Button
                              className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
                              style={{ transition: "background-color 0.3s ease-in-out" }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0d6efd")}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
                              onClick={() => handleEventClick(item.category, item.slug)}
                            >
                              Selengkapnya
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <h3 className="text-center">Belum ada Event</h3>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Event;
