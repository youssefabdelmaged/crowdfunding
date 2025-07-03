import React, { useState, useEffect } from 'react'
import api from '../api'
import {useNavigate} from 'react-router-dom'

/**
 * ListAllProjects component
 * Fetches and displays all projects as cards with View, Edit, and Delete buttons.
 */
function ListAllProjects() {
  // State for storing projects and error messages
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all projects from the API when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/projects/');
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
      }
    };
    fetchProjects();
  }, []);


   const handleDelete=(id)=>{
      const token = localStorage.getItem("access");
      // console.log(token);
      

        api.delete(`/api/delete/${id}/`
          ,{
            // method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`
        }
        }
      )
        .then((res)=>{
            if (res.status===204){
                const restOfProjects=projects.filter(project => project.id !== id)
                setProjects (restOfProjects)
            }
        })
        .catch((err)=>{
            alert ("Failed to delete project")
        })
    }


  return (
    <div className="project-list-container">
      <h1>List of Projects</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          {/* Project details */}
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Target Amount: {project.target_amount} {project.currency}</p>
          <p>Duration: {project.start_date} to {project.end_date}</p>
          {/* Navigation buttons */}
          <div className="project-card-buttons">
            <button onClick={() => navigate(`/projects/${project.id}`)}>View</button>
            <button>Edit</button>
            <button onClick={()=>handleDelete(project.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListAllProjects