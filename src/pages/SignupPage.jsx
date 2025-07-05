import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/printkro-auth.css";

const PrintkroSignupPage = () => {
  const [formDetails, setFormDetails] = useState({
    newUser: "",
    newEmail: "",
    newPass: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleUserSignup = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formDetails.newUser,
          email: formDetails.newEmail,
          password: formDetails.newPass,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful! ✅");
        setFormDetails({ newUser: "", newEmail: "", newPass: "" });
        navigate("/login");
      } else {
        alert(`Signup failed! ❌ ${result.message}`);
      }
    } catch (error) {
      alert("Network error! Please try again.");
      console.error("Signup error:", error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Image (shown only on desktop) */}
        <div className="auth-image">
          <img src="/login-side-image.png" alt="Signup Visual" />
        </div>

        {/* Signup Form */}
        <div className="auth-card">
          <h2 className="auth-title"> Create your PrintKro</h2>

          <input
            type="text"
            name="newUser"
            placeholder="Username"
            value={formDetails.newUser}
            onChange={handleInputChange}
            className="auth-input"
          />

          <input
            type="email"
            name="newEmail"
            placeholder="Email"
            value={formDetails.newEmail}
            onChange={handleInputChange}
            className="auth-input"
          />

          <input
            type="password"
            name="newPass"
            placeholder="Password"
            value={formDetails.newPass}
            onChange={handleInputChange}
            className="auth-input"
          />

          <button
            onClick={handleUserSignup}
            disabled={isProcessing}
            className="auth-button-blue"
          >
            {isProcessing ? "Signing up..." : "Sign Up"}
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="auth-link"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintkroSignupPage;
