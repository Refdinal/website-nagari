import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "./OrganisasiNagari.css";
import axios from "axios";
const OrganisasiNagari = () => {
  const [walinagari, setWalinagari] = useState("");
  const [sekretaris, setSekretaris] = useState("");
  const [kasiPem, setKasiPem] = useState("");
  const [kasiPel, setKasiPel] = useState("");
  const [kasiKes, setKasiKes] = useState("");
  const [kaurTU, setKaurTU] = useState("");
  const [kaurKeu, setKaruKeu] = useState("");
  const [kaurPer, setKaruPer] = useState("");
  const [stafNag, setStafNag] = useState("");
  const [jorPKS, setJorPKS] = useState("");
  const [jorBansa, setJorBansa] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const fetchOrganisasi = async () => {
      try {
        const organisasi = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/organisasi/main`);
        setWalinagari(organisasi.data.walinagari[0]);
        const hasil = organisasi.data.perangkatBamus
          .filter((item) => item.organisasi === "perangkat")
          .map((item) => ({
            jabatan: item.jabatan,
            nama: item.nama,
            foto: item.foto,
          }))
          .sort((a, b) => a.jabatan.localeCompare(b.jabatan));

        setSekretaris(hasil[8]);
        setKasiPem(hasil[4]);
        setKasiPel(hasil[3]);
        setKasiKes(hasil[2]);
        setKaurTU(hasil[7]);
        setKaruKeu(hasil[5]);
        setKaruPer(hasil[6]);
        setStafNag(hasil[9]);
        setJorPKS(hasil[1]);
        setJorBansa(hasil[0]);
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
    <section className="organisasinagari my-5 pt-5">
      <Container>
        <Row>
          <Col>
            <h1 style={{ fontSize: "1.5rem" }}>SUSUNAN ORGANISASI DAN TATA KERJA PEMERINTAH </h1>
            <h1 style={{ fontSize: "1.5rem" }}>NAGARI KAMANG TANGAH ANAM SUKU</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="container-scroll">
              <div className="scrollable-div">
                <div className="inner-div">
                  <div className="walinagari" onClick={() => handleShowModal(walinagari, "WALINAGARI")}>
                    <div className="foto">
                      <img
                        src={
                          walinagari && walinagari.foto
                            ? import.meta.env.VITE_UPLOAD_URL + walinagari.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">WALINAGARI</div>
                      <div className="tag2">{walinagari.nama}</div>
                    </div>
                  </div>
                  <div className="sekretaris" onClick={() => handleShowModal(sekretaris, "SEKRETARIS")}>
                    <div className="foto">
                      <img
                        src={
                          sekretaris && sekretaris.foto
                            ? import.meta.env.VITE_UPLOAD_URL + sekretaris.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">SEKRETARIS NAGARI</div>
                      <div className="tag2">{sekretaris.nama}</div>
                    </div>
                  </div>
                  <div className="kaurkeuangan" onClick={() => handleShowModal(kaurKeu, "KAUR KEUANGAN")}>
                    <div className="foto">
                      <img
                        src={
                          kaurKeu && kaurKeu.foto
                            ? import.meta.env.VITE_UPLOAD_URL + kaurKeu.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">KAUR KEUANGAN</div>
                      <div className="tag2">{kaurKeu.nama}</div>
                    </div>
                  </div>
                  <div className="kaurtatausaha" onClick={() => handleShowModal(kaurTU, "KAUR T.USAHA & UMUM")}>
                    <div className="foto">
                      <img
                        src={
                          kaurTU && kaurTU.foto
                            ? import.meta.env.VITE_UPLOAD_URL + kaurTU.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">KAUR T.USAHA & UMUM</div>
                      <div className="tag2">{kaurTU.nama}</div>
                    </div>
                  </div>
                  <div className="stafftatausaha" onClick={() => handleShowModal(stafNag, "STAFF NAGARI")}>
                    <div className="foto">
                      <img
                        src={
                          stafNag && stafNag.foto
                            ? import.meta.env.VITE_UPLOAD_URL + stafNag.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">STAF NAGARI</div>
                      <div className="tag2">{stafNag.nama}</div>
                    </div>
                  </div>
                  <div className="kaurperencanaan" onClick={() => handleShowModal(kaurPer, "KAUR PERENCANAAN")}>
                    <div className="foto">
                      <img
                        src={
                          kaurPer && kaurPer.foto
                            ? import.meta.env.VITE_UPLOAD_URL + kaurPer.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">KAUR PERENCANAAN</div>
                      <div className="tag2">{kaurPer.nama}</div>
                    </div>
                  </div>
                  <div className="kasikesejahteraan" onClick={() => handleShowModal(kasiKes, "KASI KESEJAHTERAAN")}>
                    <div className="foto">
                      <img
                        src={
                          kasiKes && kasiKes.foto
                            ? import.meta.env.VITE_UPLOAD_URL + kasiKes.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">KASI KESEJAHTERAAN</div>
                      <div className="tag2">{kasiKes.nama}</div>
                    </div>
                  </div>
                  <div className="kasipelayanan" onClick={() => handleShowModal(kasiPel, "KASI PELAYANAN")}>
                    <div className="foto">
                      <img
                        src={
                          kasiPel && kasiPel.foto
                            ? import.meta.env.VITE_UPLOAD_URL + kasiPel.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">KASI PELAYANAN</div>
                      <div className="tag2">{kasiPel.nama}</div>
                    </div>
                  </div>
                  <div className="kasipemerintahan" onClick={() => handleShowModal(kasiPem, "KASI PEMBANGUNGAN")}>
                    <div className="foto">
                      <img
                        src={
                          kasiPem && kasiPem.foto
                            ? import.meta.env.VITE_UPLOAD_URL + kasiPem.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">KASI PEMERINTAHAN</div>
                      <div className="tag2">{kasiPem.nama}</div>
                    </div>
                  </div>
                  <div className="jorongpks" onClick={() => handleShowModal(jorPKS, "JORONG PAKAN SINAYAN")}>
                    <div className="foto">
                      <img
                        src={
                          jorPKS && jorPKS.foto
                            ? import.meta.env.VITE_UPLOAD_URL + jorPKS.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">JORONG PAKAN SINAYAN</div>
                      <div className="tag2">{jorPKS.nama}</div>
                    </div>
                  </div>
                  <div className="jorongbansa" onClick={() => handleShowModal(jorBansa, "JORONG BANSA")}>
                    <div className="foto">
                      <img
                        src={
                          jorBansa && jorBansa.foto
                            ? import.meta.env.VITE_UPLOAD_URL + jorBansa.foto
                            : `/assets/img/staffnagariimg/defaultprofile.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">JORONG BANSA</div>
                      <div className="tag2">{jorBansa.nama}</div>
                    </div>
                  </div>
                  <div className="tegak1"></div>
                  <div className="tegak2"></div>
                  <div className="tegak3"></div>
                  <div className="tegak4"></div>
                  <div className="tegak5"></div>
                  <div className="tegak6"></div>
                  <div className="tegak7"></div>
                  <div className="tegak8"></div>
                  <div className="tegak9"></div>
                  <div className="tegak10"></div>
                  <div className="tegak11"></div>
                  <div className="tegak12"></div>
                  <div className="tegak13"></div>
                  <div className="datar1"></div>
                  <div className="datar2"></div>
                  <div className="datar3"></div>
                  <div className="datar4"></div>
                  <div className="datar5"></div>
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

export default OrganisasiNagari;
