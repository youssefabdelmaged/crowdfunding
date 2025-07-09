import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoggedInUserId } from '../components/ProtectedRoute'; 
import api from "../api";

const SearchByDate = () => {
    
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const startDate = queryParams.get("start_date");
  const endDate = queryParams.get("end_date");

  useEffect(() => {
    if (!startDate || !endDate) {
      navigate("/"); 
      return;
    }
      api.get("/api/search/", {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      })
      .then((res) => {
        setProjects(res.data);
      })
      .catch(() => {
        alert("Failed to fetch search results");
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Search Projects in the duration from: {startDate} to {endDate}</h2>
      {projects.length === 0 ? (
        <p>No projects found in this duration</p>
      ) : (
        <div className="project-list" style={{ padding: "30px" ,display:"flex",flexWrap: "wrap",gap:"30px"}}>
          {projects.map((project) => {
            const isOwner = project.owner === getLoggedInUserId()
            return(
            <div key={project.id} className="project-card">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <small>{project.created_at}</small>
              <div style={{ marginTop: "10px", display: "flex", gap: "8px" ,alignItems: "center", flexWrap: "nowrap" }}>
                <button
                  className="button"
                  onClick={() => navigate(`/projects/${project.id}?start_date=${startDate}&end_date=${endDate}`)}>
                  View
                </button>
                {isOwner && (
                    <>
                <button
                  className="button btn btn-warning"
                  style={{ height:"40px" }}
                  onClick={() => navigate(`/projects/${project.id}/update?start_date=${startDate}&end_date=${endDate}`)}>
                  Edit
                </button>
                <button
                  className="button btn btn-danger"
                  style={{ height:"40px" }}
                  onClick={() => navigate(`/projects/${project.id}/delete?start_date=${startDate}&end_date=${endDate}`)}>
                  Delete
                </button>
                </>
                )}
              </div>
            </div>)
})}
        </div>
      )}
    </div>
  );
};

export default SearchByDate;
