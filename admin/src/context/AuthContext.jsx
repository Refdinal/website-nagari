import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const clearError = () => {
    setErrorMsg(null);
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, { withCredentials: true });
        if (response.status === 200) {
          setIsAuth(true);
          const decode = jwtDecode(response.data.token);
          setIsAdmin(decode.role === "Admin");
          setUserName(decode.username);
        } else {
          setIsAuth(false);
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAuth(false);
        setIsAdmin(false);
      } finally {
        setLoading(false); // Setelah verifikasi selesai, set loading ke false
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true } // Untuk mengirim cookie jika ada
      );

      if (response.status === 200) {
        setIsAuth(true);
        const decode = jwtDecode(response.data.token);
        setIsAdmin(decode.role === "Admin");
        setUserName(decode.username);
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/auth/logout`, { withCredentials: true });
      if (response.status === 200) {
        setIsAuth(false);
        setIsAdmin(false);
        setUserName(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, isAdmin, userName, login, logout, loading, show, handleClose, handleShow, errorMsg, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
