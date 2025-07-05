import { Navigate, useParams } from "react-router-dom";

const UploadAuthWrapper = ({ children }) => {
  const { id } = useParams();
  const isUploadAuth = localStorage.getItem("upload_token");

  if (!isUploadAuth) {
    return <Navigate to={`/upload-login/${id}`} />;
  }

  return children;
};

export default UploadAuthWrapper;
