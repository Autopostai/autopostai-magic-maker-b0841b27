import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Brain, TrendingUp, Users, Code, Palette, DollarSign, BookOpen, Play, FileText, Lightbulb, Target, Zap, CheckCircle, ArrowRight } from "lucide-react";
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
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: "personal-development",
    title: "Desenvolvimento Pessoal",
    description: "Autoajuda, produtividade e crescimento pessoal",
    demand: "high",
    competition: "medium",
    icon: Brain,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "fitness",
    title: "Fitness e Nutrição",
    description: "Saúde, exercícios e alimentação saudável",
    demand: "high",
    competition: "medium",
    icon: Users,
    color: "bg-green-100 text-green-600"
  },
  {
    id: "finance",
    title: "Finanças Pessoais",
    description: "Educação financeira e investimentos",
    demand: "medium",
    competition: "medium",
    icon: DollarSign,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    id: "technology",
    title: "Tecnologia e Programação",
    description: "Desenvolvimento de software e tecnologia",
    demand: "high",
    competition: "high",
    icon: Code,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: "design",
    title: "Design e Criatividade",
    description: "Design gráfico, UX/UI e criatividade",
    demand: "medium",
    competition: "medium",
    icon: Palette,
    color: "bg-pink-100 text-pink-600"
  }
];

const productTypes = [
  {
    id: "ebook",
    title: "eBook",
    description: "Livro digital completo com capítulos estruturados",
    icon: BookOpen,
    features: ["Estrutura de capítulos", "Design profissional", "Formato PDF", "Capa personalizada"]
  },
  {
    id: "course",
    title: "Curso Online",
    description: "Curso completo com módulos e aulas",
    icon: Play,
    features: ["Módulos estruturados", "Material de apoio", "Exercícios práticos", "Certificado"]
  },
  {
    id: "landing",
    title: "Landing Page",
    description: "Página de vendas otimizada para conversão",
    icon: FileText,
    features: ["Design responsivo", "Copy persuasiva", "Formulários", "SEO otimizado"]
  }
];

const steps = [
  {
    id: "niche",
    title: "Escolher Nicho",
    description: "Selecione o nicho do seu produto",
    icon: Target
  },
  {
    id: "product",
    title: "Tipo de Produto",
    description: "Defina o que você quer criar",
    icon: Lightbulb
  },
  {
    id: "details",
    title: "Detalhes",
    description: "Personalize seu produto",
    icon: FileText
  },
  {
    id: "generate",
    title: "Gerar",
    description: "IA cria seu produto",
    icon: Zap
  }
];

const designTemplates = [
  {
    id: "professional",
    name: "Profissional",
    description: "Design clean e corporativo",
    preview: "/placeholder.svg"
  },
  {
    id: "modern",
    name: "Moderno",
    description: "Visual contemporâneo e elegante",
    preview: "/placeholder.svg"
  },
  {
    id: "creative",
    name: "Criativo",
    description: "Design inovador e impactante",
    preview: "/placeholder.svg"
  },
  {
    id: "minimal",
    name: "Minimalista",
    description: "Simplicidade e foco no conteúdo",
    preview: "/placeholder.svg"
  }
];

export default function DigitalProducts() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedNiche, setSelectedNiche] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simular geração do produto
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(4); // Ir para o passo de seleção de design
      console.log("Produto gerado com sucesso!");
    }, 3000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedNiche !== "";
      case 1: return selectedProduct !== "";
      case 2: return productTitle !== "" && productDescription !== "";
      case 4: return selectedDesign !== "";
      default: return true;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Copiloto de Produtos Digitais</h1>
            <p className="text-gray-600 mt-2">
              Automatiza criação de eBooks, cursos e landing pages com sugestões baseadas no nicho
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-purple-100 text-purple-700' : 
                    isCompleted ? 'bg-green-100 text-green-700' : 
                    'bg-gray-100 text-gray-500'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                    <div>
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs opacity-75">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-5 w-5 mx-4 text-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <Card className="min-h-[500px]">
          <CardContent className="p-8">
            {/* Passo 1: Escolher Nicho */}
            {currentStep === 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Escolha seu Nicho</h2>
                <p className="text-gray-600 mb-6">Selecione o mercado onde você quer atuar</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {niches.map((niche) => {
                    const IconComponent = niche.icon;
                    return (
                      <Card 
                        key={niche.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedNiche === niche.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                        }`}
                        onClick={() => setSelectedNiche(niche.id)}
                      >
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${niche.color}`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{niche.title}</CardTitle>
                              <CardDescription>{niche.description}</CardDescription>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="secondary">Demanda: {niche.demand}</Badge>
                                <Badge variant="outline">Concorrência: {niche.competition}</Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Passo 2: Tipo de Produto */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Que tipo de produto você quer criar?</h2>
                <p className="text-gray-600 mb-6">Escolha o formato ideal para seu conteúdo</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {productTypes.map((product) => {
                    const IconComponent = product.icon;
                    return (
                      <Card 
                        key={product.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedProduct === product.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                        }`}
                        onClick={() => setSelectedProduct(product.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                              <p className="text-gray-600 mb-4">{product.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {product.features.map((feature, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Passo 3: Detalhes */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Detalhe seu Produto</h2>
                <p className="text-gray-600 mb-6">Forneça informações para personalizar a criação</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Título do Produto</label>
                    <Input 
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      placeholder="Ex: Guia Completo de SEO para Iniciantes"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Descrição</label>
                    <Textarea 
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      placeholder="Descreva o que seu produto vai abordar, principais tópicos e benefícios..."
                      className="w-full h-32"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Público-alvo</label>
                    <Input 
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="Ex: Empreendedores iniciantes, profissionais de marketing..."
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Passo 3: Gerar */}
            {currentStep === 3 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Pronto para Gerar!</h2>
                <p className="text-gray-600 mb-8">A IA vai criar seu produto baseado nas informações fornecidas</p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="font-bold mb-4">Resumo do seu produto:</h3>
                  <div className="text-left space-y-2">
                    <p><strong>Nicho:</strong> {niches.find(n => n.id === selectedNiche)?.title}</p>
                    <p><strong>Tipo:</strong> {productTypes.find(p => p.id === selectedProduct)?.title}</p>
                    <p><strong>Título:</strong> {productTitle}</p>
                    <p><strong>Público:</strong> {targetAudience}</p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Gerar com IA
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Passo 4: Escolher Design */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Escolha o Design</h2>
                <p className="text-gray-600 mb-6">Selecione o modelo visual para seu produto</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {designTemplates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedDesign === template.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                      }`}
                      onClick={() => setSelectedDesign(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                          <img src={template.preview} alt={template.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h3 className="font-bold text-lg">{template.name}</h3>
                        <p className="text-gray-600 text-sm">{template.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
            disabled={currentStep === 0}
          >
            Voltar
          </Button>
          
          {currentStep < 4 && (
            <Button 
              onClick={handleNextStep}
              disabled={!canProceed()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {currentStep === 3 ? 'Gerar' : 'Próximo'}
            </Button>
          )}

          {currentStep === 4 && (
            <Button 
              disabled={!canProceed()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Finalizar Produto
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
