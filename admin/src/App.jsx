import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardHome from "./pages/DashboardHome";
import DashboardNagari from "./pages/DashboardNagari";
import DashboardBerita from "./pages/DashboardBerita";
import DashboardPenduduk from "./pages/DashboardPenduduk";
import DashboardDataDinamis from "./pages/DashboardDataDinamis";
import DataDinamisNik from "./pages/DataDinamisNik";
import DataDinamisKK from "./pages/DataDinamisKK";
import DashboardUser from "./pages/DashboardUser";
import DashboardOrganisasi from "./pages/DashboardOrganisasi";
import DashboardAPB from "./pages/DashboardAPB";
import TambahInformasi from "./pages/TambahInformasi";
import TambahIncome from "./pages/TambahIncome";
import EditIncome from "./pages/EditIncome";
import TambahOutcome from "./pages/TambahOutcome";
import EditOutcome from "./pages/EditOutcome";
import EditInformasi from "./pages/EditInformasi";
import EditOrganisasi from "./pages/EditOrganisasi";
import IndividuPenduduk from "./pages/IndividuPenduduk";
import TambahPenduduk from "./pages/TambahPenduduk";
import GaleriFotoBerita from "./pages/GaleriFotoBerita";
import GaleriVideoBerita from "./pages/GaleriVideoBerita";
import DashboardIndexDesa from "./pages/DashboardIndexDesa";
import { Spinner } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner animation="grow" variant="danger" role="status" style={{ width: "5rem", height: "5rem" }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);
const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;
  return isAuth ? children : <Navigate to="/login" />;
};
const AdminRoute = ({ children }) => {
  const { isAuth, isAdmin, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;
  if (!isAuth) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Halaman login tetap bisa diakses semua */}
          <Route path="/login" element={<Login />} />
          {/* Hanya pengguna yang sudah login yang bisa mengakses halaman utama */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboardberita"
            element={
              <ProtectedRoute>
                <DashboardBerita />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tambahinformasi"
            element={
              <ProtectedRoute>
                <TambahInformasi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editinformasi/:id"
            element={
              <ProtectedRoute>
                <EditInformasi />
              </ProtectedRoute>
            }
          />
          {/* Hanya admin yang bisa mengakses halaman admin */}
          <Route
            path="/dashboardnagari"
            element={
              <AdminRoute>
                <DashboardNagari />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboardpenduduk"
            element={
              <AdminRoute>
                <DashboardPenduduk />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboarddatadinamis"
            element={
              <AdminRoute>
                <DashboardDataDinamis />
              </AdminRoute>
            }
          />
          <Route
            path="/datadinamisnik/:kategori"
            element={
              <AdminRoute>
                <DataDinamisNik />
              </AdminRoute>
            }
          />
          <Route
            path="/datadinamiskk/:kategori"
            element={
              <AdminRoute>
                <DataDinamisKK />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboarduser"
            element={
              <AdminRoute>
                <DashboardUser />
              </AdminRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AdminRoute>
                <Register />
              </AdminRoute>
            }
          />
          <Route
            path="/datapenduduk/:id"
            element={
              <AdminRoute>
                <IndividuPenduduk />
              </AdminRoute>
            }
          />
          <Route
            path="/tambahpenduduk"
            element={
              <AdminRoute>
                <TambahPenduduk />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboardorganisasi"
            element={
              <AdminRoute>
                <DashboardOrganisasi />
              </AdminRoute>
            }
          />
          <Route
            path="/editorganisasi/:id"
            element={
              <AdminRoute>
                <EditOrganisasi />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboardapb"
            element={
              <AdminRoute>
                <DashboardAPB />
              </AdminRoute>
            }
          />
          <Route
            path="/tambahincome"
            element={
              <AdminRoute>
                <TambahIncome />
              </AdminRoute>
            }
          />
          <Route
            path="/editincome/:id"
            element={
              <AdminRoute>
                <EditIncome />
              </AdminRoute>
            }
          />{" "}
          <Route
            path="/tambahoutcome"
            element={
              <AdminRoute>
                <TambahOutcome />
              </AdminRoute>
            }
          />
          <Route
            path="/editoutcome/:id"
            element={
              <AdminRoute>
                <EditOutcome />
              </AdminRoute>
            }
          />
          <Route
            path="/galerifotoberita/:id_informasi"
            element={
              <AdminRoute>
                <GaleriFotoBerita />
              </AdminRoute>
            }
          />
          <Route
            path="/galerivideoberita/:id_informasi"
            element={
              <AdminRoute>
                <GaleriVideoBerita />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboardindexdesa"
            element={
              <AdminRoute>
                <DashboardIndexDesa />
              </AdminRoute>
            }
          />
          {/* Redirect semua halaman yang tidak dikenal ke /login jika belum login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
