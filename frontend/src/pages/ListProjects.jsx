import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getCurrentUserFromLocalStorage } from "../utils/auth";

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
    <div className="project-list-container">
      {/* <h1 className="project-list-title">List of Projects</h1> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {projects
        .filter((project) => project.owner === user.id)
        .map((project) => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>
              Target Amount: {project.target_amount} {project.currency}
            </p>
            <p>
              Duration: {project.start_date} to {project.end_date}
            </p>
            <div className="project-card-buttons">
              <button
                className="view-btn"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListProjects;
