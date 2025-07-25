import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import CreateProject from "./pages/CreateProject";
import ListProjects from "./pages/ListProjects";
import ViewProjectDetails from "./pages/ViewProjectDetails";
import UpdateProject from "./pages/UpdateProject";

import SearchByDate from "./pages/SearchByDate";

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-project"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />
        <Route path="/list-projects" element={<ListProjects />} />
        <Route path="/view-project-details" element={<ViewProjectDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/projects/:id" element={<ViewProjectDetails />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/projects/:id/update"
          element={
            <ProtectedRoute>
              <UpdateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search-results"
          element={
            <ProtectedRoute>
              <SearchByDate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
