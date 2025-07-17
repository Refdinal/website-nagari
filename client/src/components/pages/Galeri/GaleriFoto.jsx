import React from "react";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import "./GaleriFoto.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
const GaleriFoto = () => {
  const [dataFoto, setDataFoto] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const getDataFoto = async () => {
      try {
        const foto = await axios.get(`${import.meta.env.VITE_API_URL}/galerifoto/${limit}`);
        setDataFoto(foto.data.foto);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDataFoto();
  }, [limit]);
  const handleShowModal = (item, index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleNext = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex + 1 < dataFoto.length ? prevIndex + 1 : 0) // loop ke awal
    );
  };

  const handlePrev = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : dataFoto.length - 1) // loop ke akhir
    );
  };
  const handleLimit = () => {
    setLimit(limit + 12);
  };
  return (
    <Container className="p-3">
      <section className=" py-5">
        {dataFoto.length > 0 ? (
          <Row className="shadow-sm ">
            <h3 className="text-center p-3 ">Galeri Foto</h3>
            <Row className="justify-content-center m-auto">
              {dataFoto.map((item, index) => (
                <Col key={item.id} md={3} className="mb-3" onClick={() => handleShowModal(item, index)}>
                  {item.item && (
                    <img
                      src={`${import.meta.env.VITE_UPLOAD_URL + item.item}`}
                      alt=""
                      className="d-block border p-2 shadow-lg bg-light rounded-3"
                      style={{ height: "auto", width: "100%", objectFit: "cover" }}
                    />
                  )}
                </Col>
              ))}
            </Row>
            <Row>
              <Button onClick={handleLimit}>Lebih Banyak</Button>
            </Row>
          </Row>
        ) : (
          <div className="text-center p-5">
            <h1>Belum Ada Foto</h1>
          </div>
        )}
      </section>{" "}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        {dataFoto[selectedIndex] && (
          <Modal.Body className="text-center position-relative">
            <img
              src={`${import.meta.env.VITE_UPLOAD_URL + dataFoto[selectedIndex].item}`}
              alt="Foto"
              className="img-fluid mb-3"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="mt-3">
              <Row>
                <Col md={9}>
                  <p>
                    <a
                      href={`/informasi/${dataFoto[selectedIndex]?.category}/${dataFoto[selectedIndex]?.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dataFoto[selectedIndex]?.slug}
                    </a>
                  </p>
                </Col>
                <Col md={3}>
                  <p>
                    {new Date(dataFoto[selectedIndex]?.time_stamp).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Col>
              </Row>
            </div>

            {/* Tombol Geser */}
            <Button
              variant="light"
              onClick={handlePrev}
              className="position-absolute top-50 start-0 translate-middle-y"
              style={{
                fontSize: "2rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "50%",
                opacity: 0.7,
                zIndex: 10,
              }}
            >
              ‹
            </Button>

            <Button
              variant="light"
              onClick={handleNext}
              className="position-absolute top-50 end-0 translate-middle-y"
              style={{
                fontSize: "2rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "50%",
                opacity: 0.7,
                zIndex: 10,
              }}
            >
              ›
            </Button>
          </Modal.Body>
        )}
      </Modal>
    </Container>
  );
};

export default GaleriFoto;
