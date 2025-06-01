
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function BioOptimizer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    persona: "",
    atuacao: "",
    tom: "",
    tomCustom: "",
    plataforma: "",
    plataformaCustom: "",
    proposta: "",
    diferencial: "",
    cta: "",
  });

  const handleGenerate = async () => {
    if (!formData.persona || !formData.atuacao || !formData.tom || !formData.plataforma) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    
    try {
      // Simular geração de bio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const tom = formData.tom === "outro" ? formData.tomCustom : formData.tom;
      const plataforma = formData.plataforma === "outro" ? formData.plataformaCustom : formData.plataforma;
      
      // Gerar bio mockada baseada nos dados
      let bio = `${formData.persona} | ${formData.atuacao}\n`;
      
      if (formData.proposta) {
        bio += `💡 ${formData.proposta}\n`;
      }
      
      if (formData.diferencial) {
        bio += `✨ ${formData.diferencial}\n`;
      }
      
      if (formData.cta) {
        bio += `👇 ${formData.cta}`;
      }
      
      // Navegar para página de resultado
      navigate('/bio-result', {
        state: {
          bio,
          platform: plataforma,
          persona: formData.persona,
          tom
        }
      });
      
    } catch (error) {
      toast.error("Erro ao gerar bio");
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
            <h1 className="text-3xl font-bold">Otimizador de Bio e Perfil</h1>
            <p className="text-gray-600">
              Crie bios otimizadas para suas redes sociais
            </p>
          </div>
        </div>

        {/* Formulário Completo */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
            <CardDescription>
              Quanto mais detalhes, melhor será sua bio personalizada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Linha 1 - Persona e Tom */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="persona">Sua Persona *</Label>
                <Input
                  id="persona"
                  placeholder="Ex: Coach, Consultora, Empreendedor, Designer..."
                  value={formData.persona}
                  onChange={(e) => setFormData(prev => ({ ...prev, persona: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tom">Tom Desejado *</Label>
                <Select value={formData.tom} onValueChange={(value) => setFormData(prev => ({ ...prev, tom: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profissional">Profissional</SelectItem>
                    <SelectItem value="divertido">Divertido</SelectItem>
                    <SelectItem value="inspiracional">Inspiracional</SelectItem>
                    <SelectItem value="informal">Informal</SelectItem>
                    <SelectItem value="autoridade">Autoridade</SelectItem>
                    <SelectItem value="amigavel">Amigável</SelectItem>
                    <SelectItem value="minimalista">Minimalista</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                {formData.tom === "outro" && (
                  <Input
                    placeholder="Descreva o tom desejado"
                    value={formData.tomCustom}
                    onChange={(e) => setFormData(prev => ({ ...prev, tomCustom: e.target.value }))}
                  />
                )}
              </div>
            </div>

            {/* Linha 2 - Área de Atuação */}
            <div className="space-y-2">
              <Label htmlFor="atuacao">Área de Atuação *</Label>
              <Textarea
                id="atuacao"
                placeholder="Ex: Marketing Digital, Desenvolvimento Pessoal, Finanças, Design Gráfico, Coaching de Carreira..."
                className="min-h-[80px]"
                value={formData.atuacao}
                onChange={(e) => setFormData(prev => ({ ...prev, atuacao: e.target.value }))}
              />
            </div>

            {/* Linha 3 - Plataforma Alvo */}
            <div className="space-y-2">
              <Label htmlFor="plataforma">Plataforma Alvo *</Label>
              <Select value={formData.plataforma} onValueChange={(value) => setFormData(prev => ({ ...prev, plataforma: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a plataforma principal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="threads">Threads</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {formData.plataforma === "outro" && (
                <Input
                  placeholder="Digite o nome da plataforma"
                  value={formData.plataformaCustom}
                  onChange={(e) => setFormData(prev => ({ ...prev, plataformaCustom: e.target.value }))}
                />
              )}
            </div>

            {/* Linha 4 - Proposta de Valor */}
            <div className="space-y-2">
              <Label htmlFor="proposta">O que você entrega? (Proposta de valor)</Label>
              <Textarea
                id="proposta"
                placeholder="Ex: Ajudo empreendedores a aumentar suas vendas em 30 dias, Ensino pessoas a investir sem medo, Crio identidades visuais marcantes..."
                className="min-h-[80px]"
                value={formData.proposta}
                onChange={(e) => setFormData(prev => ({ ...prev, proposta: e.target.value }))}
              />
            </div>

            {/* Linha 5 - Diferencial */}
            <div className="space-y-2">
              <Label htmlFor="diferencial">O que te torna único? (Diferencial)</Label>
              <Textarea
                id="diferencial"
                placeholder="Ex: +10 anos de experiência, Método exclusivo, Já ajudei 1000+ pessoas, Formação internacional..."
                className="min-h-[80px]"
                value={formData.diferencial}
                onChange={(e) => setFormData(prev => ({ ...prev, diferencial: e.target.value }))}
              />
            </div>

            {/* Linha 6 - CTA */}
            <div className="space-y-2">
              <Label htmlFor="cta">Quer incluir uma chamada para ação? (Opcional)</Label>
              <Input
                id="cta"
                placeholder="Ex: Link na bio, DM para consultoria gratuita, Acesse meu curso..."
                value={formData.cta}
                onChange={(e) => setFormData(prev => ({ ...prev, cta: e.target.value }))}
              />
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
                  Gerando Bio Otimizada...
                </>
              ) : (
                "Gerar Bio Otimizada"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
