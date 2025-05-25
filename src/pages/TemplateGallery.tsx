
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Eye, Edit } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const templates = [
  {
    id: "1",
    name: "Dicas de Produtividade",
    category: "Educativo",
    type: "carrossel",
    preview: "/placeholder.svg",
    slides: 5,
    colors: ["#6366f1", "#8b5cf6"]
  },
  {
    id: "2",
    name: "Receita Rápida",
    category: "Lifestyle",
    type: "carrossel",
    preview: "/placeholder.svg",
    slides: 3,
    colors: ["#f59e0b", "#ef4444"]
  },
  {
    id: "3",
    name: "Motivacional",
    category: "Inspiracional",
    type: "post",
    preview: "/placeholder.svg",
    slides: 1,
    colors: ["#10b981", "#06b6d4"]
  },
  {
    id: "4",
    name: "Comparação de Produtos",
    category: "Vendas",
    type: "carrossel",
    preview: "/placeholder.svg",
    slides: 4,
    colors: ["#8b5cf6", "#ec4899"]
  },
  {
    id: "5",
    name: "Tutorial Passo a Passo",
    category: "Educativo",
    type: "carrossel",
    preview: "/placeholder.svg",
    slides: 6,
    colors: ["#3b82f6", "#06b6d4"]
  },
  {
    id: "6",
    name: "Oferta Especial",
    category: "Vendas",
    type: "post",
    preview: "/placeholder.svg",
    slides: 1,
    colors: ["#ef4444", "#f59e0b"]
  }
];

const categories = ["Todos", "Educativo", "Lifestyle", "Inspiracional", "Vendas"];

export default function TemplateGallery() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const platforms = searchParams.get('platforms')?.split(',') || [];
  const contentType = searchParams.get('type') || 'carrossel';

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "Todos" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = contentType === 'carrossel' ? true : template.type === contentType;
    return matchesCategory && matchesSearch && matchesType;
  });

  const handleSelectTemplate = (templateId: string) => {
    const query = new URLSearchParams({
      platforms: platforms.join(','),
      type: contentType,
      method: 'template',
      templateId
    });
    navigate(`/create/editor?${query}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/create/method">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Galeria de Templates</h1>
            <p className="text-gray-600">Escolha um template e personalize com seu conteúdo</p>
          </div>
        </div>

        {/* Selected Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Plataformas:</span> {platforms.join(', ')} | 
            <span className="font-medium ml-2">Tipo:</span> {contentType}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Buscar templates..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                {/* Template Preview */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-br opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})`
                    }}
                  />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Usar Template
                    </Button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{template.name}</h3>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{template.slides} slide{template.slides !== 1 ? 's' : ''}</span>
                    <span className="capitalize">{template.type}</span>
                  </div>
                  
                  {/* Color Palette */}
                  <div className="flex gap-1">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Nenhum template encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou termo de busca</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
