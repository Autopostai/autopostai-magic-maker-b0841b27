
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, FileText, Presentation } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ContentGenerator() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("");
  const [audience, setAudience] = useState("");
  const [style, setStyle] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [pageCount, setPageCount] = useState("");

  const handleGenerate = async () => {
    if (!topic || !contentType || !audience || !detailedDescription) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    
    try {
      // Simular geração de conteúdo
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navegar para página de conteúdo textual
      navigate("/presentation-text", { 
        state: { 
          topic, 
          contentType, 
          audience, 
          style, 
          detailedDescription, 
          pageCount 
        } 
      });
      
      toast.success("Conteúdo gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar conteúdo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Gerador de Apresentações</h1>
            <p className="text-gray-600">
              Crie materiais profissionais completos com IA
            </p>
          </div>
        </div>

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>Configurar Conteúdo</CardTitle>
            <CardDescription>
              Defina o tema e formato do seu material
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Tema Principal *</Label>
              <Input
                id="topic"
                placeholder="Ex: Marketing Digital para Iniciantes, Gestão de Tempo, Investimentos..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contentType">Tipo de Conteúdo *</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presentation">Apresentação (Slides)</SelectItem>
                    <SelectItem value="guide">Guia Visual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Público-alvo *</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o público" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciantes">Iniciantes</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                    <SelectItem value="geral">Público Geral</SelectItem>
                    <SelectItem value="profissionais">Profissionais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Estilo Visual</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o estilo (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profissional">Profissional</SelectItem>
                  <SelectItem value="moderno">Moderno</SelectItem>
                  <SelectItem value="minimalista">Minimalista</SelectItem>
                  <SelectItem value="criativo">Criativo</SelectItem>
                  <SelectItem value="corporativo">Corporativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pageCount">Quantas páginas/slides deve ter sua apresentação?</Label>
              <Input
                id="pageCount"
                type="number"
                placeholder="Ex: 15"
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailedDescription">
                Nos dê o máximo de informações sobre a sua apresentação *
              </Label>
              <Textarea
                id="detailedDescription"
                placeholder="Como você quer? Quais informações deve ter na apresentação? Qual o conteúdo deve ter? Detalhe nos mínimos detalhes o tipo de apresentação que você quer..."
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                rows={6}
                className="min-h-32"
              />
              <p className="text-sm text-gray-500">
                Seja específico sobre o conteúdo, estrutura, objetivos e qualquer detalhe importante para sua apresentação.
              </p>
            </div>

            <Button 
              onClick={handleGenerate}
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Material...
                </>
              ) : (
                "GERAR MATERIAL"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
