import React from "react";
import { useNavigate } => "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const FreeRounds = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/scratch-card/1", { state: { totalPrize: 0 } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-dyad-blue to-dyad-blue-dark text-white p-4">
      <Gift className="h-20 w-20 text-white mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Parabéns!
      </h1>
      <p className="text-xl md:text-2xl text-center max-w-md mb-8">
        Você tem direito a 3 rodadas gratuitas de raspadinha!
      </p>
      <Button
        onClick={handleStartGame}
        className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Iniciar Jogo
      </Button>
    </div>
  );
};

export default FreeRounds;