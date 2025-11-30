import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Pix } from "lucide-react"; // Assuming Pix icon exists or using a generic one
import { Button } from "@/components/ui/button";

const Withdrawal = () => {
  const location = useLocation();
  const totalPrize = (location.state as { totalPrize: number })?.totalPrize || 0;
  const withdrawalFee = totalPrize * 0.10; // 10% of the total prize
  const pixKey = "11.111.111/0001-11"; // Placeholder Pix key

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-4">
      <Card className="w-full max-w-md bg-white text-gray-900 shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold mb-2">
            Saque Disponível!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Parabéns pelo seu prêmio!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <p className="text-xl font-semibold mb-2">
              Prêmio Total:{" "}
              <span className="text-green-600 font-bold">
                R${totalPrize.toFixed(2).replace(".", ",")}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Taxa de Saque (10%):{" "}
              <span className="font-bold">
                R${withdrawalFee.toFixed(2).replace(".", ",")}
              </span>
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Valor a Receber:{" "}
              <span className="font-bold text-blue-600">
                R${(totalPrize - withdrawalFee).toFixed(2).replace(".", ",")}
              </span>
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-md mb-6 border border-gray-200">
            <p className="text-md font-semibold mb-2">
              Para receber seu prêmio, pague a taxa via Pix:
            </p>
            <p className="text-lg font-bold text-center text-purple-700 break-all">
              Chave Pix: {pixKey}
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              (Copie e cole no seu aplicativo bancário)
            </p>
          </div>

          <p className="text-center text-md text-gray-800">
            Após a confirmação do pagamento da taxa, seu prêmio será enviado via Pix em até 30 minutos.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdrawal;