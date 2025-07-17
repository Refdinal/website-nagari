import React, { useState, useEffect, useContext } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // akan kita buat nanti
const EditOrganisasi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    organisasi: "",
    jabatan: "",
    nama: "",
    foto: "",
  });
  const [fotoPreview, setFotoPreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/organisasi/single/${id}`);
        const data = response.data.organisasi[0];
        setData({
          organisasi: data.organisasi || "",
          jabatan: data.jabatan || "",
          nama: data.nama || "",
          foto: data.foto || "",
        });
        if (data.foto) {
          setFotoPreview(`${import.meta.env.VITE_API_URL}${data.foto}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && e.target.name === "foto") {
      const imageDataUrl = URL.createObjectURL(file);
      setImageSrc(imageDataUrl);
      setIsCropped(false); // belum dicrop
      setShowCropModal(true);
    }
  };

  const showCroppedImage = async () => {
    try {
      const { blob, fileUrl } = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      setData((prev) => ({ ...prev, foto: file }));
      setFotoPreview(fileUrl);
      setIsCropped(true); // sudah dicrop
      setShowCropModal(false);
    } catch (e) {
      console.error("Gagal crop gambar", e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowConfirmModal(true);
  };
  const confirmSubmit = async () => {
    const datas = new FormData();
    Object.keys(data).forEach((key) => {
      datas.append(key, data[key]);
    });

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/organisasi/single/${id}`, datas, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowConfirmModal(false);
      setIsLoading(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal memperbarui informasi", error);
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
                  <h1 className="fw-bold">Edit Data Organisasi</h1>
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
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>File Gambar</Form.Label>
                      <Form.Control type="file" name="foto" accept="image/*" onChange={handleFileChange} />
                      <div className="justify-content-center align-items-center text-center ">
                        <img
                          src={fotoPreview}
                          alt={data.nama}
                          className="img-fluid mt-2"
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="text-center">
                        {isCropped && (
                          <div className="text-center">
                            <Button
                              variant="warning"
                              size="sm"
                              className="align-self-center m-2"
                              onClick={() => {
                                setImageSrc(fotoPreview);
                                setShowCropModal(true);
                              }}
                            >
                              Crop Ulang
                            </Button>
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={9}>
                    <Form.Group className="mb-3">
                      <Form.Label>Organisasi</Form.Label>
                      <Form.Control type="text" name="organisasi" value={data.organisasi} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Jabatan</Form.Label>
                      <Form.Control type="text" name="jabatan" value={data.jabatan} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control type="text" name="nama" value={data.nama} onChange={handleChange} />
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
                  </Col>
                </Row>
              </Form>
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
          <Modal.Title>Crop Gambar (3x4)</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ position: "relative", height: "400px" }}>
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={3 / 4}
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
      <Modal show={showConfirmModal} onHide={(() => setShowConfirmModal(false), () => setIsLoading(false))}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menyimpan perubahan?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={confirmSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSuccessModal}
        onHide={() => {
          setShowSuccessModal(false);
          navigate("/dashboardorganisasi");
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
              navigate("/dashboardorganisasi");
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditOrganisasi;
