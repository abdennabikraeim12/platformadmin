
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// This page will redirect to the Products page
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/products");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-xl text-gray-600">Redirection en cours...</p>
      </div>
    </div>
  );
};

export default Index;
