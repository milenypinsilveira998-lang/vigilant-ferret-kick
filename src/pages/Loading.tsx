import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/free-rounds");
    }, 5000); // 5 segundos de carregamento

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
      <Loader2 className="h-16 w-16 animate-spin text-white mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        Analisando seu CPF...
      </h1>
      <p className="text-lg md:text-xl text-center max-w-md">
        Verificando se você tem direito a rodadas gratuitas. Por favor, aguarde.
      </p>
    </div>
  );
};

export default Loading;