
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, Copy, Share, Edit, ChevronLeft, ChevronRight, 
  Image, FileText, MessageSquare, Film, Video, Play, 
  Check 
} from "lucide-react";
import { toast } from "sonner";

export default function ViewContent() {
  const { id } = useParams<{ id: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Mock data de conteúdo gerado - será substituído por dados reais do backend
  const contentData = {
    id: Number(id) || 1,
    title: "5 Dicas de Produtividade para Empreendedores",
    type: "carrossel", // carrossel, video, legenda, reels
    createdAt: "2024-05-20",
    slides: [
      {
        title: "5 Dicas de Produtividade para Empreendedores",
        content: "Aprenda a otimizar seu tempo e melhorar seus resultados com estas estratégias comprovadas.",
        image: "/placeholder.svg"
      },
      {
        title: "1. Método Pomodoro",
        content: "Trabalhe em blocos de 25 minutos com pausas de 5 minutos para manter o foco e evitar o cansaço mental.",
        image: "/placeholder.svg"
      },
      {
        title: "2. Planeje seu dia com antecedência",
        content: "Reserve 15 minutos no fim do dia para planejar as tarefas prioritárias do dia seguinte.",
        image: "/placeholder.svg"
      },
      {
        title: "3. Elimine distrações",
        content: "Desative notificações e use apps de bloqueio durante períodos de concentração intensa.",
        image: "/placeholder.svg"
      },
      {
        title: "4. Delegue tarefas",
        content: "Identifique o que só você pode fazer e delegue o restante para maximizar seu tempo em atividades estratégicas.",
        image: "/placeholder.svg"
      },
      {
        title: "5. Cuide da sua energia",
        content: "Mantenha hábitos saudáveis de sono, alimentação e exercício para sustentar sua produtividade a longo prazo.",
        image: "/placeholder.svg"
      }
    ],
    caption: "🚀 PRODUTIVIDADE PARA EMPREENDEDORES\n\nVocê sabia que empreendedores perdem em média 21.8 horas por semana em distrações?\n\nAplique estas 5 estratégias comprovadas para maximizar sua produtividade e alcançar resultados extraordinários:\n\n✅ Método Pomodoro\n✅ Planejamento antecipado\n✅ Eliminar distrações\n✅ Delegar estrategicamente\n✅ Gerenciar energia pessoal\n\nQual dessas estratégias você já usa? Conte nos comentários! 👇\n\n#ProdutividadeEmpreendedor #GestãoDeTempo #Empreendedorismo #DicasDeNegócios #Sucesso",
    hashtags: ["ProdutividadeEmpreendedor", "GestãoDeTempo", "Empreendedorismo", "DicasDeNegócios", "Sucesso"],
    script: "**ROTEIRO: 5 DICAS PARA EMPREENDEDORES**\n\n**GANCHO INICIAL:**\nVocê sabia que empreendedores perdem em média 21.8 horas por semana com distrações? Isso é quase 3 dias de trabalho! Neste vídeo, vou compartilhar 5 estratégias que implementei no meu negócio e triplicaram minha produtividade.\n\n**DICA 1 - MÉTODO POMODORO:**\nTrabalhe em blocos de 25 minutos com foco total, seguidos de 5 minutos de pausa. A ciência comprova que este método reduz a fadiga mental e aumenta a concentração. Baixe um timer no seu celular e comece agora mesmo.\n\n**DICA 2 - PLANEJE COM ANTECEDÊNCIA:**\nReserve 15 minutos no final de cada dia para planejar o dia seguinte. Identifique as 3 tarefas mais importantes e comece o dia por elas, antes de abrir emails ou redes sociais.\n\n**DICA 3 - ELIMINE DISTRAÇÕES:**\nDesative todas as notificações durante períodos de trabalho focado. Use aplicativos como o Freedom ou o Cold Turkey para bloquear sites que te distraem. Sua mente agradece!\n\n**DICA 4 - DELEGUE ESTRATEGICAMENTE:**\nIdentifique tarefas que apenas você pode realizar e delegue o resto. Lembre-se: delegar não é perder controle, é multiplicar resultados. Comece terceirizando tarefas operacionais simples.\n\n**DICA 5 - GERENCIE SUA ENERGIA:**\nProdutividade não é sobre tempo, é sobre energia. Mantenha hábitos saudáveis de sono, alimentação e exercício. Identifique seu horário de pico de energia e programe tarefas complexas para este período.\n\n**FECHAMENTO E CTA:**\nQual dessas estratégias você vai implementar primeiro? Deixe nos comentários! Se esse conteúdo foi útil, deixe seu like e inscreva-se no canal para mais dicas práticas para empreendedores. Até o próximo vídeo!"
  };
  
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === contentData.slides.length - 1 ? prev : prev + 1));
  };
  
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  };
  
  const handleCopyCaption = () => {
    navigator.clipboard.writeText(contentData.caption);
    toast({
      title: "Copiado!",
      description: "Legenda copiada para a área de transferência."
    });
  };
  
  const handleCopyScript = () => {
    if (contentData.script) {
      navigator.clipboard.writeText(contentData.script);
      toast({
        title: "Copiado!",
        description: "Roteiro copiado para a área de transferência."
      });
    }
  };
  
  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: "Seu conteúdo está sendo preparado para download."
    });
  };
  
  // Renderiza conteúdo com base no tipo
  const renderContentPreview = () => {
    if (contentData.type === "video") {
      return (
        <div className="p-6 bg-white rounded-md">
          <h2 className="text-xl font-bold mb-4">{contentData.title}</h2>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[600px]">
            <div className="whitespace-pre-line">{contentData.script}</div>
          </div>
        </div>
      );
    } else if (contentData.type === "legenda") {
      return (
        <div className="p-6 bg-white rounded-md">
          <h2 className="text-xl font-bold mb-4">{contentData.title}</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="whitespace-pre-line">{contentData.caption}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {contentData.hashtags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (contentData.type === "reels") {
      return (
        <div className="relative aspect-[9/16] bg-black rounded-md overflow-hidden flex items-center justify-center">
          <div className="text-white text-center">
            <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Preview do Reels</p>
            <Button variant="outline" className="mt-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Play className="h-4 w-4 mr-2" />
              Reproduzir
            </Button>
          </div>
        </div>
      );
    } else {
      // Carrossel (padrão)
      return (
        <div className="relative aspect-[4/5] bg-white">
          <img 
            src={contentData.slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-contain p-4"
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-white p-4">
            <h2 className="font-bold text-lg mb-2">
              {contentData.slides[currentSlide].title}
            </h2>
            <p className="text-gray-700">
              {contentData.slides[currentSlide].content}
            </p>
          </div>
          
          {/* Navegação de Slides */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/80 shadow-md ml-2"
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/80 shadow-md mr-2"
              onClick={handleNextSlide}
              disabled={currentSlide === contentData.slides.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Pontinhos de navegação */}
          <div className="absolute bottom-16 inset-x-0 flex justify-center gap-1">
            {contentData.slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Visualizador de Conteúdo */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <Link to="/dashboard" className="text-sm text-blue-600 hover:underline flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" /> Voltar ao Dashboard
              </Link>
              <div className="text-sm text-gray-500">
                {contentData.type === "carrossel" && (
                  <span>Slide {currentSlide + 1} de {contentData.slides.length}</span>
                )}
              </div>
            </div>
            
            <Card className="overflow-hidden bg-white">
              {renderContentPreview()}
              
              <div className="p-4 border-t flex flex-wrap gap-2">
                <Button onClick={handleDownload} className="flex-1">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Link to={`/create`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Informações do Conteúdo */}
          <div className="lg:w-1/3">
            <div className="sticky top-4">
              <h1 className="text-2xl font-bold mb-4">{contentData.title}</h1>
              
              <Tabs defaultValue="caption">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="caption" className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> Legenda
                  </TabsTrigger>
                  <TabsTrigger value="hashtags" className="flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Hashtags
                  </TabsTrigger>
                  <TabsTrigger value="details" className="flex items-center gap-1">
                    <Image className="h-3 w-3" /> Detalhes
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="caption" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm min-h-[300px] mb-4">
                        {contentData.caption}
                      </div>
                      <Button onClick={handleCopyCaption} className="w-full">
                        <Copy className="mr-2 h-4 w-4" /> Copiar Legenda
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="hashtags" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {contentData.hashtags.map((tag, index) => (
                            <div key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                              #{tag}
                            </div>
                          ))}
                        </div>
                        <Button onClick={() => {
                          navigator.clipboard.writeText(contentData.hashtags.map(tag => `#${tag}`).join(' '));
                          toast.success("Hashtags copiadas para a área de transferência");
                        }} variant="outline" className="w-full mt-4">
                          <Copy className="mr-2 h-4 w-4" /> Copiar Hashtags
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="details" className="mt-4">
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tipo de Conteúdo</p>
                        <p className="font-medium capitalize">{contentData.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Data de Criação</p>
                        <p className="font-medium">{contentData.createdAt}</p>
                      </div>
                      {contentData.type === "carrossel" && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Número de Slides</p>
                          <p className="font-medium">{contentData.slides.length}</p>
                        </div>
                      )}
                      {(contentData.type === "video" || contentData.type === "reels") && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Duração</p>
                          <p className="font-medium">00:45</p>
                        </div>
                      )}
                      <div className="pt-4">
                        <Link to="/create">
                          <Button variant="outline" className="w-full">
                            <Edit className="mr-2 h-4 w-4" /> Editar Metadados
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              {contentData.type === "video" && (
                <div className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium text-lg mb-2">Roteiro</h3>
                      <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm max-h-[200px] overflow-y-auto mb-4 text-gray-700">
                        {contentData.script?.substring(0, 200)}...
                      </div>
                      <Button onClick={handleCopyScript} className="w-full">
                        <Copy className="mr-2 h-4 w-4" /> Copiar Roteiro Completo
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-md">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Conteúdo pronto para usar</h3>
                    <p className="text-sm text-green-700 mt-0.5">
                      Este conteúdo está otimizado para engajamento nas redes sociais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
