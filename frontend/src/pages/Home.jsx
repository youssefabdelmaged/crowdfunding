import { useNavigate } from "react-router-dom";
import ListAllProjects from "../components/ListAllProjects";
import "../assets/styles/projects.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCreate = () => {
    navigate("/create-project");
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}
      >
        <button className="logout" onClick={handleLogout}> Log Out</button>
        <button className="create-button" onClick={handleCreate}> Create Project</button>
      </div>
      <h1 className="welcome">Welcome to the Home Page</h1>
      <ListAllProjects />
      
    </>
  );
};

export default Home;
