import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NavbarComponent from "../components/Navbar";
import { Container, Navbar, Nav, NavDropdown, Offcanvas, Spinner, Button, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const DashboardUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const { userName } = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const handleShowModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Sembunyikan modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };
  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      setIsLoadingDelete(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/auth/users/${selectedId}`);
      setShowModal(false);
      setShowSuccessModal(true); // Tampilkan modal sukses
      setIsLoadingDelete(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload(); // Reload halaman setelah modal ditutup
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users`);
        setDataUser(response.data.users);
        setIsLoadingData(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getUser();
  }, []);
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
                  <h1 className="fw-bold">Kelola Pengguna dan Otoritas</h1>
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
            <section className="card shadow-lg p-4 border-0 mt-2">
              <Row className="justify-content-end">
                <Col className="text-end">
                  <Link to="/register" className="btn btn-primary">
                    Tambah Pengguna
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table responsive="md mt-2" bordered>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {isLoadingData ? (
                      <thead>
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
                      </thead>
                    ) : (
                      <tbody>
                        {dataUser.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="text-center">
                              <button
                                className="btn btn-danger"
                                disabled={userName === user.username} // Menonaktifkan jika username login sama dengan user.username
                                onClick={() => handleShowModal(user.id)}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </Table>
                </Col>
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
                <p>Apakah Anda yakin ingin menghapus user ini?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Batal
                </button>
                {isLoadingDelete ? (
                  <button className="btn btn-danger" onClick={handleDelete} disabled>
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
                <p>User berhasil dihapus.</p>
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

export default DashboardUser;
