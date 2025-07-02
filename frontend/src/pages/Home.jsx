import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}
    >
      <button onClick={handleLogout}> Log Out</button>
    </div>
  );
};

export default Home;
