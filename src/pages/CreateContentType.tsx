import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, FileText, Video, Youtube, Megaphone, MessageSquare, BookOpen, FileSpreadsheet, Presentation } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const contentTypes = [
  {
    id: "post",
    title: "Post único",
    description: "Imagem com texto para redes sociais",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "carousel",
    title: "Carrossel",
    description: "Múltiplas imagens em sequência",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: "thumbnail",
    title: "Thumbnail para YouTube",
    description: "Capa atrativa para vídeos",
    icon: Youtube,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: "ads",
    title: "Criativo para anúncios",
    description: "Material para campanhas pagas",
    icon: Megaphone,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: "video",
    title: "Reels / Shorts",
    description: "Vídeos curtos para redes sociais",
    icon: Video,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    id: "script",
    title: "Roteiro de vídeo",
    description: "Script para gravação de conteúdo",
    icon: MessageSquare,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    id: "caption",
    title: "Legenda",
    description: "Texto para acompanhar postagens",
    icon: FileText,
    color: "text-teal-600",
    bgColor: "bg-teal-50"
  },
  {
    id: "ebook",
    title: "eBook",
    description: "Livro digital educativo",
    icon: BookOpen,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    id: "pdf",
    title: "PDF",
    description: "Documento em formato PDF",
    icon: FileSpreadsheet,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50"
  },
  {
    id: "presentation",
    title: "Apresentação",
    description: "Slides para palestras e reuniões",
    icon: Presentation,
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  }
];

export default function CreateContentType() {
  const [selectedType, setSelectedType] = useState<string>("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedType) {
      navigate("/create/method", { state: { contentType: selectedType } });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Escolha o Tipo de Conteúdo</h1>
            <p className="text-gray-600">Selecione o formato do conteúdo que você deseja criar</p>
          </div>
        </div>

        {/* Content Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Conteúdo Disponíveis</CardTitle>
            <CardDescription>
              Clique no tipo de conteúdo que você deseja criar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                
                return (
                  <div
                    key={type.id}
                    className={`
                      relative cursor-pointer border-2 rounded-lg p-6 transition-all duration-200
                      ${isSelected 
                        ? 'border-purple-500 bg-purple-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }
                    `}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className="text-center space-y-3">
                      <div className={`${type.bgColor} p-4 rounded-lg mx-auto w-fit`}>
                        <Icon className={`w-8 h-8 ${type.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{type.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedType && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ Tipo selecionado: {contentTypes.find(t => t.id === selectedType)?.title}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleContinue}
            disabled={!selectedType}
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
