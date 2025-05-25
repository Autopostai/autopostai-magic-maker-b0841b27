
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { VisualEditor } from "@/components/VisualEditor";
import { toast } from "sonner";
import { generateContent, AIContentGeneratorParams } from "@/services/aiService";
import { ContentGenerationData } from "./CreateContent";

export default function CreateAI() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"generate" | "edit">("generate");
  const [generatedContent, setGeneratedContent] = useState<ContentGenerationData | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Recuperar parâmetros da URL
  const niche = searchParams.get('niche') || '';
  const style = searchParams.get('style') || '';
  const target = searchParams.get('target') || '';
  const topic = searchParams.get('topic') || '';
  const contentType = searchParams.get('contentType') as AIContentGeneratorParams["contentType"] || 'carrossel';
  const carouselType = searchParams.get('carouselType') || 'multi';
  const slideCount = searchParams.get('slideCount') || '5';
  const artStyle = searchParams.get('artStyle') || 'educativo';
  const videoDuration = searchParams.get('videoDuration') || '30';
  const captionLength = searchParams.get('captionLength') || 'medium';
  const reelsMethod = searchParams.get('reelsMethod') || 'edit';

  const handleGenerateContent = async () => {
    setLoading(true);
    
    try {
      // Configurar parâmetros para a API
      const params: AIContentGeneratorParams = {
        contentType,
        niche,
        style,
        target,
        topic
      };
      
      // Adicionar parâmetros específicos do tipo de conteúdo
      if (contentType === "carrossel") {
        params.carouselType = carouselType as any;
        params.slides = parseInt(slideCount);
      } else if (contentType === "video") {
        params.duration = parseInt(videoDuration);
      } else if (contentType === "legenda") {
        params.length = captionLength as any;
      }
      
      // Chamar API para gerar conteúdo
      const content = await generateContent(params);
      
      // Atualizar estado com o conteúdo gerado
      setGeneratedContent(content);
      setCurrentStep("edit");
      
      toast.success("Conteúdo gerado com sucesso!", {
        description: "Use o editor visual para personalizar seu conteúdo antes de exportar.",
      });
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      toast.error("Erro na geração de conteúdo", {
        description: "Ocorreu um problema ao gerar seu conteúdo. Tente novamente."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToGenerate = () => {
    setCurrentStep("generate");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/create/method">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {currentStep === "generate" 
                ? "Gerar Conteúdo com IA" 
                : "Personalizar Conteúdo"}
            </h1>
            <p className="text-gray-600">
              {currentStep === "generate" 
                ? "Clique para gerar seu conteúdo automaticamente" 
                : "Personalize seu conteúdo gerado"}
            </p>
          </div>
        </div>

        {currentStep === "generate" ? (
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros Configurados</CardTitle>
              <CardDescription>
                Revise as configurações e clique em gerar para criar seu conteúdo
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Nicho:</span> {niche || 'Não especificado'}
                </div>
                <div>
                  <span className="font-medium">Estilo:</span> {style}
                </div>
                <div>
                  <span className="font-medium">Público-alvo:</span> {target || 'Não especificado'}
                </div>
                <div>
                  <span className="font-medium">Tipo de conteúdo:</span> {contentType}
                </div>
                {contentType === 'carrossel' && (
                  <>
                    <div>
                      <span className="font-medium">Formato:</span> {carouselType === 'multi' ? 'Carrossel' : 'Post único'}
                    </div>
                    {carouselType === 'multi' && (
                      <div>
                        <span className="font-medium">Slides:</span> {slideCount}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Estilo visual:</span> {artStyle}
                    </div>
                  </>
                )}
              </div>
              
              {topic && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Tópico:</span>
                  <p className="mt-1 text-sm text-gray-600">{topic}</p>
                </div>
              )}
              
              <div className="mt-8 flex justify-center">
                <Button onClick={handleGenerateContent} size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando Conteúdo...
                    </>
                  ) : (
                    'Gerar Conteúdo com IA'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={handleBackToGenerate}>
                Gerar Novamente
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Conteúdo Gerado
                </span>
              </div>
            </div>
            
            <VisualEditor 
              content={generatedContent} 
              contentType={contentType}
              artStyle={artStyle} 
              carouselType={carouselType} 
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
