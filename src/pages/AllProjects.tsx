
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Eye, Copy, Edit3, Trash2, Calendar, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export default function AllProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Simulated projects data
  const projects = [
    {
      id: "1",
      name: "Post Motivacional - Maio",
      type: "post",
      createdAt: "2024-05-20T10:30:00",
      lastModified: "2024-05-21T14:15:00",
      thumbnail: "/placeholder.svg",
      tags: ["motivação", "maio", "inspiração"]
    },
    {
      id: "2",
      name: "Carrossel Educativo - Dicas",
      type: "carousel",
      createdAt: "2024-05-18T09:20:00",
      lastModified: "2024-05-19T16:45:00",
      thumbnail: "/placeholder.svg",
      tags: ["educação", "dicas", "carrossel"]
    },
    {
      id: "3",
      name: "Reels Produto - Demo",
      type: "video",
      createdAt: "2024-05-15T11:10:00",
      lastModified: "2024-05-16T13:30:00",
      thumbnail: "/placeholder.svg",
      tags: ["produto", "demo", "reels"]
    },
    {
      id: "4",
      name: "Thumbnail YouTube - Tutorial",
      type: "thumbnail",
      createdAt: "2024-05-12T15:45:00",
      lastModified: "2024-05-13T08:20:00",
      thumbnail: "/placeholder.svg",
      tags: ["youtube", "tutorial", "thumbnail"]
    },
    {
      id: "5",
      name: "Anúncio Facebook - Campanha",
      type: "ads",
      createdAt: "2024-05-10T12:30:00",
      lastModified: "2024-05-11T17:15:00",
      thumbnail: "/placeholder.svg",
      tags: ["facebook", "anúncio", "campanha"]
    },
    {
      id: "6",
      name: "Post Stories - Promoção",
      type: "post",
      createdAt: "2024-05-08T14:20:00",
      lastModified: "2024-05-09T10:45:00",
      thumbnail: "/placeholder.svg",
      tags: ["stories", "promoção", "oferta"]
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      post: "bg-blue-100 text-blue-800",
      carousel: "bg-green-100 text-green-800",
      video: "bg-red-100 text-red-800",
      thumbnail: "bg-yellow-100 text-yellow-800",
      ads: "bg-purple-100 text-purple-800"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTypeName = (type: string) => {
    const names = {
      post: "Post",
      carousel: "Carrossel",
      video: "Vídeo",
      thumbnail: "Thumbnail",
      ads: "Anúncio"
    };
    return names[type as keyof typeof names] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || project.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDuplicate = (projectId: string) => {
    console.log("Duplicating project:", projectId);
    // Logic to duplicate project
  };

  const handleDelete = (projectId: string) => {
    console.log("Deleting project:", projectId);
    // Logic to delete project
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/library">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar à Biblioteca
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Todos os Projetos</h1>
            <p className="text-gray-600">
              {filteredProjects.length} projetos encontrados
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar projetos por nome ou tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Todos os tipos</option>
              <option value="post">Posts</option>
              <option value="carousel">Carrosseis</option>
              <option value="video">Vídeos</option>
              <option value="thumbnail">Thumbnails</option>
              <option value="ads">Anúncios</option>
            </select>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <div className="text-center text-gray-500">
                    <div className="w-12 h-12 bg-white rounded-lg mb-2 mx-auto flex items-center justify-center shadow-sm">
                      <span className="text-xl font-bold text-purple-600">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-xs">Preview</p>
                  </div>
                  <Badge className={`absolute top-2 right-2 text-xs ${getTypeColor(project.type)}`}>
                    {getTypeName(project.type)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <CardTitle className="text-base mb-2 line-clamp-1">{project.name}</CardTitle>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    Criado: {formatDate(project.createdAt)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Modificado: {formatDate(project.lastModified)}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDuplicate(project.id)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar seus termos de busca ou filtros.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredProjects.length > 0 && (
          <div className="text-center pt-6">
            <Button variant="outline">
              Carregar mais projetos
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
