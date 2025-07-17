import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./FasilitasBangunan.css";
const FasilitasBangunan = () => {
  return (
    <section className="fasilitasbangunan my-5 pt-5">
      <Container>
        <h1>Fasilitas Bangunan</h1>
        <Row>
          <Col>
            <p>Berikut gambaran umum fasilitas dasar yang mendukung pembangunan di Nagari Kamang Tangah Anam Suku. </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Fasilitas Pendidikan</h3>
            <p>
              Terdapat sekolah umum dan pondok pesantren di Nagari Kamang Tangah Anam Suku dengan rincian seperti
              terlihat pada tabel di bawah ini :
            </p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Sarana Pendidikan</th>
                  <th>Tingkatan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Pondok Pesantren MAS Yati Kampuang Baru</td>
                  <td>SMA/MA Sederajat</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Pondok Pesantren MAS Mumtaz Pakan Sinayan</td>
                  <td>SMA/MA Sederajat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Pondok Pesantren MTs Yati Kampuang Baru</td>
                  <td>SMP/MTs Sederajat</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Pondok Pesantren MTsS Mumtaz Pakan Sinayan</td>
                  <td>SMP/MTs Sederajat</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>SMP N 2 Kamang Magek</td>
                  <td>SMP/MTs Sederajat</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>SD 21 Pakan Sinayan</td>
                  <td>SD/ MI Sederajat</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>SD 03 Pakan Sinayan</td>
                  <td>SD/ MI Sederajat</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>SD 16 Bansa</td>
                  <td>SD/ MI Sederajat</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>MIN 3 Agam</td>
                  <td>SD/ MI Sederajat</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>TK Tuanku Nan Renceh</td>
                  <td>TK/ RA</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>RA MIN Jati Kayu Ampek</td>
                  <td>TK/ RA</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>TK Muhammadiyah Aisyiyah Bustanul Athfal</td>
                  <td>TK/ RA</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>PAUD Nurul Hikmah</td>
                  <td>TK/ RA</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Fasilitas Kesehatan</h3>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Fasilitas Kesehatan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Puskesmas Pembantu (Pustu) Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Pos Kesehatan Nagari (Poskesri) Kayu Ampek</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Fasilitas Perekonomian</h3>
            <p>
              Terdapat satu pasar nagari di Jorong Pakan Sinayan yaitu Pasar Pakan Sinayan. Kemudian terdapat mini
              market, kedai kelontong, grosir, kedai nasi dan lainnya yang tersebar di seluruh nagari. Berikut gambaran
              umum fasilitas perekonomian di Nagari Kamang Tangah Anam Suku:
            </p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Jenis Fasilitas</th>
                  <th>Jumlah</th>
                  <th>Lokasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Pasar Nagari</td>
                  <td>1</td>
                  <td>Jorong Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Mini Market</td>
                  <td>4</td>
                  <td>Jorong Pakan Sinayan, Jorong Bansa</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Grosir P&D</td>
                  <td>24</td>
                  <td>Jorong Pakan Sinayan, Jorong Bansa</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Kedai Nasi</td>
                  <td>9</td>
                  <td>Jorong Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Usaha Perdagangan Lainnya</td>
                  <td>50</td>
                  <td>Tersebar di Nagari Kamang Tangah Anam Suku</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Pembangunan Perumahan Rakyat</h3>
            <p>
              Terdapat ± 100 bangunan perumahan Mande Villa di Kayu Ampek Jorong Pakan Sinayan yang menyediakan rumah
              subsidi bagi masyarakat.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Sarana Peninggalan Sejarah</h3>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Sarana Peninggalan Sejarah</th>
                  <th>Alamat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Makam Tuanku Nan Renceh</td>
                  <td>Jorong Bansa</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Makam H. Abdul Manan</td>
                  <td>Jorong Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Taman Makam Pahlawan Bahagia</td>
                  <td>Jorong Bansa</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Tugu Peringatan Perang Kamang</td>
                  <td>Jorong Pakan Sinayan</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Sarana Penyedia Air Bersih</h3>
            <p>
              Terdapat sumur bor bantuan dari pemerintah pusat dan swadaya masyarakat. Sumur bor ini sebagian bisa
              digunakan untuk memasak sebagain lagi hanya bisa untuk mengairi sawah. Berikut rincian sumur bor yang ada
              di Nagari Kamang Tangah Anam Suku:
            </p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Sumur Bor</th>
                  <th>Lokasi</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Sumur Bor Tapi</td>
                  <td>Dusun Tapi J. Pakan Sinayan</td>
                  <td>Bantuan pemerintah pusat</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Sumur Bor Kampung Baru</td>
                  <td>Dusun Kampung Baru J. Pakan Sinayan</td>
                  <td>Bantuan pemerintah pusat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Sumur Bor Muallimin</td>
                  <td>Ponpes Muallimin Pakan Sinayan</td>
                  <td>Bantuan pemerintah pusat</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Sumur Bor Mushalla Muhammadiyah Pakan Sinayan</td>
                  <td>Komplek Mushalla Muhammadiyah J. Pakan Sinayan</td>
                  <td>Swadaya masyarakat</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Sumur Bor Kampung Baru</td>
                  <td>Komplek Surau Nurul Hikmah Kampung Baru J. Pakan Sinayan</td>
                  <td>Swadaya masyarakat</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Sumur Bor Kampung Budi</td>
                  <td>Dusun Kampung Budi J. Pakan Sinayan</td>
                  <td>Swadaya masyarakat</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Irigasi </h3>
            <p>Sarana Irigasi di Nagari Kamang Tangah Anam Suku </p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Irigasi</th>
                  <th>Panjang</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Saluran irigasi Titian Batu-Pincuran Bancah</td>
                  <td>5000 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Saluran irigasi Kasiak-Bukik Tarapuang</td>
                  <td>5000 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Saluran irigasi Banda Sirah-Pincuran Bancah</td>
                  <td>5000 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Saluran irigasi Tarusan Mumbuang-Kelok</td>
                  <td>1000 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Saluran irigasi Banda Ladang Laweh-Kp. Budi</td>
                  <td>1000 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Irigiasi Padat Karya Ladang Laweh-Parik Panjang di Jorong Bansa</td>
                  <td>200 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Saluran Irigasi Bedeng 2-Manduang</td>
                  <td>1100 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Saluran Irigasi Banda Tangah</td>
                  <td>500 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Irigasi Tepi Jalan dari Simp.Kayu IV- Mudiak</td>
                  <td>600 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Irigasi Banda Belakang MIN 3 Agam- Koto Tangah</td>
                  <td>2000 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Irigasi Kampung Tapi- Kampung Baru</td>
                  <td>800 m</td>
                  <td>Masih tanah</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Irigasi kampung Tapi-kampung tangah</td>
                  <td>700 m</td>
                  <td>Masih tanah</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>Irigasi Tapi-Kp. Budi</td>
                  <td>600 m</td>
                  <td>Masih tanah</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Pembangunan irigasi dari Baua-Kubang</td>
                  <td>400 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Irigasi banda Padat Karya Pos Ronda Kp. Budi-Kampung tapi</td>
                  <td>600 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>Pembuatan Banda padat karya Marambuang-Kasiak Bukit Tarapuang</td>
                  <td>800 m</td>
                  <td>Masih tanah</td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>Irigasi Banda padat karya Pos Ronda-Parik Panjang</td>
                  <td>400 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>Irigasi dari gerbang-Kincia</td>
                  <td>350 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>Irigasi dari Koto Tangah-ujung Lubuak</td>
                  <td>500 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>Irigasi Marambuang-Ngalau Bukik Tarapuang</td>
                  <td>500 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>21</td>
                  <td>Irigasi dari marambuang-payobada-Kasiak</td>
                  <td>750 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
                <tr>
                  <td>22</td>
                  <td>Irigasi Simabua-kampung Budi</td>
                  <td>500 m</td>
                  <td>Sebagian belum didam</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Koperasi dan UMKM</h3>
            <p>
              Tak hanya bertani masyarakat juga bergerak di sektor UMKM seperti usaha kerupuk kamang, perabot dan
              pembuatan kue yang sudah memiliki izin P-IRT dan lainnya. Berikut gambaran umumnya.
            </p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Koperasi / UMKM</th>
                  <th>Jumlah</th>
                  <th>Lokasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Koperasi Majelis Baitu Ibrahim Kayu Ampek </td>
                  <td>1</td>
                  <td>Dusun Kayu Ampek Jorong Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>UMKM Pembuatan Kerupuk dan Kerupuk Kamang</td>
                  <td>5</td>
                  <td>Tersebar di Jorong Bansa dan Jorong Pakan Sinayan </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>UMKM Perabot</td>
                  <td>7</td>
                  <td>Tersebar di Jorong Bansa dan Jorong Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Konveksi (kerancang, bordir, mukena)</td>
                  <td>20</td>
                  <td>Tersebar di Jorong Bansa dan Jorong Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Kue Tradisional</td>
                  <td>30</td>
                  <td>Tersebar di Jorong Bansa dan Jorong Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Rajutan</td>
                  <td>5</td>
                  <td>Tersebar di Jorong Bansa dan Jorong Pakan Sinayan</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Perbankan</h3>
            <p>
              Terdapat BMT Agam Madani Nagari Kamang Mudiak yang merupakan usaha simpan pinjam bagi masyarakat Nagari
              Kamang Tangah Anam Suku sekitar yang bertempat di Jorong Pakan Sinayan.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Pariwisata</h3>
            <p>Menunjang pariwisata di Nagari Kamang Tangah Anam Suku terdapat homestay di nagari tersebut, yaitu:</p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Homestay</th>
                  <th>Alamat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Homestay Sikumbang</td>
                  <td>Kampung Tangah Jorong Pakan Sinayan</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Homestay Zumfakeya</td>
                  <td>Kampung Tapi Jorong Pakan Sinayan</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Sarana Jalan</h3>
            <p>1. Jalan Kabupaten</p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Ruas Jalan</th>
                  <th>Panjang</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Jalan kabupaten Kampung Tangah Jorong Pakan Sinayan-Manduang</td>
                  <td>±2.940 meter</td>
                  <td>Aspal</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jalan kabupaten simpang tugu Jorong Pakan Sinayan-Jorong Bansa</td>
                  <td>± 1.213 meter</td>
                  <td>Aspal</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jalan kabupaten Tapi Jorong Pakan Sinayan-Uba Nagari Koto Tangah</td>
                  <td>±50 meter</td>
                  <td>Aspal</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Jalan kabupaten Kampung Budi-Parik Panjang</td>
                  <td>±952 meter</td>
                  <td>Aspal</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Jalan Kabupaten Tugu Pakan Sinayan – Tapi -Kayu Ampek</td>
                  <td>±2.133 meter</td>
                  <td>Aspal</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Jalan Kabupaten Kayu Ampek-Simpang Manduang</td>
                  <td>±670 meter</td>
                  <td>Aspal</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Jalan Kabupaten Simpang Toko Balai- Rumah Koto – Rumah Pisang</td>
                  <td>±1.602 meter</td>
                  <td>Aspal</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Jalan Kabupaten Kampung Baru– Makam Haji Abdul Manan</td>
                  <td>±606 meter</td>
                  <td>Tanah</td>
                </tr>
              </tbody>
            </Table>
            <p>2. Jalan Nagari</p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Ruas Jalan</th>
                  <th>Panjang</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Rabat beton jalan lingkung Kampung Baru</td>
                  <td>±200 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jalan lingkung ke makam di Kampung Baru</td>
                  <td>±400 meter</td>
                  <td>tanah</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jalan lingkung payobada Kampung Baru</td>
                  <td>±100 meter</td>
                  <td>tanah</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Jalan lingkar Kampung Budi</td>
                  <td>±500 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Jalan Kampung Budi </td>
                  <td>±500 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Jalan Lingkung Parik Panjang</td>
                  <td>±1000 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Jalan Lingkung Parumahan di Parik Panjang</td>
                  <td>±100 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Jalan Lingkung Parumahan di Parik Panjang</td>
                  <td>±100 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Jalan Lingkung Parik Panjang</td>
                  <td>±100 meter</td>
                  <td>tanah</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Jalan lingkar Kampung Tangah </td>
                  <td>±600 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Jalan usaha tani Kampung Tangah</td>
                  <td>±200 meter</td>
                  <td>Pendaman jalan</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Jalan Usaha Tani Bansa- Parik Panjang</td>
                  <td>±500 meter</td>
                  <td>Pendaman jalan</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Jalan Sipanjang Bansa</td>
                  <td>±200 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>Jalan lingkung Urek Kubang Bansa</td>
                  <td>±500 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Jalan Tabing Bansa</td>
                  <td>±100 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Jalan Bukik Tarapuang Bansa- Padang Kunyik </td>
                  <td>±1.062 meter</td>
                  <td>tanah</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>Jalan Rumah Jambak Bansa </td>
                  <td>±100 meter</td>
                  <td>beton</td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>Jalan Rumah Pisang Bansa</td>
                  <td>±150 meter</td>
                  <td>beton</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Sarana Komunikasi</h3>
            <p>Berikut kondisi keberadaan akses alat komunikasi di Nagari Kamang Tangah Anam Suku. </p>
            <p>1. Menara Seluler</p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th rowSpan={2}>No</th>
                  <th rowSpan={2}>Lokasi</th>
                  <th colSpan={4}>Menara Seluler (BTS)</th>
                </tr>
                <tr>
                  <th>Empat Kaki</th>
                  <th>Tiga Kaki</th>
                  <th>Satu Kaki</th>
                  <th>Diatas Bangunan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tower Telkomsel Manduang Jorong Pakan Sinayan</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Tower SMPN 2 Kamang Magek (Golden Net)</td>
                  <td>-</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Tower Rumah Putri Saadah</td>
                  <td>-</td>
                  <td>-</td>
                  <td>√</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Tower Rumah Delfia Nora 1 (Alifa Net)</td>
                  <td>-</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Tower Rumah Delfia Nora 2 (Alifa Net)</td>
                  <td>-</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </Table>
            <p>2. Layanan Internet</p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th rowSpan={2}>No</th>
                  <th rowSpan={2}>Nama Lokasi</th>
                  <th rowSpan={2}>Alamat</th>
                  <th rowSpan={2}>Sumber Internet Yang digunakan saat ini</th>
                  <th colSpan={3}>Sinyal GSM</th>
                  <th rowSpan={2}>Provider</th>
                </tr>
                <tr>
                  <th>Kuat</th>
                  <th>Lemah</th>
                  <th>Tidak Ada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Kantor Walinagari Persiapan Kamang Tangah Anam Suku</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>Indihome</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>Telkomsel</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Kantor Jorong Bansa </td>
                  <td>Jorong Bansa</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>SDN 21 Pakan Sinayan</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>Golden Net</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>SDN 03 Pakan Sinayan</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>Golden Net</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>SDN 16 Bansa</td>
                  <td>Jorong Bansa</td>
                  <td>Indihome</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>Telkomsel</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>MIN 3 Agam</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>Golden Net</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Ponpes Mumtaz Pakan Sinayan</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>Indihome</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>Telkomsel</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Ponpes Yati Kampung Baru</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>Indihome</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>Telkomsel</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>SMPN 2 Kamang Magek</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>Golden Net</td>
                  <td>√</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Pustu Pakan Sinayan</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Poskesri Pakan Sinayan</td>
                  <td>Jorong Pakan Sinayan</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Orbitrasi</h3>
            <p>
              Jarak dan waktu tempuh ke ibukota kabupaten yaitu Lubuk Basung dari Nagari Kamang Tangah Anam Suku masih
              membutuhkan waktu yang lama. Berikut gambaran jarak dan waktu tempuh ke berbagai tempat di Nagari Kamang
              Tangah Anam Suku.
            </p>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={3}>Jarak dan Waktu Tempuh di Nagari Kamang Tangah Anam Suku</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>1. Jarak ke ibukota nagari induk (km)</td>
                  <td>3 Km</td>
                </tr>
                <tr>
                  <td></td>
                  <td>a. Lama jarak tempuh ke ibukota nagari induk dengan kendaraan bermotor (Jam) </td>
                  <td>15 menit</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    b. Lama jarak tempuh ke ibukota nagari induk dengan berjalan kaki atau kendaraan non bermotor (Jam)
                  </td>
                  <td>1 jam</td>
                </tr>
                <tr>
                  <td></td>
                  <td>c. Jumlah Kendaraan umum ke ibu kota nagari induk (Unit) </td>
                  <td>0 unit</td>
                </tr>
                <tr>
                  <td colSpan={2}>2. Jarak ke ibu kota kecamatan (km)</td>
                  <td>3,5 Km</td>
                </tr>
                <tr>
                  <td></td>
                  <td>a. Lama jarak tempuh ke ibukota kecamatan dengan kendaraan bermotor (Jam)</td>
                  <td>20 menit</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    a. Lama jarak tempuh ke ibukota kecamatan dengan berjalan kaki atau kendaraan non bermotor (Jam)
                  </td>
                  <td>1,5 jam</td>
                </tr>
                <tr>
                  <td></td>
                  <td>c. Jumlah Kendaraan umum ke ibu kota kecamatan (Unit)</td>
                  <td>0 unit</td>
                </tr>
                <tr>
                  <td colSpan={2}>3. Jarak ke ibu kota kabupaten/kota (km)</td>
                  <td>70 Km</td>
                </tr>
                <tr>
                  <td></td>
                  <td>a. Lama jarak tempuh ke ibukota kabupaten dengan kendaraan bermotor (Jam)</td>
                  <td>2,5 jam</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    b. Lama jarak tempuh ke ibukota kabupaten dengan berjalan kaki atau kendaraan non bermotor (Jam)
                  </td>
                  <td>24 jam</td>
                </tr>
                <tr>
                  <td></td>
                  <td>c. Kendaraan umum ke ibu kota kabupaten/kota (Unit)</td>
                  <td>100 unit</td>
                </tr>
                <tr>
                  <td colSpan={2}>4. Jarak ke ibu kota provinsi (km)</td>
                  <td>112 Km</td>
                </tr>
                <tr>
                  <td></td>
                  <td>a. Lama jarak tempuh ke ibukota provinsi dengan kendaraan bermotor (Jam)</td>
                  <td>3,5 jam</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    b. Lama jarak tempuh ke ibukota provinsi dengan berjalan kaki atau kendaraan non bermotor (Jam)
                  </td>
                  <td>48 jam</td>
                </tr>
                <tr>
                  <td></td>
                  <td>c. Kendaraan umum ke ibukota provinsi (Unit)</td>
                  <td>200 unit</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Sarana Kesenian</h3>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Sanggar Seni</th>
                  <th>Lokasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Sanggar Seni Tambua</td>
                  <td>Kampung Baru</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Sanggar Seni Tambua SAKATO</td>
                  <td>Bansa</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Sanggar Seni Tambua Pakan Sinayan</td>
                  <td>Pakan Sinayan</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FasilitasBangunan;
