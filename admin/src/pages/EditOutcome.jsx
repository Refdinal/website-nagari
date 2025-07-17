import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

const EditOutcome = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jenis_outcome: "",
    sumber_dana: "",
    bulan: "",
    tahun_anggaran: new Date().getFullYear(),
    bidang: "",
    realisasi: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/danadesa/singleoutcome/${id}`);
        const data = res.data.data;
        console.log(res);

        setFormData({
          jenis_outcome: data.jenis_outcome || "",
          sumber_dana: data.sumber_dana || "",
          bulan: data.bulan || "",
          tahun_anggaran: data.tahun_anggaran || new Date().getFullYear(),
          bidang: data.bidang || "",
          realisasi: data.realisasi || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        alert("Data tidak ditemukan.");
        navigate("/dashboardapb");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "realisasi" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/danadesa/updateoutcome/${id}`, formData);
      setSaving(false);
      setShowSuccessModal(true);
    } catch (err) {
      setSaving(false);
      console.error("Gagal update data:", err);
      alert("Terjadi kesalahan saat mengupdate data.");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/dashboardapb");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

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
          <div className="card p-3 shadow-lg">
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
                  <h1 className="fw-bold">Edit Data Pengeluaran / Outcome</h1>
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
                      <Form.Label>Sumber Dana</Form.Label>
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
                      <Form.Label>Bulan</Form.Label>
                      <Form.Select name="bulan" value={formData.bulan} onChange={handleChange} required>
                        <option value="">Pilih Bulan</option>
                        {bulanOptions.map((namaBulan, index) => (
                          <option key={index + 1} value={index + 1}>
                            {namaBulan}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Tahun Anggaran</Form.Label>
                      <Form.Control
                        type="number"
                        name="tahun_anggaran"
                        value={formData.tahun_anggaran}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Bidang</Form.Label>
                      <Form.Select name="bidang" value={formData.bidang} onChange={handleChange} required>
                        <option value="">Pilih Bidang</option>
                        {bidangOptions.map((bid) => (
                          <option key={bid} value={bid}>
                            {bid}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Realisasi</Form.Label>
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

                <Button type="submit" variant="primary" disabled={saving}>
                  {saving ? <Spinner animation="border" size="sm" /> : "Update"}
                </Button>
              </Form>
            </section>
          </div>
        </Container>
      </Container>

      {/* Modal Sukses */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil diupdate!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditOutcome;
