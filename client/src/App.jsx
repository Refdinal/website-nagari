import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/pages/home/Home";
// profile
import Sejarah from "./components/pages/profile/Sejarah";
import PetaWilayah from "./components/pages/profile/PetaWilayah";
import FasilitasBangunan from "./components/pages/profile/FasilitasBangunan";
import SosialBudaya from "./components/pages/profile/SosialBudaya";
// pemerintahan
import OrganisasiNagari from "./components/pages/pemerintahan/OrganisasiNagari";
import Bamus from "./components/pages/pemerintahan/Bamus";
import BundoKanduang from "./components/pages/pemerintahan/BundoKanduang";
import MajelisUlama from "./components/pages/pemerintahan/MajelisUlama";
import PenggerakPKK from "./components/pages/pemerintahan/PenggerakPKK";
import LPMN from "./components/pages/pemerintahan/LPMN";
import Kepemudaan from "./components/pages/pemerintahan/Kepemudaan";
import LPTQ from "./components/pages/pemerintahan/LPTQ";
// informasi
import Event from "./components/pages/informasi/Event";
import BeritaNagari from "./components/pages/informasi/BeritaNagari";
import Pengumuman from "./components/pages/informasi/Pengumuman";
import SingleInformasi from "./components/pages/informasi/SingleInformasi";
import APBNagari from "./components/pages/informasi/APBNagari";
import IndexDesa from "./components/pages/informasi/IndexDesa";
// statistik
import GeografiTopografi from "./components/pages/statistik/GeografiTopografi";
import SumberDayaAlam from "./components/pages/statistik/SumberDayaAlam";
import DemografiPenduduk from "./components/pages/statistik/DemografiPenduduk";
// galeri
import GaleriFoto from "./components/pages/Galeri/GaleriFoto";
import GaleriVideo from "./components/pages/Galeri/GaleriVideo";
import ScrollToTop from "./function/ScrollToTop";
import axios from "axios";
import { useEffect } from "react";
axios.defaults.withCredentials = true;
function App() {
  useEffect(() => {
    const trackUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tracker/track`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    trackUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/sejarah" element={<Sejarah />} />
          <Route path="/profile/peta-wilayah" element={<PetaWilayah />} />
          <Route path="/profile/fasilitas-bangunan" element={<FasilitasBangunan />} />
          <Route path="/profile/sosial-budaya" element={<SosialBudaya />} />
          <Route path="/pemerintahan/struktur-organisasi-nagari" element={<OrganisasiNagari />} />
          <Route path="/pemerintahan/bamus-nagari" element={<Bamus />} />
          <Route path="/pemerintahan/bundo-kanduang" element={<BundoKanduang />} />
          <Route path="/pemerintahan/majelis-ulama" element={<MajelisUlama />} />
          <Route path="/pemerintahan/penggerak-pkk" element={<PenggerakPKK />} />
          <Route path="/pemerintahan/lpmn" element={<LPMN />} />
          <Route path="/pemerintahan/kepemudaan" element={<Kepemudaan />} />
          <Route path="/pemerintahan/lptq" element={<LPTQ />} />
          <Route path="/informasi/event" element={<Event />} />
          <Route path="/informasi/berita" element={<BeritaNagari />} />
          <Route path="/informasi/pengumuman" element={<Pengumuman />} />
          <Route path="/informasi/:category/:slug" element={<SingleInformasi />} />
          <Route path="/informasi/apbnagari" element={<APBNagari />} />
          <Route path="/informasi/indexdesa" element={<IndexDesa />} />
          <Route path="/statistik/geografi-topografi" element={<GeografiTopografi />} />
          <Route path="/statistik/sumber-daya-alam" element={<SumberDayaAlam />} />
          <Route path="/statistik/demografi-penduduk" element={<DemografiPenduduk />} />
          <Route path="/galeri/foto" element={<GaleriFoto />} />
          <Route path="/galeri/video" element={<GaleriVideo />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
