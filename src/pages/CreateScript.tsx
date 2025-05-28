
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateScript() {
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Form inputs
  const [niche, setNiche] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("30");
  const [style, setStyle] = useState("educativo");
  const [target, setTarget] = useState("");
  const [language, setLanguage] = useState("pt");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulação da geração do roteiro
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockScript = `
# Roteiro para Vídeo de ${duration} segundos

## Introdução (0-5s)
Olá pessoal! Hoje vamos falar sobre ${topic || 'um assunto incrível'} no nicho de ${niche}.

## Desenvolvimento (5-${parseInt(duration) - 10}s)
${niche ? `No mundo de ${niche}, é fundamental entender...` : 'É importante compreender que...'}

## Call to Action (${parseInt(duration) - 10}s-${duration}s)
Se você gostou deste conteúdo, deixe seu like e me siga para mais dicas!

---
**Dicas de Gravação:**
- Mantenha energia alta
- Use gestos expressivos
- Fale de forma clara e objetiva
`;
      
      setGeneratedScript(mockScript);
      toast.success("Roteiro gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar roteiro:", error);
      toast.error("Erro ao gerar roteiro. Tente novamente.");
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
            <Link to="/create">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Gerar Roteiro para Vídeo</h1>
            <p className="text-gray-600">Crie roteiros otimizados para seus vídeos com IA</p>
          </div>
        </div>

        {!generatedScript ? (
          <Card>
            <CardHeader>
              <CardTitle>Definir Parâmetros do Roteiro</CardTitle>
              <CardDescription>
                Preencha as informações para gerar um roteiro personalizado
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma do Conteúdo</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="en">Inglês</SelectItem>
                          <SelectItem value="es">Espanhol</SelectItem>
                          <SelectItem value="fr">Francês</SelectItem>
                          <SelectItem value="de">Alemão</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duração do Vídeo</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a duração" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 segundos</SelectItem>
                          <SelectItem value="30">30 segundos</SelectItem>
                          <SelectItem value="60">60 segundos</SelectItem>
                          <SelectItem value="90">90 segundos</SelectItem>
                          <SelectItem value="120">2 minutos</SelectItem>
                          <SelectItem value="300">5 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="niche">Nicho</Label>
                      <Input 
                        id="niche" 
                        placeholder="Ex: Psicologia, Marketing, Finanças..." 
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="style">Estilo do Roteiro</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estilo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="educativo">Educativo</SelectItem>
                          <SelectItem value="persuasivo">Persuasivo</SelectItem>
                          <SelectItem value="informal">Informal</SelectItem>
                          <SelectItem value="divertido">Divertido</SelectItem>
                          <SelectItem value="vendas">Vendas</SelectItem>
                          <SelectItem value="storytelling">Storytelling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target">Público-alvo</Label>
                    <Input 
                      id="target" 
                      placeholder="Ex: Mulheres 25-35 anos, Empreendedores..." 
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="topic">Tópico do Vídeo</Label>
                    <Textarea 
                      id="topic" 
                      placeholder="Descreva sobre o que será o vídeo..."
                      className="min-h-[100px]"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando Roteiro...
                      </>
                    ) : (
                      "Gerar Roteiro com IA"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold text-green-600">Roteiro Gerado!</span>
              </div>
              <Button variant="outline" onClick={() => setGeneratedScript(null)}>
                Gerar Novo Roteiro
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Seu Roteiro</CardTitle>
                <CardDescription>
                  Roteiro otimizado para vídeo de {duration} segundos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">{generatedScript}</pre>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button onClick={() => navigator.clipboard.writeText(generatedScript)}>
                    Copiar Roteiro
                  </Button>
                  <Button variant="outline">
                    Baixar como PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
