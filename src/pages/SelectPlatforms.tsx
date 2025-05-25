
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    description: "Posts, Stories e Reels"
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Posts e Stories"
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: () => (
      <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
        <span className="text-white text-xs font-bold">TT</span>
      </div>
    ),
    color: "text-black",
    bgColor: "bg-gray-50",
    description: "Vídeos curtos"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    description: "Posts profissionais"
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: () => (
      <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
        <span className="text-white text-xs font-bold">X</span>
      </div>
    ),
    color: "text-black",
    bgColor: "bg-gray-50",
    description: "Posts e threads"
  },
  {
    id: "youtube",
    name: "YouTube Shorts",
    icon: Youtube,
    color: "text-red-500",
    bgColor: "bg-red-50",
    description: "Vídeos curtos"
  },
  {
    id: "kwai",
    name: "Kwai",
    icon: () => (
      <div className="w-6 h-6 bg-yellow-500 rounded-sm flex items-center justify-center">
        <span className="text-white text-xs font-bold">K</span>
      </div>
    ),
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    description: "Vídeos curtos"
  }
];

export default function SelectPlatforms() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const navigate = useNavigate();

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleContinue = () => {
    if (selectedPlatforms.length > 0) {
      // Redirecionar para a página de criação com as plataformas selecionadas
      const platformsQuery = selectedPlatforms.join(',');
      navigate(`/create/content?platforms=${platformsQuery}`);
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
            <h1 className="text-3xl font-bold">Selecione as Plataformas</h1>
            <p className="text-gray-600">Escolha onde você deseja publicar seu conteúdo</p>
          </div>
        </div>

        {/* Platform Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Plataformas Disponíveis</CardTitle>
            <CardDescription>
              Selecione uma ou mais plataformas para publicar seu conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                
                return (
                  <div
                    key={platform.id}
                    className={`
                      relative cursor-pointer border-2 rounded-lg p-4 transition-all duration-200
                      ${isSelected 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${platform.bgColor} p-2 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${platform.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{platform.name}</h3>
                        <p className="text-sm text-gray-500">{platform.description}</p>
                      </div>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handlePlatformToggle(platform.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedPlatforms.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ {selectedPlatforms.length} plataforma{selectedPlatforms.length !== 1 ? 's' : ''} selecionada{selectedPlatforms.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleContinue}
            disabled={selectedPlatforms.length === 0}
            size="lg"
          >
            Continuar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
