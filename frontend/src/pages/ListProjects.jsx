import {  useState, useEffect } from 'react';
import axios from 'axios';


const ListProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects/');
        setProjects(response.data);
      } catch (err) {
        setError(err.response.data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>List of Projects</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Target Amount: {project.target_amount} {project.currency}</p>
            <p>Duration: {project.start_date} to {project.end_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListProjects;
