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
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // akan kita buat nanti

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const IndividuPenduduk = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataKK, setDataKK] = useState([]);
  const [kkMode, setKKMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [error, setError] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal2, setShowConfirmModal2] = useState(false);
  const [showSuccessModal2, setShowSuccessModal2] = useState(false);
  // dinamis
  const [dinamisNik, setDinamisNik] = useState([]);
  const [dinamisKk, setDinamisKk] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [formKK2, setFormKK2] = useState({
    kk: "",
    foto: "",
    latitude: -0.21562244461617971,
    longitude: 100.41143176518129,
  });
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
  // console.log(formKK2);

  const [showCropModal, setShowCropModal] = useState(false);
  const [isCropped, setIsCropped] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const handleRemoveFile = (fileType) => {
    setFormKK2({ ...formKK2, [fileType]: "" });

    if (fileType === "foto") {
      setImagePreview(null);
      setIsCropped(false);
    } else if (fileType === "pdf") {
      setPdfPreview(null);
    }
  };
  function sensorNama(nama) {
    if (!nama) return "-";
    const parts = nama.split(" ");
    return parts
      .map((part) => {
        if (part.length <= 2) return part[0] + "*";
        return part.slice(0, 2) + "*".repeat(part.length - 2);
      })
      .join(" ");
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormKK2({ ...formKK2, [e.target.name]: file });

    if (file) {
      if (e.target.name === "foto") {
        setImagePreview(URL.createObjectURL(file));
        setIsCropped(false); // belum dicrop
        setShowCropModal(true);
      } else if (e.target.name === "pdf") {
        setPdfPreview(URL.createObjectURL(file));
      }
    } else {
      if (e.target.name === "pdf" && formData.pdf) {
        setPdfPreview(`${import.meta.env.VITE_API_URL}${formData.pdf}`);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toUpperCase() });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormKK2({ ...formKK2, [name]: value.toUpperCase() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowConfirmModal(true);
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setIsLoading2(true);
    setShowConfirmModal2(true);
  };
  const confirmSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/penduduk/update/${id}`, formData);
      setShowConfirmModal(false);
      setIsLoading(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };
  const formatDate = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // Format YYYY-MM-DD
  };
  const showCroppedImage = async () => {
    try {
      const { blob, fileUrl } = await getCroppedImg(imagePreview, croppedAreaPixels);
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      setFormKK2((prev) => ({ ...prev, foto: file }));
      setImagePreview(fileUrl);
      setIsCropped(true); // sudah dicrop
      setShowCropModal(false);
    } catch (e) {
      console.error("Gagal crop gambar", e);
    }
  };
  useEffect(() => {
    const getDataPenduduk = async () => {
      try {
        setError(false);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/penduduk/${id}`);

        const data = response.data.data;
        setFormData({
          nik: data.nik || "",
          kk: data.kk || "",
          nama: data.nama || "",
          jenis_kelamin: data.jenis_kelamin || "",
          tempat_lahir: data.tempat_lahir || "",
          tanggal_lahir: formatDate(data.tanggal_lahir) || "",
          nama_ibu: data.nama_ibu || "",
          nama_ayah: data.nama_ayah || "",
          status_perkawinan: data.status_perkawinan || "",
          golongan_darah: data.golongan_darah || "",
          agama: data.agama || "",
          pendidikan: data.pendidikan || "",
          pekerjaan: data.pekerjaan || "",
          hubungan_keluarga: data.hubungan_keluarga || "",
          alamat: data.alamat || "",
          dusun: data.dusun || "",
          jorong: data.jorong || "",
        });
        const dinamisnik = await axios.get(
          `${import.meta.env.VITE_API_URL}/dinamis/getdatadinamisbynik/${response.data.data.nik}`
        );
        setDinamisNik(dinamisnik.data.data);

        const responseKK = await axios.get(`${import.meta.env.VITE_API_URL}/penduduk/kk/${response.data.data.kk}`);
        const dinamiskk = await axios.get(
          `${import.meta.env.VITE_API_URL}/dinamis/getdatadinamisbykk/${response.data.data.kk}`
        );
        setDinamisKk(dinamiskk.data.data);

        setDataKK(responseKK.data.data);
        const dataKK2 = responseKK.data.data2[0];

        if (dataKK2) {
          setFormKK2({
            kk: dataKK2.kk || "",
            foto: dataKK2.foto || "",
            latitude: dataKK2.latitude || -0.21562244461617971,
            longitude: dataKK2.longitude || 100.41143176518129,
          });

          if (dataKK2.foto) {
            setImagePreview(`${import.meta.env.VITE_API_URL}${dataKK2.foto}`);
          }

          setKKMode(true); // mode edit
        } else {
          setFormKK2({
            kk: data.kk || "",
            foto: "",
            latitude: -0.21562244461617971,
            longitude: 100.41143176518129,
          });
          setKKMode(false); // mode tambah
        }
      } catch (error) {
        console.log("gagal mengambil data penduduk");
        setError(true);
      }
    };
    getDataPenduduk();
  }, [id]);
  const confirmSubmit2 = async () => {
    const data = new FormData();
    Object.keys(formKK2).forEach((key) => {
      data.append(key, formKK2[key]);
    });

    try {
      if (kkMode === true) {
        await axios.put(`${import.meta.env.VITE_API_URL}/penduduk/datakkupdate`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setShowConfirmModal2(false);
        setIsLoading2(false);
        setShowSuccessModal2(true);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/penduduk/datakkbaru`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setShowConfirmModal2(false);
        setIsLoading2(false);
        setShowSuccessModal2(true);
      }
    } catch (error) {
      console.log(error.message);
    }
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
                  <h1 className="fw-bold">Data Individu Penduduk</h1>
                  <p className="text-light opacity-75">Lihat Detail Data, Edit Data</p>
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
              <Row className="justify-content-between align-items-center">
                <Col>
                  <h5 className="fw-bold">Data Individu</h5>
                </Col>{" "}
                <Col className="text-end">
                  {isLoading ? (
                    <Button type="submit" variant="primary" disabled>
                      Simpan Perubahan
                      <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary" onClick={handleSubmit}>
                      Simpan Perubahan
                    </Button>
                  )}
                </Col>
              </Row>
              <hr></hr>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">NIK</Form.Label>
                      <Form.Control
                        type="number"
                        name="nik"
                        placeholder="NIK"
                        value={formData.nik}
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">KK</Form.Label>
                      <Form.Control
                        type="number"
                        name="kk"
                        placeholder="KK"
                        value={formData.kk}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Nama</Form.Label>
                      <Form.Control
                        type="text"
                        name="nama"
                        placeholder="Nama"
                        value={formData.nama}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
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
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Golongan Darah</Form.Label>
                      <Form.Control
                        type="text"
                        name="golongan_darah"
                        placeholder="Golongan Darah"
                        value={formData.golongan_darah}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Nama Ibu</Form.Label>
                      <Form.Control
                        type="password"
                        name="nama_ibu"
                        placeholder="Nama Ibu"
                        value={formData.nama_ibu}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Nama Ayah</Form.Label>
                      <Form.Control
                        type="password"
                        name="nama_ayah"
                        placeholder="Nama Ayah"
                        value={formData.nama_ayah}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Status Perkawinan</Form.Label>
                      <Form.Control
                        type="text"
                        name="status_perkawinan"
                        placeholder="Status Perkawinan"
                        value={formData.status_perkawinan}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Hubungan Dalam Keluarga</Form.Label>
                      <Form.Control
                        type="text"
                        name="hubungan_keluarga"
                        placeholder="Hubungan Dalam Keluarga"
                        value={formData.hubungan_keluarga}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Agama</Form.Label>
                      <Form.Control
                        type="text"
                        name="agama"
                        placeholder="Agama"
                        value={formData.agama}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Pendidikan</Form.Label>
                      <Form.Control
                        type="text"
                        name="pendidikan"
                        placeholder="Pendidikan"
                        value={formData.pendidikan}
                        onChange={handleChange}
                      />
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
                      />
                    </Form.Group>
                  </Col>
                </Row>
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
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Dusun</Form.Label>
                          <Form.Control
                            type="text"
                            name="dusun"
                            placeholder="Dusun"
                            value={formData.dusun}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Jorong</Form.Label>
                          <Form.Control
                            type="text"
                            name="jorong"
                            placeholder="Jorong"
                            value={formData.jorong}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </section>
            <section className="card shadow-lg p-4 border-0 ">
              <h5 className="fw-bold mb-4">Data Dinamis Individu</h5>
              <Row className="mt-3 justify-content-center">
                {dinamisNik.map((item, index) => {
                  const isFilled = item.keterangan && item.keterangan !== "-";
                  const bgClass = isFilled ? "bg-success-subtle" : "bg-light";
                  const borderClass = isFilled
                    ? "border-start border-success border-4"
                    : "border-start border-secondary border-4";

                  return (
                    <Col md={4} className="mb-4" key={index}>
                      <Card className={`shadow-sm ${bgClass} ${borderClass}`} style={{ minHeight: "100px" }}>
                        <Card.Body>
                          <h5 className="fw-bold mb-1">{item.data}</h5>
                          <p className={`mb-0 ${isFilled ? "text-dark" : "text-muted"}`}>
                            {isFilled ? item.keterangan : "-----"}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </section>
            <section className="card shadow-lg p-4 border-0 mt-3">
              <h5 className="fw-bold">Data Keluarga</h5> <hr></hr>
              <Table hover size="sm" responsive className="mt-1" bordered>
                <thead style={{ fontSize: "12px" }}>
                  <tr className="text-center">
                    <th>No</th>
                    <th>NIK</th>
                    <th>KK</th>
                    <th>Nama</th>
                    <th>Jenis Kelamin</th>
                    <th>Tempat Lahir</th>
                    <th>Tanggal Lahir</th>
                    <th>Nama Ibu</th>
                    <th>Nama Ayah</th>
                    <th>Status Perkawinan</th>
                    <th>Golongan Darah</th>
                    <th>Agama</th>
                    <th>Pendidikan</th>
                    <th>Pekerjaan</th>
                    <th>Hubungan Keluarga</th>
                    <th>Alamat</th>
                    <th>Dusun</th>
                    <th>Jorong</th>
                    <th>Umur</th>
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan="20">
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                          <Spinner animation="grow" variant="secondary" size="xxl" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : error ? (
                  <tbody>
                    <tr>
                      <td colSpan="20" className="text-center fw-bold text-danger py-3">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody style={{ fontSize: "12px" }}>
                    {dataKK.map((penduduk, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`/datapenduduk/${penduduk.id}`}
                            onClick={(e) => {
                              e.preventDefault(); // Mencegah navigasi bawaan
                              navigate(`/datapenduduk/${penduduk.id}`, { replace: true });
                              window.location.reload();
                            }}
                          >
                            {penduduk.nik}
                          </a>
                        </td>
                        <td>{penduduk.kk}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.nama}</td>
                        <td>{penduduk.jenis_kelamin}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.tempat_lahir}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{formatDate(penduduk.tanggal_lahir)}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{sensorNama(penduduk.nama_ibu)}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{sensorNama(penduduk.nama_ayah)}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.status_perkawinan}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.golongan_darah}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.agama}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.pendidikan}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.pekerjaan}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.hubungan_keluarga}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.alamat}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.dusun}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.jorong}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{penduduk.umur}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>{" "}
            </section>{" "}
            <section className="card shadow-lg p-4 border-0 ">
              <h5 className="fw-bold mb-4">Data Dinamis Keluarga</h5>
              <Row className="mt-3 justify-content-center">
                {dinamisKk.map((item, index) => {
                  const isFilled = item.keterangan && item.keterangan !== "-";
                  const bgClass = isFilled ? "bg-success-subtle" : "bg-light";
                  const borderClass = isFilled
                    ? "border-start border-success border-4"
                    : "border-start border-secondary border-4";

                  return (
                    <Col md={4} className="mb-4" key={index}>
                      <Card className={`shadow-sm ${bgClass} ${borderClass}`} style={{ minHeight: "100px" }}>
                        <Card.Body>
                          <h5 className="fw-bold mb-1">{item.data}</h5>
                          <p className={`mb-0 ${isFilled ? "text-dark" : "text-muted"}`}>
                            {isFilled ? item.keterangan : "-----"}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </section>{" "}
            <section className="card shadow-lg p-4 border-0 mt-3">
              <Form onSubmit={handleSubmit2}>
                <Row className="mt-3">
                  <h5 className="fw-bold">Foto Rumah dan Koordinat</h5> <hr></hr>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Label>File Gambar</Form.Label>
                      <Form.Control type="file" name="foto" accept="image/*" onChange={handleFileChange} />
                      {imagePreview && (
                        <div className="justify-content-center align-items-center text-center ">
                          <img src={imagePreview} alt="Preview" className="img-fluid mt-2" style={{ width: "100%" }} />
                          <Button
                            variant="danger"
                            size="sm"
                            className="align-self-center m-2"
                            onClick={() => handleRemoveFile("foto")}
                          >
                            Remove Image
                          </Button>
                        </div>
                      )}
                      {isCropped && (
                        <div className="text-center">
                          <Button
                            variant="warning"
                            size="sm"
                            className="align-self-center m-2"
                            onClick={() => {
                              setImagePreview(imagePreview);
                              setShowCropModal(true);
                            }}
                          >
                            Crop Ulang
                          </Button>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={7}>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Latitude</Form.Label>
                          <Form.Control
                            type="number"
                            name="latitude"
                            placeholder="latitude"
                            value={formKK2.latitude}
                            onChange={handleChange2}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Longitude</Form.Label>
                          <Form.Control
                            type="number"
                            name="longitude"
                            placeholder="longitude"
                            value={formKK2.longitude}
                            onChange={handleChange2}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ height: "auto", objectFit: "cover" }}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Map</Form.Label>
                          <MapContainer
                            center={[-0.21561281485831493, 100.41136363318984]}
                            zoom={13}
                            scrollWheelZoom={false}
                            style={{ height: "200px", width: "100%" }}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[formKK2.latitude, formKK2.longitude]} icon={customIcon}>
                              <Popup>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${formKK2.latitude},${formKK2.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Go To Location Map
                                </a>
                              </Popup>
                            </Marker>
                          </MapContainer>
                        </Form.Group>
                      </Col>{" "}
                    </Row>
                  </Col>
                </Row>
                <div className="text-end">
                  {isLoading2 ? (
                    <Button type="submit" variant="primary" disabled>
                      Simpan Perubahan
                      <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary">
                      Simpan Perubahan
                    </Button>
                  )}
                </div>
              </Form>
            </section>
          </div>
        </Container>
      </Container>
      <Modal show={showConfirmModal} onHide={(() => setShowConfirmModal(false), () => setIsLoading(false))}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menyimpan perubahan?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
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
        <Modal.Body>Informasi berhasil diperbarui!</Modal.Body>
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
      </Modal>
      <Modal
        show={showCropModal}
        onHide={() => {
          setShowCropModal(false);
          window.location.reload();
        }}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Crop Gambar (3x4)</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ position: "relative", height: "400px" }}>
          {imagePreview && (
            <Cropper
              image={imagePreview}
              crop={crop}
              zoom={zoom}
              aspect={6 / 4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              zoomSpeed={0.05} // Lebih kecil = lebih halus
              minZoom={1} // Zoom minimum
              maxZoom={2.5} // Zoom maksimum (atur sesuai kebutuhan)
            />
          )}
        </Modal.Body>
        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
          <Button size="sm" onClick={() => setCrop((prev) => ({ ...prev, x: prev.x - 2 }))}>
            ⬅️
          </Button>
          <Button size="sm" onClick={() => setCrop((prev) => ({ ...prev, y: prev.y + 2 }))}>
            ⬇️
          </Button>
          <Button size="sm" onClick={() => setCrop((prev) => ({ ...prev, y: prev.y - 2 }))}>
            ⬆️
          </Button>

          <Button size="sm" onClick={() => setCrop((prev) => ({ ...prev, x: prev.x + 2 }))}>
            ➡️
          </Button>
        </div>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowCropModal(false);
              window.location.reload();
            }}
          >
            Batal
          </Button>

          <Button variant="primary" onClick={showCroppedImage}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      {/* confirm modal 2 untuk gambar  */}
      <Modal
        show={showConfirmModal2}
        onHide={() => {
          setShowConfirmModal2(false);
          setIsLoading2(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menyimpan perubahan?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal2(false);
              setIsLoading2(false);
            }}
          >
            Batal
          </Button>
          <Button variant="primary" onClick={confirmSubmit2}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSuccessModal2}
        onHide={() => {
          setShowSuccessModal2(false);
          window.location.reload();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil diperbarui!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowSuccessModal2(false);
              navigate("/dashboardpenduduk");
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IndividuPenduduk;
