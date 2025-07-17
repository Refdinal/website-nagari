import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import "./DemografiPenduduk.css";
import axios from "axios";
const DemografiPenduduk = () => {
  const [dataDasar, setDataDasar] = useState([]);
  const [dataUmur, setDataUmur] = useState([]);
  const [dataPerkawinan, setDataPerkawinan] = useState([]);
  const [dataGolonganDarah, setDataGolonganDarah] = useState([]);
  const [dataAgama, setDataAgama] = useState([]);
  const [dataPendidikan, setDataPendidikan] = useState([]);
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [dataDusun, setDataDusun] = useState([]);
  const [dataJorong, setDataJorong] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_UPLOAD_URL}/penduduk/statistik/statistikdetail`);

        setDataDasar(data.data.statistik[0]);
        setDataUmur(data.data.umur);
        setDataPerkawinan(data.data.perkawinan);
        setDataGolonganDarah(data.data.golongan_darah);
        setDataAgama(data.data.agama);
        setDataPendidikan(data.data.pendidikan);
        setDataPekerjaan(data.data.pekerjaan);
        setDataDusun(data.data.dusun);
        setDataJorong(data.data.jorong);
      } catch (error) {}
    };
    getData();
  }, []);
  const pendudukUmur = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataUmur.map((item) => {
          const jumlah = parseInt(item.jumlah);
          const persentase = ((jumlah / dataDasar.jumlah_penduduk) * 100).toFixed(1); // Satu angka di belakang koma
          return `${item.kategori_umur} (${persentase}%)`;
        }),
        labels: {
          show: true,
          style: {
            fontSize: "12px", // Ukuran font label
          },
        },
      },
      title: {
        text: "Jumlah Penduduk Berdasarkan Umur",
      },
      yaxis: {
        title: {
          text: "Rentang Umur",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Menampilkan data label pada setiap bar
        style: {
          fontSize: "12px", // Ukuran font label
          colors: ["#000"], // Warna teks data label
        },
        formatter: function (val) {
          return val; // Menampilkan nilai di atas bar
        },
        offsetX: 10, // Posisi label untuk menghindari overlap
      },
    },
    series: [
      {
        name: "Jumlah Jiwa",
        data: dataUmur.map((item) => parseInt(item.jumlah)),
      },
    ],
  };

  const pendudukPerkawinan = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataPerkawinan.map((item) => {
          const jumlah = parseInt(item.jumlah);
          const persentase = ((jumlah / dataDasar.jumlah_penduduk) * 100).toFixed(1); // Satu angka di belakang koma
          return `${item.status_perkawinan} (${persentase}%)`;
        }),
        labels: {
          show: true,
          style: {
            fontSize: "12px", // Ukuran font label
          },
        },
      },
      title: {
        text: "Jumlah Penduduk Berdasarkan Status Perkawinan",
      },
      yaxis: {
        title: {
          text: "Status Perkawinan",
        },
        min: 0, // Pastikan min tidak negatif
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Menampilkan data label pada setiap bar
        style: {
          fontSize: "12px", // Ukuran font label
          colors: ["#000"], // Warna teks data label
        },
        formatter: function (val) {
          return val; // Menampilkan nilai di atas bar
        },
        offsetX: 10, // Posisi label untuk menghindari overlap
      },
    },
    series: [
      {
        name: "Jumlah Jiwa",
        data: dataPerkawinan.map((item) => parseInt(item.jumlah)),
      },
    ],
  };
  const pendudukGolonganDarah = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataGolonganDarah.map((item) => {
          const jumlah = parseInt(item.jumlah);
          const persentase = ((jumlah / dataDasar.jumlah_penduduk) * 100).toFixed(1); // Satu angka di belakang koma
          return `${item.golongan_darah} (${persentase}%)`;
        }),
        labels: {
          show: true,
          style: {
            fontSize: "12px", // Ukuran font label
          },
        },
      },
      title: {
        text: "Jumlah Penduduk Berdasarkan Golongan Darah",
      },
      yaxis: {
        title: {
          text: "Golongan Darah",
        },
        min: 0, // Pastikan min tidak negatif
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Menampilkan data label pada setiap bar
        style: {
          fontSize: "12px", // Ukuran font label
          colors: ["#000"], // Warna teks data label
        },
        formatter: function (val) {
          return val; // Menampilkan nilai di atas bar
        },
        offsetX: 10, // Posisi label untuk menghindari overlap
      },
    },
    series: [
      {
        name: "Jumlah Jiwa",
        data: dataGolonganDarah.map((item) => parseInt(item.jumlah)),
      },
    ],
  };

  const pendudukAgama = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataAgama.map((item) => {
          const jumlah = parseInt(item.jumlah);
          const persentase = ((jumlah / dataDasar.jumlah_penduduk) * 100).toFixed(1); // Satu angka di belakang koma
          return `${item.agama} (${persentase}%)`;
        }),
        labels: {
          show: true,
          style: {
            fontSize: "12px", // Ukuran font label
          },
        },
      },
      title: {
        text: "Jumlah Penduduk Berdasarkan Agama",
      },
      yaxis: {
        title: {
          text: "Agama",
        },
        min: 0, // Pastikan min tidak negatif
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Menampilkan data label pada setiap bar
        style: {
          fontSize: "12px", // Ukuran font label
          colors: ["#000"], // Warna teks data label
        },
        formatter: function (val) {
          return val; // Menampilkan nilai di atas bar
        },
        offsetX: 10, // Posisi label untuk menghindari overlap
      },
    },
    series: [
      {
        name: "Jumlah Jiwa",
        data: dataAgama.map((item) => parseInt(item.jumlah)),
      },
    ],
  };
  const pendudukPendidikan = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataPendidikan.map((item) => {
          const jumlah = parseInt(item.jumlah);
          const persentase = ((jumlah / dataDasar.jumlah_penduduk) * 100).toFixed(1); // Satu angka di belakang koma
          return `${item.pendidikan} (${persentase}%)`;
        }),
        labels: {
          show: true,
          style: {
            fontSize: "12px", // Ukuran font label
          },
        },
      },
      title: {
        text: "Jumlah Penduduk Berdasarkan Pendidikan",
      },
      yaxis: {
        title: {
          text: "Pendidikan",
        },
        min: 0, // Pastikan min tidak negatif
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Menampilkan data label pada setiap bar
        style: {
          fontSize: "12px", // Ukuran font label
          colors: ["#000"], // Warna teks data label
        },
        formatter: function (val) {
          return val; // Menampilkan nilai di atas bar
        },
        offsetX: 10, // Posisi label untuk menghindari overlap
      },
    },
    series: [
      {
        name: "Jumlah Jiwa",
        data: dataPendidikan.map((item) => parseInt(item.jumlah)),
      },
    ],
  };
  const pendudukPekerjaan = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataPekerjaan.map((item) => {
          const jumlah = parseInt(item.jumlah);
          const persentase = ((jumlah / dataDasar.jumlah_penduduk) * 100).toFixed(1); // Satu angka di belakang koma
          return `${item.pekerjaan} (${persentase}%)`;
        }),
        labels: {
          show: true,
          style: {
            fontSize: "12px", // Ukuran font label
          },
        },
      },
      title: {
        text: "Jumlah Penduduk Berdasarkan Pekerjaan",
      },
      yaxis: {
        title: {
          text: "Pekerjaan",
        },
        min: 0, // Pastikan min tidak negatif
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Menampilkan data label pada setiap bar
        style: {
          fontSize: "12px", // Ukuran font label
          colors: ["#000"], // Warna teks data label
        },
        formatter: function (val) {
          return val; // Menampilkan nilai di atas bar
        },
        offsetX: 10, // Posisi label untuk menghindari overlap
      },
    },
    series: [
      {
        name: "Jumlah Jiwa",
        data: dataPekerjaan.map((item) => parseInt(item.jumlah)),
      },
    ],
  };
  const pendudukDusun = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataDusun.map((item) => {
          const total = parseInt(item.laki_laki) + parseInt(item.perempuan);
          const persentase = ((total / dataDasar.jumlah_penduduk) * 100).toFixed(1);
          return `${item.dusun} (${persentase}%)`;
        }),
        labels: {
          show: true,
          style: {
            fontSize: "12px",
          },
        },
      },
      title: {
        text: "Jumlah Penduduk Berdasarkan Dusun & Jenis Kelamin",
      },
      yaxis: {
        title: {
          text: "Dusun",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "60%", // lebih kecil agar bar tidak bertumpuk
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
        formatter: function (val) {
          return val;
        },
        offsetX: 10,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Laki-laki",
        data: dataDusun.map((item) => parseInt(item.laki_laki)),
      },
      {
        name: "Perempuan",
        data: dataDusun.map((item) => parseInt(item.perempuan)),
      },
    ],
  };
  const pendudukJorong = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: dataJorong.map((item) => {
          const total = parseInt(item.laki_laki) + parseInt(item.perempuan);
          const persentase = ((total / dataDasar.jumlah_penduduk) * 100).toFixed(1);
          return `${item.jorong} (${persentase}%)`;
        }),
        labels: {
          show: true,
          style: {
            fontSize: "12px",
          },
        },
      },
      title: {
        text: "Jumlah Penduduk Berdasarkan Jorong & Jenis Kelamin",
      },
      yaxis: {
        title: {
          text: "Jorong",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "60%", // lebih kecil agar bar tidak bertumpuk
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
        formatter: function (val) {
          return val;
        },
        offsetX: 10,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Laki-laki",
        data: dataJorong.map((item) => parseInt(item.laki_laki)),
      },
      {
        name: "Perempuan",
        data: dataJorong.map((item) => parseInt(item.perempuan)),
      },
    ],
  };

  return (
    <section className="geografitopografi my-5 pt-5">
      <Container>
        <h1>Demografi Penduduk</h1>
        <Row>
          <Col>
            <p>
              Nagari Kamang Tangah Anam Suku memiliki jumlah penduduk sebanyak <b>{dataDasar.jumlah_penduduk} jiwa</b>{" "}
              dan <b>{dataDasar.jumlah_kk} Kepala Keluarga</b>, terdiri dari{" "}
              <b>
                laki-laki {dataDasar.jumlah_laki_laki} jiwa (
                {((dataDasar.jumlah_laki_laki / dataDasar.jumlah_penduduk) * 100).toFixed(1)}%)
              </b>{" "}
              dan{" "}
              <b>
                perempuan {dataDasar.jumlah_perempuan} jiwa (
                {((dataDasar.jumlah_perempuan / dataDasar.jumlah_penduduk) * 100).toFixed(1)}%)
              </b>
              . Nagari Kamang Tangah Anam Suku menjadi salah satu wilayah yang terus berkembang. Data ini diperoleh
              langsung dari sistem Database Nagari dan selalu diperbarui secara real-time, sehingga mencerminkan kondisi
              terkini. Berikut ini adalah gambaran demografi masyarakat nagari:
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" lg={6}>
            <h3>Berdasarkan Kelompok umur</h3>

            <Chart options={pendudukUmur.options} series={pendudukUmur.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Berdasarkan Status Perkawinan</h3>

            <Chart options={pendudukPerkawinan.options} series={pendudukPerkawinan.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Berdasarkan Golongan Darah</h3>

            <Chart
              options={pendudukGolonganDarah.options}
              series={pendudukGolonganDarah.series}
              type="bar"
              height={350}
            />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Berdasarkan Agama</h3>

            <Chart options={pendudukAgama.options} series={pendudukAgama.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Berdasarkan Pendidikan</h3>

            <Chart options={pendudukPendidikan.options} series={pendudukPendidikan.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Berdasarkan Pekerjaan</h3>

            <Chart options={pendudukPekerjaan.options} series={pendudukPekerjaan.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Berdasarkan Dusun</h3>

            <Chart options={pendudukDusun.options} series={pendudukDusun.series} type="bar" height={350} />
          </Col>
          <Col className="text-center" lg={6}>
            <h3>Berdasarkan Jorong</h3>

            <Chart options={pendudukJorong.options} series={pendudukJorong.series} type="bar" height={350} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DemografiPenduduk;
