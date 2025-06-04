
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Tutorials() {
  const faqs = [
    {
      question: "Como começar a usar a AutoPost AI?",
      answer: "Assista ao vídeo 'Comece por aqui' para ter uma visão geral completa da plataforma."
    },
    {
      question: "Como criar meu primeiro conteúdo?",
      answer: "Vá para 'Criar Conteúdo' e escolha entre usar IA ou editar um mockup pronto."
    },
    {
      question: "Posso agendar posts automaticamente?",
      answer: "Sim! Conecte suas redes sociais em Configurações e use o agendamento automático."
    },
    {
      question: "Como funciona o planejamento de conteúdo?",
      answer: "Nossa IA gera um calendário personalizado baseado no seu nicho e preferências."
    }
  ];

  const tutorials = [
    {
      title: "Comece por aqui - Visão Geral da Plataforma",
      description: "Aprenda os conceitos básicos e navegue pela AutoPost AI",
      duration: "8:30",
      views: "12.5k",
      rating: 4.9,
      priority: "high"
    },
    {
      title: "Criando seu Primeiro Post com IA",
      description: "Passo a passo para gerar conteúdo usando inteligência artificial",
      duration: "6:15",
      views: "8.2k",
      rating: 4.8,
      priority: "high"
    },
    {
      title: "Planejamento de Conteúdo Mensal",
      description: "Como criar um calendário estratégico para suas redes sociais",
      duration: "10:45",
      views: "6.7k",
      rating: 4.9,
      priority: "medium"
    },
    {
      title: "Conectando suas Redes Sociais",
      description: "Configure e conecte Instagram, TikTok, Facebook e outras plataformas",
      duration: "5:20",
      views: "9.1k",
      rating: 4.7,
      priority: "medium"
    },
    {
      title: "Usando o Editor de Imagens",
      description: "Personalize seus designs com ferramentas profissionais",
      duration: "12:30",
      views: "4.3k",
      rating: 4.6,
      priority: "low"
    },
    {
      title: "Agendamento Automático de Posts",
      description: "Configure postagens automáticas em múltiplas plataformas",
      duration: "7:55",
      views: "5.8k",
      rating: 4.8,
      priority: "low"
    }
  ];

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Comece por aqui";
      case "medium":
        return "Depois veja isso";
      default:
        return "Avançado";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-purple-100 text-purple-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Aprendendo sobre a plataforma AutoPost.ai
          </h1>
          <p className="text-gray-600">
            Domine todas as funcionalidades da AutoPost AI com nossos tutoriais completos
          </p>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tutoriais em Vídeo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-t-lg flex items-center justify-center">
                      <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(tutorial.priority)}`}>
                        {getPriorityLabel(tutorial.priority)}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {tutorial.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{tutorial.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{tutorial.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{tutorial.views} visualizações</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{tutorial.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
