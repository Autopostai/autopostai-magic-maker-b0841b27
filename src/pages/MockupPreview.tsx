
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit3, Download } from "lucide-react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function MockupPreview() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const contentType = searchParams.get('type') || 'post';
  const platforms = searchParams.get('platforms')?.split(',') || [];

  // Dados simulados do mockup
  const mockupData = {
    id: id,
    title: "Template Motivacional",
    category: "Desenvolvimento Pessoal",
    description: "Um design inspirador para posts motivacionais com tipografia moderna e cores vibrantes."
  };

  const handleEdit = () => {
    navigate(`/mockup/editor/${id}?type=${contentType}&platforms=${platforms.join(',')}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/mockup/gallery">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar à Galeria
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Preview do Template</h1>
            <p className="text-gray-600">{mockupData.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Visualização em Tela Cheia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white rounded-lg mb-4 mx-auto flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold text-purple-600">
                        {mockupData.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Preview do Template
                    </h3>
                    <p className="text-gray-600">
                      Este é um exemplo de como seu conteúdo aparecerá
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Nome</h4>
                  <p className="text-gray-600">{mockupData.title}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Categoria</h4>
                  <p className="text-gray-600">{mockupData.category}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Descrição</h4>
                  <p className="text-gray-600 text-sm">{mockupData.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Plataformas</h4>
                  <p className="text-gray-600">{platforms.join(', ')}</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleEdit}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Editar Template
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar como Imagem
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
