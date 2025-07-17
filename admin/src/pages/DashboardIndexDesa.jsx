import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/Navbar";
import { Container, Offcanvas, Button, Row, Col, Table, Spinner, Form, InputGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const DashboardIndexDesa = () => {
  const [tambahTahunModal, setTambahTahunModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearShow, setYearShow] = useState(currentYear);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [dataTahunan, setDataTahunan] = useState([]);
  const [index, setIndex] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeDimensi, setActiveDimensi] = useState(null);
  const [activeSubDimensi, setActiveSubDimensi] = useState(null);
  const [activeIndikator, setActiveIndikator] = useState(null);
  const [activeAspek, setActiveAspek] = useState(null);
  const [activeSkor, setActiveSkor] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);
  useEffect(() => {
    const getIndexTahunan = async () => {
      try {
        const index = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/index/indexdesa/${yearShow}`);
        const indexdata = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/index/indexdata/${yearShow}`);

        setDataTahunan(indexdata.data.data);

        setIndex(index.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getIndexTahunan();
  }, [yearShow]);
  const handleTahunModal = () => {
    setTambahTahunModal(true);
  };
  const handleCloseTahunModal = () => {
    setTambahTahunModal(false);
  };
  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleTambahTahun = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_UPLOAD_URL}/index/indexdata/${selectedYear}`);

      if (response.data.status === "success") {
        setShowSuccessModal(true);
        setTambahTahunModal(false); // ⬅️ tutup modal tambah tahun
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_UPLOAD_URL}/index/indexdata/${yearShow}`);
      if (response.data.status === "success") {
        setShowDeleteModal(false);
        window.location.reload();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = (id, dimensi, subdimensi, indikator, aspek, skor) => {
    setActiveId(id);
    setActiveDimensi(dimensi);
    setActiveSubDimensi(subdimensi);
    setActiveIndikator(indikator);
    setActiveAspek(aspek);
    setActiveSkor(skor);
    setEditModal(true);
  };
  const handleCloseEditModal = () => {
    setEditModal(false);
    setActiveId(null);
    setActiveDimensi(null);
    setActiveSubDimensi(null);
    setActiveIndikator(null);
    setActiveAspek(null);
    setActiveSkor(null);
  };

  const handlePatch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_UPLOAD_URL}/index/indexdata/${activeId}`, {
        skor: activeSkor,
      });
      if (response.data.status === "success") {
        setEditModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
                  <h1 className="fw-bold">Index Desa</h1>

                  <p className="text-light opacity-75">Kelola data Index Desa</p>
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
            <section>
              <Row className="m-3">
                <Col className="d-flex p-2 ">
                  <a
                    href="/assets/pdf/permendes-indexdesa.pdf"
                    download
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Panduan (Permendes No.9 Th.2024)
                  </a>
                </Col>
                <Col className="d-flex p-2 justify-content-end">
                  <Button onClick={handleTahunModal}>Tambah Tahun</Button>
                </Col>
              </Row>
              <Row className="m-3 d-flex ">
                <Col md={6} className="d-flex  p-2">
                  <h5 className="me-3 ">Pilih Tahun</h5>
                  <select
                    className="form-select w-auto"
                    id="tahun"
                    value={yearShow}
                    onChange={(e) => setYearShow(parseInt(e.target.value))}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={3} className="d-flex  p-2">
                  <h5 className="me-3 mb-0">
                    Index Tahun {yearShow} :{" "}
                    <span className="fw-bold">{index && index[2] ? index[2].index_desa : "-"}</span>
                  </h5>
                </Col>
                {dataTahunan.length > 0 && (
                  <Col md={3} className="d-flex justify-content-end p-2">
                    <Button onClick={handleDeleteModal}>Hapus Index {yearShow}</Button>
                  </Col>
                )}
              </Row>
              <Row className="m-2">
                <Col>
                  <Table striped bordered hover responsive className="align-middle text-center">
                    <thead className="table-primary">
                      <tr>
                        <th>Edit</th>
                        <th>Nomor</th>
                        <th>Dimensi</th>
                        <th>Sub-Dimensi</th>
                        <th>Indikator</th>
                        <th>Aspek</th>
                        <th>Skor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTahunan.map((item, i) => {
                        let skorBg = "";
                        if (item.skor === 5) skorBg = "bg-success text-white";
                        else if (item.skor === 4) skorBg = "bg-info text-white";
                        else if (item.skor === 3) skorBg = "bg-warning";
                        else if (item.skor === 2) skorBg = "bg-secondary text-white";
                        else if (item.skor === 1) skorBg = "bg-danger text-white";

                        return (
                          <tr key={item.id}>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                title="Edit"
                                onClick={() =>
                                  handleEdit(
                                    item.id,
                                    item.dimensi,
                                    item.sub_dimensi,
                                    item.indikator,
                                    item.aspek_penilaian,
                                    item.skor
                                  )
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                            </td>
                            <td>{i + 1}</td>
                            <td>{item.dimensi}</td>
                            <td>{item.sub_dimensi}</td>
                            <td>{item.indikator}</td>
                            <td>{item.aspek_penilaian}</td>
                            <td className={skorBg}>{item.skor}</td>
                          </tr>
                        );
                      })}

                      <tr className="fw-bold">
                        <td colSpan={6} className="text-end">
                          Total Skor
                        </td>
                        <td>
                          {index && index[0] ? index[0].skor : "-"} / {index && index[1] ? index[1].max_skor : "-"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </section>
          </div>
        </Container>
      </Container>
      {tambahTahunModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Index Tahunan</h5>
                <button type="button" className="btn-close" onClick={handleCloseTahunModal}></button>
              </div>
              <div className="modal-body">
                <p>Pilih Tahun untuk ditambahkan data index desa</p>
                <select
                  className="form-select mt-2"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseTahunModal}>
                  Batal
                </button>
                {isLoading ? (
                  <button className="btn btn-primary" disabled>
                    Menambahkan...
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleTambahTahun}>
                    Tambahkan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Berhasil</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowSuccessModal(false);
                    window.location.reload();
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>Data Index untuk tahun {selectedYear} berhasil ditambahkan.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setShowSuccessModal(false);
                    window.location.reload();
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
                <h5 className="modal-title">Hapus Data Tahun {yearShow}</h5>
                <button type="button" className="btn-close" onClick={handleCloseDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Anda Yakin Ingin Menghapus Data Ini? semua data pada tahun {yearShow} akan dihapus</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseDeleteModal}>
                  Batal
                </button>
                {isLoading ? (
                  <button className="btn btn-primary" disabled>
                    Menghapus...
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleDelete}>
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {editModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Skor Penilaian </h5>
                <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
              </div>
              <div className="modal-body">
                <p>Dimensi : {activeDimensi}</p>
                <p>Sub-Dimensi : {activeSubDimensi}</p>
                <p>Indikator : {activeIndikator}</p>
                <p>Aspek : {activeAspek}</p>
                <div className="mt-3">
                  <label htmlFor="skorSelect" className="form-label">
                    Skor:
                  </label>
                  <select
                    id="skorSelect"
                    className="form-select"
                    value={activeSkor}
                    onChange={(e) => setActiveSkor(parseInt(e.target.value))}
                  >
                    <option value="">Pilih Skor</option>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseEditModal}>
                  Batal
                </button>
                {isLoading ? (
                  <button className="btn btn-primary" disabled>
                    Menyimpan...
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handlePatch}>
                    Simpan Perubahan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardIndexDesa;
