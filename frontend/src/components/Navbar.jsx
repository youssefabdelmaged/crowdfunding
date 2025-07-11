import React , { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import donate from '../assets/images/donate.png';
import '../styles/ProjectList.css';

const Navbar = () => {
  const location = useLocation();  
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showInputs, setShowInputs] = useState(false); 
  
  

  const handleHome = () => {
    navigate('/');
  };

  const handleCreate = () => {
    navigate("/create-project");
  };

   const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

   const handleSearch = () => {
  if (!startDate || !endDate) {
    alert("Please select start date and end date");
    return;
  }
  navigate(`/search-results?start_date=${startDate}&end_date=${endDate}`);
};

  const isCreateProjectPage = location.pathname === '/create-project';
  const isListProjectsPage = location.pathname === '/list-projects';
  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: 'rgba(13, 110, 253, 0.2)' }}>
      <div className="container-fluid">
        <div className="navbar-brand" style={{ display: "flex", gap: "10px" }}>
          <img src={donate} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
          <div
            style={{
              backgroundColor: "white",
              color: "#419bfc",
              width: "20vw",
              textAlign: "center",
              borderRadius: "10px"
            }}
          >
            CROWDFUNDING
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
          {isHomePage && (
            <>
              <button className="buttons ms-2" onClick={handleLogout}>Log Out</button>
              <button className="buttons ms-2" onClick={handleCreate}>Create Project</button>
              <button className="buttons ms-2" onClick={() => navigate('/list-projects')}>My Projects</button>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button className="buttons ms-2" onClick={() => setShowInputs(!showInputs)}>
                        Search by date
                    </button>

                    {showInputs && (
                        <>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button className="buttons ms-2" onClick={handleSearch}>
                            Search
                        </button>
                        </>
                    )}
                    </div>            
                    </>
          )}

          {isCreateProjectPage && (
            <button onClick={handleHome} className="buttons ms-2">
              Home
            </button>
          )}

          {isListProjectsPage && (
            <button onClick={handleHome} className="buttons ms-2">
              Home
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
