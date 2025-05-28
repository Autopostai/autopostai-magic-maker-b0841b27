
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CreateCaption() {
  const [loading, setLoading] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState<string | null>(null);
  
  // Form inputs
  const [niche, setNiche] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("");
  const [tone, setTone] = useState("informal");
  const [length, setLength] = useState("medium");
  const [cta, setCta] = useState("engagement");
  const [language, setLanguage] = useState("pt");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulação da geração da legenda
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockCaption = `${content || 'Conteúdo incrível'} no nicho de ${niche}! 🔥

${tone === 'formal' ? 'É fundamental compreender que' : 'Galera, vocês precisam saber que'} este assunto é muito importante para ${target || 'nosso público'}.

${tone === 'vendas' ? '🚀 Não perca essa oportunidade única!' : 
  tone === 'comico' ? '😂 E o melhor de tudo é que é super fácil!' : 
  '✨ Espero que gostem do conteúdo!'}

${cta === 'engagement' ? '👇 Comentem aqui o que acharam!' : 
  cta === 'share' ? '🔄 Compartilhem com os amigos!' : 
  '❤️ Deixem o like se gostaram!'}

#${niche.toLowerCase().replace(/\s+/g, '')} #conteudo #dicas #${target.toLowerCase().replace(/\s+/g, '')}`;
      
      setGeneratedCaption(mockCaption);
      toast.success("Legenda gerada com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar legenda:", error);
      toast.error("Erro ao gerar legenda. Tente novamente.");
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
            <h1 className="text-3xl font-bold">Gerar Legenda</h1>
            <p className="text-gray-600">Crie legendas envolventes para seus posts</p>
          </div>
        </div>

        {!generatedCaption ? (
          <Card>
            <CardHeader>
              <CardTitle>Definir Parâmetros da Legenda</CardTitle>
              <CardDescription>
                Preencha as informações para gerar uma legenda personalizada
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
                      <Label htmlFor="niche">Nicho</Label>
                      <Input 
                        id="niche" 
                        placeholder="Ex: Psicologia, Marketing, Finanças..." 
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Sobre o que é o conteúdo?</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Descreva brevemente o conteúdo do seu post..."
                      className="min-h-[100px]"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
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

                  <div className="space-y-3">
                    <Label>Tom da Legenda</Label>
                    <RadioGroup value={tone} onValueChange={setTone}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="informal" id="informal" />
                        <Label htmlFor="informal">Informal e Descontraído</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="formal" id="formal" />
                        <Label htmlFor="formal">Formal e Profissional</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vendas" id="vendas" />
                        <Label htmlFor="vendas">Tom de Vendas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comico" id="comico" />
                        <Label htmlFor="comico">Cômico e Divertido</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="educativo" id="educativo" />
                        <Label htmlFor="educativo">Educativo e Informativo</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="length">Tamanho da Legenda</Label>
                      <Select value={length} onValueChange={setLength}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Curta (até 100 caracteres)</SelectItem>
                          <SelectItem value="medium">Média (100-300 caracteres)</SelectItem>
                          <SelectItem value="long">Longa (300+ caracteres)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cta">Call to Action</Label>
                      <Select value={cta} onValueChange={setCta}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o CTA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engagement">Engajamento (comentários)</SelectItem>
                          <SelectItem value="like">Curtidas</SelectItem>
                          <SelectItem value="share">Compartilhamentos</SelectItem>
                          <SelectItem value="follow">Seguir perfil</SelectItem>
                          <SelectItem value="link">Acessar link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando Legenda...
                      </>
                    ) : (
                      "Gerar Legenda com IA"
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
                <span className="text-lg font-semibold text-green-600">Legenda Gerada!</span>
              </div>
              <Button variant="outline" onClick={() => setGeneratedCaption(null)}>
                Gerar Nova Legenda
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Sua Legenda</CardTitle>
                <CardDescription>
                  Legenda otimizada para {niche}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="whitespace-pre-wrap text-sm">{generatedCaption}</p>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button onClick={() => navigator.clipboard.writeText(generatedCaption || '')}>
                    Copiar Legenda
                  </Button>
                  <Button variant="outline">
                    Usar em Post
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
