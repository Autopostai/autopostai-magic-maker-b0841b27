
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
  const [textContent, setTextContent] = useState(`
SLIDE 1: CAPA
Título: ${location.state?.topic || "Título da Apresentação"}
Subtítulo: Guia completo para ${location.state?.audience || "seu público"}

SLIDE 2: AGENDA
• Introdução ao tema
• Conceitos fundamentais
• Estratégias práticas
• Casos de estudo
• Implementação
• Conclusão e próximos passos

SLIDE 3: INTRODUÇÃO
Bem-vindos à nossa apresentação sobre ${location.state?.topic || "o tema principal"}.
Hoje vamos explorar conceitos essenciais e estratégias práticas que você pode aplicar imediatamente.

SLIDE 4: CONCEITOS FUNDAMENTAIS
• Definição principal do tema
• Elementos-chave para entender
• Base teórica necessária
• Principais benefícios

SLIDE 5: ESTRATÉGIAS PRÁTICAS
• Passo 1: Análise inicial
• Passo 2: Planejamento
• Passo 3: Implementação
• Passo 4: Monitoramento

SLIDE 6: CASOS DE ESTUDO
Exemplo 1: Como a estratégia funcionou na prática
Resultado: Benefícios alcançados
Lições aprendidas: Pontos importantes

SLIDE 7: IMPLEMENTAÇÃO
• Ferramentas necessárias
• Cronograma sugerido
• Recursos recomendados
• Checklist de ações

SLIDE 8: CONCLUSÃO
• Principais pontos abordados
• Benefícios esperados
• Próximos passos
• Como continuar aprendendo

SLIDE 9: OBRIGADO
Obrigado pela atenção!
Perguntas e respostas
Contato: [seu email/rede social]
  `);

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
              Revise e edite o conteúdo antes de gerar o design
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
                rows={20}
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
