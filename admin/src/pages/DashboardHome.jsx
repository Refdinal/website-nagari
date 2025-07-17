import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { Container, Navbar, Nav, NavDropdown, Offcanvas, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Chart from "react-apexcharts";
const DashboardHome = () => {
  const { userName } = useContext(AuthContext);
  const [dailyVisit, setDailyVisit] = useState([]);
  const [weeklyVisit, setWeeklyVisit] = useState([]);
  const [monthlyVisit, setMonthlyVisit] = useState([]);
  const [total, setTotal] = useState([]);

  const dailyTrend = {
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: dailyVisit
          .map((item) => {
            const date = new Date(item.visit_date);
            return date.toLocaleDateString("id-ID", { day: "2-digit", month: "long" });
          })
          .reverse(),
        labels: {
          show: true,
        },
      },
      title: {
        text: "Tren Harian Pengunjung",
      },
      yaxis: {
        title: {
          text: "Jumlah Pengunjung",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: true, // Ubah ke true untuk horizontal
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Pengunjung`,
        data: dailyVisit.map((item) => item.total_visits).reverse(),
      },
    ],
  };

  const weeklyTrend = {
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: weeklyVisit
          .map((item) => {
            const date = new Date(item.week_start);
            const week = Math.ceil(date.getDate() / 7); // Hitung minggu ke-X dalam bulan
            const month = date.toLocaleDateString("id-ID", { month: "long" });
            return `M-${week} ${month}`;
          })
          .reverse(),

        labels: {
          show: true,
        },
      },
      title: {
        text: "Tren Mingguan Pengunjung",
      },
      yaxis: {
        title: {
          text: "Jumlah Pengunjung",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: true, // Ubah ke true untuk horizontal
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Pengunjung`,
        data: weeklyVisit.map((item) => item.total_visits).reverse(),
      },
    ],
  };
  const monthlyTrend = {
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: monthlyVisit
          .map((item) => {
            const date = new Date(item.month_start);
            const month = date.toLocaleDateString("id-ID", { month: "long" });
            return month;
          })
          .reverse(),

        labels: {
          show: true,
        },
      },
      title: {
        text: "Tren Bulanan Pengunjung",
      },
      yaxis: {
        title: {
          text: "Jumlah Pengunjung",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: true, // Ubah ke true untuk horizontal
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Pengunjung`,
        data: monthlyVisit.map((item) => item.total_visits).reverse(),
      },
    ],
  };
  useEffect(() => {
    const getVisitorData = async () => {
      try {
        const daily = await axios.get(`${import.meta.env.VITE_API_URL}/api/tracker/dailytracked`);
        const weekly = await axios.get(`${import.meta.env.VITE_API_URL}/api/tracker/weeklytracked`);
        const monthly = await axios.get(`${import.meta.env.VITE_API_URL}/api/tracker/monthlytracked`);
        const total = await axios.get(`${import.meta.env.VITE_API_URL}/api/tracker/totaltracked`);
        setDailyVisit(daily.data.data);
        setWeeklyVisit(weekly.data.data);
        setMonthlyVisit(monthly.data.data);
        setTotal(total.data.data);
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };
    getVisitorData();
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
        {" "}
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
                  <h1 className="fw-bold">Selamat Datang Kembali, {userName}! 👋</h1>
                  <p className="text-light opacity-75">Semoga harimu penuh energi, di Kamang Tangah hari ini! ⚡</p>
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
            <section className="mt-5">
              <h2 className="text-center mb-4 fw-bold">📊 Statistik Pengunjung</h2>
              <Row className="g-4">
                <Col md={3}>
                  <Card
                    className="shadow-lg text-center p-3 border-0"
                    style={{ backgroundColor: "#f8f9fa", transition: "0.3s" }}
                  >
                    <Card.Body>
                      <h5 className="text-muted">Hari Ini</h5>
                      <h2 className="fw-bold text-primary">
                        {dailyVisit.length > 0 ? (
                          dailyVisit[0].total_visits
                        ) : (
                          <Spinner animation="grow" variant="primary" />
                        )}
                      </h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    className="shadow-lg text-center p-3 border-0"
                    style={{ backgroundColor: "#f8f9fa", transition: "0.3s" }}
                  >
                    <Card.Body>
                      <h5 className="text-muted">Minggu Ini</h5>
                      <h2 className="fw-bold text-success">
                        {weeklyVisit.length > 0 ? (
                          weeklyVisit[0].total_visits
                        ) : (
                          <Spinner animation="grow" variant="primary" />
                        )}
                      </h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    className="shadow-lg text-center p-3 border-0"
                    style={{ backgroundColor: "#f8f9fa", transition: "0.3s" }}
                  >
                    <Card.Body>
                      <h5 className="text-muted">Bulan Ini</h5>
                      <h2 className="fw-bold text-warning">
                        {monthlyVisit.length > 0 ? (
                          monthlyVisit[0].total_visits
                        ) : (
                          <Spinner animation="grow" variant="primary" />
                        )}
                      </h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    className="shadow-lg text-center p-3 border-0"
                    style={{ backgroundColor: "#f8f9fa", transition: "0.3s" }}
                  >
                    <Card.Body>
                      <h5 className="text-muted">Total Kunjungan</h5>
                      <h2 className="fw-bold text-danger">
                        {total.length !== null ? total : <Spinner animation="grow" variant="primary" />}
                      </h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Row className="g-2 justify-content-center m-0">
                  <Col md={4}>
                    <Card className="shadow-lg text-center p-3 border-0">
                      <Chart options={dailyTrend.options} series={dailyTrend.series} height={300} />
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="shadow-lg text-center p-3 border-0">
                      <Chart options={weeklyTrend.options} series={weeklyTrend.series} height={300} />
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="shadow-lg text-center p-3 border-0">
                      <Chart options={monthlyTrend.options} series={monthlyTrend.series} height={300} />
                    </Card>
                  </Col>
                </Row>
              </Row>
            </section>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default DashboardHome;
