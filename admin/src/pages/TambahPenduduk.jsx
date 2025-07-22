import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NavbarComponent from "../components/Navbar";
import { Container, Offcanvas, Button, Row, Col, Table, Spinner, Form, InputGroup, Modal, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  CircleMarker,
  LayersControl,
  LayerGroup,
  Circle,
  FeatureGroup,
  Rectangle,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const TambahPenduduk = () => {
  const navigate = useNavigate();
  const [nikAvailable, setNikAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    nik: "",
    kk: "",
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nama_ibu: "",
    nama_ayah: "",
    status_perkawinan: "",
    golongan_darah: "",
    agama: "",
    pendidikan: "",
    pekerjaan: "",
    hubungan_keluarga: "",
    alamat: "",
    dusun: "",
    jorong: "",
  });
  const extractDataFromNIK = (nik) => {
    if (nik.length < 16) return null;

    let dd = parseInt(nik.substring(6, 8)); // Ambil tanggal lahir
    const mm = nik.substring(8, 10); // Ambil bulan lahir
    const yy = nik.substring(10, 12); // Ambil tahun lahir (dua digit terakhir)
    const currentYear = new Date().getFullYear();
    const fullYear = yy <= currentYear % 100 ? `20${yy}` : `19${yy}`; // Konversi ke 4 digit tahun

    let jenis_kelamin = "L";
    if (dd > 40) {
      dd -= 40; // Kurangi 40 jika perempuan
      jenis_kelamin = "P";
    }

    // Format tanggal lahir ke YYYY-MM-DD agar kompatibel dengan input date
    const tanggal_lahir = `${fullYear}-${mm.padStart(2, "0")}-${dd.toString().padStart(2, "0")}`;

    return { tanggal_lahir, jenis_kelamin };
  };

  // Handle perubahan nilai input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value.toUpperCase() };

    if (name === "nik" && value.length >= 16) {
      const extractedData = extractDataFromNIK(value);
      if (extractedData) {
        updatedFormData = { ...updatedFormData, ...extractedData };
      }
    }

    setFormData(updatedFormData);
  };

  // Cek NIK
  const handleCheckNIK = async (e) => {
    e.preventDefault();
    if (!formData.nik) {
      handleShow("Silakan masukkan NIK terlebih dahulu.");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/penduduk/nik/${formData.nik}`);

      if (response.data.data.length > 0) {
        handleShow("NIK sudah terdaftar. Silakan gunakan NIK lain.");
        return;
      }
      if (formData.nik.length < 16) {
        handleShow("NIK harus terdiri dari 16 digit.");
        return;
      }

      let dd = parseInt(formData.nik.substring(6, 8), 10);
      const mm = parseInt(formData.nik.substring(8, 10), 10);
      const yy = formData.nik.substring(10, 12);

      if (dd > 40) {
        dd -= 40;
      }
      if (dd < 1 || dd > 31) {
        handleShow(`Tanggal lahir tidak valid. Tanggal Lahir = ${dd}`);
        return;
      }
      if (mm < 1 || mm > 12) {
        handleShow(`Bulan lahir tidak valid. Bulan Lahir = ${mm}`);
        return;
      }

      setNikAvailable(true);
    } catch (error) {
      console.error("Error saat mengecek NIK:", error);
      setNikAvailable(false);
    }
  };
  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "" && value !== null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      handleShow("Harap isi semua field sebelum menambahkan!");
      return;
    }

    setIsLoading(true);
    setShowConfirmModal(true);
  };
  const confirmSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/penduduk/insert`, formData);
      setShowConfirmModal(false);
      setIsLoading(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };
  const handleClose = () => setModalShow(false);
  const handleShow = (message) => {
    setModalMessage(message);
    setModalShow(true);
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
                  <h1 className="fw-bold">Tambah Data Penduduk</h1>
                  <p className="text-light opacity-75">Tambah Data Dasar Penduduk Sesuai KTP/KK</p>
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
            <section className="card shadow-lg p-4 border-0 mt-3">
              <Form onSubmit={handleCheckNIK}>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">NIK</Form.Label>
                      <Form.Control
                        type="number"
                        name="nik"
                        placeholder="Masukkan NIK"
                        value={formData.nik}
                        onChange={handleChange}
                        required
                        disabled={nikAvailable}
                      />
                    </Form.Group>
                  </Col>

                  {!nikAvailable && (
                    <Col md={4} className="d-flex align-items-end mt-2">
                      <Button className="btn btn-primary" type="submit">
                        Validasi
                      </Button>
                    </Col>
                  )}

                  {nikAvailable && (
                    <>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="fw-bold">KK</Form.Label>
                          <Form.Control
                            type="text"
                            name="kk"
                            placeholder="Masukkan KK"
                            value={formData.kk}
                            onChange={handleChange}
                            maxLength={16}
                            pattern="\d{16}"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Nama</Form.Label>
                          <Form.Control
                            type="text"
                            name="nama"
                            placeholder="Masukkan Nama"
                            value={formData.nama}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </>
                  )}
                </Row>
                {nikAvailable && (
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Tempat Lahir</Form.Label>
                        <Form.Control
                          type="text"
                          name="tempat_lahir"
                          placeholder="Tempat Lahir"
                          value={formData.tempat_lahir}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Tanggal Lahir</Form.Label>
                        <Form.Control
                          type="date"
                          name="tanggal_lahir"
                          placeholder="Tanggal Lahir"
                          value={formData.tanggal_lahir}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Jenis Kelamin</Form.Label>
                        <Form.Control
                          type="text"
                          name="jenis_kelamin"
                          placeholder="Jenis Kelamin"
                          value={formData.jenis_kelamin}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Golongan Darah</Form.Label>
                        <Form.Select
                          name="golongan_darah"
                          value={formData.golongan_darah}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- PILIH GOLONGAN DARAH --</option>
                          <option value="A">A</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B">B</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB">AB</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O">O</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="TIDAK TAHU">TIDAK TAHU</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                )}
                {nikAvailable && (
                  <Row className="mt-2">
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Nama Ibu</Form.Label>
                        <Form.Control
                          type="text"
                          name="nama_ibu"
                          placeholder="Nama Ibu"
                          value={formData.nama_ibu}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Nama Ayah</Form.Label>
                        <Form.Control
                          type="text"
                          name="nama_ayah"
                          placeholder="Nama Ayah"
                          value={formData.nama_ayah}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Status Perkawinan</Form.Label>
                        <Form.Select
                          name="status_perkawinan"
                          value={formData.status_perkawinan}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- PILIH STATUS PERKAWINAN --</option>
                          <option value="BELUM KAWIN">BELUM KAWIN</option>
                          <option value="KAWIN BELUM TERCATAT">KAWIN BELUM TERCATAT</option>
                          <option value="KAWIN TERCATAT">KAWIN TERCATAT</option>
                          <option value="CERAI BELUM TERCATAT">CERAI BELUM TERCATAT</option>
                          <option value="CERAI TERCATAT">CERAI TERCATAT</option>
                          <option value="CERAI MATI">CERAI MATI</option>
                          <option value="TIDAK TAHU">TIDAK TAHU</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Hubungan Dalam Keluarga</Form.Label>
                        <Form.Select
                          name="hubungan_keluarga"
                          value={formData.hubungan_keluarga}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- PILIH HUBUNGAN DALAM KELUARGA --</option>
                          <option value="KEPALA KELUARGA">KEPALA KELUARGA</option>
                          <option value="ISTRI">ISTRI</option>
                          <option value="ANAK">ANAK</option>
                          <option value="CUCU">CUCU</option>
                          <option value="ORANG TUA">ORANG TUA</option>
                          <option value="MERTUA">MERTUA</option>
                          <option value="LAINNYA">LAINNYA</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                )}
                {nikAvailable && (
                  <Row className="mt-2">
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Agama</Form.Label>
                        <Form.Select name="agama" value={formData.agama} onChange={handleChange} required>
                          <option value="">-- PILIH AGAMA --</option>
                          <option value="ISLAM">ISLAM</option>
                          <option value="KRISTEN">KRISTEN</option>
                          <option value="KATOLIK">KATOLIK</option>
                          <option value="HINDU">HINDU</option>
                          <option value="BUDDHA">BUDDHA</option>
                          <option value="KONGHUCU">KONGHUCU</option>
                          <option value="TIDAK TAHU">TIDAK TAHU</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Pendidikan</Form.Label>
                        <Form.Select name="pendidikan" value={formData.pendidikan} onChange={handleChange} required>
                          <option value="">-- PILIH PENDIDIKAN --</option>
                          <option value="TIDAK / BELUM SEKOLAH">TIDAK / BELUM SEKOLAH</option>
                          <option value="PAUD / TK / RA">PAUD / TK / RA</option>
                          <option value="BELUM TAMAT SD / MI">BELUM TAMAT SD / MI</option>
                          <option value="TAMAT SD / MI / SEDERAJAT">TAMAT SD / MI / SEDERAJAT</option>
                          <option value="SMP / MTS / SEDERAJAT">SMP / MTs / SEDERAJAT</option>
                          <option value="SMA / SMK / MA / SEDERAJAT">SMA / SMK / MA / SEDERAJAT</option>
                          <option value="DIPLOMA I (D1)">DIPLOMA I (D1)</option>
                          <option value="DIPLOMA II (D2)">DIPLOMA II (D2)</option>
                          <option value="DIPLOMA III (D3) / AKADEMI / SARJANA MUDA">
                            DIPLOMA III (D3) / AKADEMI / SARJANA MUDA
                          </option>
                          <option value="DIPLOMA IV (D4)">DIPLOMA IV (D4)</option>
                          <option value="STRATA I (S1)">STRATA I (S1)</option>
                          <option value="STRATA II (S2)">STRATA II (S2)</option>
                          <option value="STRATA III (S3)">STRATA III (S3)</option>

                          <option value="LAINNYA">LAINNYA</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Pekerjaan</Form.Label>
                        <Form.Control
                          type="text"
                          name="pekerjaan"
                          placeholder="Pekerjaan"
                          value={formData.pekerjaan}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}
                {nikAvailable && (
                  <Row className="mt-2">
                    <Col md={6}>
                      <Row>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label className="fw-bold">Alamat</Form.Label>
                            <Form.Control
                              type="text"
                              name="alamat"
                              placeholder="Alamat"
                              value={formData.alamat}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      {" "}
                      <Row>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="fw-bold">Dusun</Form.Label>
                            <Form.Select name="dusun" value={formData.dusun} onChange={handleChange} required>
                              <option value="">-- PILIH DUSUN --</option>
                              <option value="KAMPUNG JAMBAK">KAMPUNG JAMBAK - BANSA</option>
                              <option value="KAMPUNG PISANG">KAMPUNG PISANG - BANSA</option>
                              <option value="KAMPUNG KOTO">KAMPUNG KOTO - BANSA</option>
                              <option value="SIPANJANG">SIPANJANG - BANSA</option>
                              <option value="KAYU AMPEK">KAYU AMPEK - PAKAN SINAYAN</option>
                              <option value="KAMPUNG BARU">KAMPUNG BARU - PAKAN SINAYAN</option>
                              <option value="KAMPUNG BUDI">KAMPUNG BUDI - PAKAN SINAYAN</option>
                              <option value="PARIK PANJANG">PARIK PANJANG - PAKAN SINAYAN</option>
                              <option value="KAMPUNG TANGAH">KAMPUNG TANGAH - PAKAN SINAYAN</option>
                              <option value="KAMPUNG TAPI">KAMPUNG TAPI - PAKAN SINAYAN</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="fw-bold">Jorong</Form.Label>
                            <Form.Select name="jorong" value={formData.jorong} onChange={handleChange} required>
                              <option value="">-- PILIH JORONG --</option>
                              <option value="BANSA">BANSA</option>
                              <option value="PAKAN SINAYAN">PAKAN SINAYAN</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
              </Form>
              {nikAvailable && (
                <Row className="justify-content-between align-items-center mt-3">
                  <Col className="text-end">
                    {isLoading ? (
                      <Button type="submit" variant="primary" disabled>
                        Simpan Perubahan
                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                      </Button>
                    ) : (
                      <Button type="submit" variant="primary" onClick={handleSubmit}>
                        Tambahkan
                      </Button>
                    )}
                  </Col>
                </Row>
              )}
            </section>
          </div>
        </Container>
      </Container>
      <Modal show={showConfirmModal} onHide={(() => setShowConfirmModal(false), () => setIsLoading(false))}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Simpan Data Baru Penduduk</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal(false);
              setIsLoading(false);
            }}
          >
            Batal
          </Button>
          <Button variant="primary" onClick={confirmSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSuccessModal}
        onHide={() => {
          setShowSuccessModal(false);
          navigate("/dashboardberita");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data Penduduk Berhasil Ditambahkan</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/dashboardpenduduk");
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TambahPenduduk;
