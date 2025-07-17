import React, { useState, useEffect, useContext } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // akan kita buat nanti
const GaleriFotoBerita = () => {
  const { id_informasi } = useParams();
  const [dataFoto, setDataFoto] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isCropped, setIsCropped] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [formData, setFormData] = useState({
    id_informasi: id_informasi,
    tipe: "foto",
    foto: "",
  });

  useEffect(() => {
    const getFotoBerita = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/galerifotoberita/${id_informasi}`);
        setDataFoto(data.data.foto);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFotoBerita();
  }, []);
  const handleRemoveFile = (fileType) => {
    setFormData({ ...formData, [fileType]: "" });

    if (fileType === "foto") {
      setImagePreview(null);
      setIsCropped(false);
    } else if (fileType === "pdf") {
      setPdfPreview(null);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload(); // Reload halaman setelah modal ditutup
  };
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/galerifotoberita/${selectedId}`);
      setShowDeleteModal(false);
      setShowSuccessModal(true); // Tampilkan modal sukses
      setIsLoadingDelete(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };
  const showCroppedImage = async () => {
    try {
      const { blob, fileUrl } = await getCroppedImg(imagePreview, croppedAreaPixels);
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      setFormData((prev) => ({ ...prev, foto: file }));
      setImagePreview(fileUrl);
      setIsCropped(true); // sudah dicrop
      setShowCropModal(false);
    } catch (e) {
      console.error("Gagal crop gambar", e);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });

    if (file) {
      if (e.target.name === "foto") {
        setImagePreview(URL.createObjectURL(file));
        setIsCropped(false); // belum dicrop
        setShowCropModal(true);
      } else if (e.target.name === "pdf") {
        setPdfPreview(URL.createObjectURL(file));
      }
    } else {
      if (e.target.name === "pdf" && formData.pdf) {
        setPdfPreview(`${import.meta.env.VITE_API_URL}${formData.pdf}`);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/insertgalerifotoberita`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData({
        id_informasi: id_informasi,
        tipe: "foto",
        foto: "",
      });
      setShowModal(true);
      setImagePreview(null);
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
              <Row>
                {dataFoto && dataFoto.length > 0 ? (
                  <Row className="mx-0">
                    {dataFoto.map((item, index) => (
                      <Col md={4} key={index} className="mb-3">
                        <div className="shadow-lg border-0 text-end">
                          <img src={`${import.meta.env.VITE_API_URL}${item.item}`} className="card-img-top" alt="" />
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
                  <h5 className="text-center">Belum ada Foto kegiatan</h5>
                )}
              </Row>
              <Row className="shadow-lg p-2">
                <Col className="mt-2">
                  <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center align-items-center">
                      <Col md={5}>
                        <Form.Group controlId="formFileImage" className="mb-3">
                          <Form.Label>Tambah Foto kegiatan</Form.Label>
                          <Form.Control type="file" name="foto" accept="image/*" onChange={handleFileChange} />
                          {imagePreview && (
                            <div className="justify-content-center align-items-center text-center ">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="img-fluid mt-2"
                                style={{ width: "100%" }}
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                className="align-self-center m-2"
                                onClick={() => handleRemoveFile("foto")}
                              >
                                Remove Image
                              </Button>
                            </div>
                          )}
                          {isCropped && (
                            <div className="text-center">
                              <Button
                                variant="warning"
                                size="sm"
                                className="align-self-center m-2"
                                onClick={() => {
                                  setImagePreview(imagePreview);
                                  setShowCropModal(true);
                                }}
                              >
                                Crop Ulang
                              </Button>
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={2} className="text-center justify-content-center align-self-center ">
                        {imagePreview &&
                          (isLoading ? (
                            <Button type="submit" variant="primary" disabled>
                              Menambahkan ...
                              <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                            </Button>
                          ) : (
                            <Button type="submit" variant="primary">
                              Tambahkan Foto
                            </Button>
                          ))}
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </section>
          </div>
        </Container>
      </Container>
      <Modal
        show={showCropModal}
        onHide={() => {
          setShowCropModal(false);
          window.location.reload();
        }}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Crop Gambar </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ position: "relative", height: "400px" }}>
          {imagePreview && (
            <Cropper
              image={imagePreview}
              crop={crop}
              zoom={zoom}
              aspect={6 / 4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              zoomSpeed={0.05} // Lebih kecil = lebih halus
              minZoom={1} // Zoom minimum
              maxZoom={2.5} // Zoom maksimum (atur sesuai kebutuhan)
            />
          )}
        </Modal.Body>
        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
          <Button size="sm" onClick={() => setCrop((prev) => ({ ...prev, x: prev.x - 2 }))}>
            ⬅️
          </Button>
          <Button size="sm" onClick={() => setCrop((prev) => ({ ...prev, y: prev.y + 2 }))}>
            ⬇️
          </Button>
          <Button size="sm" onClick={() => setCrop((prev) => ({ ...prev, y: prev.y - 2 }))}>
            ⬆️
          </Button>

          <Button size="sm" onClick={() => setCrop((prev) => ({ ...prev, x: prev.x + 2 }))}>
            ➡️
          </Button>
        </div>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowCropModal(false);
              window.location.reload();
            }}
          >
            Batal
          </Button>

          <Button variant="primary" onClick={showCroppedImage}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>{" "}
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
    </div>
  );
};

export default GaleriFotoBerita;
