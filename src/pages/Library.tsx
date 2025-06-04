import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, Search, Filter, Grid3X3, List, Image, 
  Video, FileText, Download, Trash2, Eye
} from "lucide-react";

export default function Library() {
  const mediaItems = [
    {
      id: "1",
      name: "background-gradient.jpg",
      type: "image",
      size: "2.4 MB",
      uploadedAt: "2024-05-20T10:30:00",
      url: "/placeholder.svg",
      tags: ["background", "gradient", "purple"]
    },
    {
      id: "2",
      name: "product-video.mp4",
      type: "video",
      size: "45.2 MB",
      uploadedAt: "2024-05-18T14:15:00",
      url: "/placeholder.svg",
      tags: ["product", "demo", "marketing"]
    },
    {
      id: "3",
      name: "logo-transparent.png",
      type: "image",
      size: "156 KB",
      uploadedAt: "2024-05-15T09:20:00",
      url: "/placeholder.svg",
      tags: ["logo", "brand", "transparent"]
    },
    {
      id: "4",
      name: "social-media-template.psd",
      type: "template",
      size: "8.7 MB",
      uploadedAt: "2024-05-12T16:45:00",
      url: "/placeholder.svg",
      tags: ["template", "social", "design"]
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-8 w-8 text-blue-500" />;
      case "video":
        return <Video className="h-8 w-8 text-red-500" />;
      case "template":
        return <FileText className="h-8 w-8 text-green-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "image":
        return "Imagem";
      case "video":
        return "Vídeo";
      case "template":
        return "Template";
      default:
        return "Arquivo";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Biblioteca de Mídia</h1>
            <p className="text-gray-600">Gerencie suas imagens, vídeos e templates.</p>
          </div>
          
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Fazer Upload
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Buscar arquivos..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <div className="flex border rounded-md">
            <Button variant="ghost" size="sm">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Upload Area */}
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Arraste e solte seus arquivos aqui</h3>
                <p className="text-gray-500 mb-4">ou clique para selecionar arquivos</p>
                <Button>
                  Selecionar Arquivos
                </Button>
                <p className="text-xs text-gray-400 mt-2">
                  Suporte para JPG, PNG, GIF, MP4, MOV (até 100MB)
                </p>
              </CardContent>
            </Card>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {item.type === "image" ? (
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getFileIcon(item.type)
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm truncate mb-1">{item.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {getTypeName(item.type)}
                      </Badge>
                      <span className="text-xs text-gray-500">{item.size}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Storage Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Uso do Armazenamento</CardTitle>
                <CardDescription>
                  Você está usando 2.4 GB de 10 GB disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Imagens</span>
                    <span>1.2 GB</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Vídeos</span>
                    <span>1.1 GB</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Templates</span>
                    <span>100 MB</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "5%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs would filter the mediaItems array accordingly */}
          <TabsContent value="images">
            <div className="text-center py-12">
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Suas imagens aparecerão aqui</h3>
              <p className="text-gray-500">Faça upload de imagens para começar</p>
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="text-center py-12">
              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Seus vídeos aparecerão aqui</h3>
              <p className="text-gray-500">Faça upload de vídeos para começar</p>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Seus templates aparecerão aqui</h3>
              <p className="text-gray-500">Faça upload de templates para começar</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
