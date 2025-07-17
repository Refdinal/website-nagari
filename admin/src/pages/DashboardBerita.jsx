import React, { useEffect, useState, useContext } from "react";
import NavbarComponent from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button, Modal, Row, Col, OverlayTrigger, Tooltip, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
const DashboardBerita = () => {
  const [dataBerita, setDataBerita] = useState([]);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { isAdmin, userName } = useContext(AuthContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const handleShowModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Sembunyikan modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  // Fungsi hapus data berdasarkan ID
  const handleDelete = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/informasi/${selectedId}`);
      setShowModal(false);
      setShowSuccessModal(true); // Tampilkan modal sukses
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };
  useEffect(() => {
    const getInformasi = async () => {
      setIsLoadingData(true);
      try {
        const apiUrl = isAdmin
          ? `${import.meta.env.VITE_API_URL}/api/informasiall/${limit}`
          : `${import.meta.env.VITE_API_URL}/api/informasi/${userName}/${limit}`;
        const response = await axios.get(apiUrl);
        setDataBerita(response.data.informasi);
        setIsLoadingData(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getInformasi();
  }, [limit]);
  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 10); // Tambah 5 setiap kali diklik
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload(); // Reload halaman setelah modal ditutup
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
                transition: "0.3s",
                borderRadius: "15px",
              }}
            >
              <Row
                className="rounded-3 shadow-lg m-1 py-3 px-4 align-items-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}
              >
                <Col md={8}>
                  <h1 className="fw-bold">Dashboard Informasi Publik</h1>
                  <p className="text-light opacity-75">Edit Berita Nagari</p>
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
              <Row className="justify-content-end">
                <Col className="text-end">
                  <Link to="/tambahinformasi" className="btn btn-primary">
                    Tambah Berita
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table responsive className="mt-1" bordered>
                    <thead>
                      <tr className="text-center">
                        <th>No</th>
                        <th>Gambar</th>
                        <th>Judul Berita</th>
                        <th>File Pdf</th>
                        <th>Kategori</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Waktu Post</th>
                        <th>Galeri</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    {isLoadingData ? (
                      <tbody>
                        <tr>
                          <td colSpan="10">
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: "150px" }}
                            >
                              <Spinner animation="grow" variant="secondary" size="xxl" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {dataBerita.map((berita, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {berita.image ? (
                                <img
                                  src={`${import.meta.env.VITE_UPLOAD_URL + berita.image}`}
                                  alt=""
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "auto",
                                    transition: "transform 0.3s ease-in-out",
                                  }}
                                />
                              ) : (
                                "Tidak Ada Gambar"
                              )}
                            </td>
                            <td>{berita.title}</td>
                            <td>
                              {berita.pdf ? (
                                <a
                                  href={`${import.meta.env.VITE_UPLOAD_URL + berita.pdf}`}
                                  className="btn btn-primary"
                                  target="blank"
                                >
                                  Lihat File
                                </a>
                              ) : (
                                "Tidak Ada File"
                              )}
                            </td>
                            <td>{berita.category}</td>
                            <td>{berita.author}</td>
                            <td>{berita.status}</td>
                            <td>{berita.views}</td>
                            <td>
                              {new Date(berita.time_stamp).toLocaleString("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })}
                            </td>
                            <td className="text-center">
                              <Link
                                to={`/galerifotoberita/${berita.id}`}
                                className="btn btn-warning m-1"
                                title="Galeri Foto"
                              >
                                Foto
                              </Link>
                              <Link
                                to={`/galerivideoberita/${berita.id}`}
                                className="btn btn-warning m-1"
                                title="Galeri Video"
                              >
                                Video
                              </Link>
                            </td>
                            <td className="d-flex justify-content-center">
                              <Link
                                to={`/editinformasi/${berita.id}`}
                                className="btn btn-outline-primary btn-sm me-2"
                                title="Edit"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                title="Hapus"
                                onClick={() => handleShowModal(berita.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </Table>
                </Col>
                {isLoadingData ? (
                  <button className="btn btn-primary m-1" onClick={loadMore} disabled>
                    Mengambil Data ... <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  </button>
                ) : (
                  <button className="btn btn-primary m-1" onClick={loadMore}>
                    Lebih Banyak
                  </button>
                )}
              </Row>
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

export default DashboardBerita;
