"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, DollarSign } from "lucide-react";
import ScratchGrid from "@/components/ScratchGrid";
import { toast } from "sonner";

const ScratchCardGame = () => {
  const navigate = useNavigate();
  const { round } = useParams<{ round: string }>();
  const location = useLocation();
  const currentRound = parseInt(round || "1");
  const [revealed, setRevealed] = useState(false);
  const [currentRoundPrize, setCurrentRoundPrize] = useState<number>(0);

  const totalPrizeFromState = (location.state as { totalPrize: number })?.totalPrize || 0;

  const cellPrizes = useMemo(() => {
    const gridCells = 9;
    const prizesArray = new Array(gridCells).fill(0);
    let prizeForThisRound = 0;

    if (currentRound === 2) {
      prizeForThisRound = 10;
    } else if (currentRound === 3) {
      prizeForThisRound = 140;
    }

    if (prizeForThisRound > 0) {
      const randomCellIndex = Math.floor(Math.random() * gridCells);
      prizesArray[randomCellIndex] = prizeForThisRound;
    }
    return prizesArray;
  }, [currentRound]);

  useEffect(() => {
    setRevealed(false);
    setCurrentRoundPrize(0);
  }, [currentRound]);

  const handleScratchComplete = () => {
    const sumOfPrizesInGrid = cellPrizes.reduce((sum, p) => sum + p, 0);
    setCurrentRoundPrize(sumOfPrizesInGrid);
    setRevealed(true);

    if (sumOfPrizesInGrid > 0) {
      toast.success(`Parabéns! Você ganhou R$${sumOfPrizesInGrid.toFixed(2).replace(".", ",")}`);
    } else {
      toast.info("Nenhum prêmio nesta rodada. Tente a próxima!");
    }
  };

  const handleNextRound = () => {
    const newTotalPrize = totalPrizeFromState + currentRoundPrize;
    if (currentRound < 3) {
      navigate(`/scratch-card/${currentRound + 1}`, { state: { totalPrize: newTotalPrize } });
    } else {
      navigate("/withdrawal", { state: { totalPrize: newTotalPrize } });
    }
  };

  const getPrizeIcon = (prize: number) => {
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
              <ScratchGrid key={currentRound} onComplete={handleScratchComplete} cellPrizes={cellPrizes} />
            </>
          ) : (
            <>
              <div className="mb-6 flex flex-col items-center">
                {getPrizeIcon(currentRoundPrize)}
                <p className="text-2xl font-semibold mt-4">
                  Você ganhou:{" "}
                  <span className="text-green-600 font-bold">
                    R${currentRoundPrize.toFixed(2).replace(".", ",")}
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