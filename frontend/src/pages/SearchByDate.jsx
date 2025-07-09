import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoggedInUserId } from '../components/ProtectedRoute'; 
import api from "../api";
// import { handleDelete } from "./ViewProjectDetails";

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

  return (
    <div className="container py-5">
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px' }}>
        <button className="btn btn-primary ms-2" onClick={() => navigate("/")}>Back to Home</button>
      </div>
      <h1 className="welcome text-center fw-bold mb-5 display-6 text-gradient">
        🔎 Search Projects in the duration from: {startDate} to {endDate}
      </h1>
      {projects.length === 0 ? (
        <p className="text-center">No projects found in this duration</p>
      ) : (
        <div className="row g-4 justify-content-center">
          {projects.map((project) => {
            const isOwner = project.owner === getLoggedInUserId();
            return (
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
                    <small className="text-secondary">{project.created_at}</small>
                  </div>
                  <div className="mt-auto d-flex justify-content-between gap-2">
                    <button
                      className="btn btn-primary btn-sm w-100"
                      onClick={() => navigate(`/projects/${project.id}?start_date=${startDate}&end_date=${endDate}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchByDate;
