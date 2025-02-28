import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/auth/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
