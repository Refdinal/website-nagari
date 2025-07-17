import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Offcanvas, Button, Row, Col, Table, Spinner, Form, InputGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const DashboardAPB = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataIncome, setDataIncome] = useState([]);
  const [dataOutcome, setDataOutcome] = useState([]);
  const currentYear = new Date().getFullYear();
  const [tahun, setTahun] = useState(currentYear);
  const generateTahunOptions = () => {
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  };
  useEffect(() => {
    const getDataIncome = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/danadesa/income/${tahun}`);
        setDataIncome(response.data.pendapatan);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataIncome();
  }, [tahun]);
  useEffect(() => {
    const getDataOutcome = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/danadesa/outcome/${tahun}`);
        setDataOutcome(response.data.belanja);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataOutcome();
  }, [tahun]);
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(angka);
  };
  const getNamaBulan = (bulan) => {
    const namaBulan = [
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
    return namaBulan[bulan - 1] || "-";
  };
  const handleShowModal = (id, type) => {
    setSelectedId(id);
    setSelectedType(type); // 'income' atau 'outcome'
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
    setSelectedType("");
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload(); // Reload halaman setelah modal ditutup
  };
  const handleDelete = async () => {
    if (!selectedId || !selectedType) return;
    setIsLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/danadesa/delete${selectedType}/${selectedId}`);
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditIncome = (item) => {
    navigate(`/editincome/${item}`);
  };
  const handleEditOutcome = (item) => {
    navigate(`/editoutcome/${item}`);
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
        <Container className="py-5 mx-auto">
          <div className="card p-1 shadow-lg mx-0">
            {" "}
            <section
              className="card shadow-lg p-4 border-0"
              style={{
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                color: "white",
                transition: "0.3s",
                borderRadius: "15px",
              }}
            >
              <Row
                className="rounded-3 shadow-lg m-1 py-3 px-4 align-items-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}
              >
                <Col md={8}>
                  <h1 className="fw-bold">Kelola APB Nagari</h1>

                  <p className="text-light opacity-75">
                    Keloa data APB Nagari, pendapatan, pembiayaan, belanja, pengeluaran
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <span
                    className="fw-semibold px-4 py-2 rounded-3"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      display: "inline-block",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    {new Date().toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </Col>
              </Row>
            </section>
            <section className="card shadow-lg p-4 border-0 mt-2">
              <Row className="mb-3">
                <Col xs={12} md={4}>
                  <Form.Group controlId="selectTahun">
                    <Form.Label>Pilih Tahun</Form.Label>
                    <Form.Select value={tahun} onChange={(e) => setTahun(parseInt(e.target.value))}>
                      {generateTahunOptions().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="p-2 bg-light border rounded">
                <Row>
                  <h3 className="text-center">Pendapatan / Pembiayaan</h3>
                </Row>
                <Row>
                  <Table hover size="sm" responsive className="mt-1 " bordered>
                    <thead>
                      <tr className="text-center">
                        <th>No</th>
                        <th>Jenis Income</th>
                        <th>Sumber Dana</th>
                        <th>Tahun Anggaran</th>
                        <th>Jumlah</th>
                        <th>Realisasi</th>
                        <th>Persentase</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataIncome.map((item, index) => {
                        const rowClass =
                          item.jenis_income === "Pendapatan"
                            ? "bg-success-subtle " // Kelas Bootstrap untuk Pendapatan
                            : item.jenis_income === "Pembiayaan"
                            ? "bg-warning-subtle text-dark" // Kelas Bootstrap untuk Pembiayaan
                            : "";

                        return (
                          <tr key={index}>
                            <td className={`text-center ${rowClass}`}>{index + 1}</td>
                            <td className={rowClass}>{item.jenis_income}</td>
                            <td className={rowClass}>{item.sumber_dana}</td>
                            <td className={`text-center ${rowClass}`}>{item.tahun_anggaran}</td>
                            <td className={`text-end ${rowClass}`}>{formatRupiah(item.jumlah)}</td>
                            <td className={`text-end ${rowClass}`}>{formatRupiah(item.realisasi)}</td>
                            <td className={`text-end ${rowClass}`}>
                              {((item.realisasi / item.jumlah) * 100).toFixed(2)} %
                            </td>

                            <td className="d-flex justify-content-center">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                title="Edit"
                                onClick={() => handleEditIncome(item.id)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>

                              <Button
                                variant="outline-danger"
                                size="sm"
                                title="Hapus"
                                onClick={() => handleShowModal(item.id, "income")}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Row>

                <Row className="text-end">
                  <Col>
                    <Link to="/tambahincome" className="btn btn-primary">
                      Tambah Data Pendapatan
                    </Link>
                  </Col>
                </Row>
              </div>
              <div className="p-2 mt-2 bg-light border rounded">
                <Row>
                  <h3 className="text-center">Belanja / Pengeluaran</h3>
                </Row>
                <Row>
                  <Table hover size="sm" responsive className="mt-1 " bordered>
                    <thead>
                      <tr className="text-center">
                        <th>No</th>
                        <th>Jenis Outcome</th>
                        <th>Sumber Dana</th>
                        <th>Bulan</th>
                        <th>Tahun Anggaran</th>
                        <th>Bidang</th>
                        <th>Realisasi</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataOutcome.map((item, index) => {
                        const rowClass =
                          item.jenis_outcome === "Belanja"
                            ? "bg-success-subtle " // Kelas Bootstrap untuk Pendapatan
                            : item.jenis_outcome === "Pengeluaran"
                            ? "bg-warning-subtle text-dark" // Kelas Bootstrap untuk Pembiayaan
                            : "";

                        return (
                          <tr key={index}>
                            <td className={`text-center ${rowClass}`}>{index + 1}</td>
                            <td className={rowClass}>{item.jenis_outcome}</td>
                            <td className={rowClass}>{item.sumber_dana}</td>
                            <td className={`text-end ${rowClass}`}>{getNamaBulan(item.bulan)}</td>
                            <td className={`text-center ${rowClass}`}>{item.tahun_anggaran}</td>
                            <td className={`${rowClass}`}>{item.bidang}</td>
                            <td className={`text-end ${rowClass}`}>{formatRupiah(item.realisasi)} </td>

                            <td className="text-center">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                title="Edit"
                                onClick={() => handleEditOutcome(item.id)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>

                              <Button
                                variant="outline-danger"
                                size="sm"
                                title="Hapus"
                                onClick={() => handleShowModal(item.id, "outcome")}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Row>
                <Row className="text-end">
                  <Col>
                    <Link to="/tambahoutcome" className="btn btn-primary">
                      Tambah Data Belanja
                    </Link>
                  </Col>
                </Row>
              </div>
            </section>
          </div>
        </Container>
      </Container>
      {showModal && (
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
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>Apakah Anda yakin ingin menghapus data ini?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Batal
                </button>
                {isLoading ? (
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
                <p>Data berhasil dihapus.</p>
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

export default DashboardAPB;
