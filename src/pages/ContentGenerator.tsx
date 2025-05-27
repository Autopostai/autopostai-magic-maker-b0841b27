
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, FileText, Presentation, BookOpen, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type GeneratedContent = {
  type: "ebook" | "presentation" | "guide";
  title: string;
  structure: string[];
  preview: string;
  downloadUrl: string;
};

export default function ContentGenerator() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("");
  const [audience, setAudience] = useState("");
  const [style, setStyle] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleGenerate = async () => {
    if (!topic || !contentType || !audience) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    
    try {
      // Simular geração de conteúdo
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockContent: GeneratedContent = {
        type: contentType as any,
        title: `${topic}: Guia Completo`,
        structure: [
          "Introdução",
          "Conceitos Fundamentais",
          "Estratégias Práticas",
          "Casos de Estudo",
          "Implementação",
          "Conclusão e Próximos Passos"
        ],
        preview: `Este ${contentType === 'ebook' ? 'eBook' : contentType === 'presentation' ? 'apresentação' : 'guia'} aborda de forma completa o tema "${topic}", oferecendo insights valiosos e estratégias práticas para ${audience.toLowerCase()}.`,
        downloadUrl: "#"
      };
      
      setGeneratedContent(mockContent);
      toast.success("Conteúdo gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar conteúdo");
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ebook": return <BookOpen className="h-6 w-6" />;
      case "presentation": return <Presentation className="h-6 w-6" />;
      case "guide": return <FileText className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ebook": return "eBook";
      case "presentation": return "Apresentação";
      case "guide": return "Guia Visual";
      default: return "Conteúdo";
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
            <h1 className="text-3xl font-bold">Gerador de eBooks e Apresentações</h1>
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
                    <SelectItem value="ebook">eBook (PDF)</SelectItem>
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

            <Button 
              onClick={handleGenerate}
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Conteúdo...
                </>
              ) : (
                "Gerar Material Completo"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Conteúdo Gerado */}
        {generatedContent && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTypeIcon(generatedContent.type)}
                {getTypeLabel(generatedContent.type)} Gerado
              </CardTitle>
              <CardDescription>
                Seu material está pronto para download
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{generatedContent.title}</h3>
                <p className="text-gray-600">{generatedContent.preview}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Estrutura do Conteúdo:</h4>
                <ul className="space-y-1">
                  {generatedContent.structure.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Arquivo Pronto</p>
                    <p className="text-sm text-gray-600">
                      {getTypeLabel(generatedContent.type)} em formato PDF profissional
                    </p>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Baixar {getTypeLabel(generatedContent.type)}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Editar Conteúdo
                </Button>
                <Button variant="outline" className="flex-1">
                  Gerar Nova Versão
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
