import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import "../assets/styles/projectDetails.css";

/**
 * ViewProjectDetails component
 * Fetches and displays details for a single project by ID.
 */
export const handleDelete=(id,navigate, token)=>{
        api.delete(`/api/delete/${id}/`
          ,{
            headers: {
            Authorization: `Bearer ${token}`
        }})
        .then((res)=>{
            if (res.status===204){
                navigate('/')
            }})
        .catch((err)=>{
            alert ("Failed to delete project")
        })}

      
function ViewProjectDetails() {
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project details when component mounts or ID changes
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/api/projects/${id}/`);
        setProject(response.data);
      } catch (err) {
        setError('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!project) return <p>No project found.</p>;

  return (
    <div className="project-details-wrapper">
      {/* Button to return to all projects */}
      <button
        className="return-projects-btn"
        onClick={() => navigate('/')}
      >
        &larr; Return to All Projects
      </button>
      <div className="view-project-details">
        {/* Project details */}
        <h1>{project.title}</h1>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Target Amount:</strong> {project.target_amount} {project.currency}</p>
        <p><strong>Start Date:</strong> {project.start_date}</p>
        <p><strong>End Date:</strong> {project.end_date}</p>
        <p><strong>Owner:</strong> {project.owner}</p>
        {/* Edit and Delete buttons (no functionality yet) */}
        <div className="project-details-buttons">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ViewProjectDetails;