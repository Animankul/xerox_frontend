// ===================== XeroxDashboard.jsx (Frontend) =====================
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import FileCard from '../components/FileCard';
import { useAuth } from '../context/AuthContext';
import '../styles/XeroxDashboard.css';

const XeroxDashboard = () => {
  const { auth } = useAuth();
  const [files, setFiles] = useState([]);
  const [username, setUsername] = useState('');
  const uploadURL = `${window.location.origin}/upload/${auth.xeroxId}`;

  const fetchUsername = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      headers: { Authorization: auth.token },
    });
    const data = await res.json();
    setUsername(data.username);
  };

  const fetchFiles = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/files/owner`, {
      headers: { Authorization: auth.token },
    });
    const data = await res.json();
    setFiles(data);
  };

  const handleDownload = async (url, name) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file?')) return;
    await fetch(`${process.env.REACT_APP_API_URL}/files/${id}`, {
      method: 'DELETE',
      headers: { Authorization: auth.token },
    });
    fetchFiles();
  };

  const handlePrint = (url) => window.open(url, '_blank');

  useEffect(() => {
    fetchUsername();
    fetchFiles();
    const interval = setInterval(fetchFiles, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>📂 Xerox Owner Dashboard</h1>
        <p>Welcome, <strong>{username}</strong></p>
      </header>

      <section className="qr-section">
        <h3>Upload via QR</h3>
        <QRCodeCanvas value={uploadURL} size={200} />
        <p>{uploadURL}</p>
      </section>

      <section className="file-section">
        {files.length === 0 ? (
          <p className="empty">No uploads yet.</p>
        ) : (
          <div className="file-grid">
            {files.map(file => (
              <FileCard
                key={file._id}
                file={file}
                onDownload={handleDownload}
                onPrint={handlePrint}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default XeroxDashboard;
