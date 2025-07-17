import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (location.pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [location]);

  const handleNavCollapse = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      className={`fw-bold ${scrolled ? "scrolled" : ""}`}
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      style={{
        background:
          location.pathname === "/"
            ? scrolled
              ? "linear-gradient(45deg, #ff4b5c, #3c6e71)"
              : "transparent"
            : "linear-gradient(45deg, #ff4b5c, #3c6e71)", // Background default untuk halaman non-Home
        transition: "background 0.3s ease",
        boxShadow: scrolled ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Container>
        <Navbar.Brand href="/" className="mx-auto d-flex align-items-center">
          <img
            alt=""
            src="/assets/svg/agam.svg"
            width="30"
            height="35"
            className="d-inline-block align-top"
            style={{ marginRight: "10px" }}
          />
          <div className="text-center">
            <span className="fw-bold fs-6 d-block text-white">Kamang Tangah Anam Suku</span>
            <span className="fw-bold fs-6 d-block text-white">Kabupaten Agam</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom" onClick={handleNavCollapse}>
              Home
            </Nav.Link>
            <NavDropdown title="Profile" className="nav-link-custom" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to="/profile/sejarah"
                className={`nav-link-custom ${location.pathname === "/profile/sejarah" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Sejarah
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/profile/peta-wilayah"
                className={`nav-link-custom ${location.pathname === "/profile/peta-wilayah" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Peta Wilayah
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/profile/fasilitas-bangunan"
                className={`nav-link-custom ${location.pathname === "/profile/fasilitas-bangunan" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Fasilitas Bangunan
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/profile/sosial-budaya"
                className={`nav-link-custom ${location.pathname === "/profile/sosial-budaya" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Sosial Budaya
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Pemerintahan" className="nav-link-custom" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to="/pemerintahan/struktur-organisasi-nagari"
                className={`nav-link-custom ${
                  location.pathname === "/pemerintahan/struktur-organisasi-nagari" ? "active" : ""
                }`}
                onClick={handleNavCollapse}
              >
                Struktur Organisasi Nagari
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/pemerintahan/bamus-nagari"
                className={`nav-link-custom ${location.pathname === "/pemerintahan/bamus-nagari" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Bamus Nagari
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/pemerintahan/bundo-kanduang"
                className={`nav-link-custom ${location.pathname === "/pemerintahan/bundo-kanduang" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Bundo Kanduang
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/pemerintahan/majelis-ulama"
                className={`nav-link-custom ${location.pathname === "/pemerintahan/majelis-ulama" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Majelis Ulama
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/pemerintahan/penggerak-pkk"
                className={`nav-link-custom ${location.pathname === "/pemerintahan/penggerak-pkk" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Penggerak PKK
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/pemerintahan/lpmn"
                className={`nav-link-custom ${location.pathname === "/pemerintahan/lpmn" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                LPMN
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/pemerintahan/kepemudaan"
                className={`nav-link-custom ${location.pathname === "/pemerintahan/kepemudaan" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Kepemudaan
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/pemerintahan/lptq"
                className={`nav-link-custom ${location.pathname === "/pemerintahan/lptq" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                LPTQ
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Statistik" className="nav-link-custom" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to="/statistik/geografi-topografi"
                className={`nav-link-custom ${location.pathname === "/statistik/geografi-topografi" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Geografi dan Topografi
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/statistik/sumber-daya-alam"
                className={`nav-link-custom ${location.pathname === "/statistik/sumber-daya-alam" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Sumber Daya Alam
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/statistik/demografi-penduduk"
                className={`nav-link-custom ${location.pathname === "/statistik/demografi-penduduk" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Demografi Penduduk
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Informasi" className="nav-link-custom" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to="/informasi/apbnagari"
                className={`nav-link-custom ${location.pathname === "/informasi/apbnagari" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                APB Nagari
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/informasi/indexdesa"
                className={`nav-link-custom ${location.pathname === "/informasi/indexdesa" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Index Desa
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/informasi/event"
                className={`nav-link-custom ${location.pathname === "/informasi/event" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Event
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/informasi/berita"
                className={`nav-link-custom ${location.pathname === "/informasi/berita" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Berita
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/informasi/pengumuman"
                className={`nav-link-custom ${location.pathname === "/informasi/pengumuman" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Pengumuman
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Galeri" className="nav-link-custom" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to="/galeri/foto"
                className={`nav-link-custom ${location.pathname === "/galeri/foto" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Galeri Foto
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/galeri/video"
                className={`nav-link-custom ${location.pathname === "/galeri/video" ? "active" : ""}`}
                onClick={handleNavCollapse}
              >
                Galeri Video
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
