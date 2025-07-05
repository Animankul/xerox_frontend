import '../styles/FileCard.css';

const FileCard = ({ file, onDownload, onPrint, onDelete }) => {
  const ext = file.fileName.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
  const isPDF = ext === 'pdf';
  const isVideo = ['mp4', 'mov', 'webm'].includes(ext);

  return (
    <div className={`file-card ${isPDF ? 'pdf' : isImage ? 'image' : isVideo ? 'video' : ''}`}>
      <div className="file-preview">
        {isImage ? (
          <img src={file.fileUrl} alt="Preview" />
        ) : isPDF ? (
          <img src="/pdf-icon.png" alt="PDF" />
        ) : isVideo ? (
          <video width="100%" height="140" controls src={file.fileUrl} />
        ) : (
          <img src="/file-icon.png" alt="File" />
        )}
      </div>
      <div className="file-details">
        <p className="file-name">{file.fileName}</p>
        <p className="file-time">{new Date(file.timestamp).toLocaleTimeString()}</p>
        <div className="file-actions">
          <button onClick={() => onDownload(file.fileUrl, file.fileName)}>⬇ Download</button>
          <button onClick={() => onPrint(file.fileUrl)}>🖨️ Print</button>
          <button onClick={() => onDelete(file._id)} className="delete">🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
