
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Video, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { VisualEditor } from "@/components/VisualEditor";
import { toast } from "sonner";

export type ContentGenerationData = {
  title?: string;
  slides?: string[];
  script?: string;
  caption?: string;
  hashtags?: string[];
};

export default function CreateContent() {
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState("carrossel");
  const [currentStep, setCurrentStep] = useState<"generate" | "edit">("generate");
  const [generatedContent, setGeneratedContent] = useState<ContentGenerationData | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulando uma chamada à API
    setTimeout(() => {
      setLoading(false);
      
      // Dados simulados para exemplo
      const mockGeneratedContent: ContentGenerationData = {
        title: "5 Dicas para Melhorar sua Saúde Mental",
        slides: [
          "1. Pratique meditação diariamente por 10 minutos",
          "2. Estabeleça uma rotina de sono consistente",
          "3. Desconecte-se das redes sociais por 2 horas antes de dormir",
          "4. Mantenha um diário de gratidão",
          "5. Busque ajuda profissional quando necessário"
        ],
        caption: "Sua saúde mental é prioridade! Neste post compartilho 5 dicas práticas que podem transformar sua relação com você mesmo. Qual dessas você já pratica? Comente abaixo! ✨ #saudeMental #bemestar",
        hashtags: ["#saudeMental", "#bemestar", "#autoconhecimento", "#psicologia", "#dicasdesaude"]
      };
      
      setGeneratedContent(mockGeneratedContent);
      setCurrentStep("edit");
      toast.success("Conteúdo gerado com sucesso! Agora você pode personalizá-lo.", {
        description: "Use o editor visual para personalizar seu conteúdo antes de exportar.",
      });
    }, 3000);
  };
  
  const handleBackToGenerate = () => {
    setCurrentStep("generate");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {currentStep === "generate" 
              ? "Criar Novo Conteúdo" 
              : "Personalizar Conteúdo"}
          </h1>
          
          {currentStep === "generate" ? (
            <Card>
              <CardHeader>
                <CardTitle>Definir Parâmetros</CardTitle>
                <CardDescription>
                  Preencha as informações abaixo para gerar seu conteúdo
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="niche">Nicho</Label>
                      <Input id="niche" placeholder="Ex: Psicologia, Marketing, Finanças, Moda..." />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="style">Estilo de Escrita</Label>
                        <Select defaultValue="educativo">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estilo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="educativo">Educativo</SelectItem>
                            <SelectItem value="divertido">Divertido</SelectItem>
                            <SelectItem value="profundo">Profundo</SelectItem>
                            <SelectItem value="vendas">Vendas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="target">Público-alvo</Label>
                        <Input id="target" placeholder="Ex: Mulheres 25-35 anos, Empreendedores..." />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tipo de Conteúdo</Label>
                      <Tabs defaultValue="carrossel" onValueChange={setContentType} className="w-full">
                        <TabsList className="grid grid-cols-3">
                          <TabsTrigger value="carrossel" className="flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            Carrossel
                          </TabsTrigger>
                          <TabsTrigger value="video" className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            Roteiro para Vídeo
                          </TabsTrigger>
                          <TabsTrigger value="legenda" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Legenda
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="carrossel" className="pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="slides">Quantidade de Slides</Label>
                            <Select defaultValue="5">
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a quantidade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5">5 slides</SelectItem>
                                <SelectItem value="7">7 slides</SelectItem>
                                <SelectItem value="10">10 slides</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="video" className="pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duração do Vídeo</Label>
                            <Select defaultValue="30">
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a duração" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 segundos</SelectItem>
                                <SelectItem value="30">30 segundos</SelectItem>
                                <SelectItem value="60">60 segundos</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="legenda" className="pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="length">Tamanho da Legenda</Label>
                            <Select defaultValue="medium">
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tamanho" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="short">Curta</SelectItem>
                                <SelectItem value="medium">Média</SelectItem>
                                <SelectItem value="long">Longa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="topic">Tópico Específico (opcional)</Label>
                      <Textarea 
                        id="topic" 
                        placeholder="Descreva um tópico específico ou deixe em branco para a IA sugerir"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Button type="submit" size="lg" disabled={loading}>
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
                </form>
              </CardContent>
              
              <CardFooter className="flex justify-center border-t pt-6 text-sm text-gray-500">
                <p>
                  Lembrete: Você tem 1 geração restante no plano gratuito.{" "}
                  <a href="/pricing" className="text-purple-600 hover:underline">
                    Faça upgrade para mais
                  </a>
                </p>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={handleBackToGenerate}>
                  Voltar para Geração
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Conteúdo Gerado
                  </span>
                </div>
              </div>
              
              <VisualEditor content={generatedContent} contentType={contentType} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
