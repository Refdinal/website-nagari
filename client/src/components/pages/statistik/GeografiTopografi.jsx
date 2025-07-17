import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import "./GeografiTopografi.css";
const GeografiTopografi = () => {
  const seriesAset = [3.364, 0.85];
  const optionsAset = {
    labels: ["Pakan Sinayan", "Bansa"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      labels: {
        colors: ["#000"],
        useSeriesColors: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const value = opts.w.config.series[opts.seriesIndex];
        return value.toFixed(3) + " km²"; // 3 angka di belakang koma + km²
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "55%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Luas Wilayah",
              formatter: function (w) {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return total.toFixed(3) + " km²"; // Total dengan 3 angka di belakang koma + km²
              },
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return value.toFixed(3) + " km²"; // Tooltip dengan 3 angka di belakang koma + km²
        },
      },
    },
  };

  return (
    <section className="geografitopografi my-5 pt-5">
      <Container>
        <h1 className="text-center">Geografi dan Topografi Nagari</h1>

        <Row>
          <Col className="border shadow-lg " lg={5}>
            <Chart options={optionsAset} series={seriesAset} type="donut" />
          </Col>
          <Col className="border shadow-lg" lg={7}>
            <p>
              Nagari Kamang Tangah Anam Suku sebelum dimekarkan jorong memiliki dua jorong yaitu Jorong Bansa dan Jorong
              Pakan Sinayan.
            </p>
            <p>
              Nagari Kamang Tangah Anam Suku berada pada daratan tinggi 500-1000 meter di atas permukaan laut, dengan
              topografi daratan yang dibarengi dengan perbukitan. Perbandingan antara dataran dengan perbukitan adalah
              90:10. Kemiringan tanah berkisar 5-20 %. Jenis tanah di (wilayah dataran) berupa tanah humus yang cocok
              untuk semua jenis tanaman, sedangkan wilayah perbukitan terdiri dari tanah dan batuan karst.
            </p>
            <p>
              Suhu rata-rata di Nagari Kamang Tangah Anam Suku berkisar 27–30C dan Suhu udara sejuk dengan kelembaan
              relatif rendah. Sedangkan curah hujan cukup tinggi pertahun 2000-2500 mm/tahun tanpa bulan kering, curah
              hujan tertinggi terjadi pada bulan Agustus (161 mm) dengan hari hujan sebanyak 14 hari, sedangkan curah
              hujan terendah terjadi pada bulan Februari ( 67 mm ) dengan hari hujan sebanyak 5 hari. Kondisi iklim
              tersebut tidak berpengaruh terhadap aktivitas penduduk.{" "}
            </p>
            <p>
              Dari kondisi topografi yang ada di Nagari Kamang Tangah Anam Suku akan mempengaruhi kehidupan sosial
              ekonomi masyarakat dan ketersediaan lahan. Penggunaan lahan di Nagari Kamang Tangah Anam Suku di dominasi
              areal pertanian, perumahan sarana prasarana perkebunan dan bentuk lainnya.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GeografiTopografi;
