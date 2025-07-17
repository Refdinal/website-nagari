import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

const TambahOutcome = () => {
  const [formData, setFormData] = useState({
    jenis_outcome: "",
    sumber_dana: "",
    bulan: "",
    tahun_anggaran: new Date().getFullYear(),
    bidang: "",
    realisasi: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const tahunOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const bulanOptions = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const bidangOptions = [
    "PEMERINTAHAN",
    "PELAKSANAAN PEMBANGUNAN",
    "PEMBINAAN KEMASYARAKATAN",
    "PEMBERDAYAAN KEMASYARAKATAN",
    "PENANGGULANGAN BENCANA",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "realisasi" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/danadesa/insertoutcome`, formData);
      setLoading(false);
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      setLoading(false);
      console.log(err.message);

      alert("Terjadi kesalahan saat menyimpan data.");
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
                background: "linear-gradient(135deg, #cb2d3e, #ef473a)",
                color: "white",
                borderRadius: "15px",
              }}
            >
              <Row
                className="rounded-3 shadow-lg m-1 py-3 px-4 align-items-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}
              >
                <Col md={8}>
                  <h1 className="fw-bold">Tambah Data Pengeluaran / Outcome</h1>
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
                      <Form.Label className="fw-bold">Jenis Outcome</Form.Label>
                      <Form.Select name="jenis_outcome" value={formData.jenis_outcome} onChange={handleChange} required>
                        <option value="">Pilih Jenis Outcome</option>
                        <option value="Belanja">Belanja</option>
                        <option value="Pengeluaran">Pengeluaran</option>
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
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Bulan</Form.Label>
                      <Form.Select name="bulan" value={formData.bulan} onChange={handleChange} required>
                        <option value="">Pilih Bulan</option>
                        {bulanOptions.map((bulan, index) => (
                          <option key={index + 1} value={index + 1}>
                            {bulan}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
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
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Bidang</Form.Label>
                      <Form.Select name="bidang" value={formData.bidang} onChange={handleChange} required>
                        <option value="">Pilih Bidang</option>
                        {bidangOptions.map((bidang) => (
                          <option key={bidang} value={bidang}>
                            {bidang}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
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

                <Button type="submit" variant="danger" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Simpan"}
                </Button>
              </Form>
            </section>
          </div>
        </Container>
      </Container>

      {/* Modal Konfirmasi */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menyimpan data ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "OK"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Sukses */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil disimpan!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TambahOutcome;
