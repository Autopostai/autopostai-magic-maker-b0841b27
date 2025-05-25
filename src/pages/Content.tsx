
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
  Image, FileText, Video, MessageSquare, Calendar
} from "lucide-react";

export default function Content() {
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get('type') || 'all';

  const contents = [
    {
      id: "1",
      title: "5 Dicas para Melhorar sua Saúde Mental",
      type: "carousel",
      status: "published",
      createdAt: "2024-05-15T14:30:00",
      views: 1247,
      likes: 89,
      comments: 12
    },
    {
      id: "2",
      title: "Como fazer um bolo de chocolate perfeito",
      type: "video",
      status: "published",
      createdAt: "2024-05-18T10:15:00",
      views: 2156,
      likes: 156,
      comments: 34
    },
    {
      id: "3",
      title: "10 Exercícios para fazer em casa",
      type: "post",
      status: "draft",
      createdAt: "2024-05-20T08:45:00",
      views: 0,
      likes: 0,
      comments: 0
    },
    {
      id: "4",
      title: "Roteiro para vídeo motivacional",
      type: "script",
      status: "published",
      createdAt: "2024-05-22T16:20:00",
      views: 834,
      likes: 67,
      comments: 8
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "post":
        return <Image className="h-4 w-4 text-orange-500" />;
      case "carousel":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "video":
        return <Video className="h-4 w-4 text-red-500" />;
      case "script":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "post":
        return "Post";
      case "carousel":
        return "Carrossel";
      case "video":
        return "Vídeo";
      case "script":
        return "Roteiro";
      default:
        return "Conteúdo";
    }
  };

  const filteredContents = contentType === 'all' 
    ? contents 
    : contents.filter(content => content.type === contentType);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Meus Conteúdos</h1>
            <p className="text-gray-600">Gerencie todos os seus conteúdos criados.</p>
          </div>
          
          <Button asChild>
            <Link to="/create">
              <Plus className="h-4 w-4 mr-2" />
              Criar Conteúdo
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Buscar conteúdos..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs value={contentType} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all" asChild>
              <Link to="/content">Todos</Link>
            </TabsTrigger>
            <TabsTrigger value="post" asChild>
              <Link to="/content?type=post">Posts</Link>
            </TabsTrigger>
            <TabsTrigger value="carousel" asChild>
              <Link to="/content?type=carousel">Carrosséis</Link>
            </TabsTrigger>
            <TabsTrigger value="video" asChild>
              <Link to="/content?type=video">Vídeos</Link>
            </TabsTrigger>
            <TabsTrigger value="script" asChild>
              <Link to="/content?type=script">Roteiros</Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={contentType} className="space-y-4">
            {filteredContents.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Nenhum conteúdo encontrado</h3>
                    <p className="text-gray-500 mb-4">
                      {contentType === 'all' 
                        ? 'Você ainda não criou nenhum conteúdo.' 
                        : `Você ainda não criou nenhum ${getTypeName(contentType).toLowerCase()}.`
                      }
                    </p>
                    <Button asChild>
                      <Link to="/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Primeiro Conteúdo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredContents.map((content) => (
                  <Card key={content.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          {getTypeIcon(content.type)}
                          <div className="flex-1">
                            <h3 className="font-medium">{content.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(content.createdAt).toLocaleDateString()}
                              </span>
                              {content.status === 'published' && (
                                <>
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {content.views} visualizações
                                  </span>
                                  <span>{content.likes} curtidas</span>
                                  <span>{content.comments} comentários</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                            {content.status === 'published' ? 'Publicado' : 'Rascunho'}
                          </Badge>
                          
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/content/${content.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
