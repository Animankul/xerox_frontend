// import axios from 'axios';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';

// const UploadPage = () => {
//   const { id } = useParams();
//   const [file, setFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return alert('Please select a file.');

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('xeroxId', id);

//     try {
//       setIsUploading(true);
//       const res = await axios.post('http://192.168.0.103:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (res.data.success) {
//         alert('File uploaded successfully!');
//         setFile(null);
//       }
//     } catch (err) {
//       console.error('Upload error:', err.response?.data || err.message);
//       alert('Upload failed: ' + (err.response?.data || err.message));
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>📄 Upload Document for Print</h2>
//         <form onSubmit={handleUpload} style={styles.form}>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             style={styles.fileInput}
//           />
//           <button
//             type="submit"
//             style={styles.button}
//             disabled={isUploading}
//           >
//             {isUploading ? 'Uploading...' : 'Upload'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ✅ CSS (Inline Style Object)
// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f4f4f4',
//     padding: '20px',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     padding: '30px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     maxWidth: '400px',
//     width: '100%',
//     textAlign: 'center',
//   },
//   heading: {
//     fontSize: '1.6rem',
//     marginBottom: '20px',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   fileInput: {
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '6px',
//     fontSize: '1rem',
//   },
//   button: {
//     padding: '10px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     fontSize: '1rem',
//     transition: 'background 0.3s ease',
//   },
// };

// export default UploadPage;

import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const UploadPage = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('xeroxId', id);

    try {
      setIsUploading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        alert('File uploaded successfully!');
        setFile(null);
      }
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      alert('Upload failed: ' + (err.response?.data || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📄 Upload Document for Print</h2>
        <form onSubmit={handleUpload} style={styles.form}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
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
    marginBottom: '20px',
    color: '#333',
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

