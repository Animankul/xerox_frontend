import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UploadAuthWrapper from "./components/UploadAuthWrapper";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadPage from "./pages/UploadPage"; // ✅ You forgot this!
import UploadUserLoginPage from "./pages/UploadUserLoginPage";
import UploadUserSignupPage from "./pages/UploadUserSignupPage";
import XeroxDashboard from "./pages/XeroxDashboard";


function App() {
  const isAuth = localStorage.getItem("token");
  const isUploadAuth = localStorage.getItem("upload_token");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Xerox Owner Routes */}
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={isAuth ? <XeroxDashboard /> : <Navigate to="/login" />}
          />

          {/* Upload User Routes with :id for Xerox ID */}
          <Route path="/upload-signup/:id" element={<UploadUserSignupPage />} />
          <Route path="/upload-login/:id" element={<UploadUserLoginPage />} />
          {/* <Route
            path="/upload/:id"
            element={isUploadAuth ? <UploadPage /> : <Navigate to="/upload-login/:id" />}
          /> */}
          
<Route
  path="/upload/:id"
  element={
    <UploadAuthWrapper>
      <UploadPage />
    </UploadAuthWrapper>
  }
/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
