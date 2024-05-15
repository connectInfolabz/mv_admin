import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Pages/Home";
import AddActivity from "./Pages/Activities/AddActivity";
import ViewActivities from "./Pages/Activities/ViewActivities";
import AddDepartment from "./Pages/Departments/AddDepartment";
import ViewDepartment from "./Pages/Departments/ViewDepartment";
import AddEvent from "./Pages/Events/AddEvent";
import ViewEvents from "./Pages/Events/ViewEvents";
import AddFacilities from "./Pages/Facilities/AddFacilities";
import ViewFacilities from "./Pages/Facilities/ViewFacilities";
import ContactUs from "./Pages/TableData/ContactUs";
import AdmissionInqury from "./Pages/TableData/AdmissionInqury";
import AddGalleryData from "./Pages/Gallery/AddGalleryData";
import ViewGalleryData from "./Pages/Gallery/ViewGalleryData";
import AddNews from "./Pages/News/AddNews";
import ViewNews from "./Pages/News/ViewNews";
import AddStaff from "./Pages/Staff/AddStaff";
import ViewStaff from "./Pages/Staff/ViewStaff";
import Login from "./Pages/Login";
import checkSession from "./auth/authService";
import EditCredentials from "./Pages/EditCredentials";

function App() {
  axios.defaults.withCredentials = true;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const checkAuth = await checkSession();
        console.log(checkAuth);
        setIsAuthenticated(checkAuth);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/editCredentials"
            element={
              isAuthenticated ? <EditCredentials /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addActivity"
            element={
              isAuthenticated ? <AddActivity /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewActivities"
            element={
              isAuthenticated ? <ViewActivities /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addDepartment"
            element={
              isAuthenticated ? <AddDepartment /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewDepartment"
            element={
              isAuthenticated ? <ViewDepartment /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addEvents"
            element={isAuthenticated ? <AddEvent /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewEvents"
            element={
              isAuthenticated ? <ViewEvents /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addFacilities"
            element={
              isAuthenticated ? <AddFacilities /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewFacilities"
            element={
              isAuthenticated ? <ViewFacilities /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewContactus"
            element={isAuthenticated ? <ContactUs /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewAdmissionInquiry"
            element={
              isAuthenticated ? <AdmissionInqury /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addGalleryData"
            element={
              isAuthenticated ? <AddGalleryData /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewGalleryData"
            element={
              isAuthenticated ? <ViewGalleryData /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addNews"
            element={isAuthenticated ? <AddNews /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewNews"
            element={isAuthenticated ? <ViewNews /> : <Navigate to="/login" />}
          />
          <Route
            path="/addStaff"
            element={isAuthenticated ? <AddStaff /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewStaff"
            element={isAuthenticated ? <ViewStaff /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<p className="h3 text-center">404 Page Not Found</p>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
