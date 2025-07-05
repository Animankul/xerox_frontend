import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UploadPage = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
  console.log("✅ UploadPage mounted");

  const token = localStorage.getItem("upload_token");
  console.log("📦 token found:", token);

  if (!token) {
    console.warn("❌ No token found. Redirecting to /upload-login");
  navigate(`/upload-signup/${id}`);

    return;
  }

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
        headers: { Authorization: token },
      });

      console.log("🔐 Auth response:", res.data);

      if (!res.data || !res.data.type) {
        console.warn("❌ No user type returned in /me response");
        throw new Error("Invalid response from /me");
      }

      if (res.data.type !== 'upload_user') {
        console.warn(`❌ User type is '${res.data.type}', not 'upload_user'. Redirecting.`);
        throw new Error("Unauthorized user");
      }

      console.log("✅ Auth passed");
      setLoading(false);
    } catch (err) {
      console.error("❌ Auth check failed:", err.message);
      localStorage.removeItem("upload_token");
      navigate("/upload-login");
    }
  };

  checkAuth();
}, [navigate, id]);


  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("upload_token");
    if (!token) return alert("You must be logged in to upload.");
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
          },
        }
      );

      if (res.data.success) {
        alert("✅ File uploaded successfully!");
        setFile(null);
      } else {
        alert("❌ Upload failed. Try again.");
      }
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("❌ Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <p>Checking authentication...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📄 Upload Document for Print</h2>
        <p style={styles.subtext}>
          You are uploading to <strong>Xerox ID: {id}</strong>
        </p>
        <form onSubmit={handleUpload} style={styles.form}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
          <button
            type="submit"
            style={styles.button}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.6rem',
    marginBottom: '10px',
    color: '#333',
  },
  subtext: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  fileInput: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background 0.3s ease',
  },
};

export default UploadPage;
