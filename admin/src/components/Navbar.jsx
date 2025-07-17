import React, { useEffect, useContext, useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Offcanvas, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
const NavbarComponent = () => {
  const { isAdmin, logout, show, handleClose, handleShow } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992); // Inisialisasi sesuai ukuran awal

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      {isMobile ? (
        <Navbar expand="lg" className="bg-body-secondary ">
          <Container>
            <Navbar.Brand href="#home">
              <img alt="" src="/assets/svg/logo.svg" width="30" height="30" className="d-inline-block align-top" />
              KTAS Dashboard
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>Navigasi</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to={"/"}>
                    <i className="bi bi-house-door"></i> Home
                  </Nav.Link>

                  {isAdmin && (
                    <>
                      <Nav.Link as={Link} to={"/dashboardnagari"}>
                        <i className="bi bi-geo-alt"></i> Nagari
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/dashboardpenduduk"}>
                        <i className="bi bi-people"></i> Penduduk
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/dashboarddatadinamis"}>
                        <i className="bi bi-people"></i> Data Dinamis
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/dashboarduser"}>
                        <i className="bi bi-person"></i> User
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/dashboardorganisasi"}>
                        <i className="bi bi-diagram-3"></i> Organisasi
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/dashboardapb"}>
                        <i className="bi bi-cash-stack"></i> APB Nagari
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/dashboardindexdesa"}>
                        <i className="bi bi-file-spreadsheet"></i> Index Desa
                      </Nav.Link>
                    </>
                  )}

                  <Nav.Link as={Link} to={"/dashboardberita"}>
                    <i className="bi bi-newspaper"></i> Berita
                  </Nav.Link>
                </Nav>

                <Button variant="outline-danger" onClick={logout}>
                  Logout
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ) : (
        <>
          {/* Fixed icon bar */}
          {!show && (
            <div style={{ zIndex: 1050 }}>
              <Button
                variant="link"
                className="text-dark position-fixed vh-100 d-flex flex-column justify-content-center p-1 bg-light shadow"
                onClick={handleShow}
              >
                <img alt="" src="/assets/svg/logo.svg" width="30" height="30" className="d-inline-block align-top" />
              </Button>
            </div>
          )}

          {/* Offcanvas menu */}
          <Offcanvas
            show={show}
            onHide={handleClose}
            scroll={true}
            backdrop={false}
            placement="start"
            className="bg-body-secondary shadow "
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <img alt="" src="/assets/svg/logo.svg" width="30" height="30" className="d-inline-block align-top" />
                KTAS Dashboard
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-column pe-3 fs-5 ">
                <Nav.Link as={Link} to={"/"} onClick={handleClose} style={{ color: "#212529" }}>
                  <i className="bi bi-house-door"></i> Home
                </Nav.Link>

                {isAdmin && (
                  <>
                    <Nav.Link as={Link} to={"/dashboardnagari"} onClick={handleClose} style={{ color: "#212529" }}>
                      <i className="bi bi-geo-alt "></i> Nagari
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/dashboardpenduduk"} onClick={handleClose} style={{ color: "#212529" }}>
                      <i className="bi bi-people"></i> Penduduk
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/dashboarddatadinamis"} onClick={handleClose} style={{ color: "#212529" }}>
                      <i className="bi bi-people"></i> Data Dinamis
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/dashboarduser"} onClick={handleClose} style={{ color: "#212529" }}>
                      <i className="bi bi-person"></i> User
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/dashboardorganisasi"} onClick={handleClose} style={{ color: "#212529" }}>
                      <i className="bi bi-diagram-3"></i> Organisasi
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/dashboardapb"} onClick={handleClose} style={{ color: "#212529" }}>
                      <i className="bi bi-cash-stack"></i> APB Nagari
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/dashboardindexdesa"} onClick={handleClose} style={{ color: "#212529" }}>
                      <i className="bi bi-file-spreadsheet"></i> Index Desa
                    </Nav.Link>
                  </>
                )}

                <Nav.Link as={Link} to={"/dashboardberita"} onClick={handleClose} style={{ color: "#212529" }}>
                  <i className="bi bi-newspaper "></i> Berita
                </Nav.Link>
              </Nav>

              <Button variant="outline-danger" onClick={logout} className="mt-3">
                Logout
              </Button>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </div>
  );
};

export default NavbarComponent;
