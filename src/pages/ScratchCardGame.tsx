import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, XCircle, DollarSign } from "lucide-react";

const prizes = [0, 10, 140]; // Prizes for round 1, 2, 3

const ScratchCardGame = () => {
  const navigate = useNavigate();
  const { round } = useParams<{ round: string }>();
  const location = useLocation();
  const currentRound = parseInt(round || "1");
  const [revealed, setRevealed] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<number | null>(null);

  // Get total prize from previous rounds, default to 0 if not available
  const totalPrizeFromState = (location.state as { totalPrize: number })?.totalPrize || 0;

  const handleReveal = () => {
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
    setRevealed(false);
    setCurrentPrize(null);
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
              <Sparkles className="h-24 w-24 text-yellow-500 mb-6 animate-pulse" />
              <p className="text-xl mb-6 text-center">
                Clique para raspar e descobrir seu prêmio!
              </p>
              <Button
                onClick={handleReveal}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Revelar Prêmio
              </Button>
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