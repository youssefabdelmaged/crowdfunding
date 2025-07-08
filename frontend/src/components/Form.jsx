import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { fetchAndStoreCurrentUser } from "../utils/auth";
import "../assets/styles/form.css";

const Form = ({ route, method }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formTitle = method === "login" ? "Login" : "Register";
  const submitButtonText = method === "login" ? "Log In" : "Sign Up";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (method === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (method === "register") {
        response = await api.post(route, {
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        });
      } else {
        response = await api.post(route, { username, email, password });
      }
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        await fetchAndStoreCurrentUser();
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">{formTitle}</h1>
        {error && <div className="error">{error}</div>}

        {method === "register" && (
          <>
            <label className="label">
              first name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
                className="input"
              />
            </label>

            <label className="label">
              last name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
                className="input"
              />
            </label>
          </>
        )}

        <label className="label">
          User Name
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="input"
          />
        </label>

        <label className="label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input"
          />
        </label>
        <label className="label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="input"
          />
        </label>

        {method === "register" && (
          <label className="label">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="input"
            />
          </label>
        )}

        <button type="submit" disabled={loading} className="button">
          {loading ? "Please wait..." : submitButtonText}
        </button>
      </form>
      <div
        className="form-links"
        style={{ marginTop: "1rem", textAlign: "center" }}
      >
        {method === "login" ? (
          <span>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#007bff" }}>
              Register
            </a>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#007bff" }}>
              Login
            </a>
          </span>
        )}
      </div>
    </>
  );
};

export default Form;
