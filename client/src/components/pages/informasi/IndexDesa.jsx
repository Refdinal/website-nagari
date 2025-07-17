import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Table } from "react-bootstrap";
import Chart from "react-apexcharts";
import "./IndexDesa.css";
import axios from "axios";
const IndexDesa = () => {
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [index, setIndex] = useState(0);
  const [dataTahunan, setDataTahunan] = useState([]);
  const last5Years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  useEffect(() => {
    const getIndexTahunan = async () => {
      try {
        const index = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/index/indexdesa/${tahun}`);
        const indexdata = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/index/indexdata/${tahun}`);

        setDataTahunan(indexdata.data.data);

        setIndex(index.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getIndexTahunan();
  }, [tahun]);
  const handleSelect = (e) => {
    setTahun(e.target.value);
  };
  return (
    <section className="indexdesa my-5 pt-5">
      <Container className="py-4">
        <h1 className="fw-bold text-primary mb-3 text-center">Indeks Desa</h1>
        <Row className="align-items-center mb-4">
          <Col md={7}>
            <p className="fs-5 fw-semibold text-justify">
              Indeks Desa ini disajikan berdasarkan <strong>Peraturan Menteri Desa PDTT Nomor 9 Tahun 2024</strong>{" "}
              tentang Indeks Desa.
            </p>
            <div className="mb-3">
              <label className="form-label fw-semibold">Pilih Tahun:</label>
              <select className="form-select" value={tahun} onChange={handleSelect}>
                <option value="">-- Pilih Tahun --</option>
                {last5Years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </Col>

          <Col md={5} className="d-flex align-items-stretch">
            <div
              className="text-center shadow-lg border-0 w-100"
              style={{
                background: "linear-gradient(135deg, #0d6efd, #5c9eff)",
                color: "#fff",
                borderRadius: "1rem",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                maxHeight: "400px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              <div>
                <i className="bi bi-bar-chart-fill mb-3" style={{ fontSize: "2rem" }}></i>
                <h1 className="fs-4 text-uppercase" style={{ opacity: 0.9 }}>
                  Indeks Desa Tahun {tahun || "..."}
                </h1>

                <hr style={{ width: "60px", borderTop: "3px solid #fff", margin: "0.5rem auto 1rem" }} />
                <h1 style={{ fontSize: "4rem", fontWeight: "bold", margin: 0 }}>
                  {index && index[2] ? index[2].index_desa : "--"}
                </h1>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="text-center">
            <h4 className="fw-semibold border-bottom pb-2">Rincian Indikator Indeks Desa</h4>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover responsive className="align-middle text-center">
              <thead className="table-primary">
                <tr>
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
                  <td colSpan={5} className="text-end">
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
      </Container>
    </section>
  );
};

export default IndexDesa;
