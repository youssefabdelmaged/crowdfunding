import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      }); 

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setAuthorized(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    const tokenExpiration = decodedToken.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export function getLoggedInUserId() {
    const token = localStorage.getItem(ACCESS_TOKEN);  
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return decoded.user_id; 
    } catch (e) {
        return null;
    }
}

export default ProtectedRoute;
