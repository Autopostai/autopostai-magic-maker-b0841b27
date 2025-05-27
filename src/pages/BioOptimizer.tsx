
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Instagram, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type BioData = {
  instagram: string;
  linkedin: { headline: string; description: string };
  tiktok: string;
  twitter: string;
};

export default function BioOptimizer() {
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState("");
  const [expertise, setExpertise] = useState("");
  const [tone, setTone] = useState("");
  const [generatedBios, setGeneratedBios] = useState<BioData | null>(null);

  const handleGenerate = async () => {
    if (!persona || !expertise || !tone) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    
    try {
      // Simular geração de bios
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockBios: BioData = {
        instagram: `${persona} | ${expertise} ✨\n📚 Compartilho dicas práticas\n💡 Transformando vidas através do conhecimento\n👇 Novos conteúdos toda semana`,
        linkedin: {
          headline: `${expertise} | Ajudo profissionais a alcançar resultados extraordinários`,
          description: `Como ${persona} especializada em ${expertise}, dedico-me a compartilhar conhecimentos práticos e estratégias comprovadas.\n\n💼 +5 anos de experiência\n🎯 Foco em resultados mensuráveis\n📈 Milhares de profissionais impactados\n\nConecte-se comigo para conteúdos exclusivos sobre crescimento profissional e estratégias de ${expertise.toLowerCase()}.`
        },
        tiktok: `${persona} que ama ${expertise} 🚀\nDicas rápidas e práticas ⚡\nSeguindo = conteúdo de valor 📱`,
        twitter: `${persona} | ${expertise} | Compartilhando insights valiosos para sua jornada de crescimento 🌟`
      };
      
      setGeneratedBios(mockBios);
      toast.success("Bios geradas com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar bios");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Bio do ${platform} copiada!`);
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
            <h1 className="text-3xl font-bold">Otimizador de Bio e Perfil</h1>
            <p className="text-gray-600">
              Crie bios otimizadas para todas as suas redes sociais
            </p>
          </div>
        </div>

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
            <CardDescription>
              Conte-nos sobre você para gerar bios personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="persona">Sua Persona *</Label>
                <Input
                  id="persona"
                  placeholder="Ex: Coach, Consultora, Empreendedor..."
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tom Desejado *</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profissional">Profissional</SelectItem>
                    <SelectItem value="divertido">Divertido</SelectItem>
                    <SelectItem value="inspiracional">Inspiracional</SelectItem>
                    <SelectItem value="informal">Informal</SelectItem>
                    <SelectItem value="autoridade">Autoridade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expertise">Área de Atuação *</Label>
              <Textarea
                id="expertise"
                placeholder="Descreva sua área de expertise (ex: Marketing Digital, Desenvolvimento Pessoal, Finanças...)"
                className="min-h-[80px]"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleGenerate}
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Gerando Bios..." : "Gerar Bios Otimizadas"}
            </Button>
          </CardContent>
        </Card>

        {/* Bios Geradas */}
        {generatedBios && (
          <Card>
            <CardHeader>
              <CardTitle>Suas Bios Otimizadas</CardTitle>
              <CardDescription>
                Bios personalizadas para cada plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="instagram" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </TabsTrigger>
                  <TabsTrigger value="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="tiktok" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    TikTok
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="instagram" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Bio Instagram (150 caracteres)</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generatedBios.instagram, "Instagram")}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <Textarea
                      value={generatedBios.instagram}
                      readOnly
                      className="min-h-[120px] bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">
                      {generatedBios.instagram.length}/150 caracteres
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="linkedin" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Headline LinkedIn</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(generatedBios.linkedin.headline, "LinkedIn Headline")}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                      </div>
                      <Textarea
                        value={generatedBios.linkedin.headline}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Descrição LinkedIn</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(generatedBios.linkedin.description, "LinkedIn Descrição")}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                      </div>
                      <Textarea
                        value={generatedBios.linkedin.description}
                        readOnly
                        className="min-h-[150px] bg-gray-50"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tiktok" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Bio TikTok</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generatedBios.tiktok, "TikTok")}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <Textarea
                      value={generatedBios.tiktok}
                      readOnly
                      className="min-h-[100px] bg-gray-50"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="twitter" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Bio Twitter</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generatedBios.twitter, "Twitter")}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <Textarea
                      value={generatedBios.twitter}
                      readOnly
                      className="min-h-[100px] bg-gray-50"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
