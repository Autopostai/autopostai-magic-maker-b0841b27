
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Eye, Edit3 } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export default function MockupGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const contentType = searchParams.get('type') || 'post';
  const platforms = searchParams.get('platforms')?.split(',') || [];

  // Mockups simulados
  const mockups = [
    {
      id: 1,
      title: "Template Motivacional",
      category: "Desenvolvimento Pessoal",
      preview: "/placeholder.svg",
      tags: ["motivação", "inspiração", "crescimento"]
    },
    {
      id: 2,
      title: "Design Educativo",
      category: "Educação",
      preview: "/placeholder.svg",
      tags: ["educação", "aprendizado", "dicas"]
    },
    {
      id: 3,
      title: "Layout Empresarial",
      category: "Business",
      preview: "/placeholder.svg",
      tags: ["negócios", "corporativo", "profissional"]
    },
    {
      id: 4,
      title: "Estilo Wellness",
      category: "Saúde e Bem-estar",
      preview: "/placeholder.svg",
      tags: ["saúde", "bem-estar", "lifestyle"]
    },
    {
      id: 5,
      title: "Design Criativo",
      category: "Arte e Design",
      preview: "/placeholder.svg",
      tags: ["criativo", "arte", "design"]
    },
    {
      id: 6,
      title: "Template Tech",
      category: "Tecnologia",
      preview: "/placeholder.svg",
      tags: ["tecnologia", "inovação", "digital"]
    }
  ];

  const filteredMockups = mockups.filter(mockup =>
    mockup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mockup.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mockup.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePreview = (mockupId: number) => {
    navigate(`/mockup/preview/${mockupId}?type=${contentType}&platforms=${platforms.join(',')}`);
  };

  const handleEdit = (mockupId: number) => {
    navigate(`/mockup/editor/${mockupId}?type=${contentType}&platforms=${platforms.join(',')}`);
  };

  const getContentTypeTitle = (type: string) => {
    const titles: Record<string, string> = {
      'post': 'Post Único',
      'carrossel': 'Carrossel'
    };
    return titles[type] || type;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/create/method">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Galeria de Mockups</h1>
            <p className="text-gray-600">
              Escolha um template personalizável para {getContentTypeTitle(contentType)}
            </p>
          </div>
        </div>

        {/* Info sobre seleção */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Plataformas:</span> {platforms.join(', ')} • 
            <span className="font-medium"> Tipo:</span> {getContentTypeTitle(contentType)}
          </p>
        </div>

        {/* Busca */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por categoria, estilo ou palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Grid de Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMockups.map((mockup) => (
            <Card key={mockup.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-white rounded-lg mb-2 mx-auto flex items-center justify-center shadow-sm">
                      <span className="text-2xl font-bold text-purple-600">
                        {mockup.title.charAt(0)}
                      </span>
                    </div>
                    <p className="text-sm">Preview</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-1">{mockup.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 mb-3">
                  {mockup.category}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {mockup.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePreview(mockup.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEdit(mockup.id)}
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMockups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum mockup encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar seus termos de busca ou explore outras categorias.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
