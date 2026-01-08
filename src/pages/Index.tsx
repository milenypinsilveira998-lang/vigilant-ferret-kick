"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { toast } from "sonner";

const Index = () => {
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();

  const handleAnalyzeCpf = () => {
    if (cpf.length === 11 && /^\d+$/.test(cpf)) {
      navigate("/loading");
    } else {
      toast.error("Por favor, insira um CPF válido (apenas números, 11 dígitos).");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-dyad-blue to-dyad-blue-dark p-4">
      <Card className="w-full max-w-md bg-white text-gray-900 shadow-xl rounded-lg">
        <CardHeader className="text-center p-0">
          <img
            src="/RASPA.webp"
            alt="Bem-vindo à raspadinha da caixa"
            className="w-full h-auto mx-auto rounded-t-lg"
          />
          <CardDescription className="text-md text-gray-600 p-4">
            Insira seu CPF para verificar suas rodadas gratuitas.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Digite seu CPF (apenas números)"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={11}
              className="text-center text-lg py-6"
            />
            <Button
              onClick={handleAnalyzeCpf}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Analisar CPF
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4">
              *Apenas uma jogada por CPF.
            </p>
          </div>
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default Index;