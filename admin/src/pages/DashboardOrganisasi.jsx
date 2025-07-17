import React, { useEffect, useState, useContext } from "react";
import NavbarComponent from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button, Modal, Row, Col, OverlayTrigger, Tooltip, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
const DashboardOrganisasi = () => {
  const [walinagari, setWalinagari] = useState("");
  const [dataOrganisasi, setDataOrganisasi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrganisasi = async () => {
      try {
        setIsLoading(true);
        const organisasi = await axios.get(`${import.meta.env.VITE_API_URL}/organisasi/main`);
        const walinagariData = organisasi.data.walinagari[0];
        const perangkat = organisasi.data.perangkatBamus;
        const perangkatSorted = perangkat.sort((a, b) => {
          const orgCompare = a.organisasi.localeCompare(b.organisasi);
          if (orgCompare !== 0) return orgCompare;

          const jabatanCompare = a.jabatan.localeCompare(b.jabatan);
          if (jabatanCompare !== 0) return jabatanCompare;

          return a.nama.localeCompare(b.nama);
        });
        // Gabungkan walinagari di awal
        const combined = [walinagariData, ...perangkatSorted];

        setWalinagari(walinagariData);
        setDataOrganisasi(combined);

        setIsLoading(false);
      } catch (error) {
        setWalinagari(null);
        setIsLoading(false);
      }
    };
    fetchOrganisasi();
  }, []);
  // console.log(dataOrganisasi);

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
                  <h1 className="fw-bold">Dashboard Kelola Data Organisasi</h1>
                  <p className="text-light opacity-75">Edit Data Perangkat, Organisasi dan Lembaga Nagari</p>
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
              <Row>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Foto</th>
                      <th>Organisasi</th>
                      <th>Jabatan</th>
                      <th>Nama</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  {isLoading ? (
                    <tbody>
                      <tr>
                        <td colSpan="10">
                          <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                            <Spinner animation="grow" variant="secondary" size="xxl" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {dataOrganisasi.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td style={{ width: "200px", height: "auto" }}>
                            {item.foto ? (
                              <img
                                src={`${import.meta.env.VITE_UPLOAD_URL + item.foto}`}
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
                          <td>{item.organisasi}</td>
                          <td>{item.jabatan}</td>
                          <td>{item.nama}</td>
                          <td className="text-center">
                            <Link to={`/editorganisasi/${item.id}`} className="btn btn-success m-1">
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </Table>
              </Row>
            </section>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default DashboardOrganisasi;
