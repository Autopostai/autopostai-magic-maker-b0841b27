
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Bell, Eye, Share2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Trend = {
  id: string;
  title: string;
  description: string;
  platform: string;
  engagement: string;
  reason: string;
  suggestion: string;
  hashtags: string[];
  isRising: boolean;
};

export default function TrendDetector() {
  const [selectedNiche, setSelectedNiche] = useState("");
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);

  const niches = [
    "marketing",
    "moda",
    "finanças",
    "fitness",
    "tecnologia",
    "culinária",
    "beleza",
    "empreendedorismo",
    "educação",
    "lifestyle"
  ];

  const mockTrends: Trend[] = [
    {
      id: "1",
      title: "IA Generativa para Pequenos Negócios",
      description: "Como usar ChatGPT e outras IAs para automatizar processos",
      platform: "LinkedIn",
      engagement: "45.2K",
      reason: "Crescimento de 300% em buscas sobre IA para PMEs nos últimos 7 dias",
      suggestion: "Crie um carrossel mostrando 5 formas práticas de usar IA no seu negócio",
      hashtags: ["#IA", "#EmpreendedorismoDigital", "#AutomacaoDeProcessos"],
      isRising: true
    },
    {
      id: "2",
      title: "Método 3-6-5 para Produtividade",
      description: "Nova técnica viral de organização do tempo",
      platform: "TikTok",
      engagement: "128K",
      reason: "Influencers de produtividade estão compartilhando massivamente",
      suggestion: "Faça um Reels explicando o método em 30 segundos com exemplo prático",
      hashtags: ["#Produtividade", "#OrganizacaoDoTempo", "#Metodo365"],
      isRising: true
    },
    {
      id: "3",
      title: "Side Hustle Digital",
      description: "Renda extra online em 2024",
      platform: "Instagram",
      engagement: "89.5K",
      reason: "Aumento de 150% em buscas por renda extra digital",
      suggestion: "Post sobre 7 ideias de negócios online que podem ser iniciados hoje",
      hashtags: ["#RendaExtra", "#SideHustle", "#NegocioDigital"],
      isRising: false
    }
  ];

  const fetchTrends = async () => {
    if (!selectedNiche) {
      toast.error("Selecione um nicho primeiro");
      return;
    }

    setLoading(true);
    
    try {
      // Simular busca por tendências
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTrends(mockTrends);
      toast.success("Tendências atualizadas!");
    } catch (error) {
      toast.error("Erro ao buscar tendências");
    } finally {
      setLoading(false);
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "tiktok": return "bg-black text-white";
      case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "linkedin": return "bg-blue-600 text-white";
      case "youtube": return "bg-red-600 text-white";
      case "twitter": return "bg-blue-400 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="h-8 w-8" />
              Detector de Tendências
            </h1>
            <p className="text-gray-600">
              Monitore as principais tendências do seu nicho em tempo real
            </p>
          </div>
        </div>

        {/* Seletor de Nicho */}
        <Card>
          <CardHeader>
            <CardTitle>Configurar Monitoramento</CardTitle>
            <CardDescription>
              Selecione seu nicho para receber tendências personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Escolha seu nicho" />
                </SelectTrigger>
                <SelectContent>
                  {niches.map((niche) => (
                    <SelectItem key={niche} value={niche}>
                      {niche.charAt(0).toUpperCase() + niche.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={fetchTrends} disabled={loading}>
                {loading ? "Buscando..." : "Buscar Tendências"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Tendências */}
        {trends.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Tendências Encontradas</h2>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Ativar Notificações
              </Button>
            </div>

            <div className="grid gap-6">
              {trends.map((trend) => (
                <Card key={trend.id} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">{trend.title}</h3>
                          {trend.isRising && (
                            <Badge variant="destructive" className="bg-green-500">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Em Alta
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{trend.description}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className={getPlatformColor(trend.platform)}>
                          {trend.platform}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Heart className="h-4 w-4" />
                          {trend.engagement}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          Por que está viral:
                        </h4>
                        <p className="text-sm text-gray-600">{trend.reason}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          Como aplicar:
                        </h4>
                        <p className="text-sm text-gray-600">{trend.suggestion}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Hashtags sugeridas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {trend.hashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm">
                        Criar Conteúdo Baseado
                      </Button>
                      <Button size="sm" variant="outline">
                        Salvar Tendência
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
