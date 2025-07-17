import { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "./Home.css";
import truncateText from "../../../function/truncateText";
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
// Fungsi hitung jarak antar dua koordinat (dalam meter)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // jari-jari bumi dalam meter
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // hasil dalam meter
}

const Home = () => {
  const defaultCarouselData = [
    {
      id: "1",
      title: "Nagari Kamang Tangah Anam Suku ",
      image: "carousel.jpeg",
    },
  ];
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [pendapatan, setPendapatan] = useState(null);
  const [realisasiPendapatan, setRealisasiPendapatan] = useState(null);
  const [pembiayaan, setPembiayaan] = useState(null);
  const [realisasiPembiayaan, setRealisasiPembiayaan] = useState(null);
  const [belanja, setBelanja] = useState(null);
  const [pengeluaran, setPengeluaran] = useState(null);
  const [surplusDefisit, setSurplusDefisit] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedGempa, setSelectedGempa] = useState(null);
  const [gempaDistance, setGempaDistance] = useState(null);
  const [dataCuaca, setDataCuaca] = useState([]);
  const [carouselHeight, setCarouselHeight] = useState("100vh");
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [dataCarousel, setDataCarousel] = useState(defaultCarouselData);
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [dataBerita, setDataBerita] = useState([]);
  const [dataNagari, setDataNagari] = useState([]);
  const [dataDasar, setDataDasar] = useState([]);
  const [walinagari, setWalinagari] = useState([]);
  const [indexDesa, setIndexDesa] = useState(null);
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
        const indexDesa = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/index/indexdesa/2025`);
        setIndexDesa(indexDesa.data.data[2].index_desa);
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
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(angka);
  };
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Tukar elemen
    }
    return array;
  };
  // State untuk perangkat yang sudah diacak
  const [perangkatAcak, setPerangkatAcak] = useState([]);

  // Gunakan useEffect untuk mengacak perangkat saat pertama kali komponen di-render

  // fungsi data gempa
  const userLocation = {
    latitude: -0.21566710192797695,
    longitude: 100.41133640123044,
  };
  // walinagari, perangkat
  useEffect(() => {
    const fetchOrganisasi = async () => {
      try {
        const organisasi = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/organisasi/main`);
        setWalinagari(organisasi.data.walinagari[0]);
        setPerangkatAcak(shuffleArray([...organisasi.data.perangkatBamus]));
      } catch (error) {
        console.error("Gagal mengambil data ", error);
      }
    };
    fetchOrganisasi();
  }, []);

  useEffect(() => {
    const fetchGempa = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/datagempa/gempa`);
        const now = new Date();

        // 1. Hitung semua jarak
        const gempaWithDistance = data.Infogempa.gempa.map((gempa) => {
          const [lat, lon] = gempa.Coordinates.split(",").map(parseFloat);
          const distance = getDistance(userLocation.latitude, userLocation.longitude, lat, lon); // meter
          return { ...gempa, distance };
        });

        // 2. Filter: hanya yang jaraknya <= 200.000 meter (200 km)
        const nearby = gempaWithDistance.filter((gempa) => gempa.distance <= 200000);

        // 3. Filter lagi: hanya yang <= 2 jam terakhir
        const recentNearby = nearby.filter((gempa) => {
          const gempaTime = new Date(gempa.DateTime);
          const hoursAgo = (now - gempaTime) / (1000 * 60 * 60);
          return hoursAgo <= 12;
        });

        // 4. Ambil yang paling baru jika ada
        if (recentNearby.length > 0) {
          const latest = recentNearby.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))[0];
          setSelectedGempa(latest);
          setGempaDistance(latest.distance); // simpan jarak
          setShow(true);
        } else {
          setSelectedGempa(null);
          setGempaDistance(null);
          setShow(false);
        }
      } catch (error) {
        console.error("Gagal mengambil data gempa:", error);
      }
    };

    fetchGempa();
  }, []);
  // cuaca
  const suhuToColor = {
    15: "#cfe2ff",
    16: "#bcdfff",
    17: "#a9dcff",
    18: "#97d9ff",
    19: "#d0ebff",
    20: "#b8e0ff",
    21: "#e0f7fa",
    22: "#e6f9d6",
    23: "#f7fcd6",
    24: "#fff6cc",
    25: "#ffe9b8",
    26: "#ffdca1",
    27: "#ffcc99",
    28: "#ffb68a",
    29: "#ffa07a",
    30: "#ff8c66",
  };
  // Fungsi untuk format tanggal
  const formatDateCuaca = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", options); // Menggunakan lokal Indonesia
  };
  useEffect(() => {
    const getCuaca = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/datacuaca/cuaca`);
        setDataCuaca(data);
      } catch (error) {
        console.error("Gagal mengambil data cuaca:", error);
      }
    };
    getCuaca();
  }, []);
  // fungsi memendekkan text

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Mulai loading sebelum fetch
      try {
        const carouselUrl = `${import.meta.env.VITE_API_URL}/carousel`;
        const nagariUrl = `${import.meta.env.VITE_API_URL}/datanagari`;
        const beritaUrl = `${import.meta.env.VITE_API_URL}/informasi/3`;
        const pendudukUrl = `${import.meta.env.VITE_UPLOAD_URL}/penduduk/statistik/datadasar`;

        const [carouselRes, nagariRes, beritaRes, datadasarRes] = await Promise.all([
          axios.get(carouselUrl),
          axios.get(nagariUrl),
          axios.get(beritaUrl),
          axios.get(pendudukUrl),
        ]);

        // Handle Carousel
        if (Array.isArray(carouselRes.data.carousel) && carouselRes.data.carousel.length > 0) {
          setDataCarousel(carouselRes.data.carousel);
          setIsApiLoaded(true);
        } else {
          setIsApiLoaded(false);
        }

        // Handle Data Nagari
        setDataNagari(nagariRes.data.dataNagari[0] || []);

        // Handle Berita
        setDataBerita(beritaRes.data.informasi || []);
        setDataDasar(datadasarRes.data.statistik[0]);
      } catch (error) {
        setIsApiLoaded(false);
        setDataNagari([]);
        setDataBerita([]);
      } finally {
        setLoading(false); // Selesai loading setelah semua fetch
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setCarouselHeight("auto");
      } else {
        setCarouselHeight("100vh");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value based on screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleBeritaClick = async (category, slug) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/views/${slug}`;
      await axios.post(url); // Tambahkan views saat tombol diklik
    } catch (error) {
      console.error("Gagal menambahkan views:", error);
    }
    window.location.href = `/informasi/${category}/${slug}`;
  };
  return (
    <div className="homecss">
      {loading ? (
        <div className="spinner-container">
          <div className="loading-circle">
            <img src="/assets/svg/logo.svg" alt="Loading..." className="loading-logo" />
          </div>
        </div>
      ) : (
        <>
          <section>
            <Carousel data-bs-theme="dark" className="jumbotron" fade indicators={false} controls={true}>
              {dataCarousel.map((item) => (
                <Carousel.Item key={item.id} interval={2000}>
                  <div className="carousel-overlay"></div>
                  <img
                    className="d-block w-100"
                    src={
                      isApiLoaded
                        ? import.meta.env.VITE_UPLOAD_URL + item.image
                        : `/assets/img/carouselimg/${item.image}`
                    }
                    alt="carousel"
                    style={{ height: carouselHeight, width: "100%", objectFit: "cover", minHeight: "100%" }}
                  />

                  <Carousel.Caption className="caption-animate">
                    <div className="carousel-caption-bg">
                      <p className="text-glow">{item.title}</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </section>

          <section className="py-4 bg-light">
            <Container>
              {/* Heading */}
              <Row className="justify-content-center mb-4">
                <Col md={12}>
                  {["Selamat Datang di Website Resmi", "Nagari Kamang Tangah Anam Suku", "Kabupaten Agam"].map(
                    (text, idx) => (
                      <h2
                        key={idx}
                        className="text-center fw-bold"
                        style={{
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          marginBottom: idx === 2 ? "2rem" : "0.5rem",
                        }}
                      >
                        {text}
                      </h2>
                    )
                  )}
                </Col>
              </Row>

              {/* Video + Card */}
              <Row>
                {/* Video */}
                <Col md={8} className="mb-4">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "400px",

                      borderRadius: "15px",
                      overflow: "hidden",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <iframe
                      src={dataNagari.yt_embed || "https://www.youtube.com/embed/4G2ZiGqC7BU?si=kSevaN2fdRzLoxKI"}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      sandbox="allow-same-origin allow-scripts allow-popups"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    ></iframe>
                  </div>
                </Col>

                {/* Card Index Desa */}
                <Col md={4} className="d-flex align-items-stretch">
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
                      <h5 className="text-uppercase" style={{ opacity: 0.9 }}>
                        Index Desa Tahun {new Date().getFullYear()}
                      </h5>

                      <hr style={{ width: "60px", borderTop: "3px solid #fff", margin: "0.5rem auto 1rem" }} />
                      <h1 style={{ fontSize: "4rem", fontWeight: "bold", margin: 0 }}>{indexDesa}</h1>
                      <div className="mt-4">
                        <Link to="/informasi/indexdesa">
                          <Button variant="primary" className="btn btn-light btn-custom">
                            Selengkapnya
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="py-5 bg-light border-top ">
            <Container className="">
              {walinagari && perangkatAcak.length > 0 && (
                <Row className="justify-content-center ">
                  {/* Kolom untuk Walinagari (4 kolom) */}
                  <Col md={4} className="d-flex justify-content-center mb-4 ">
                    <div style={{ width: "90%", maxWidth: "100%" }}>
                      <Card className="border-1 p-3 shadow-lg mt-1" style={{ width: "100%", maxWidth: "100%" }}>
                        <h4 className="text-center text-primary p-2 fw-bold ">Walinagari</h4>
                        <Card.Img
                          variant="top"
                          src={
                            walinagari && walinagari.foto
                              ? import.meta.env.VITE_UPLOAD_URL + walinagari.foto
                              : `/assets/img/staffnagariimg/defaultprofile.png`
                          }
                          className="rounded-3"
                        />
                        <Card.Body>
                          <Card.Text className="text-muted text-center fw-bold" style={{ fontSize: "0.8rem" }}>
                            {walinagari.nama}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                  <Col md={6} className="shadow-lg mb-4 rounded-4">
                    <Row>
                      <h4 className="text-center fw-bold text-primary p-4">
                        Sambutan Walinagari Kamang Tangah Anam Suku
                      </h4>
                    </Row>
                    <Row className="d-flex justify-content-center align-items-center py-3 px-4">
                      <p className="text-center fs-4  ">
                        <i>" {dataNagari.sambutan} "</i>
                      </p>
                    </Row>
                    <Row className="p-3">
                      <div className="text-end p-3 ">
                        <span className="fw-bold">{walinagari.nama}</span>
                      </div>
                    </Row>
                  </Col>

                  <Row>
                    {/* Kolom untuk perangkat lainnya (2 perangkat acak, 4 kolom masing-masing) */}
                    {perangkatAcak.slice(0, 4).map((perangkat, index) => (
                      <Col md={3} className="d-flex justify-content-center mb-4 shadow-sm" key={index}>
                        <div style={{ width: "90%", maxWidth: "100%" }}>
                          <Card className="border-0 p-3 shadow-lg my-3" style={{ width: "100%", maxWidth: "100%" }}>
                            {" "}
                            <h4 className="text-center text-primary" style={{ fontSize: "1.2rem" }}>
                              {perangkat.jabatan}
                            </h4>
                            <Card.Img
                              variant="top"
                              src={
                                perangkat && perangkat.foto
                                  ? import.meta.env.VITE_UPLOAD_URL + perangkat.foto
                                  : `/assets/img/staffnagariimg/defaultprofile.png`
                              }
                              className="rounded-3"
                            />
                            <Card.Body>
                              <Card.Text className="text-muted text-center fw-bold" style={{ fontSize: "0.8rem" }}>
                                {perangkat.nama}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Row>
              )}
              <Row className="mt-4 justify-content-around">
                <Col className="text-center mt-2" md={4}>
                  <Link to="/pemerintahan/struktur-organisasi-nagari">
                    <Button variant="primary" className="btn btn-light btn-custom">
                      Perangkat Nagari
                    </Button>
                  </Link>
                </Col>
                <Col className="text-center mt-2" md={4}>
                  <Link to="/pemerintahan/bamus-nagari">
                    <Button variant="primary" className="btn btn-light btn-custom">
                      Bamus Nagari
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </section>

          <section
            className="parallax-section"
            style={{ backgroundImage: 'url("/assets/img/background/bgparallax.jpg")' }}
          >
            <div className="overlay"></div>

            <Container style={{ position: "relative", zIndex: 2 }}>
              <h2 className="mb-5 fw-bold">Statistik Data Penduduk</h2>
              <Row className="text-center">
                <Col md={4} className="mb-4">
                  <h3 className="display-4 fw-bold">{dataDasar.jumlah_kk} KK</h3>
                  <p className="lead">Kepala Keluarga</p>
                </Col>

                <Col md={4} className="mb-4">
                  <h3 className="display-4 fw-bold">{dataDasar.jumlah_laki_laki} Jiwa</h3>
                  <p className="lead">Laki-Laki</p>
                </Col>
                <Col md={4} className="mb-4">
                  <h3 className="display-4 fw-bold">{dataDasar.jumlah_perempuan} Jiwa</h3>
                  <p className="lead">Perempuan</p>
                </Col>
              </Row>
              <Row className="text-center">
                <Col md={4} className="mb-4">
                  <h3 className="display-4 fw-bold">{dataDasar.jumlah_penduduk} Jiwa</h3>
                  <p className="lead">Total Penduduk</p>
                </Col>
                <Col md={4} className="mb-4">
                  <h3 className="display-4 fw-bold">4.21 Km2</h3>
                  <p className="lead">Luas Wilayah</p>
                </Col>
                <Col md={4} className="mb-4">
                  <h3 className="display-4 fw-bold">{(dataDasar.jumlah_penduduk / 4.214).toFixed(2)} Jiwa/Km²</h3>
                  <p className="lead">Kepadatan Penduduk</p>
                </Col>
              </Row>
              <div className="mt-4">
                <Link to="/statistik/demografi-penduduk">
                  <Button variant="primary" className="btn btn-light btn-custom">
                    Selengkapnya
                  </Button>
                </Link>
              </div>
            </Container>
          </section>
          <section>
            <Container className="py-4">
              <Row>
                <Col className="text-center">
                  <h3 className="fw-bold">APB Nagari Tahun {tahun}</h3>
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
                  <div
                    className={`text-center border rounded-4 p-2 mt-3 ${
                      surplusDefisit < 0 ? "bg-danger" : "bg-success"
                    }`}
                  >
                    <Card.Body className="fs-4 fw-bold">Surplus / Defisit</Card.Body>
                    <Card.Footer className="fs-4 fw-bold ">{formatRupiah(surplusDefisit)}</Card.Footer>
                  </div>
                </Col>
              </Row>
              <div className="mt-4 text-center">
                <Link to="/informasi/apbnagari">
                  <Button variant="primary" className="btn btn-light btn-custom">
                    Selengkapnya
                  </Button>
                </Link>
              </div>
            </Container>
          </section>
          <section className="bg-danger-subtle py-5">
            <Container className="py-4">
              <Row>
                <Col lg={9} className="border p-4 shadow-lg bg-light rounded-3">
                  <h3 className="text-center mb-4 text-primary fw-bold">
                    Info Terbaru Nagari Kamang Tangah Anam Suku
                    <img alt="" src="/assets/svg/logo.svg" width="40" height="40" />
                  </h3>
                  {dataBerita.length > 0 ? (
                    <Row>
                      {dataBerita.map((item) => (
                        <Row className="mb-1 mx-auto" key={item.id}>
                          <Card className="bg-light shadow-lg border-0 rounded-3 overflow-hidden">
                            <Card.Body className="d-flex flex-column p-4">
                              <Row className="g-0">
                                <Col md={4} className="d-flex align-items-center justify-content-center">
                                  <img
                                    src={
                                      item.image
                                        ? `${import.meta.env.VITE_UPLOAD_URL + item.image}`
                                        : `/assets/img/berita/${item.category}.png`
                                    }
                                    alt={`${item.category}`}
                                    className="card-img rounded-3"
                                    style={{
                                      objectFit: "cover",
                                      width: "100%",
                                      height: "190px",
                                      transition: "transform 0.3s ease-in-out",
                                    }}
                                  />
                                </Col>
                                <Col md={8} className="d-flex flex-column justify-content-between ps-md-4">
                                  <div>
                                    <Card.Title className="fs-4 fw-bold mb-2 text-primary">{item.title}</Card.Title>
                                    <Card.Text className="text-secondary">
                                      {truncateText(item.paragraph1, 200)}
                                    </Card.Text>
                                  </div>
                                  <Row className="d-flex  text-muted">
                                    <Col md={3} className="fw-bold">
                                      {item.category}
                                    </Col>
                                    <Col md={7} className="d-flex justify-content-start">
                                      <p className="small">
                                        {new Date(item.time_stamp).toLocaleString("id-ID", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          second: "2-digit",
                                        })}
                                      </p>
                                    </Col>
                                    <Col md={2} className="d-flex align-items-center">
                                      <AiOutlineEye size={20} className="me-1" />
                                      <p className="fw-bold mb-0">{item.views}</p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <Row className=" d-flex justify-content-between align-items-end">
                                <Col md={3}>
                                  <p className="fw-semibold">{item.author}</p>
                                </Col>

                                <Col md={6} className="d-flex justify-content-end">
                                  <Button
                                    className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
                                    style={{ transition: "background-color 0.3s ease-in-out" }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0d6efd")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
                                    onClick={() => handleBeritaClick(item.category, item.slug)}
                                  >
                                    Selengkapnya
                                  </Button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Row>
                      ))}
                    </Row>
                  ) : (
                    <h3 className="text-center">Belum ada Berita</h3>
                  )}
                </Col>

                <Col lg={3}>
                  <Row className="px-1 py-4 shadow-sm bg-light rounded-3">
                    <h4 className="text-center mb-2 text-primary fw-bold" style={{ fontSize: "1.5rem" }}>
                      Info Cuaca
                    </h4>
                    <div>
                      <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                        {dataCuaca.map((weather, index) => {
                          const bgColor = suhuToColor[weather.t] || "#ffffff"; // fallback putih

                          return (
                            <Row
                              key={index}
                              className="align-items-center mb-2 rounded-2"
                              style={{
                                backgroundColor: bgColor,
                                padding: "6px",
                                borderLeft: "5px solid #0d6efd",
                              }}
                            >
                              <Col xs={3} className="text-center">
                                <img
                                  src={weather.image}
                                  alt={weather.weather_desc}
                                  style={{ width: "28px", height: "28px" }}
                                />
                              </Col>

                              <Col xs={9}>
                                <p className="mb-0" style={{ fontSize: "0.75rem", color: "#333" }}>
                                  <strong>{formatDateCuaca(weather.local_datetime)}</strong>
                                </p>
                                <p className="mb-0" style={{ fontSize: "0.75rem", color: "#0d6efd" }}>
                                  <strong>{weather.t}°C</strong>
                                </p>
                                <p className="mb-0" style={{ fontSize: "0.75rem", color: "#555" }}>
                                  <strong>{weather.weather_desc}</strong>
                                </p>
                              </Col>
                            </Row>
                          );
                        })}
                      </div>
                    </div>
                  </Row>

                  <Row className="p-4 border shadow-lg bg-light rounded-3">
                    <h5 className="text-center mb-3 text-primary fw-bold">Lokasi Kantor Nagari</h5>
                    <Card className="border-0 p-2">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d705.3021282747129!2d100.4118454591135!3d-0.21547766008884794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd545dbf96cf8f5%3A0xde23567266001582!2sKANTOR%20NAGARI%20KAMANG%20TANGAH%20ANAM%20SUKU!5e0!3m2!1sen!2sid!4v1724989014985!5m2!1sen!2sid"
                        width="100%"
                        height="200px"
                        style={{ border: 0, borderRadius: "8px" }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Map Embed"
                        sandbox="allow-same-origin allow-scripts allow-popups"
                      ></iframe>
                    </Card>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <>
            {selectedGempa && (
              <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                style={{
                  border: "5px solid red",
                  animation: "blinker 1s linear infinite",
                  boxShadow: "0 0 20px red",
                }}
              >
                <Modal.Header closeButton style={{ backgroundColor: "#ffcccc" }}>
                  <Modal.Title id="example-custom-modal-styling-title" style={{ color: "red", fontWeight: "bold" }}>
                    ⚠️ Peringatan Gempa!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    <strong>Wilayah:</strong> {selectedGempa.Wilayah}
                  </p>
                  <p>
                    <strong>Magnitude:</strong> {selectedGempa.Magnitude}
                  </p>
                  <p>
                    <strong>Kedalaman:</strong> {selectedGempa.Kedalaman}
                  </p>
                  <p>
                    <strong>Waktu:</strong> {selectedGempa.Tanggal} {selectedGempa.Jam}
                  </p>
                  <p>
                    <strong>Dirasakan:</strong> {selectedGempa.Dirasakan}
                  </p>
                  <p>
                    <strong>Jarak dari lokasi :</strong> {(gempaDistance / 1000).toFixed(2)} km
                  </p>
                </Modal.Body>
              </Modal>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default Home;
