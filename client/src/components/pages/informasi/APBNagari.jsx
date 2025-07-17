import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "react-bootstrap";
import Chart from "react-apexcharts";
import "./APBNagari.css";
import axios from "axios";
const APBNagari = () => {
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [pendapatan, setPendapatan] = useState(null);
  const [realisasiPendapatan, setRealisasiPendapatan] = useState(null);
  const [pembiayaan, setPembiayaan] = useState(null);
  const [realisasiPembiayaan, setRealisasiPembiayaan] = useState(null);
  const [belanja, setBelanja] = useState(null);
  const [pengeluaran, setPengeluaran] = useState(null);
  const [surplusDefisit, setSurplusDefisit] = useState(null);
  const [dataTahunan, setDataTahunan] = useState([]);
  const [dataBulananLabels, setDataBulananLabels] = useState([]);
  const [dataBulanan0, setDataBulanan0] = useState(null);
  const [dataBulanan1, setDataBulanan1] = useState(null);
  const [dataBulanan2, setDataBulanan2] = useState(null);
  const [dataBulanan3, setDataBulanan3] = useState(null);
  const [dataBulanan4, setDataBulanan4] = useState(null);
  useEffect(() => {
    const getApbNow = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/danadesa/apbnagari/${tahun}`);
        const data = response.data;

        const pendapatan = data.pendapatan.length > 0 ? parseFloat(data.pendapatan[0].total_pendapatan) : 0;
        const realisasiPendapatan =
          data.pendapatan.length > 0 ? parseFloat(data.pendapatan[0].realisasi_pendapatan) : 0;
        const pembiayaan = data.pembiayaan.length > 0 ? parseFloat(data.pembiayaan[0].total_pembiayaan) : 0;
        const realisasiPembiayaan =
          data.pembiayaan.length > 0 ? parseFloat(data.pembiayaan[0].realisasi_pembiayaan) : 0;
        const belanja = data.belanja.length > 0 ? parseFloat(data.belanja[0].realisasi_belanja) : 0;
        const pengeluaran = data.pengeluaran.length > 0 ? parseFloat(data.pengeluaran[0].realisasi_pengeluaran) : 0;
        const surplusDefisit = parseFloat(data.surplus_defisit);

        setPendapatan(pendapatan);
        setRealisasiPendapatan(realisasiPendapatan);
        setPembiayaan(pembiayaan);
        setRealisasiPembiayaan(realisasiPembiayaan);
        setBelanja(belanja);
        setPengeluaran(pengeluaran);
        setSurplusDefisit(surplusDefisit);
      } catch (error) {
        console.error(error);
      }
    };

    getApbNow();
  }, [tahun]);
  useEffect(() => {
    const getApbTahunan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/danadesa/apbtahunan`);
        const data = response.data.data;
        setDataTahunan(data);
      } catch (error) {
        console.error(error);
      }
    };

    getApbTahunan();
  }, []);
  useEffect(() => {
    const getApbBulanan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/danadesa/apbbulanan/${tahun}`);
        const data = response.data.data;

        if (data?.datasets && data.labels) {
          setDataBulananLabels([...data.labels]);
          setDataBulanan0(Array.isArray(data.datasets[0]?.data) ? [...data.datasets[0].data] : []);
          setDataBulanan1(Array.isArray(data.datasets[1]?.data) ? [...data.datasets[1].data] : []);
          setDataBulanan2(Array.isArray(data.datasets[2]?.data) ? [...data.datasets[2].data] : []);
          setDataBulanan3(Array.isArray(data.datasets[3]?.data) ? [...data.datasets[3].data] : []);
          setDataBulanan4(Array.isArray(data.datasets[4]?.data) ? [...data.datasets[4].data] : []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getApbBulanan();
  }, [tahun]);

  const apbTahun = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataTahunan.map((item) => item.tahun).reverse(),
        title: {
          text: "Tahun",
        },
        labels: {
          show: true,
          style: {
            fontSize: "12px",
          },
        },
      },
      title: {
        text: "Anggaran Pendapatan dan Belanja Nagari dari Tahun ke Tahun",
      },
      yaxis: {
        title: {
          text: "Jumlah",
        },
        min: 0,
        labels: {
          formatter: function (val) {
            return formatRupiahSingkat(val);
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
        formatter: function (val) {
          return formatRupiahSingkat(val);
        },
        offsetY: -10,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatRupiahSingkat(val);
          },
        },
        shared: true,
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Anggaran Pendapatan",
        data: dataTahunan
          .map((item) => (item.pendapatan.length > 0 ? parseFloat(item.pendapatan[0].total_pendapatan) : 0))
          .reverse(),
      },
      {
        name: "Belanja",
        data: dataTahunan
          .map((item) => (item.belanja.length > 0 ? parseFloat(item.belanja[0].realisasi_belanja) : 0))
          .reverse(),
      },
    ],
  };

  const apbBulan = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataBulananLabels,
        title: {
          text: "Bulan",
        },
        labels: {
          show: true,
          style: {
            fontSize: "12px",
          },
        },
      },
      title: {
        text: "Belanja Nagari Tahun 2025",
      },
      yaxis: {
        title: {
          text: "Jumlah",
        },
        min: 0,
        labels: {
          formatter: function (val) {
            return formatRupiahSingkat(val);
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
        formatter: function (val) {
          return formatRupiahSingkat(val);
        },
        offsetY: -10,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatRupiahSingkat(val);
          },
        },
        shared: true,
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Pelaksanaan Pembangunan",
        data: dataBulanan0,
      },
      {
        name: "Pemberdayaan Kemasyarakatan",
        data: dataBulanan1,
      },
      {
        name: "Pembinaan Kemasyarakatan",
        data: dataBulanan2,
      },
      {
        name: "Pemerintahan",
        data: dataBulanan3,
      },
      {
        name: "Penanggulangan Bencana",
        data: dataBulanan4,
      },
    ],
  };

  const formatRupiahSingkat = (angka) => {
    const num = parseFloat(angka);
    if (isNaN(num)) return "-";

    if (num >= 1_000_000_000) {
      return `Rp ${(num / 1_000_000_000).toFixed(2)} M`;
    } else if (num >= 1_000_000) {
      return `Rp ${(num / 1_000_000).toFixed(2)} Jt`;
    } else if (num >= 1_000) {
      return `Rp ${(num / 1_000).toFixed(2)} Rb`;
    } else {
      return `Rp ${num.toFixed(2)}`;
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(angka);
  };
  return (
    <section className="apbnagari my-5 pt-5">
      <Container>
        <h1>Anggaran Pendapatan dan Belanja Nagari (APB)</h1>
        <Row>
          <Col className="text-center">
            <h3>APB Nagari Tahun {tahun}</h3>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center border rounded-4 p-2 bg-dark-subtle mt-3">
              <Card.Body className="fs-4 fw-bold">
                <i className="bi bi-cash"></i> Anggaran Pendapatan
              </Card.Body>
              <Card.Footer className="fs-4 fw-bold text-success">{formatRupiah(pendapatan)}</Card.Footer>
            </div>
          </Col>
          <Col md={6}>
            <div className="text-center border rounded-4 p-2 bg-dark-subtle mt-3">
              <Card.Body className="fs-4 fw-bold">
                <i className="bi bi-cash"></i> Pembiayaan
              </Card.Body>
              <Card.Footer className="fs-4 fw-bold text-success">{formatRupiah(pembiayaan)}</Card.Footer>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center border rounded-4 p-2 bg-dark-subtle mt-3">
              <Card.Body className="fs-4 fw-bold">
                <i className="bi bi-box-arrow-down"></i> Realisasi Pendapatan
              </Card.Body>
              <Card.Footer className="fs-4 fw-bold text-success">{formatRupiah(realisasiPendapatan)}</Card.Footer>
            </div>
          </Col>
          <Col md={6}>
            <div className="text-center border rounded-4 p-2 bg-dark-subtle mt-3">
              <Card.Body className="fs-4 fw-bold">
                <i className="bi bi-box-arrow-down"></i> Realisasi Pembiayaan
              </Card.Body>
              <Card.Footer className="fs-4 fw-bold text-success">{formatRupiah(realisasiPembiayaan)}</Card.Footer>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center border rounded-4 p-2 bg-success-subtle mt-3">
              <Card.Body className="fs-4 fw-bold">
                <i className="bi bi-box-arrow-up"></i>Total Belanja
              </Card.Body>
              <Card.Footer className="fs-4 fw-bold text-success">{formatRupiah(belanja)}</Card.Footer>
            </div>
          </Col>
          <Col md={6}>
            <div className="text-center border rounded-4 p-2 bg-success-subtle mt-3">
              <Card.Body className="fs-4 fw-bold">
                <i className="bi bi-box-arrow-up"></i>Pengeluaran Pembiayaan
              </Card.Body>
              <Card.Footer className="fs-4 fw-bold text-success">{formatRupiah(pengeluaran)}</Card.Footer>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className={`text-center border rounded-4 p-2 mt-3 ${surplusDefisit < 0 ? "bg-danger" : "bg-success"}`}>
              <Card.Body className="fs-4 fw-bold">Surplus / Defisit</Card.Body>
              <Card.Footer className="fs-4 fw-bold ">{formatRupiah(surplusDefisit)}</Card.Footer>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h3>Belanja Bulanan Nagari Tahun {tahun} </h3>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            {dataBulananLabels.length > 0 && (
              <Chart options={apbBulan.options} series={apbBulan.series} type="bar" height={400} />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default APBNagari;
