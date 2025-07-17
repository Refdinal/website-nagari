import React, { useState, useEffect, useContext } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // akan kita buat nanti
const EditInformasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userName } = useContext(AuthContext);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    paragraph4: "",
    category: "Berita",
    author: userName,
    status: "Published",
    time_stamp: "",
    imgcap: "",
    image: "",
    pdf: "",
  });
  const [showCropModal, setShowCropModal] = useState(false);
  const [isCropped, setIsCropped] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const formatDate = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`; // Format YYYY-MM-DDTHH:MM:SS
  };
  const handleRemoveFile = (fileType) => {
    setFormData({ ...formData, [fileType]: "" });

    if (fileType === "image") {
      setImagePreview(null);
      setIsCropped(false);
    } else if (fileType === "pdf") {
      setPdfPreview(null);
    }
  };

  useEffect(() => {
    const getInformasi = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/informasiId/${id}`);
        const data = response.data.informasi[0];

        setFormData({
          title: data.title || "",
          paragraph1: data.paragraph1 || "",
          paragraph2: data.paragraph2 || "",
          paragraph3: data.paragraph3 || "",
          paragraph4: data.paragraph4 || "",
          category: data.category || "Berita",
          author: data.author || userName,
          status: data.status || "Published",
          time_stamp: formatDate(data.time_stamp) || "",
          imgcap: data.imgcap || "",
          image: data.image || "",
          pdf: data.pdf || "",
        });

        if (data.image) {
          setImagePreview(`${import.meta.env.VITE_API_URL}${data.image}`);
        }
        if (data.pdf) {
          setPdfPreview(`${import.meta.env.VITE_API_URL}${data.pdf}`);
        }
      } catch (error) {
        console.error("Gagal mengambil data informasi", error);
      }
    };
    getInformasi();
  }, [id, userName]);

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
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      setIsLoading2(true);
      await axios.put(`${import.meta.env.VITE_API_URL}/api/informasi/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowConfirmModal(false);
      setIsLoading2(false);
      setIsLoading(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal memperbarui informasi", error);
    }
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
                  <h1 className="fw-bold">Edit Informasi Event, Berita, dan Pengumuman</h1>
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
                    <Form.Group className="mb-3">
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
                    <Form.Group className="mb-3">
                      <Form.Label>File PDF</Form.Label>
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
                  <Form.Label>Gambar Caption</Form.Label>
                  <Form.Control type="text" name="imgcap" value={formData.imgcap} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Judul Informasi</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Isi Informasi</Form.Label>
                  <Form.Control
                    name="paragraph1"
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
                    value={formData.paragraph2}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="paragraph3"
                    value={formData.paragraph3}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="paragraph4"
                    value={formData.paragraph4}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="time_stamp"
                    value={formatDate(formData.time_stamp)}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="text-end">
                  {isLoading ? (
                    <Button type="submit" variant="primary" disabled>
                      Simpan Perubahan
                      <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary">
                      Simpan Perubahan
                    </Button>
                  )}
                </div>
              </Form>
            </section>
          </div>
        </Container>
      </Container>
      <Modal
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false);
          setIsLoading(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menyimpan perubahan?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal(false);
              setIsLoading(false);
            }}
          >
            Batal
          </Button>
          {isLoading2 ? (
            <Button type="submit" variant="primary" disabled>
              Menyimpan <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
            </Button>
          ) : (
            <Button variant="primary" onClick={confirmSubmit}>
              Simpan
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSuccessModal}
        onHide={() => {
          setShowSuccessModal(false);
          navigate("/dashboardberita");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>Informasi berhasil diperbarui!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/dashboardberita");
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      {/* crop modal */}
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
          <Modal.Title>Crop Gambar</Modal.Title>
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

export default EditInformasi;
