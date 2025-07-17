import React, { useState, useEffect, useContext, use } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // akan kita buat nanti
const GaleriVideoBerita = () => {
  const { id_informasi } = useParams();
  const [dataVideo, setDataVideo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id_informasi: id_informasi,
    tipe: "video",
    video: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  useEffect(() => {
    const getFotoBerita = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/galerivideoberita/${id_informasi}`);
        setDataVideo(data.data.video);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFotoBerita();
  }, []);
  const handleShowModal = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };
  const handleDelete = async () => {
    if (!selectedId) return;
    setIsLoadingDelete(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/galerivideoberita/${selectedId}`);
      setShowDeleteModal(false);
      setShowSuccessModal(true); // Tampilkan modal sukses
      setIsLoadingDelete(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload(); // Reload halaman setelah modal ditutup
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/insertgalerivideoberita`, formData);

      setFormData({
        id_informasi: id_informasi,
        tipe: "video",
        video: "",
      });
      setShowModal(true);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload();
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
        <Container className="py-5">
          <div className="card p-2 shadow-lg">
            <section
              className="card shadow-lg p-4 border-0"
              style={{
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                color: "white",
                borderRadius: "15px",
              }}
            >
              <Row
                className="rounded-3 shadow-lg m-1 py-3 px-4 align-items-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}
              >
                <Col md={8}>
                  <h1 className="fw-bold">Galeri Foto Berita</h1>
                </Col>
                <Col md={4} className="text-end">
                  <span
                    className="fw-semibold px-4 py-2 rounded-3"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", display: "inline-block" }}
                  >
                    {new Date().toLocaleString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </Col>
              </Row>
            </section>
            <section className="card shadow-lg p-4 border-0 mt-2">
              {" "}
              {dataVideo && dataVideo.length > 0 ? (
                <Row className="mx-0">
                  {dataVideo.map((item, index) => (
                    <Col md={4} key={index} className="mb-3">
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
                            height: "300px",
                            borderRadius: "15px",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                            transition: "transform 0.3s ease-in-out",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        ></iframe>
                        <Button
                          className="m-2"
                          variant="danger"
                          size="sm"
                          title="Hapus"
                          onClick={() => handleShowModal(item.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <h5 className="text-center">Belum ada Video Kegiatan</h5>
              )}
              <Row className="shadow-lg p-2">
                <Col className="mt-2">
                  <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center ">
                      <Col className="p-2">
                        {formData.video && formData.video.includes("http") && (
                          <iframe
                            src={formData.video}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            sandbox="allow-same-origin allow-scripts allow-popups"
                            style={{
                              width: "100%",
                              height: "400px",
                              borderRadius: "15px",
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                              transition: "transform 0.3s ease-in-out",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          ></iframe>
                        )}
                      </Col>

                      <Col md={6}>
                        <Row>
                          <Form.Group controlId="formFileImage" className="mb-3">
                            <Form.Label>Tambah Video kegiatan</Form.Label>
                            <Form.Control
                              type="text"
                              name="video"
                              value={formData.video}
                              onChange={handleChange}
                              placeholder="Masukkan URL video (YouTube embed)"
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Col className="text-end">
                            {formData.video &&
                              formData.video.includes("http") &&
                              (isLoading ? (
                                <Button type="submit" variant="primary" disabled>
                                  Menambahkan ...
                                  <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                </Button>
                              ) : (
                                <Button type="submit" variant="primary">
                                  Tambahkan Video
                                </Button>
                              ))}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </section>
          </div>
        </Container>
      </Container>
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Konfirmasi Hapus</h5>
                <button type="button" className="btn-close" onClick={handleCloseDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Apakah Anda yakin ingin menghapus data ini?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseDeleteModal}>
                  Batal
                </button>
                {isLoadingDelete ? (
                  <button className="btn btn-danger" disabled>
                    Menghapus...
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  </button>
                ) : (
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sukses</h5>
              </div>
              <div className="modal-body">
                <p>Foto berhasil dihapus.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleCloseSuccessModal}>
                  Oke
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal show={showModal} onHide={handleModalClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Sukses</Modal.Title>
        </Modal.Header>
        <Modal.Body>Foto berhasil ditambahkan</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GaleriVideoBerita;
