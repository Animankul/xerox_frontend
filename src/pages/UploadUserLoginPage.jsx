import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UploadUserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get Xerox ID from URL

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("upload_token", data.token);
        alert("✅ Login successful!");
        navigate(`/upload/${id}`); // redirect using correct ID
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">📩 Upload User Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded-md"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => navigate(`/upload-signup/${id}`)}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default UploadUserLoginPage;
