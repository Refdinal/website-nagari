import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NavbarComponent from "../components/Navbar";
import { Container, Offcanvas, Button, Row, Col, Table, Spinner, Form, InputGroup, Modal } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
const DashboardPenduduk = () => {
  const navigate = useNavigate();
  const [dataPenduduk, setDataPenduduk] = useState([]);
  const [uniqueColumns, setUniqueColumns] = useState(null);
  const [error, setError] = useState(false);
  const [totalPenduduk, setTotalPenduduk] = useState("");
  const [totalkk, setTotalkk] = useState("");
  const [dataDidapatkan, setDataDidapatkan] = useState("");
  const [dataDitampilkan, setDataDitampilkan] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const [inputPassword, setInputPassword] = useState("");
  const [filter, setFilter] = useState({
    nik: "",
    kk: "",
    nama: "",
    jenis_kelamin: "",
    tanggal_lahir_min: "",
    tanggal_lahir_max: "",
    nama_ibu: "",
    nama_ayah: "",
    status_perkawinan: "",
    golongan_darah: "",
    agama: "",
    pendidikan: "",
    pekerjaan: "",
    alamat: "",
    dusun: "",
    jorong: "",
    order_by: "nama",
    order_direction: "ASC",
    limit: 50,
    page: 1,
  });
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

  const formatDate = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // Format YYYY-MM-DDTHH:MM:SS
  };
  const downloadExcel = (jsonData) => {
    // Hapus kolom 'id' dari setiap objek dalam array
    const filteredData = jsonData.map(({ id, ...rest }) => rest);

    // Buat worksheet dari JSON tanpa kolom 'id'
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Konversi ke file Excel (buffer)
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Simpan file menggunakan FileSaver
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "data.xlsx");
  };
  const [showModal, setShowModal] = useState(false);
  const [filterUpdated, setFilterUpdated] = useState(false);
  const handleSetFilter = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      limit: 9999,
    }));
    setFilterUpdated(true); // Menandakan bahwa filter telah diperbarui
    setShowModal(true); // Menampilkan modal setelah filter diupdate
  };

  const handleDownload = () => {
    if (filterUpdated) {
      downloadExcel(dataPenduduk);
      setShowModal(false); // Tutup modal setelah download
      setFilterUpdated(false); // Reset status filter agar siap untuk penggunaan berikutnya
      window.location.reload(); // Refresh halaman setelah download
    }
  };

  const [tempFilter, setTempFilter] = useState(filter); // State sementara
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    let updatedList = tempFilter[name] ? [...tempFilter[name]] : []; // Pastikan sebagai array

    if (checked) {
      if (!updatedList.includes(value)) {
        updatedList.push(value);
      }
    } else {
      updatedList = updatedList.filter((item) => item !== value);
    }

    setTempFilter({ ...tempFilter, [name]: updatedList }); // Simpan sebagai array langsung
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilter({
      ...tempFilter,
      [name]: value,
    });
  };
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFilter(tempFilter);
    handleCloseFilter();
  };

  useEffect(() => {
    const getDataPenduduk = async () => {
      try {
        setError(false);
        setIsLoadingData(true);
        const params = new URLSearchParams(filter);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/penduduk/data?${params.toString()}`, {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY, // Sesuaikan dengan header yang dicek di middleware
          },
        });

        const unique = await axios.get(`${import.meta.env.VITE_API_URL}/penduduk/unique`);
        setUniqueColumns(unique.data.uniqueValues);
        setTotalPenduduk(response.data.totaldata);
        setTotalkk(response.data.totalkk);
        setTotalPages(response.data.totalpages);
        setDataDidapatkan(response.data.resultscount);
        setDataDitampilkan(response.data.datacount);
        setDataPenduduk(response.data.data);
        setIsLoadingData(false);
      } catch (error) {
        console.log(error.response.data.message);
        setIsLoadingData(false);
        setError(true);
      }
    };
    getDataPenduduk();
  }, [filter]);
  const handleNextPage = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: Math.min(prevFilter.page + 1, totalPages), // Tidak lebih dari max page
    }));
  };

  const handlePrevPage = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: Math.max(prevFilter.page - 1, 1), // Tidak kurang dari 1
    }));
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleDeleteModal = (id) => {
    setIdToDelete(id);
    setDeleteModal(true);
  };
  const handleDelete = async () => {
    if (!idToDelete) return;
    const correctPassword = import.meta.env.VITE_DELETE_PASSWORD;

    if (inputPassword !== correctPassword) {
      alert("Password salah!");
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/penduduk/delete/${idToDelete}`);
      setDeleteModal(false);
      setShowSuccessModal(true); // Tampilkan modal sukses
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };
  // data dinamis
  const [dinamisModal, setDinamisModal] = useState(false);
  const [dinamisNik, setDinamisNik] = useState("");
  const [dinamisKk, setDinamisKk] = useState("");
  const [tipeData, setTipeData] = useState(""); // "nik" atau "kk"
  const [subData, setSubData] = useState("");
  const [keterangan, setKeterangan] = useState(""); // <-- INI HARUS ADA
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleDinamisModal = (nik, kk) => {
    setDinamisModal(true);
    setDinamisNik(nik);
    setDinamisKk(kk);
    setTipeData(""); // reset ketika modal dibuka
    setSubData("");
  };
  const [subOptions, setSubOptions] = useState([]); // untuk isi dropdown dinamis
  useEffect(() => {
    const fetchSubOptions = async () => {
      if (!tipeData) return;

      let url = `${import.meta.env.VITE_API_URL}/dinamis/kategori/${tipeData}`;
      try {
        const res = await axios.get(url);

        const options = res.data?.data || []; // ambil isi array dari `data.data`
        setSubOptions(options);
      } catch (err) {
        console.error("Gagal fetch kategori:", err);
        setSubOptions([]);
      }
    };

    fetchSubOptions();
  }, [tipeData]);

  const handleSubmit = async () => {
    try {
      let payload = {
        data: subData,
        keterangan: keterangan,
      };

      let url = "";

      if (tipeData === "nik") {
        payload.nik = dinamisNik;
        url = `${import.meta.env.VITE_API_URL}/dinamis/insertdatadinamisnik`;
      } else if (tipeData === "kk") {
        payload.kk = dinamisKk;
        url = `${import.meta.env.VITE_API_URL}/dinamis/insertdatadinamiskk`;
      } else {
        alert("Pilih tipe data terlebih dahulu");
        return;
      }

      const res = await axios.post(url, payload);

      setDinamisModal(false); // tutup modal
      setShowSuccessAlert(true); // tampilkan alert sukses

      // Hilangkan alert otomatis setelah 3 detik
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Gagal insert data:", error);
      alert("Gagal menyimpan data.");
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
        <Container className="py-5 mx-auto">
          <div className="card p-1 shadow-lg mx-0">
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
                  <h1 className="fw-bold">Kelola Data Penduduk</h1>
                  <h3 className="fw-bold">
                    Total Penduduk {totalPenduduk}, Jumlah KK {totalkk}
                  </h3>
                  <p className="text-light opacity-75">Cari Data Penduduk, Edit Data Penduduk</p>
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
              <Row className="text-end">
                <Col md={8}>
                  <Form>
                    <Row>
                      <Col md={4}>
                        <InputGroup as={Col} className="mb-3">
                          <InputGroup.Text id="basic-addon1">NIK</InputGroup.Text>
                          <Form.Control
                            type="number"
                            aria-label="NIK"
                            aria-describedby="basic-addon1"
                            value={tempFilter.nik}
                            onChange={handleFilterChange}
                            name="nik"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={4}>
                        <InputGroup as={Col} className="mb-3">
                          <InputGroup.Text id="basic-addon2">KK</InputGroup.Text>
                          <Form.Control
                            type="number"
                            aria-label="KK"
                            aria-describedby="basic-addon2"
                            value={tempFilter.kk}
                            onChange={handleFilterChange}
                            name="kk"
                          />
                        </InputGroup>
                      </Col>
                      <Col md={4}>
                        <InputGroup as={Col} className="mb-3">
                          <InputGroup.Text id="basic-addon3">Nama</InputGroup.Text>
                          <Form.Control
                            type="text"
                            aria-label="Nama"
                            aria-describedby="basic-addon3"
                            value={tempFilter.nama}
                            onChange={handleFilterChange}
                            name="nama"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md={4}>
                  <Row>
                    <Col className="mb-2 text-start">
                      <Button type="submit d-flex " onClick={handleFilterSubmit}>
                        Cari
                      </Button>
                    </Col>

                    <Col>
                      <button className="btn btn-primary text-end" onClick={handleShowFilter}>
                        Filter
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={3}>
                  {error ? (
                    <div></div>
                  ) : (
                    <Row className="mt-2 d-flex ">
                      <Col className="">
                        <button onClick={handleSetFilter} className="btn btn-success">
                          Download Excel
                        </button>
                      </Col>
                    </Row>
                  )}
                </Col>

                <Col md={6} className="mt-2">
                  {error ? (
                    <div></div>
                  ) : (
                    <Row className="">
                      {/* Tombol Previous */}
                      <Col className="text-center">
                        <Button variant="secondary" onClick={handlePrevPage} disabled={filter.page === 1}>
                          &larr; Prev
                        </Button>
                      </Col>

                      {/* Info Halaman */}
                      <Col className="text-center">
                        <span className=" text-center">
                          Page {filter.page} of {totalPages}
                        </span>
                      </Col>

                      {/* Tombol Next */}
                      <Col className="text-center">
                        <Button variant="secondary" onClick={handleNextPage} disabled={filter.page >= totalPages}>
                          Next &rarr;
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={3} className="mt-2">
                  <Row>
                    <Col md={8}>
                      {error ? (
                        <div></div>
                      ) : (
                        <p className="text-center mt-2">
                          {dataDitampilkan} dari {dataDidapatkan} penduduk
                        </p>
                      )}
                    </Col>
                    <Col md={4} className="text-end">
                      <button
                        className="btn btn-primary text-end"
                        onClick={(e) => {
                          navigate(`/tambahpenduduk`);
                        }}
                      >
                        <i className="bi bi-person-add"></i> Add
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row></Row>
              <Row>
                <Table hover size="sm" responsive className="mt-1" bordered>
                  <thead style={{ fontSize: "12px" }}>
                    <tr className="text-center">
                      <th>Aksi</th>
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
                      <th>Koordinat</th>
                    </tr>
                  </thead>
                  {isLoadingData ? (
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
                      {dataPenduduk.map((penduduk, index) => (
                        <tr key={index}>
                          <td className="d-flex justify-content-center">
                            <Link
                              to={`/datapenduduk/${penduduk.id}`}
                              className="btn btn-outline-primary btn-sm me-2"
                              title="Preview"
                            >
                              <i className="bi bi-search"></i>
                            </Link>
                            <Button
                              variant="outline-success"
                              className="btn btn-outline-success btn-sm me-2"
                              size="sm"
                              title="Tambahkan Data Dinamis"
                              onClick={() => handleDinamisModal(penduduk.nik, penduduk.kk)}
                            >
                              <i className="bi bi-plus-lg"></i>
                            </Button>

                            <Button
                              variant="outline-danger"
                              size="sm"
                              title="Hapus"
                              onClick={() => handleDeleteModal(penduduk.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                          <td>
                            {filter.limit !== "" && filter.page !== ""
                              ? index + parseInt(filter.limit) * parseInt(filter.page - 1) + 1
                              : index + 1}
                          </td>
                          <td>{penduduk.nik}</td>
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
                          <td style={{ whiteSpace: "nowrap" }}>
                            {penduduk.latitude}, {penduduk.longitude}
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
      {/* offcanvas filter */}
      <Offcanvas show={showFilter} onHide={handleCloseFilter} placement="end">
        <Offcanvas.Header closeButton className="bg-primary text-white shadow-sm">
          <Offcanvas.Title>Filter Data Penduduk</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-4">
          <Form onSubmit={handleFilterSubmit}>
            {/* Jenis Kelamin */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Jenis Kelamin</Form.Label>
              <div className="border rounded p-3 bg-light">
                {(uniqueColumns?.jenis_kelamin ?? []).map((gender) => {
                  const genderMapping = { L: "Laki-Laki", P: "Perempuan" }; // Mapping label

                  return (
                    <Form.Check
                      key={gender} // Gunakan gender langsung sebagai key
                      type="checkbox"
                      label={genderMapping[gender] || gender} // Default label jika tidak ada mapping
                      name="jenis_kelamin"
                      value={gender}
                      checked={tempFilter.jenis_kelamin.includes(gender)}
                      onChange={handleCheckboxChange}
                      className="mb-2"
                    />
                  );
                })}
              </div>
            </Form.Group>

            {/* Tanggal Lahir Sesudah */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Tanggal Lahir Sesudah</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_lahir_min"
                value={tempFilter.tanggal_lahir_min}
                onChange={handleFilterChange}
                className="shadow-sm rounded"
              />
            </Form.Group>

            {/* Tanggal Lahir Sebelum */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Tanggal Lahir Sebelum</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_lahir_max"
                value={tempFilter.tanggal_lahir_max}
                onChange={handleFilterChange}
                className="shadow-sm rounded"
              />
            </Form.Group>
            {/* status perkawinan */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Status Perkawinan</Form.Label>
              <div className="border rounded p-3 bg-light">
                {(uniqueColumns?.status_perkawinan ?? []).map((status) => (
                  <Form.Check
                    key={status} // Gunakan status langsung sebagai key
                    type="checkbox"
                    label={status} // Gunakan nilai langsung tanpa mapping
                    name="status_perkawinan"
                    value={status}
                    checked={tempFilter.status_perkawinan.includes(status)}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
            {/* golongan darah */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Golongan Darah</Form.Label>
              <div className="border rounded p-3 bg-light">
                {(uniqueColumns?.golongan_darah ?? []).map((gol_darah) => (
                  <Form.Check
                    key={gol_darah} // Gunakan status langsung sebagai key
                    type="checkbox"
                    label={gol_darah} // Gunakan nilai langsung tanpa mapping
                    name="golongan_darah"
                    value={gol_darah}
                    checked={tempFilter.golongan_darah.includes(gol_darah)}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
            {/* agama */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Agama</Form.Label>
              <div className="border rounded p-3 bg-light">
                {(uniqueColumns?.agama ?? []).map((agama_) => (
                  <Form.Check
                    key={agama_} // Gunakan status langsung sebagai key
                    type="checkbox"
                    label={agama_} // Gunakan nilai langsung tanpa mapping
                    name="agama"
                    value={agama_}
                    checked={tempFilter.agama.includes(agama_)}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
            {/* pendidikan */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Pendidikan</Form.Label>
              <div className="border rounded p-3 bg-light">
                {(uniqueColumns?.pendidikan ?? []).map((pendidikan_) => (
                  <Form.Check
                    key={pendidikan_} // Gunakan status langsung sebagai key
                    type="checkbox"
                    label={pendidikan_} // Gunakan nilai langsung tanpa mapping
                    name="pendidikan"
                    value={pendidikan_}
                    checked={tempFilter.pendidikan.includes(pendidikan_)}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
            {/* pekerjaan */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Pekerjaan</Form.Label>
              <div className="border rounded p-3 bg-light">
                {(uniqueColumns?.pekerjaan ?? []).map((pekerjaan_) => (
                  <Form.Check
                    key={pekerjaan_} // Gunakan status langsung sebagai key
                    type="checkbox"
                    label={pekerjaan_} // Gunakan nilai langsung tanpa mapping
                    name="pekerjaan"
                    value={pekerjaan_}
                    checked={tempFilter.pekerjaan.includes(pekerjaan_)}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
            {/* dusun */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Dusun</Form.Label>
              <div className="border rounded p-3 bg-light">
                {(uniqueColumns?.dusun ?? []).map((dusun_) => (
                  <Form.Check
                    key={dusun_} // Gunakan status langsung sebagai key
                    type="checkbox"
                    label={dusun_} // Gunakan nilai langsung tanpa mapping
                    name="dusun"
                    value={dusun_}
                    checked={tempFilter.dusun.includes(dusun_)}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
            {/* jorong */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Jorong</Form.Label>
              <div className="border rounded p-3 bg-light">
                {(uniqueColumns?.jorong ?? []).map((jorong_) => (
                  <Form.Check
                    key={jorong_} // Gunakan status langsung sebagai key
                    type="checkbox"
                    label={jorong_} // Gunakan nilai langsung tanpa mapping
                    name="jorong"
                    value={jorong_}
                    checked={tempFilter.jorong.includes(jorong_)}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>

            {/* Button Terapkan Filter */}
            <Button type="submit" variant="primary" className="btn-lg w-100">
              Terapkan Filter
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Modal Konfirmasi Download */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Download</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          {isLoadingData ? (
            <div className="d-flex align-items-center">
              <span className="spinner-border spinner-border-sm me-2"></span>
              <span>Tunggu Sebentar...</span>
            </div>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button variant="success" onClick={handleDownload}>
                Download
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            className="form-control"
            placeholder="Masukkan password untuk menghapus"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Tutup
          </Button>
          {isLoading ? (
            <button className="btn btn-danger" disabled>
              Menghapus...
              <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleDelete}>
              Hapus
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil dihapus</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowSuccessModal(false);
              window.location.reload();
            }}
          >
            oke
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={dinamisModal} onHide={() => setDinamisModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambahkan Penduduk Ke Data Dinamis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Pilih Berdasarkan</Form.Label>
              <Form.Select value={tipeData} onChange={(e) => setTipeData(e.target.value)}>
                <option value="">-- Pilih --</option>
                <option value="nik">NIK</option>
                <option value="kk">KK</option>
              </Form.Select>
            </Form.Group>

            {tipeData && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Jenis Data</Form.Label>
                  <Form.Select value={subData} onChange={(e) => setSubData(e.target.value)}>
                    <option value="">-- Pilih --</option>
                    {subOptions.map((item) => (
                      <option key={item.id} value={item.data}>
                        {item.data}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDinamisModal(false)}>
            Batal
          </Button>
          <Button variant="success" onClick={handleSubmit} disabled={!tipeData || !subData || !keterangan}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      {showSuccessAlert && (
        <div
          className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-4"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          Data berhasil disimpan!
        </div>
      )}
    </div>
  );
};

export default DashboardPenduduk;
