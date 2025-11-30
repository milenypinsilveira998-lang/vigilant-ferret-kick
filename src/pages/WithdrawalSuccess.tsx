"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WithdrawalSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
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
          <Button
            onClick={handleGoHome}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawalSuccess;