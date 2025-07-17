import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NavbarComponent from "../components/Navbar";
import {
  Container,
  Offcanvas,
  Button,
  Row,
  Col,
  Table,
  Spinner,
  Form,
  InputGroup,
  Modal,
  Alert,
  Card,
} from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
const DashboardDataDinamis = () => {
  // loading
  const [isLoading, setIsLoading] = useState(false);
  // kategori modal
  const [kategoriModal, setKategoriModal] = useState(false);
  const handleKategoriModal = () => {
    setKategoriModal(true);
  };
  const handleCloseKategoriModal = () => {
    setKategoriModal(false);
  };
  // formdata
  const [formData, setFormData] = useState({
    tipe: "",
    data: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // reset error sebelum kirim

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/dinamis/insertKategori`, formData);

      setFormData({ tipe: "", data: "" });
      setIsLoading(false);
      setKategoriModal(false);
      triggerAlert();
      window.location.reload();
    } catch (error) {
      setIsLoading(false);

      // Periksa apakah error dari backend terkait duplikasi
      if (error.response.data.status === "error") {
        setError("Kategori sudah ada.");
      } else {
        setError("Terjadi kesalahan saat menyimpan data.");
      }
    }
  };
  // success alert
  const [showAlert, setShowAlert] = useState(false);
  const triggerAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  // get data
  const [dataNik, setDataNik] = useState([]);
  const [dataKK, setDataKK] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseNik = await axios.get(`${import.meta.env.VITE_API_URL}/dinamis/kategori/nik`);
        const responseKK = await axios.get(`${import.meta.env.VITE_API_URL}/dinamis/kategori/kk`);

        setDataNik(responseNik.data.data);
        setDataKK(responseKK.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dataNik, dataKK]);
  // Hapus data kategori
  const [deleteModal, setDeleteModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);

  const handleDeleteModal = (data) => {
    setDeleteModal(true);
    setDataToDelete(data);
  };
  const handleDeleteKategori = async () => {
    const correctPassword = import.meta.env.VITE_DELETE_PASSWORD;

    if (deletePassword !== correctPassword) {
      setDeleteError("Password salah. Tidak bisa menghapus data.");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/dinamis/deletekategori`, {
        data: { data: dataToDelete },
      });

      setDeleteModal(false);
      setDataToDelete(null);
      setDeletePassword("");
      setDeleteError("");
      window.location.reload(); // atau panggil fetchData()
    } catch (error) {
      console.error("Error deleting data:", error);
      setDeleteError("Terjadi kesalahan saat menghapus data.");
    }
  };

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  // navigate
  const navigate = useNavigate();
  const handleNavigateNik = (path) => {
    navigate("/datadinamisnik/" + path);
  };
  const handleNavigateKk = (path) => {
    navigate("/datadinamiskk/" + path);
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
                  <h1 className="fw-bold">Data Dinamis Penduduk</h1>

                  <p className="text-light opacity-75">
                    Data Dinamis Penduduk : Pertanian, Peternakan, Kesehatan, Sanitasi, dll
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
            <section>
              <Row className="m-2 ">
                <Col className="d-flex justify-content-end">
                  <Button onClick={handleKategoriModal}>Tambah Kategori Data</Button>
                </Col>
              </Row>
            </section>
            <section className="shadow-lg p-2">
              <Row className="m-2 ">
                <Col className="">
                  <h3>Data Dinamis Individu</h3>
                </Col>
              </Row>
              <hr />
              <Row>
                {dataNik.map((item) => (
                  <Col key={item.id} md={6} className="mb-4">
                    <Card className="shadow-lg">
                      <Card.Body>
                        <Card.Text className="bg-primary rounded-2 p-4 d-flex justify-content-between align-items-center">
                          <Button
                            variant="link"
                            className="text-white text-start h3 mb-0 p-0 fs-4"
                            onClick={() => handleNavigateNik(item.data)}
                          >
                            Data {item.data}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="fs-4 p-1"
                            onClick={() => handleDeleteModal(item.data)}
                          >
                            <i className="bi bi-trash3"></i>
                          </Button>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
            <section className="shadow-lg p-2 mt-2">
              <Row className="m-2 ">
                <Col className="">
                  <h3>Data Dinamis Keluarga</h3>
                </Col>
              </Row>
              <hr />
              <Row>
                {dataKK.map((item) => (
                  <Col key={item.id} md={6} className="mb-4">
                    <Card className="shadow-lg">
                      <Card.Body>
                        <Card.Text className="bg-primary rounded-2 p-4 d-flex justify-content-between align-items-center">
                          <Button
                            variant="link"
                            className="text-white text-start h3 mb-0 p-0 fs-4"
                            onClick={() => handleNavigateKk(item.data)}
                          >
                            Data {item.data}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="fs-4 p-1"
                            onClick={() => handleDeleteModal(item.data)}
                          >
                            <i className="bi bi-trash3"></i>
                          </Button>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          </div>
        </Container>
      </Container>
      {kategoriModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <Form onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Tambah Kategori Data Dinamis</h5>
                  <button type="button" className="btn-close" onClick={handleCloseKategoriModal}></button>
                </div>
                <div className="modal-body">
                  {error && (
                    <Alert variant="danger" className="mt-2">
                      {error}
                    </Alert>
                  )}
                  <Form.Group>
                    <Form.Label className="fw-bold">Tipe Data Dinamis</Form.Label>
                    <Form.Select name="tipe" onChange={handleChange} value={formData.tipe} required>
                      <option value="">-- Pilih Tipe Data --</option>
                      <option value="nik">Data Dinamis Untuk Individu</option>
                      <option value="kk">Data Dinamis Untuk Keluarga</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Kategori Data</Form.Label>
                    <Form.Control
                      type="text"
                      name="data"
                      placeholder="Data Dinamis"
                      value={formData.data}
                      onChange={(e) => {
                        const value = e.target.value;
                        // hanya set value jika tidak mengandung spasi
                        if (!/\s/.test(value)) {
                          setFormData({ ...formData, data: value });
                        }
                      }}
                      required
                    />
                    {/\s/.test(formData.data) && <div className="text-danger mt-1">Tidak boleh mengandung spasi</div>}
                  </Form.Group>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" onClick={handleCloseKategoriModal}>
                    Batal
                  </button>
                  {isLoading ? (
                    <Button type="submit" variant="primary" disabled>
                      Menambahkan ...
                      <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary">
                      Tambahkan Kategori
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
      {showAlert && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, minWidth: "300px" }}>
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Kategori berhasil ditambahkan!
          </Alert>
        </div>
      )}

      <Modal show={deleteModal} onHide={() => setDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus kategori ini? Semua data kategori ini tidak bisa dikembalikan lagi!</p>

          <Form.Group controlId="deletePassword">
            <Form.Label>Masukkan Password</Form.Label>
            <Form.Control
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          {deleteError && <div className="text-danger mt-2">{deleteError}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDeleteModal(false);
              setDeletePassword("");
              setDeleteError("");
            }}
          >
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteKategori}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardDataDinamis;
