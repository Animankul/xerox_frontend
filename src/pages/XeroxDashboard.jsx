// import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react';
// import { useEffect, useState } from 'react';

// const XeroxDashboard = () => {
//   const xeroxId = 'xerox123';
//   const [files, setFiles] = useState([]);
//   const uploadURL = `http://192.168.0.103:3000/upload/${xeroxId}`;

//   useEffect(() => {
//     const interval = setInterval(fetchFiles, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const res = await axios.get(`http://192.168.0.103:5000/files/${xeroxId}`);
//       setFiles(res.data);
//     } catch (error) {
//       console.error("Error fetching files:", error);
//     }
//   };

//   const handleDownload = async (fileUrl, fileName) => {
//     try {
//       const res = await fetch(fileUrl);
//       const blob = await res.blob();
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = fileName;
//       link.click();
//     } catch (error) {
//       alert('Failed to download file');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>🖨️ Xerox Dashboard</h2>
//         <p>Scan this QR code to upload a document:</p>
//         <QRCodeCanvas value={uploadURL} size={200} />
//         <p style={styles.url}>{uploadURL}</p>
//       </div>

//       <div style={styles.fileSection}>
//         <h3 style={styles.subHeading}>📁 Uploaded Files</h3>
//         {files.length === 0 ? (
//           <p style={styles.noFiles}>No files uploaded yet</p>
//         ) : (
//           <ul style={styles.fileList}>
//             {files.map((file, index) => (
//               <li key={index} style={styles.fileItem}>
//                 <div>
//                   <a
//                     href={file.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={styles.link}
//                   >
//                     {file.fileName}
//                   </a>
//                   <span style={styles.timestamp}>
//                     – {new Date(file.timestamp).toLocaleTimeString()}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => handleDownload(file.fileUrl, file.fileName)}
//                   style={styles.downloadBtn}
//                 >
//                   ⬇ Save
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '20px',
//     backgroundColor: '#f3f4f6',
//     minHeight: '100vh',
//     fontFamily: 'Segoe UI, sans-serif',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: '25px',
//     margin: '0 auto',
//     maxWidth: '500px',
//     textAlign: 'center',
//     borderRadius: '12px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     marginBottom: '30px',
//   },
//   heading: {
//     fontSize: '1.8rem',
//     marginBottom: '10px',
//   },
//   url: {
//     fontSize: '0.9rem',
//     color: '#555',
//     marginTop: '10px',
//     wordBreak: 'break-all',
//   },
//   fileSection: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
//   subHeading: {
//     fontSize: '1.5rem',
//     marginBottom: '15px',
//   },
//   noFiles: {
//     color: '#777',
//   },
//   fileList: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//   },
//   fileItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f9fafb',
//     padding: '12px 16px',
//     borderRadius: '8px',
//     marginBottom: '10px',
//   },
//   link: {
//     color: '#007bff',
//     fontWeight: 'bold',
//     textDecoration: 'none',
//   },
//   timestamp: {
//     marginLeft: '8px',
//     color: '#666',
//     fontSize: '0.85rem',
//   },
//   downloadBtn: {
//     backgroundColor: '#10b981',
//     color: '#fff',
//     padding: '6px 12px',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '0.9rem',
//   },
// };

// export default XeroxDashboard;


import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';

const XeroxDashboard = () => {
  const xeroxId = 'xerox123';
  const [files, setFiles] = useState([]);

  const baseFrontendURL = window.location.origin;
  const uploadURL = `${baseFrontendURL}/upload/${xeroxId}`;

  useEffect(() => {
    const interval = setInterval(fetchFiles, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/files/${xeroxId}`);
      setFiles(res.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      alert('Failed to download file');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🖨️ Xerox Dashboard</h2>
        <p>Scan this QR code to upload a document:</p>
        <QRCodeCanvas value={uploadURL} size={200} />
        <p style={styles.url}>{uploadURL}</p>
      </div>

      <div style={styles.fileSection}>
        <h3 style={styles.subHeading}>📁 Uploaded Files</h3>
        {files.length === 0 ? (
          <p style={styles.noFiles}>No files uploaded yet</p>
        ) : (
          <ul style={styles.fileList}>
            {files.map((file, index) => (
              <li key={index} style={styles.fileItem}>
                <div>
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    {file.fileName}
                  </a>
                  <span style={styles.timestamp}>
                    – {new Date(file.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(file.fileUrl, file.fileName)}
                  style={styles.downloadBtn}
                >
                  ⬇ Save
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    margin: '0 auto',
    maxWidth: '500px',
    textAlign: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '10px',
  },
  url: {
    fontSize: '0.9rem',
    color: '#555',
    marginTop: '10px',
    wordBreak: 'break-all',
  },
  fileSection: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  subHeading: {
    fontSize: '1.5rem',
    marginBottom: '15px',
  },
  noFiles: {
    color: '#777',
  },
  fileList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  timestamp: {
    marginLeft: '8px',
    color: '#666',
    fontSize: '0.85rem',
  },
  downloadBtn: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default XeroxDashboard;
