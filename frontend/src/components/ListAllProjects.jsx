import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectList.css";

/**
 * ListAllProjects component
 * Fetches and displays all projects as cards with View, Edit, and Delete buttons.
 */
function ListAllProjects() {
  // State for storing projects and error messages
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [isAsc, setIsAsc] = useState(true);
  const navigate = useNavigate();

  // Fetch all projects from the API when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/api/projects/");
        setProjects(response.data);
      } catch {
        setError("Failed to fetch projects");
      }
    };
    fetchProjects();
  }, []);

  const handleSort = () => {
    projects.sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return isAsc ? dateA - dateB : dateB - dateA;
    });
    setProjects([...projects]); // Update state to trigger re-render
    setIsAsc(!isAsc); // Toggle sort order
  };

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-5 display-5 text-gradient">
        🚀 List of Projects
      </h1>
      <div>
        <button className="sort btn btn-secondary mb-3 " onClick={handleSort}>
          Sort by Date
        </button>
      </div>
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-sm-12 col-md-6 col-lg-4">
            <div className="fancy-card p-4 shadow-sm h-100 d-flex flex-column">
              <div className="mb-3">
                <h4 className="fw-bold">{project.title}</h4>
                <p className="text-muted mb-2">{project.description}</p>
                <p className="mb-1">
                  <i className="bi bi-cash-coin me-1"></i>
                  <strong>Target:</strong> {project.target_amount}{" "}
                  {project.currency}
                </p>
                <p>
                  <i className="bi bi-calendar-event me-1"></i>
                  <strong>Duration:</strong> {project.start_date} →{" "}
                  {project.end_date}
                </p>
              </div>
              <div className="mt-auto d-flex justify-content-between gap-2">
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="btn btn-primary btn-sm w-100"
                >
                  View
                </button>

                {/* <button className="btn btn-warning btn-sm w-100">Edit</button> */}

                <button
                  onClick={() => handleDelete(project.id)}
                  className="btn btn-danger btn-sm w-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListAllProjects;
