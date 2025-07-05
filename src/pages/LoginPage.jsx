import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/printkro-auth.css";

const PrintkroLoginPage = () => {
  const [userDetail, setUserDetail] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetail),
      });

      const result = await response.json();

      if (response.ok) {
        login({ xeroxId: result.xeroxId }, result.token);
        navigate("/dashboard");
      } else {
        alert(result.message || "Login failed! Please check your details.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong! Check console for details.");
    }
  };

  const handleInputChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Optional Left Image (shown only on larger screens) */}
        <div className="auth-image">
          <img src="/login-side-image.png" alt="PrintKRO preview" />
        </div>

        {/* Login Form */}
        <div className="auth-card">
          <h2 className="auth-title"> PrintKro Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetail.email}
            onChange={handleInputChange}
            className="auth-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userDetail.password}
            onChange={handleInputChange}
            className="auth-input"
          />

          <button
            onClick={handleUserLogin}
            className="auth-button-blue"
          >
            Login
          </button>

          <p className="auth-footer">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="auth-link"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintkroLoginPage;
