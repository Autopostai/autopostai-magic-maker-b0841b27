
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Instagram, Facebook, Youtube, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ConnectPlatforms() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  const platforms = [
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      description: "Publique posts, stories e reels automaticamente"
    },
    {
      id: "facebook", 
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Gerencie sua página e grupos do Facebook"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "text-red-500",
      bgColor: "bg-red-50",
      description: "Publique vídeos e thumbnails automaticamente"
    },
    {
      id: "linkedin",
      name: "LinkedIn", 
      icon: Linkedin,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      description: "Compartilhe conteúdo profissional e artigos"
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: Twitter,
      color: "text-gray-800",
      bgColor: "bg-gray-50", 
      description: "Publique tweets e threads automaticamente"
    }
  ];

  const handleConnect = (platformId: string) => {
    // Simular conexão
    setConnectedPlatforms(prev => [...prev, platformId]);
    toast.success(`${platforms.find(p => p.id === platformId)?.name} conectado com sucesso!`);
  };

  const handleDisconnect = (platformId: string) => {
    setConnectedPlatforms(prev => prev.filter(id => id !== platformId));
    toast.info(`${platforms.find(p => p.id === platformId)?.name} desconectado`);
  };

  const isConnected = (platformId: string) => connectedPlatforms.includes(platformId);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/create/platforms">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Conectar Plataformas</h1>
            <p className="text-gray-600">
              Conecte suas redes sociais para agendar e publicar automaticamente
            </p>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid gap-6">
          {platforms.map((platform) => (
            <Card key={platform.id} className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${platform.bgColor}`}>
                      <platform.icon className={`w-6 h-6 ${platform.color}`} />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {platform.name}
                        {isConnected(platform.id) && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                      </CardTitle>
                      <CardDescription>{platform.description}</CardDescription>
                    </div>
                  </div>
                  
                  <div>
                    {isConnected(platform.id) ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDisconnect(platform.id)}
                        >
                          Desconectar
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => handleConnect(platform.id)}>
                        Conectar
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {isConnected(platform.id) && (
                <CardContent className="pt-0">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      ✅ Conectado e pronto para publicar automaticamente
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-6">
          <Button asChild size="lg">
            <Link to="/schedule">
              Continuar para Agendamento
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
