import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import ListAllProjects from "../components/ListAllProjects";
import "../assets/styles/projects.css";

const Home = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showInputs, setShowInputs] = useState(false); 


  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCreate = () => {
    navigate("/create-project");
  };

  const handleSearch = () => {
  if (!startDate || !endDate) {
    alert("Please select start date and end date");
    return;
  }
  navigate(`/search-results?start_date=${startDate}&end_date=${endDate}`);
};

  return (
    <>
    <div style={{ display: "flex", justifyContent: "space-between", padding: "16px" }}>
    <div style={{ display: "flex", gap: "10px" }}>
      <button className="btn btn-secondary" onClick={() => setShowInputs(!showInputs)}>
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
          <button className="btn btn-secondary" onClick={handleSearch}>
            Search
          </button>
        </>
      )}
    </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}
      >
        <button className="logout" onClick={handleLogout}> Log Out</button>
        <button className="create-button" onClick={handleCreate}> Create Project</button>
      </div>
      </div>
      <h1 className="welcome">Welcome to the Home Page</h1>
      <ListAllProjects />
      
    </>
  );
};

export default Home;
