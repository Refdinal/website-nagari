import React, { useState, useEffect, useContext } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // akan kita buat nanti
const TambahInformasi = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { userName } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    paragraph4: "",
    category: "Berita",
    author: userName,
    status: "Published",
    imgcap: "",
    image: "",
    pdf: "",
  });
  const [pdfPreview, setPdfPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isCropped, setIsCropped] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const handleRemoveFile = (fileType) => {
    setFormData({ ...formData, [fileType]: "" });

    if (fileType === "image") {
      setImagePreview(null);
      setIsCropped(false);
    } else if (fileType === "pdf") {
      setPdfPreview(null);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });

    if (file) {
      if (e.target.name === "image") {
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
      await axios.post(`${import.meta.env.VITE_API_URL}/api/informasi`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData({
        title: "",
        paragraph1: "",
        paragraph2: "",
        paragraph3: "",
        paragraph4: "",
        category: "",
        author: userName,
        status: "Published",
        imgcap: "",
        image: null,
        pdf: null,
      });
      setShowModal(true);
      setImagePreview(null);
      setIsLoading(false);
    } catch (error) {
      setErrorModal(true);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/dashboardberita");
  };
  const handleErrorModalClose = () => {
    setIsLoading(false);
    setErrorModal(false);
  };
  const showCroppedImage = async () => {
    try {
      const { blob, fileUrl } = await getCroppedImg(imagePreview, croppedAreaPixels);
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(fileUrl);
      setIsCropped(true); // sudah dicrop
      setShowCropModal(false);
    } catch (e) {
      console.error("Gagal crop gambar", e);
    }
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
                  <h1 className="fw-bold">Tambah Informasi Event, Berita, dan Pengumuman</h1>
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
            <section className="card shadow-lg p-4 border-0 mt-3">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Jenis Informasi</Form.Label>
                      <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="Berita">Berita</option>
                        <option value="Event">Event</option>
                        <option value="Pengumuman">Pengumuman</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status Informasi</Form.Label>
                      <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formFileImage" className="mb-3">
                      <Form.Label>File Gambar</Form.Label>
                      <Form.Control type="file" name="image" accept="image/*" onChange={handleFileChange} />
                      {imagePreview && (
                        <div className="justify-content-center align-items-center text-center ">
                          <img src={imagePreview} alt="Preview" className="img-fluid mt-2" style={{ width: "100%" }} />
                          <Button
                            variant="danger"
                            size="sm"
                            className="align-self-center m-2"
                            onClick={() => handleRemoveFile("image")}
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
                  <Col md={6}>
                    <Form.Group controlId="formFilePdf" className="mb-3">
                      <Form.Label>File Pdf</Form.Label>
                      <Form.Control type="file" name="pdf" accept="application/pdf" onChange={handleFileChange} />
                      {pdfPreview && (
                        <div className="mt-2">
                          <a href={pdfPreview} target="_blank" className="btn btn-primary">
                            Lihat File
                          </a>
                          <Button variant="danger" size="" className="mx-2" onClick={() => handleRemoveFile("pdf")}>
                            Remove PDF
                          </Button>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Caption Gambar</Form.Label>
                  <Form.Control
                    type="text"
                    name="imgcap"
                    placeholder="Caption Gambar"
                    value={formData.imgcap}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Judul Informasi</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Judul Event / Berita / Pengumuman"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Isi Informasi</Form.Label>
                  <Form.Control
                    name="paragraph1"
                    placeholder="Paragraf 1 (Harus Diisi)"
                    value={formData.paragraph1}
                    onChange={handleChange}
                    required
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="paragraph2"
                    placeholder="Paragraf 2"
                    value={formData.paragraph2}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="paragraph3"
                    placeholder="Paragraf 3"
                    value={formData.paragraph3}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="paragraph4"
                    placeholder="Paragraf 4"
                    value={formData.paragraph4}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>

                <Row>
                  <Col className="text-end">
                    {isLoading ? (
                      <Button type="submit" variant="primary" disabled={isLoading}>
                        Menambahkan ...
                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                      </Button>
                    ) : (
                      <Button type="submit" variant="primary">
                        Tambahkan Berita
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </section>
          </div>
        </Container>
      </Container>
      <Modal show={showModal} onHide={handleModalClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Sukses</Modal.Title>
        </Modal.Header>
        <Modal.Body>Berita berhasil ditambahkan!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={errorModal} onHide={handleErrorModalClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Gagal Menambahkan Informasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Judul Informasi Sudah digunakan / Terlalu Panjang, Periksa Kembali!!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleErrorModalClose}>
            Kembali
          </Button>
        </Modal.Footer>
      </Modal>
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
      </Modal>
    </div>
  );
};

export default TambahInformasi;
