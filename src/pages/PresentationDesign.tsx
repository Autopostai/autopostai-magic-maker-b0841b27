
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Download, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function PresentationDesign() {
  const location = useLocation();
  const [selectedSlide, setSelectedSlide] = useState(0);

  const slides = [
    { title: "Capa", preview: "Slide de abertura com título principal" },
    { title: "Agenda", preview: "Estrutura da apresentação" },
    { title: "Introdução", preview: "Apresentação do tema" },
    { title: "Conceitos", preview: "Fundamentos teóricos" },
    { title: "Estratégias", preview: "Aplicação prática" },
    { title: "Casos", preview: "Exemplos reais" },
    { title: "Implementação", preview: "Como colocar em prática" },
    { title: "Conclusão", preview: "Resumo e próximos passos" },
    { title: "Obrigado", preview: "Slide de encerramento" }
  ];

  const handleDownloadPDF = () => {
    toast.success("Download do PDF iniciado!");
  };

  const handleDownloadPPT = () => {
    toast.success("Download do PowerPoint iniciado!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/presentation-text">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Apresentação com Design</h1>
            <p className="text-gray-600">
              Sua apresentação está pronta! Edite ou baixe nos formatos disponíveis
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lista de Slides */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Slides ({slides.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSlide(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedSlide === index 
                        ? 'bg-purple-50 border-purple-300 text-purple-700'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm">Slide {index + 1}</div>
                    <div className="text-xs text-gray-500">{slide.title}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview do Slide */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Slide {selectedSlide + 1}: {slides[selectedSlide].title}</span>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Slide
                  </Button>
                </CardTitle>
                <CardDescription>
                  Visualize e edite cada slide da sua apresentação
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Preview Area */}
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {location.state?.topic || "Título da Apresentação"}
                    </div>
                    <div className="text-lg opacity-90">
                      {slides[selectedSlide].preview}
                    </div>
                    <div className="mt-4 text-sm opacity-75">
                      Preview do Slide {selectedSlide + 1}
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 min-w-48"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Apresentação
                  </Button>
                  <Button 
                    onClick={handleDownloadPDF}
                    className="flex-1 min-w-48 bg-red-600 hover:bg-red-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                  <Button 
                    onClick={handleDownloadPPT}
                    className="flex-1 min-w-48 bg-orange-600 hover:bg-orange-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PowerPoint
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Informações da Apresentação */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Apresentação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-700">Tema:</div>
                <div className="text-gray-600">{location.state?.topic || "Não informado"}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Tipo:</div>
                <div className="text-gray-600">{location.state?.contentType || "Não informado"}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Público:</div>
                <div className="text-gray-600">{location.state?.audience || "Não informado"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
