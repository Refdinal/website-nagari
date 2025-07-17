import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "./Bamus.css";
import axios from "axios";
const Bamus = () => {
  const [ketuaBamus, setKetuaBamus] = useState("");
  const [sekretarisBamus, setSekretarisBamus] = useState("");
  const [anggota1Bamus, setAnggota1Bamus] = useState("");
  const [anggota2Bamus, setAnggota2Bamus] = useState("");
  const [stafBamus, setStafBamus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  useEffect(() => {
    const fetchOrganisasi = async () => {
      try {
        const organisasi = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/organisasi/main`);

        const hasil = organisasi.data.perangkatBamus
          .filter((item) => item.organisasi === "bamus")
          .map((item) => ({
            jabatan: item.jabatan,
            nama: item.nama,
            foto: item.foto,
          }))
          .sort((a, b) => a.jabatan.localeCompare(b.jabatan));

        setAnggota1Bamus(hasil[0]);
        setAnggota2Bamus(hasil[1]);
        setStafBamus(hasil[4]);
        setSekretarisBamus(hasil[3]);
        setKetuaBamus(hasil[2]);
      } catch (error) {
        console.error("Gagal mengambil data ", error);
      }
    };
    fetchOrganisasi();
  }, []);
  const handleShowModal = (person, jabatan) => {
    setSelectedPerson({ ...person, jabatan });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <section className="bamus my-5 pt-5">
      <Container>
        <Row>
          <Col>
            <h1 style={{ fontSize: "1.5rem" }}>KEPENGURUSAN BADAN MUSYAWARAH (BAMUS)</h1>
            <h1 style={{ fontSize: "1.5rem" }}>NAGARI KAMANG TANGAH ANAM SUKU</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="container-scroll">
              <div className="scrollable-div">
                <div className="inner-div">
                  <div className="ketua" onClick={() => handleShowModal(ketuaBamus, "KETUA BAMUS")}>
                    <div className="foto">
                      <img
                        src={
                          ketuaBamus && ketuaBamus.foto
                            ? import.meta.env.VITE_UPLOAD_URL + ketuaBamus.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">KETUA BAMUS</div>
                      <div className="tag2">{ketuaBamus.nama}</div>
                    </div>
                  </div>
                  <div className="sekretaris" onClick={() => handleShowModal(sekretarisBamus, "SEKRETARIS BAMUS")}>
                    <div className="foto">
                      <img
                        src={
                          sekretarisBamus && sekretarisBamus.foto
                            ? import.meta.env.VITE_UPLOAD_URL + sekretarisBamus.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">SEKRETARIS BAMUS</div>
                      <div className="tag2">{sekretarisBamus.nama}</div>
                    </div>
                  </div>
                  <div className="anggota1" onClick={() => handleShowModal(anggota1Bamus, "ANGGOTA BAMUS")}>
                    <div className="foto">
                      <img
                        src={
                          anggota1Bamus && anggota1Bamus.foto
                            ? import.meta.env.VITE_UPLOAD_URL + anggota1Bamus.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">ANGGOTA BAMUS</div>
                      <div className="tag2">{anggota1Bamus.nama}</div>
                    </div>
                  </div>
                  <div className="anggota2" onClick={() => handleShowModal(anggota2Bamus, "ANGGOTA BAMUS")}>
                    <div className="foto">
                      <img
                        src={
                          anggota2Bamus && anggota2Bamus.foto
                            ? import.meta.env.VITE_UPLOAD_URL + anggota2Bamus.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">ANGGOTA BAMUS</div>
                      <div className="tag2">{anggota2Bamus.nama}</div>
                    </div>
                  </div>
                  <div className="staf" onClick={() => handleShowModal(stafBamus, "STAF BAMUS")}>
                    <div className="foto">
                      <img
                        src={
                          stafBamus && stafBamus.foto
                            ? import.meta.env.VITE_UPLOAD_URL + stafBamus.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">STAF BAMUS</div>
                      <div className="tag2">{stafBamus.nama}</div>
                    </div>
                  </div>
                  <div className="tegak1"></div>
                  <div className="tegak2"></div>
                  <div className="tegak3"></div>
                  <div className="tegak4"></div>
                  <div className="tegak5"></div>
                  <div className="datar1"></div>
                  <div className="datar2"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title>{selectedPerson?.jabatan}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={
              selectedPerson?.foto
                ? import.meta.env.VITE_UPLOAD_URL + selectedPerson.foto
                : `/assets/img/staffnagariimg/defaultprofile.png`
            }
            alt="Foto"
            className="img-fluid mb-3"
            style={{ width: "auto", height: "50vh", objectFit: "cover" }}
          />
          <h4>{selectedPerson?.nama}</h4>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Bamus;
