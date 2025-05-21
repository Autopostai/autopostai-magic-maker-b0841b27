
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Image, Video, FileText, Clock } from "lucide-react";

export default function Dashboard() {
  // Mock data - será substituído por dados reais do backend
  const recentContents = [
    {
      id: 1,
      title: "Dicas de Produtividade",
      type: "carrossel",
      date: "2024-05-20",
      preview: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Como fazer networking",
      type: "video",
      date: "2024-05-18",
      preview: "/placeholder.svg"
    },
    {
      id: 3,
      title: "5 estratégias de marketing",
      type: "legenda",
      date: "2024-05-15",
      preview: "/placeholder.svg"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "carrossel":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "legenda":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meu Dashboard</h1>
          <Link to="/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Criar Conteúdo
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conteúdos Criados
              </CardTitle>
              <CardDescription className="text-2xl font-bold">12</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Plano Atual
              </CardTitle>
              <CardDescription className="text-2xl font-bold">Gratuito</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to="/pricing">
                <Button variant="outline" size="sm">Fazer Upgrade</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Restantes este mês
              </CardTitle>
              <CardDescription className="text-2xl font-bold">1/2</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <h2 className="text-xl font-bold mb-4">Conteúdos Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentContents.map((content) => (
            <Link to={`/content/${content.id}`} key={content.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full bg-gray-100">
                  <img 
                    src={content.preview} 
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{content.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        {getTypeIcon(content.type)}
                        <span className="ml-1 capitalize">{content.type}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {content.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          
          <Link to="/create">
            <Card className="flex flex-col items-center justify-center h-full min-h-[200px] border-dashed hover:bg-gray-50 transition-colors">
              <CardContent className="flex flex-col items-center justify-center text-center p-6">
                <div className="rounded-full bg-purple-100 p-3 mb-3">
                  <Plus className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-1">Criar Novo Conteúdo</h3>
                <p className="text-sm text-gray-500">Gerar carrossel, vídeo ou legenda</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
