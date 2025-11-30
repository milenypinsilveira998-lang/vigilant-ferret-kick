"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, DollarSign } from "lucide-react";
import ScratchGrid from "@/components/ScratchGrid"; // Importando o novo componente

const prizes = [0, 10, 140]; // Prêmios para a rodada 1, 2, 3

const ScratchCardGame = () => {
  const navigate = useNavigate();
  const { round } = useParams<{ round: string }>();
  const location = useLocation();
  const currentRound = parseInt(round || "1");
  const [revealed, setRevealed] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<number | null>(null);

  // Obtém o prêmio total das rodadas anteriores, padrão para 0 se não disponível
  const totalPrizeFromState = (location.state as { totalPrize: number })?.totalPrize || 0;

  // Reseta o estado de revelado e o prêmio atual quando a rodada muda
  useEffect(() => {
    setRevealed(false);
    setCurrentPrize(null);
  }, [currentRound]);

  const handleScratchComplete = () => {
    const prize = prizes[currentRound - 1];
    setCurrentPrize(prize);
    setRevealed(true);
  };

  const handleNextRound = () => {
    const newTotalPrize = totalPrizeFromState + (currentPrize || 0);
    if (currentRound < 3) {
      navigate(`/scratch-card/${currentRound + 1}`, { state: { totalPrize: newTotalPrize } });
    } else {
      navigate("/withdrawal", { state: { totalPrize: newTotalPrize } });
    }
  };

  const getPrizeIcon = (prize: number | null) => {
    if (prize === null) return null;
    if (prize > 0) return <DollarSign className="h-12 w-12 text-green-500" />;
    return <XCircle className="h-12 w-12 text-red-500" />;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 text-white p-4">
      <Card className="w-full max-w-md bg-white text-gray-900 shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Raspadinha - Rodada {currentRound} de 3
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {!revealed ? (
            <>
              <p className="text-xl mb-6 text-center">
                Passe o dedo (ou mouse) para raspar e descobrir seu prêmio!
              </p>
              <ScratchGrid key={currentRound} onComplete={handleScratchComplete} />
            </>
          ) : (
            <>
              <div className="mb-6 flex flex-col items-center">
                {getPrizeIcon(currentPrize)}
                <p className="text-2xl font-semibold mt-4">
                  Você ganhou:{" "}
                  <span className="text-green-600 font-bold">
                    R${currentPrize?.toFixed(2).replace(".", ",")}
                  </span>
                </p>
              </div>
              <Button
                onClick={handleNextRound}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
              >
                {currentRound < 3 ? "Próxima Rodada" : "Finalizar e Sacar"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      <p className="mt-6 text-lg text-white/80">
        Prêmio acumulado até agora:{" "}
        <span className="font-bold">
          R${totalPrizeFromState.toFixed(2).replace(".", ",")}
        </span>
      </p>
    </div>
  );
};

export default ScratchCardGame;