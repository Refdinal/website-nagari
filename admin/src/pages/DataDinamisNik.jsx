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
const DataDinamisNik = () => {
  const { kategori } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dinamis/kategorilistnik/${kategori}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleDownloadExcel = () => {
    // Buat array baru tanpa properti `id`
    const cleanedData = data.map(({ id, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Data ${kategori}`);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(dataBlob, `Data_${kategori}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };
  // delete
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const handleDeleteModal = (id) => {
    setIdToDelete(id);
    setDeleteModal(true);
  };
  const handleDelete = async () => {
    if (!idToDelete) return;

    setIsLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/dinamis/deletedatadinamisnik/${idToDelete}`);
      setDeleteModal(false);
      setShowSuccessModal(true); // Tampilkan modal sukses
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
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
                  <h1 className="fw-bold">Data {kategori}</h1>

                  <p className="text-light opacity-75">Data Dinamis Penduduk : Data {kategori} Penduduk</p>
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
            <section className="m-2 p-2">
              <Row>
                <Col>
                  <h3>Daftar Data {kategori} Penduduk Nagari Kamang Tangah Anam Suku</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>NIK</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Keterangan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => (
                          <tr key={item.id || index}>
                            <td>{index + 1}</td>
                            <td>{item.nik}</td>
                            <td>{item.nama}</td>
                            <td>{item.alamat}</td>
                            <td>{item.keterangan}</td>
                            <td className="d-flex justify-content-center">
                              {" "}
                              <Button
                                variant="outline-danger"
                                size="sm"
                                title="Hapus"
                                onClick={() => handleDeleteModal(item.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center text-muted">
                            Tidak ada data tersedia
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>{" "}
              <Row className="mb-3">
                <Col className="text-end">
                  <Button variant="success" onClick={handleDownloadExcel}>
                    Download Excel
                  </Button>
                </Col>
              </Row>
            </section>
          </div>
        </Container>
      </Container>
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Data</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Tutup
          </Button>
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
        </Modal.Footer>
      </Modal>{" "}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil dihapus</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowSuccessModal(false);
              window.location.reload();
            }}
          >
            oke
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataDinamisNik;
