
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Layout, Film, MessageSquare, Plus, Search, Filter, Calendar, Clock,
  Copy, Download, Share2, Edit, Trash, Image, Instagram, Facebook, TikTok
} from "lucide-react";
import { toast } from "sonner";

type ContentItem = {
  id: string;
  title: string;
  type: "post" | "carousel" | "video" | "script";
  createdAt: string;
  thumbnail: string;
  status: "draft" | "published" | "scheduled";
  platform?: "instagram" | "facebook" | "tiktok" | "all";
  stats?: {
    likes?: number;
    comments?: number;
    shares?: number;
    views?: number;
  };
  scheduledDate?: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Dados simulados
  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "5 Dicas para Melhorar sua Saúde Mental",
      type: "carousel",
      createdAt: "2024-05-15T14:30:00",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      status: "published",
      platform: "instagram",
      stats: {
        likes: 247,
        comments: 32,
        shares: 18
      }
    },
    {
      id: "2",
      title: "Como fazer um bolo de chocolate perfeito",
      type: "video",
      createdAt: "2024-05-18T10:15:00",
      thumbnail: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      status: "published",
      platform: "tiktok",
      stats: {
        views: 1240,
        likes: 356,
        comments: 45,
        shares: 28
      }
    },
    {
      id: "3",
      title: "10 Exercícios para fazer em casa",
      type: "carousel",
      createdAt: "2024-05-20T08:45:00",
      thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      status: "draft"
    },
    {
      id: "4",
      title: "Dicas para escalar seu negócio em 2024",
      type: "post",
      createdAt: "2024-05-21T16:20:00",
      thumbnail: "https://images.unsplash.com/photo-1553484771-047a44eee27c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      status: "scheduled",
      platform: "facebook",
      scheduledDate: "2024-05-25T09:00:00"
    },
    {
      id: "5",
      title: "Como fazer uma pesquisa de mercado efetiva",
      type: "script",
      createdAt: "2024-05-19T11:30:00",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      status: "draft"
    }
  ];

  const filteredContent = contentItems.filter(item => {
    // Filtro por tipo de conteúdo (tab)
    if (activeTab !== "all" && item.type !== activeTab) {
      return false;
    }
    
    // Filtro por busca
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleDelete = (id: string) => {
    toast("Conteúdo excluído", {
      description: "O item foi excluído com sucesso."
    });
  };

  const handleDuplicate = (id: string) => {
    toast("Conteúdo duplicado", {
      description: "Uma cópia foi criada e adicionada aos seus rascunhos."
    });
  };

  const getStatusBadgeColor = (status: ContentItem["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-200 text-gray-800";
      case "published":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-200";
    }
  };
  
  const getStatusText = (status: ContentItem["status"]) => {
    switch (status) {
      case "draft":
        return "Rascunho";
      case "published":
        return "Publicado";
      case "scheduled":
        return "Agendado";
      default:
        return status;
    }
  };

  const getPlatformIcon = (platform?: ContentItem["platform"]) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-600" />;
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case "tiktok":
        return <TikTok className="h-4 w-4" />;
      case "all":
        return <Share2 className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "post":
        return <Image className="h-5 w-5 text-orange-500" />;
      case "carousel":
        return <Layout className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Film className="h-5 w-5 text-red-500" />;
      case "script":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Meus Conteúdos</h1>
            <p className="text-gray-600">Gerencie todos os seus conteúdos em um só lugar</p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            <Button asChild variant="outline">
              <Link to="/create">
                <Plus className="h-4 w-4 mr-2" />
                Novo Conteúdo
              </Link>
            </Button>
            
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar em Lote
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Buscar por título, tipo, status..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="p-4 border-b">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="post">Posts</TabsTrigger>
                <TabsTrigger value="carousel">Carrosséis</TabsTrigger>
                <TabsTrigger value="video">Vídeos</TabsTrigger>
                <TabsTrigger value="script">Roteiros</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="p-4">
                {filteredContent.length > 0 ? (
                  <div className="space-y-4">
                    {filteredContent.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-32 bg-gray-200 relative overflow-hidden">
                            <img 
                              src={item.thumbnail} 
                              alt={item.title}
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute top-2 left-2">
                              <div className="bg-black/50 text-white p-1 rounded">
                                {getTypeIcon(item.type)}
                              </div>
                            </div>
                            {item.platform && (
                              <div className="absolute top-2 right-2">
                                <div className="bg-white rounded-full p-1">
                                  {getPlatformIcon(item.platform)}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-grow p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium truncate">{item.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeColor(item.status)}`}>
                                    {getStatusText(item.status)}
                                  </span>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                    {new Date(item.createdAt).toLocaleDateString()}
                                  </div>
                                  {item.scheduledDate && (
                                    <>
                                      <span>•</span>
                                      <div className="flex items-center">
                                        <Calendar className="h-3.5 w-3.5 mr-1" />
                                        {new Date(item.scheduledDate).toLocaleDateString()}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Link to={`/content/${item.id}`}>
                                    <Edit className="h-4 w-4 text-gray-500" />
                                  </Link>
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleDuplicate(item.id)}>
                                  <Copy className="h-4 w-4 text-gray-500" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleDelete(item.id)}>
                                  <Trash className="h-4 w-4 text-gray-500" />
                                </Button>
                              </div>
                            </div>
                            
                            {item.stats && (
                              <div className="mt-3 flex gap-x-4 text-sm">
                                {item.stats.views !== undefined && (
                                  <div className="flex items-center gap-1 text-gray-500">
                                    <span className="font-medium">{item.stats.views.toLocaleString()}</span>
                                    <span>visualizações</span>
                                  </div>
                                )}
                                {item.stats.likes !== undefined && (
                                  <div className="flex items-center gap-1 text-gray-500">
                                    <span className="font-medium">{item.stats.likes.toLocaleString()}</span>
                                    <span>likes</span>
                                  </div>
                                )}
                                {item.stats.comments !== undefined && (
                                  <div className="flex items-center gap-1 text-gray-500">
                                    <span className="font-medium">{item.stats.comments.toLocaleString()}</span>
                                    <span>comentários</span>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link to={`/content/${item.id}`}>
                                  Ver / Editar
                                </Link>
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Download className="h-4 w-4 mr-1" />
                                Exportar
                              </Button>
                              {item.status !== "published" && (
                                <Button size="sm" variant="ghost">
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Publicar
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum conteúdo encontrado.</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Novo Conteúdo
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="post" className="m-0">
              {/* Conteúdo filtrado será mostrado automaticamente com base na activeTab */}
              <div className="p-4">
                {filteredContent.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum post encontrado.</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Novo Post
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="carousel" className="m-0">
              {/* Conteúdo filtrado será mostrado automaticamente */}
              <div className="p-4">
                {filteredContent.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum carrossel encontrado.</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Novo Carrossel
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="video" className="m-0">
              {/* Conteúdo filtrado será mostrado automaticamente */}
              <div className="p-4">
                {filteredContent.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum vídeo encontrado.</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Novo Vídeo
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="script" className="m-0">
              {/* Conteúdo filtrado será mostrado automaticamente */}
              <div className="p-4">
                {filteredContent.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum roteiro encontrado.</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Novo Roteiro
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Usage Stats Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Estatísticas de Uso</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600">27/30</div>
                <div className="text-sm text-gray-500">Gerações utilizadas este mês</div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600">18</div>
                <div className="text-sm text-gray-500">Conteúdos publicados</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-500">Dias restantes do período</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Você está no plano <strong>Creator</strong>. Renova em 30/05/2024.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/pricing">
                Fazer upgrade
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
