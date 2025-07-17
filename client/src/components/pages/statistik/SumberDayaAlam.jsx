import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import "./SumberDayaAlam.css";

const SumberDayaAlam = () => {
  const datapadi = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Pakan Sinayan", "Bansa"],
        labels: {
          show: true,
        },
      },
      title: {
        text: "Luas Tanam",
      },
      yaxis: {
        title: {
          text: "Luas (Ha)",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Luas Tanam ${192 + 175} (Ha)`,
        data: [192, 175],
      },
    ],
  };
  const datapadi2 = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Pakan Sinayan", "Bansa"],
        labels: {
          show: true,
        },
      },
      title: {
        text: "Produktifitas Panen",
      },
      yaxis: {
        title: {
          text: "Produktifitas (Ton)",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Produktifitas ${1106.7 + 1019.2} (Ton)`,
        data: [1106.7, 1019.2],
      },
    ],
  };
  const datapalawija = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Pakan Sinayan", "Bansa"],
        labels: {
          show: true,
        },
      },
      title: {
        text: "Luas Tanam ",
      },
      yaxis: {
        title: {
          text: "Luas (Ha)",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Jagung ${1.5 + 1} (Ha)`,
        data: [1.5, 1],
      },
      {
        name: `Ubi Kayu ${1 + 0.25} (Ha)`,
        data: [1, 0.25],
      },
      {
        name: `Ubi Jalar ${1.25 + 0.25} (Ha)`,
        data: [1.25, 0.25],
      },
      {
        name: `Kacang Tanah ${1.25 + 1.75} (Ha)`,
        data: [1.25, 1.75],
      },
    ],
  };
  const datapalawija2 = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Pakan Sinayan", "Bansa"],
        labels: {
          show: true,
        },
      },
      title: {
        text: "Produktifitas",
      },
      yaxis: {
        title: {
          text: "Produktifitas (Ton)",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Jagung ${1.5 + 1.5} (Ton)`,
        data: [1.5, 1.5],
      },
      {
        name: `Ubi Kayu ${38 + 10} (Ton)`,
        data: [38, 10],
      },
      {
        name: `Ubi Jalar ${6 + 6} (Ton)`,
        data: [6, 6],
      },
      {
        name: `Kacang Tanah ${1 + 1} (Ton)`,
        data: [1, 1],
      },
    ],
  };
  const holtikultura = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Pakan Sinayan", "Bansa"],
        labels: {
          show: true,
        },
      },
      title: {
        text: "Luas Tanam ",
      },
      yaxis: {
        title: {
          text: "Luas (Ha)",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Cabai ${1.5 + 1} (Ha)`,
        data: [1.5, 1],
      },
      {
        name: `Buncis ${0.5 + 0} (Ha)`,
        data: [0.5, 0],
      },
    ],
  };
  const holtikultura2 = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Pakan Sinayan", "Bansa"],
        labels: {
          show: true,
        },
      },
      title: {
        text: "Produktifitas",
      },
      yaxis: {
        title: {
          text: "Produktifitas (Ton)",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Cabai ${4 + 4} (Ton)`,
        data: [4, 4],
      },
      {
        name: `Buncis ${3.5 + 0} (Ton)`,
        data: [3.5, 0],
      },
    ],
  };
  const buah = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Pakan Sinayan", "Bansa"],
        labels: {
          show: true,
        },
      },
      title: {
        text: "Luas Tanam ",
      },
      yaxis: {
        title: {
          text: "Luas (Ha)",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Durian ${5 + 2} (Ha)`,
        data: [5, 2],
      },
      {
        name: `Manggis ${1.5 + 1} (Ha)`,
        data: [1.5, 1],
      },
      {
        name: `Pisang ${0.25 + 0.25} (Ha)`,
        data: [0.25, 0.25],
      },
    ],
  };
  const buah2 = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Pakan Sinayan", "Bansa"],
        labels: {
          show: true,
        },
      },
      title: {
        text: "Produktifitas",
      },
      yaxis: {
        title: {
          text: "Produktifitas (Ton)",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
    },
    series: [
      {
        name: `Durian ${6 + 2} (Ton)`,
        data: [6, 2],
      },
      {
        name: `Manggis ${5 + 2} (Ton)`,
        data: [6, 2],
      },
      {
        name: `Pisang ${6.25 + 6.25} (Ton)`,
        data: [6.25, 6.25],
      },
    ],
  };
  return (
    <section className="sumberdayaalam my-5 pt-5">
      <Container className="shadow">
        <h1>Sumber Daya Alam</h1>
        <Row>
          <Col lg={12}>
            <p>
              Sumber daya alam (SDA) adalah potensi sumber daya yang terkandung dalam bumi (tanah), air, dan diantara
              yang dapat didayagunakan untuk memenuhi kebutuhan dan kepentingan manusia. Potensi alam merupakan suatu
              potensi fisik dasar yang dimiliki suatu wilayah atau kawasan. Kondisi tanah di Nagari Kamang Tangah Anam
              Suku termasuk tanah yang subur sehingga baik digunakan untuk lahan pertanian. Potensi-potensi alam yang
              dimiliki Nagari Kamang Tangah Anam Suku, antara lain:
            </p>
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Tanaman Padi</h3>
            <p>
              Nagari Kamang Tangah Anam Suku memiliki hamparan sawah yang luas yang ditanami padi dengan varietas padi
              putiah, sijunjuang, sasanggam panuah, dan benih berlabel kuriak kusuik. Berikut data luas tanam dan panen
              padi sawah Nagari Kamang Tangah Anam Suku.
            </p>
            <Chart options={datapadi.options} series={datapadi.series} type="bar" height={350} />
            <Chart options={datapadi2.options} series={datapadi2.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Tanaman Palawija</h3>
            <p>
              Disamping tanaman padi sawah, pada lahan kering (tegalan/kebun) juga berpotensi untuk ditanami dengan
              tanaman palawija seperti jagung, ubi kayu, ubi jalar, kacang tanah dan lain - lain. Adapun data luas tanam
              dan produksi tanaman palawija di Nagari Kamang Tangah Anam Suku antara lain:
            </p>
            <Chart options={datapalawija.options} series={datapalawija.series} type="bar" height={350} />
            <Chart options={datapalawija2.options} series={datapalawija2.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Tanaman Holtikultura</h3>
            <p>
              Adapun data luas lanam, luas panen, prodiktifitas dan produksi tanaman Hortikultura di Nagari Kamang
              Tangah Anam Suku:
            </p>
            <Chart options={holtikultura.options} series={holtikultura.series} type="bar" height={350} />
            <Chart options={holtikultura2.options} series={holtikultura2.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Tanaman Buah-Buahan</h3>
            <p>
              Adapun data luas lahan, luas panen, prodiktifitas dan produksi tanaman buah - buahan di Nagari Kamang
              Tangah Anam Suku:
            </p>
            <Chart options={buah.options} series={buah.series} type="bar" height={350} />
            <Chart options={buah2.options} series={buah2.series} type="bar" height={350} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SumberDayaAlam;
