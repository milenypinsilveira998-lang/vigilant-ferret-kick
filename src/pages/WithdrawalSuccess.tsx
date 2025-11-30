"use client";

import React from "react";
import { CheckCircle, Share2 } from "lucide-react"; // Import Share2 icon
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // For toast messages

const WithdrawalSuccess = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ganhei na Raspadinha!",
          text: "Acabei de ganhar um prêmio na raspadinha! Tente a sua sorte também!",
          url: window.location.origin, // Compartilha a URL base do aplicativo
        });
        toast.success("Link compartilhado com sucesso!");
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
        toast.error("Não foi possível compartilhar o link.");
      }
    } else {
      toast.info("Seu navegador não suporta a função de compartilhamento nativo.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 text-white p-4">
      <Card className="w-full max-w-md bg-white text-gray-900 shadow-xl rounded-lg text-center">
        <CardHeader>
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-2">
            Parabéns!
          </CardTitle>
          <CardDescription className="text-xl text-gray-700">
            Saque Aprovado!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg text-gray-800 mb-6">
            Em até 30 minutos, o valor estará na sua conta.
          </p>
          <p className="text-md text-gray-600 mt-4 mb-6">
            Só é possível fazer a raspadinha uma vez por CPF.
          </p>
          <Button
            onClick={handleShare}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Share2 className="h-5 w-5" /> Compartilhar Raspadinha
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawalSuccess;