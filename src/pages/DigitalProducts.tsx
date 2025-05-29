
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, TrendingUp, Users, Code, Palette, DollarSign, BookOpen, Play, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

const niches = [
  {
    id: "marketing",
    title: "Marketing Digital",
    description: "Estratégias de marketing online e automação",
    demand: "high",
    competition: "high",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600",
    products: [
      { type: "eBook", title: "eBook sobre SEO" },
      { type: "Curso", title: "Curso de Tráfego Pago" }
    ]
  },
  {
    id: "personal-development",
    title: "Desenvolvimento Pessoal",
    description: "Autoajuda, produtividade e crescimento pessoal",
    demand: "high",
    competition: "medium",
    icon: Brain,
    color: "bg-blue-100 text-blue-600",
    products: [
      { type: "eBook", title: "eBook de Produtividade" },
      { type: "Curso", title: "Curso de Mindset" }
    ]
  },
  {
    id: "fitness",
    title: "Fitness e Nutrição",
    description: "Saúde, exercícios e alimentação saudável",
    demand: "high",
    competition: "medium",
    icon: Users,
    color: "bg-green-100 text-green-600",
    products: [
      { type: "eBook", title: "eBook de Receitas Fit" },
      { type: "Curso", title: "Curso de Treino em Casa" }
    ]
  },
  {
    id: "finance",
    title: "Finanças Pessoais",
    description: "Educação financeira e investimentos",
    demand: "medium",
    competition: "medium",
    icon: DollarSign,
    color: "bg-yellow-100 text-yellow-600",
    products: [
      { type: "eBook", title: "eBook sobre Investimentos" },
      { type: "Curso", title: "Curso de Planejamento Financeiro" }
    ]
  },
  {
    id: "technology",
    title: "Tecnologia e Programação",
    description: "Desenvolvimento de software e tecnologia",
    demand: "high",
    competition: "high",
    icon: Code,
    color: "bg-indigo-100 text-indigo-600",
    products: [
      { type: "eBook", title: "eBook de JavaScript" },
      { type: "Curso", title: "Curso de React" }
    ]
  },
  {
    id: "design",
    title: "Design e Criatividade",
    description: "Design gráfico, UX/UI e criatividade",
    demand: "medium",
    competition: "medium",
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
    products: [
      { type: "eBook", title: "eBook de Design Principles" },
      { type: "Curso", title: "Curso de Photoshop" }
    ]
  }
];

const getDemandColor = (demand: string) => {
  switch (demand) {
    case "high": return "bg-green-100 text-green-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getCompetitionColor = (competition: string) => {
  switch (competition) {
    case "high": return "bg-red-100 text-red-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function DigitalProducts() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);

  const handleCreateProduct = (nicheId: string, productType: string) => {
    // Aqui você pode implementar a lógica para criar o produto
    console.log(`Criando ${productType} para o nicho ${nicheId}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Criação de Produtos Digitais</h1>
            <p className="text-gray-600 mt-2">
              Automatiza criação de eBooks, cursos e landing pages com sugestões baseadas no nicho
            </p>
          </div>
        </div>

        {/* Intro Card */}
        <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Crie Produtos Digitais com IA
                </h3>
                <p className="text-gray-600">
                  Escolha seu nicho e deixe a IA criar eBooks, cursos e landing pages personalizados para seu público.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nichos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map((niche) => {
            const IconComponent = niche.icon;
            return (
              <Card 
                key={niche.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-200"
                onClick={() => setSelectedNiche(niche.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${niche.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{niche.title}</CardTitle>
                  <CardDescription>{niche.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Badge className={getDemandColor(niche.demand)}>
                      Demanda: {niche.demand}
                    </Badge>
                    <Badge className={getCompetitionColor(niche.competition)}>
                      Concorrência: {niche.competition}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Produtos Sugeridos:</h4>
                    {niche.products.map((product, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        {product.type === "eBook" ? (
                          <FileText className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Play className="h-4 w-4 text-green-500" />
                        )}
                        {product.title}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNiche(niche.id);
                    }}
                  >
                    Criar Produtos
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Modal/Overlay para produtos selecionados */}
        {selectedNiche && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {niches.find(n => n.id === selectedNiche)?.title}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedNiche(null)}
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {niches.find(n => n.id === selectedNiche)?.products.map((product, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {product.type === "eBook" ? (
                              <FileText className="h-5 w-5 text-blue-500" />
                            ) : (
                              <Play className="h-5 w-5 text-green-500" />
                            )}
                            <div>
                              <h3 className="font-medium">{product.title}</h3>
                              <p className="text-sm text-gray-500">
                                {product.type === "eBook" ? "E-book digital" : "Curso online"}
                              </p>
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleCreateProduct(selectedNiche, product.type)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Criar com IA
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">O que será criado:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Estrutura completa do conteúdo</li>
                    <li>• Design profissional automatizado</li>
                    <li>• Landing page otimizada</li>
                    <li>• Materiais de marketing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
