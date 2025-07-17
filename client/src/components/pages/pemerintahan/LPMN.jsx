import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./LPMN.css";

const LPMN = () => {
  return (
    <section className="lpmn my-5 pt-5">
      <Container>
        <Row>
          <Col>
            <h1 style={{ fontSize: "1.5rem" }}>KEPENGURUSAN LEMBAGA PEMBERDAYAAN MASYARAKAT (LPM)</h1>
            <h1 style={{ fontSize: "1.5rem" }}>NAGARI KAMANG TANGAH ANAM SUKU</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="container-scroll">
              <div className="scrollable-div">
                <div className="inner-div">
                  <div className="pembina">
                    <div className="foto">
                      <img src="/assets/img/staffnagariimg/walinagari.png" alt="" />
                    </div>
                    <div className="tagcontainer2">
                      <div className="tag1c">PEMBINA</div>
                      <div className="tag2c">1. WALINAGARI KAMANG TANGAH</div>
                      <div className="tag2c">ANAM SUKU</div>
                      <div className="tag2c">2. BAMUS NAGARI KAMANG TANGAH</div>
                      <div className="tag2c">ANAM SUKU</div>
                    </div>
                  </div>
                  <div className="ketua">
                    <div className="foto">
                      <img src="/assets/img/staffnagariimg/walinagari.png" alt="" />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">KETUA</div>
                      <div className="tag2">SYAWAL, S.PAR, M.PAR</div>
                    </div>
                  </div>
                  <div className="sekretaris">
                    <div className="foto">
                      <img src="/assets/img/staffnagariimg/walinagari.png" alt="" />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">SEKRETARIS</div>
                      <div className="tag2">LIMARTA DEPSA, A.MD</div>
                    </div>
                  </div>
                  <div className="infrastruktur">
                    <div className="foto">
                      <img src="/assets/img/staffnagariimg/walinagari.png" alt="" />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">BIDANG INFRASTRUKTUR</div>
                      <div className="tag2">INDRA PAKIAH BAGINDO</div>
                    </div>
                  </div>
                  <div className="kes-sosial">
                    <div className="foto">
                      <img src="/assets/img/staffnagariimg/walinagari.png" alt="" />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">BIDANG KESEJAHTERAAN SOSIAL</div>
                      <div className="tag2">EKO ADRIANIS</div>
                    </div>
                  </div>
                  <div className="ekonomi">
                    <div className="foto">
                      <img src="/assets/img/staffnagariimg/walinagari.png" alt="" />
                    </div>
                    <div className="tagcontainer">
                      <div className="tag1">BIDANG EKONOMI</div>
                      <div className="tag2">MARWANDI PUTRA, S.PT</div>
                    </div>
                  </div>

                  <div className="tegak1"></div>
                  <div className="tegak2"></div>
                  <div className="tegak3"></div>
                  <div className="tegak4"></div>

                  <div className="datar1"></div>
                  <div className="datar2"></div>
                  <div className="datar3"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LPMN;
