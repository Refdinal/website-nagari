import React from "react";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import "./SingleInformasi.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
const SingleInformasi = () => {
  const { category, slug } = useParams();
  const [dataSingleInformasi, setDataSingleInformasi] = useState([]);
  const [dataInformasiLain, setDataInformasiLain] = useState([]);
  const [dataFoto, setDataFoto] = useState([]);
  const [dataVideo, setDataVideo] = useState([]);

  useEffect(() => {
    const fetchSingleInformasi = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/informasi/info/${category}/${slug}`;

        const response = await axios.get(url);
        const id = response.data.informasi[0].id;

        const foto = await axios.get(`${import.meta.env.VITE_API_URL}/galerifotoberita/${id}`);
        const video = await axios.get(`${import.meta.env.VITE_API_URL}/galerivideoberita/${id}`);
        setDataFoto(foto.data.foto);
        setDataVideo(video.data.video);

        setDataSingleInformasi(response.data.informasi[0]);
      } catch (error) {
        setDataSingleInformasi([]);
      }
    };

    fetchSingleInformasi();
  }, []);
  useEffect(() => {
    const fetchInformasiLain = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/informasilain/${category}`;
        const response = await axios.get(url);
        setDataInformasiLain(response.data.informasi);
      } catch (error) {
        setDataInformasiLain([]);
      }
    };
    fetchInformasiLain();
  }, []);

  const handleBeritaClick = async (category, slug) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/views/${slug}`;
      await axios.post(url); // Tambahkan views saat tombol diklik
    } catch (error) {
      console.error("Gagal menambahkan views:", error);
    }
    window.location.href = `/informasi/${category}/${slug}`;
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleShowModal = (foto, index) => {
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

  return (
    <>
      <section className="bg-danger-subtle py-5">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={9} className="shadow-sm p-4 bg-white rounded">
              <h3 className="text-center border-bottom pb-3 mb-3">{dataSingleInformasi.title}</h3>
              <Row className="d-flex align-items-center gap-3 text-muted mb-4">
                <Col className="d-flex gap-3">
                  <p className="m-0">{dataSingleInformasi.author}</p>
                  <p className="m-0">|</p>
                  <p className="m-0">
                    {new Date(dataSingleInformasi.time_stamp).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                  <p className="m-0">|</p>
                  <AiOutlineEye size={20} className="pt-1" />
                  <h5 className="m-0">{dataSingleInformasi.views}</h5>
                </Col>
              </Row>
              {dataSingleInformasi.image && (
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Row className="justify-content-center">
                      <img
                        className="d-block border p-2 shadow-lg bg-light rounded-3"
                        src={`${import.meta.env.VITE_UPLOAD_URL + dataSingleInformasi.image}`}
                        alt="carousel"
                        style={{ height: "auto", width: "100%", objectFit: "cover" }}
                      />
                    </Row>
                    {dataSingleInformasi.imgcap && (
                      <Row className="fs-6 text-center">
                        <i>
                          <span>" {dataSingleInformasi.imgcap} "</span>
                        </i>
                      </Row>
                    )}
                  </Col>
                  <hr />
                </Row>
              )}

              {dataSingleInformasi.paragraph1 && (
                <Row>
                  <p style={{ textAlign: "justify" }} className="text-justify">
                    {dataSingleInformasi.paragraph1}
                  </p>
                </Row>
              )}
              {dataSingleInformasi.paragraph2 && (
                <Row>
                  <p style={{ textAlign: "justify" }} className="text-justify">
                    {dataSingleInformasi.paragraph2}
                  </p>
                </Row>
              )}
              {dataSingleInformasi.paragraph3 && (
                <Row>
                  <p style={{ textAlign: "justify" }} className="text-justify">
                    {dataSingleInformasi.paragraph3}
                  </p>
                </Row>
              )}
              {dataSingleInformasi.paragraph4 && (
                <Row>
                  <p style={{ textAlign: "justify" }} className="text-justify">
                    {dataSingleInformasi.paragraph4}
                  </p>
                </Row>
              )}
              {dataSingleInformasi.pdf && (
                <Row>
                  <object
                    data={`${import.meta.env.VITE_UPLOAD_URL + dataSingleInformasi.pdf}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  >
                    <p className="text-center mt-3 fw-bold">
                      <a
                        href={`${import.meta.env.VITE_UPLOAD_URL + dataSingleInformasi.pdf}`}
                        className="btn btn-primary"
                      >
                        Unduh Pdf
                      </a>
                    </p>
                  </object>
                </Row>
              )}
              {dataFoto.length > 0 && (
                <Row className="shadow-sm">
                  <h5 className="text-center p-3">Foto Kegiatan</h5>
                  <Row className="justify-content-center">
                    {dataFoto.map((item, index) => (
                      <Col key={item.id} md={6} className="mb-3" onClick={() => handleShowModal(item.item, index)}>
                        <img
                          src={`${import.meta.env.VITE_UPLOAD_URL + item.item}`}
                          alt=""
                          className="d-block border p-2 shadow-lg bg-light rounded-3"
                          style={{ height: "auto", width: "100%", objectFit: "cover" }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Row>
              )}
              {dataVideo.length > 0 && (
                <Row className="shadow-sm">
                  <h5 className="text-center p-3">Video Kegiatan</h5>
                  <Row className="justify-content-center">
                    {dataVideo.map((item, index) => (
                      <Col md={10} key={index} className="mb-3">
                        <div className="shadow-lg border-0 text-end">
                          <iframe
                            src={item.item}
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
                          ></iframe>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Row>
              )}
            </Col>

            <Col md={3} className="bg-light p-3 rounded">
              <h5 className="border-bottom pb-2">{dataSingleInformasi.category} Lainnya</h5>
              <ul className="list-unstyled">
                {dataInformasiLain.map((item) => (
                  <li
                    key={item.id}
                    className="mb-2"
                    style={{
                      transition: "background-color 0.3s ease",
                      cursor: "pointer",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#bcbcbc")} // Warna berubah saat hover
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")} // Kembali ke normal saat tidak dihover
                  >
                    <Button
                      variant="link"
                      className="text-decoration-none p-0 text-start"
                      onClick={() => handleBeritaClick(item.category, item.slug)}
                    >
                      {item.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Body className="text-center position-relative">
          <img
            src={dataFoto[selectedIndex] && import.meta.env.VITE_UPLOAD_URL + dataFoto[selectedIndex].item}
            alt="Foto"
            className="img-fluid mb-3"
            style={{ width: "100%", height: "auto" }}
          />

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
      </Modal>
    </>
  );
};

export default SingleInformasi;
