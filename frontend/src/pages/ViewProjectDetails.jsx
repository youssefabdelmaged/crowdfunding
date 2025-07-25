import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles/projectDetails.css";
import { getLoggedInUserId } from "../components/ProtectedRoute";
import { ACCESS_TOKEN } from "../constants";




function ViewProjectDetails() {
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isOwner = project?.owner === getLoggedInUserId();
  const token = localStorage.getItem(ACCESS_TOKEN);

  // Fetch project details when component mounts or ID changes
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/api/projects/${id}/`);
        setProject(response.data);
      } catch {
        setError("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleDelete = (id) => {
  api
  .delete(`/api/delete/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    if (res.status === 204) {
      navigate("/");
    }
  })
  .catch(() => {
    alert("Failed to delete project");
  });
};

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!project) return <p>No project found.</p>;

  return (
    <div className="project-details-wrapper">
      {/* Button to return to all projects */}
      <button className="return-projects-btn" onClick={() => navigate("/")}>
        &larr; Return to All Projects
      </button>
      <div className="view-project-details">
        {/* Project details */}
        <h1>{project.title}</h1>
        <p>
          <strong>Description:</strong> {project.description}
        </p>
        <p>
          <strong>Target Amount:</strong> {project.target_amount}{" "}
          {project.currency}
        </p>
        <p>
          <strong>Start Date:</strong> {project.start_date}
        </p>
        <p>
          <strong>End Date:</strong> {project.end_date}
        </p>
        <p>
          <strong>Owner:</strong> {project.owner}
        </p>
        {/* Edit and Delete buttons (no functionality yet) */}
        <div className="project-details-buttons">
          {isOwner && (
            <button onClick={() => navigate(`/projects/${project.id}/update`)}>
              Update
            </button>
          )}
          {isOwner && (
            <button
              onClick={() => handleDelete(project.id,"/")}
              className="btn btn-danger"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProjectDetails;
