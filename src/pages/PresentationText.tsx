
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Edit, Palette } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PresentationText() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Generate content based on the specified number of pages/slides
  const generateSlideContent = () => {
    const pageCount = parseInt(location.state?.pageCount) || 9;
    const topic = location.state?.topic || "Título da Apresentação";
    const audience = location.state?.audience || "seu público";
    const detailedDescription = location.state?.detailedDescription || "";
    
    let content = `SLIDE 1: CAPA
Título: ${topic}
Subtítulo: Guia completo para ${audience}

SLIDE 2: AGENDA
• Introdução ao tema
• Conceitos fundamentais
• Estratégias práticas
• Casos de estudo
• Implementação
• Conclusão e próximos passos

SLIDE 3: INTRODUÇÃO
Bem-vindos à nossa apresentação sobre ${topic}.
Hoje vamos explorar conceitos essenciais e estratégias práticas que você pode aplicar imediatamente.

`;

    // Generate additional slides based on the requested count
    if (pageCount > 3) {
      for (let i = 4; i <= pageCount - 1; i++) {
        const slideTopics = [
          "CONCEITOS FUNDAMENTAIS",
          "ESTRATÉGIAS PRÁTICAS", 
          "CASOS DE ESTUDO",
          "IMPLEMENTAÇÃO",
          "BENEFÍCIOS E VANTAGENS",
          "DESAFIOS E SOLUÇÕES",
          "MELHORES PRÁTICAS",
          "FERRAMENTAS RECOMENDADAS",
          "PLANEJAMENTO",
          "EXECUÇÃO",
          "MONITORAMENTO",
          "RESULTADOS ESPERADOS"
        ];
        
        const topicIndex = (i - 4) % slideTopics.length;
        const slideTopic = slideTopics[topicIndex];
        
        content += `SLIDE ${i}: ${slideTopic}
• Ponto principal sobre ${slideTopic.toLowerCase()}
• Informações relevantes baseadas em: ${detailedDescription.slice(0, 50)}...
• Estratégias aplicáveis
• Exemplos práticos

`;
      }
    }

    // Final slide (always the last one)
    content += `SLIDE ${pageCount}: OBRIGADO
Obrigado pela atenção!
Perguntas e respostas
Contato: [seu email/rede social]

Apresentação baseada em: ${detailedDescription.slice(0, 100)}...`;

    return content;
  };

  const [textContent, setTextContent] = useState(generateSlideContent());

  const handleGenerateDesign = () => {
    navigate("/presentation-design", { 
      state: { 
        ...location.state,
        textContent 
      } 
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/content-generator">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Conteúdo Textual da Apresentação</h1>
            <p className="text-gray-600">
              Revise e edite o conteúdo antes de gerar o design ({location.state?.pageCount || 9} slides)
            </p>
          </div>
        </div>

        {/* Conteúdo Gerado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Estrutura da Apresentação</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Salvar" : "Editar"}
              </Button>
            </CardTitle>
            <CardDescription>
              Conteúdo textual detalhado para cada slide da sua apresentação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <Textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={25}
                className="min-h-96 font-mono text-sm"
              />
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {textContent}
                </pre>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleGenerateDesign}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
              >
                <Palette className="h-4 w-4 mr-2" />
                GERAR COM DESIGN
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
