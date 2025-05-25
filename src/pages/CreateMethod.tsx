
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles, Image } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function CreateMethod() {
  const [selectedMethod, setSelectedMethod] = useState<"ai" | "template" | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const platforms = searchParams.get('platforms')?.split(',') || [];
  const contentType = searchParams.get('type') || 'carrossel';

  const handleContinue = () => {
    if (selectedMethod && platforms.length > 0) {
      const query = new URLSearchParams({
        platforms: platforms.join(','),
        type: contentType,
        method: selectedMethod
      });
      
      if (selectedMethod === 'ai') {
        navigate(`/create/ai?${query}`);
      } else {
        navigate(`/create/templates?${query}`);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/create/platforms">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Como você quer criar?</h1>
            <p className="text-gray-600">Escolha o método de criação do seu conteúdo</p>
          </div>
        </div>

        {/* Selected Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Plataformas selecionadas:</span> {platforms.join(', ')}
          </p>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Tipo de conteúdo:</span> {contentType}
          </p>
        </div>

        {/* Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Creation */}
          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              selectedMethod === 'ai' 
                ? 'border-purple-500 bg-purple-50' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod('ai')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>Criar com IA</CardTitle>
              <CardDescription>
                Deixe a inteligência artificial criar conteúdo personalizado para você
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Geração automática de texto</li>
                <li>• Sugestões de layout</li>
                <li>• Adaptação por público-alvo</li>
                <li>• Tons de voz personalizados</li>
                <li>• Hashtags otimizadas</li>
              </ul>
            </CardContent>
          </Card>

          {/* Template Creation */}
          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              selectedMethod === 'template' 
                ? 'border-purple-500 bg-purple-50' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod('template')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Image className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Usar Mockup Personalizável</CardTitle>
              <CardDescription>
                Escolha um template pronto e personalize com seus textos e imagens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Templates profissionais</li>
                <li>• Fácil edição de texto</li>
                <li>• Troca simples de imagens</li>
                <li>• Designs otimizados</li>
                <li>• Criação rápida</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleContinue}
            disabled={!selectedMethod}
            size="lg"
          >
            Continuar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
