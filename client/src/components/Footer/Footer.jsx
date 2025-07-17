import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import axios from "axios";

const Footer = () => {
  const [dataNagari, setDataNagari] = useState([]);

  useEffect(() => {
    const fetchDataNagari = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/datanagari`;
        const response = await axios.get(url);
        setDataNagari(response.data.dataNagari[0]);
      } catch (error) {
        setDataNagari([]);
      }
    };
    fetchDataNagari();
  }, []);
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left">
            <Row>
              <h5 className="text-uppercase fw-bold text-white">Kamang Tangah Anam Suku</h5>
              <p className="text-white-50">
                Nagari Kamang Tangah Anam Suku, Kabupaten Agam. Pusat informasi dan komunikasi resmi.
              </p>
            </Row>
            <Row className="align-items-center text-center">
              <Col md={4}>
                <h6>
                  <Link to="/informasi/event" className="footer-link">
                    Event
                  </Link>
                </h6>
              </Col>
              <Col md={4}>
                <h6>
                  <Link to="/informasi/pengumuman" className="footer-link">
                    Pengumuman
                  </Link>
                </h6>
              </Col>
              <Col md={4}>
                <h6>
                  <Link to="/informasi/berita" className="footer-link ">
                    Berita
                  </Link>
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>
                  <Link to="/informasi/apbnagari" className="footer-link ">
                    APB Nagari
                  </Link>
                </h6>
              </Col>
              <Col>
                <h6>
                  <Link to="/informasi/indexdesa" className="footer-link ">
                    Index Desa
                  </Link>
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>
                  <Link to="/galeri/foto" className="footer-link ">
                    Galeri Foto
                  </Link>
                </h6>
              </Col>
              <Col>
                <h6>
                  <Link to="/galeri/video" className="footer-link ">
                    Galeri Video
                  </Link>
                </h6>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="text-center my-3 my-md-0">
            <h5 className="text-uppercase fw-bold text-white">Navigasi</h5>
            <Row>
              <Col md={6}>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="footer-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/sejarah" className="footer-link">
                      Sejarah
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/peta-wilayah" className="footer-link">
                      Peta Wilayah
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/fasilitas-bangunan" className="footer-link">
                      Fasilitas Bangunan
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/sosial-budaya" className="footer-link">
                      Sosial Budaya
                    </Link>
                  </li>
                  <li>
                    <Link to="/statistik/geografi-topografi" className="footer-link">
                      Geografi Topografi
                    </Link>
                  </li>
                  <li>
                    <Link to="/statistik/sumber-daya-alam" className="footer-link">
                      Sumber Daya Alam
                    </Link>
                  </li>
                  <li>
                    <Link to="/statistik/demografi-penduduk" className="footer-link">
                      Demografi Penduduk
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/pemerintahan/struktur-organisasi-nagari" className="footer-link">
                      Struktur Organisasi Nagari
                    </Link>
                  </li>
                  <li>
                    <Link to="/pemerintahan/bamus-nagari" className="footer-link">
                      Bamus
                    </Link>
                  </li>
                  <li>
                    <Link to="/pemerintahan/bundo-kanduang" className="footer-link">
                      Bundo Kanduang
                    </Link>
                  </li>
                  <li>
                    <Link to="/pemerintahan/majelis-ulama" className="footer-link">
                      Majelis Ulama
                    </Link>
                  </li>
                  <li>
                    <Link to="/pemerintahan/penggerak-pkk" className="footer-link">
                      PKK
                    </Link>
                  </li>
                  <li>
                    <Link to="/pemerintahan/lpmn" className="footer-link">
                      LPMN
                    </Link>
                  </li>
                  <li>
                    <Link to="/pemerintahan/kepemudaan" className="footer-link">
                      Kepemudaan
                    </Link>
                  </li>
                  <li>
                    <Link to="/pemerintahan/lptq" className="footer-link">
                      LPTQ
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5 className="text-uppercase fw-bold text-white">Kontak Kami</h5>
            <p className="text-white-50">
              Email:{" "}
              <a href={`mailto:${dataNagari.email}`} className="footer-link">
                {dataNagari.email}
              </a>
            </p>
            <p className="text-white-50">
              Telepon:{" "}
              <a href={`https://wa.me/${dataNagari.telepon}`} className="footer-link">
                WhatsApp {dataNagari.telepon}
              </a>
            </p>
            <div className="mt-3 fs-2">
              <a href={dataNagari.facebook} target="blank" className="footer-link me-3">
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a href={dataNagari.instagram} target="blank" className="footer-link me-3">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href={dataNagari.youtube} target="blank" className="footer-link">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="text-white-50">
              &copy; {new Date().getFullYear()} Kamang Tangah Anam Suku. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
