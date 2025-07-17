import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

const EditIncome = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    jenis_income: "",
    sumber_dana: "",
    tahun_anggaran: new Date().getFullYear(),
    jumlah: "",
    realisasi: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const tahunOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/danadesa/singleincome/${id}`);

        setFormData(res.data.data);
      } catch (err) {
        console.error("Gagal memuat data:", err);
        alert("Gagal memuat data income.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "jumlah" || name === "realisasi" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/danadesa/updateincome/${id}`, formData);
      setLoading(false);
      setShowSuccessModal(true);
    } catch (err) {
      setLoading(false);
      console.error("Gagal mengupdate data:", err);
      alert("Terjadi kesalahan saat mengupdate data.");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/dashboardapb");
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
                borderRadius: "15px",
              }}
            >
              <Row
                className="rounded-3 shadow-lg m-1 py-3 px-4 align-items-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}
              >
                <Col md={8}>
                  <h1 className="fw-bold">Edit Data Pendapatan / Pembiayaan</h1>
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
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Jenis Income</Form.Label>
                      <Form.Select name="jenis_income" value={formData.jenis_income} onChange={handleChange} required>
                        <option value="">Pilih Jenis Income</option>
                        <option value="Pendapatan">Pendapatan</option>
                        <option value="Pembiayaan">Pembiayaan</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Sumber Dana</Form.Label>
                      <Form.Control
                        type="text"
                        name="sumber_dana"
                        value={formData.sumber_dana}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Tahun Anggaran</Form.Label>
                      <Form.Select
                        name="tahun_anggaran"
                        value={formData.tahun_anggaran}
                        onChange={handleChange}
                        required
                      >
                        {tahunOptions.map((tahun) => (
                          <option key={tahun} value={tahun}>
                            {tahun}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Jumlah</Form.Label>
                      <Form.Control
                        type="number"
                        name="jumlah"
                        value={formData.jumlah}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Realisasi</Form.Label>
                      <Form.Control
                        type="number"
                        name="realisasi"
                        value={formData.realisasi}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Update"}
                </Button>
              </Form>
            </section>
          </div>
        </Container>
      </Container>

      {/* Modal Success */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil diperbarui!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditIncome;
