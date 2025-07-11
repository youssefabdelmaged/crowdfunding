import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getCurrentUserFromLocalStorage } from "../utils/auth";
import "../assets/styles/projects.css";

const ListProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();

  const navigate = useNavigate();
  getCurrentUserFromLocalStorage();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/api/projects/");
        setProjects(response.data);
      } catch {
        setError("Failed to fetch projects");
      }
    };
    setUser(getCurrentUserFromLocalStorage);

    fetchProjects();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
        {/* <button className="btn btn-primary ms-2" onClick={() => navigate("/")}>Back to Home</button> */}
      </div>
      <h1 className="welcome text-center fw-bold mb-5 display-5 text-gradient">🚀 List of my Projects</h1>
      <div className="row g-4 justify-content-center">
        {error && <p className="text-danger text-center">{error}</p>}
        {projects
          .filter((project) => project.owner === user.id)
          .map((project) => (
            <div key={project.id} className="col-sm-12 col-md-6 col-lg-4">
              <div className="fancy-card p-4 shadow-sm h-100 d-flex flex-column">
                <div className="mb-3">
                  <h4 className="fw-bold">{project.title}</h4>
                  <p className="text-muted mb-2">{project.description}</p>
                  <p className="mb-1">
                    <span className="bi bi-cash-coin me-1"> <strong>Target:</strong> {project.target_amount} {project.currency}</span>
                  </p>
                  <p>
                    <span className="bi bi-calendar-event me-1"> <strong>Duration:</strong> {project.start_date} to {project.end_date}</span>
                  </p>
                </div>
                <div className="mt-auto d-flex justify-content-between gap-2">
                  <button
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="btn btn-primary btn-sm w-100"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ListProjects;
