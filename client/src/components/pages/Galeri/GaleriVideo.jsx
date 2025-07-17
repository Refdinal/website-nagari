import React from "react";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import "./GaleriVideo.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
const GaleriVideo = () => {
  const [dataVideo, setDataVideo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    const getDataVideo = async () => {
      try {
        const video = await axios.get(`${import.meta.env.VITE_API_URL}/galerivideo/${limit}`);
        setDataVideo(video.data.video);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDataVideo();
  }, [limit]);

  const handleLimit = () => {
    setLimit(limit + 4);
  };
  return (
    <Container className="p-3">
      <section className=" py-5">
        {dataVideo.length > 0 ? (
          <Row className="shadow-sm ">
            <h3 className="text-center p-3 ">Galeri Video</h3>
            <Row className="justify-content-center m-auto">
              {dataVideo.map((item) => (
                <Col key={item.id} md={6} className="mb-3">
                  <div className="shadow-lg border-0 text-end">
                    <iframe
                      src={item.item}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      sandbox="allow-same-origin allow-scripts allow-popups"
                      style={{
                        position: "",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "400px",
                        borderRadius: "15px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    ></iframe>
                  </div>
                </Col>
              ))}
            </Row>
            <Row>
              <Button onClick={handleLimit}>Lebih Banyak</Button>
            </Row>
          </Row>
        ) : (
          <div className="text-center p-5">
            <h1>Belum Ada Video</h1>
          </div>
        )}
      </section>{" "}
    </Container>
  );
};

export default GaleriVideo;
