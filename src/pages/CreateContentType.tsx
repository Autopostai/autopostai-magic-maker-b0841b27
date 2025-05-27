
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Image, FileText, Film, MessageSquare, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateContentType() {
  const navigate = useNavigate();

  const contentTypes = [
    {
      id: "post",
      title: "Post Único",
      description: "Crie um post único para suas redes sociais",
      icon: Image,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      route: "/create/platforms"
    },
    {
      id: "carousel",
      title: "Carrossel",
      description: "Crie carrosséis com múltiplas imagens",
      icon: FileText,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600", 
      iconBg: "bg-purple-100",
      route: "/create/platforms"
    },
    {
      id: "reels",
      title: "Reels/Shorts",
      description: "Crie vídeos curtos para Instagram e TikTok",
      icon: Film,
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      route: "/create/ai"
    },
    {
      id: "script",
      title: "Roteiro para Vídeo",
      description: "Gere roteiros otimizados para seus vídeos",
      icon: MessageSquare,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      route: "/create/ai"
    },
    {
      id: "caption",
      title: "Legenda",
      description: "Crie legendas envolventes para seus posts",
      icon: MessageSquare,
      color: "bg-yellow-50 border-yellow-200",
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      route: "/create/ai"
    },
    {
      id: "ebook",
      title: "Gerar eBook/PDF/Apresentação",
      description: "Crie materiais educativos completos",
      icon: BookOpen,
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      route: "/content-generator"
    }
  ];

  const handleContentTypeSelect = (contentType: any) => {
    if (contentType.id === "post" || contentType.id === "carousel") {
      navigate(`${contentType.route}?type=${contentType.id}`);
    } else {
      navigate(contentType.route);
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
            <h1 className="text-3xl font-bold">Escolha o tipo de conteúdo</h1>
            <p className="text-gray-600">Selecione o que você deseja criar hoje</p>
          </div>
        </div>

        {/* Content Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((type) => (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${type.color}`}
              onClick={() => handleContentTypeSelect(type)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 w-16 h-16 ${type.iconBg} rounded-full flex items-center justify-center`}>
                  <type.icon className={`w-8 h-8 ${type.iconColor}`} />
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
                <CardDescription className="text-sm">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full" variant="outline">
                  Começar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Dica:</h3>
          <p className="text-blue-800 text-sm">
            Para Posts e Carrosséis, você poderá escolher entre criar com IA ou usar nossos templates personalizáveis. 
            Os outros tipos de conteúdo são gerados automaticamente pela nossa inteligência artificial.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
