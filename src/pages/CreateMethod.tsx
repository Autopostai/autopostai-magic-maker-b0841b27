
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles, Layout } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const methods = [
  {
    id: "ai",
    title: "Criar com Inteligência Artificial",
    description: "Use nossa IA para gerar conteúdo automaticamente com base nas suas preferências",
    icon: Sparkles,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    nextRoute: "/create"
  },
  {
    id: "mockup",
    title: "Usar Mockup Personalizável",
    description: "Escolha um template pronto e personalize com suas informações",
    icon: Layout,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    nextRoute: "/mockups"
  }
];

export default function CreateMethod() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const contentType = location.state?.contentType;

  const handleContinue = () => {
    if (selectedMethod) {
      const method = methods.find(m => m.id === selectedMethod);
      if (method) {
        navigate(method.nextRoute, { 
          state: { 
            contentType,
            method: selectedMethod 
          } 
        });
      }
    }
  };

  const getContentTypeName = (type: string) => {
    const types: { [key: string]: string } = {
      post: "Post único",
      carousel: "Carrossel",
      thumbnail: "Thumbnail para YouTube",
      ads: "Criativo para anúncios",
      video: "Reels / Shorts",
      script: "Roteiro de vídeo",
      caption: "Legenda",
      ebook: "eBook",
      pdf: "PDF",
      presentation: "Apresentação"
    };
    return types[type] || type;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/create/type">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Como Você Quer Criar?</h1>
            <p className="text-gray-600">
              {contentType && (
                <span>Criando: <strong>{getContentTypeName(contentType)}</strong> • </span>
              )}
              Escolha o método de criação
            </p>
          </div>
        </div>

        {/* Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Criação</CardTitle>
            <CardDescription>
              Selecione como você gostaria de criar seu conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {methods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;
                
                return (
                  <div
                    key={method.id}
                    className={`
                      relative cursor-pointer border-2 rounded-lg p-6 transition-all duration-200
                      ${isSelected 
                        ? 'border-purple-500 bg-purple-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }
                    `}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="space-y-4">
                      <div className={`${method.bgColor} p-4 rounded-lg w-fit`}>
                        <Icon className={`w-8 h-8 ${method.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedMethod && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ Método selecionado: {methods.find(m => m.id === selectedMethod)?.title}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleContinue}
            disabled={!selectedMethod}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            Continuar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
