
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  MessageCircle, Mail, Phone, Clock, Search,
  HelpCircle, BookOpen, Video, Users
} from "lucide-react";

export default function Support() {
  const faqs = [
    {
      question: "Como posso criar meu primeiro conteúdo?",
      answer: "Para criar seu primeiro conteúdo, vá para a seção 'Criar Conteúdo', escolha o tipo de post que deseja criar (Post, Carrossel, Vídeo ou Roteiro), e siga as instruções da IA. Você pode personalizar o tom de voz, público-alvo e tema do seu conteúdo."
    },
    {
      question: "Posso agendar meus posts para diferentes redes sociais?",
      answer: "Sim! O AutoPostAI permite que você agende seus posts para Instagram, Facebook, LinkedIn e outras plataformas. Basta ir para a seção 'Agendamentos' e definir data e horário para cada publicação."
    },
    {
      question: "Como funciona a geração de conteúdo com IA?",
      answer: "Nossa IA utiliza tecnologia avançada para gerar conteúdo personalizado baseado nas suas especificações. Você fornece o tema, tom de voz e público-alvo, e a IA cria textos, sugestões de imagens e até roteiros para vídeos automaticamente."
    },
    {
      question: "Quantos conteúdos posso criar por mês?",
      answer: "Isso depende do seu plano. O plano gratuito permite 3 gerações por mês, o Creator permite 30 gerações, e o Pro oferece gerações ilimitadas. Você pode verificar seu uso atual no dashboard."
    },
    {
      question: "Posso editar os conteúdos gerados pela IA?",
      answer: "Claro! Todos os conteúdos gerados podem ser editados usando nosso editor visual. Você pode alterar textos, trocar imagens, ajustar cores e muito mais antes de publicar ou agendar."
    }
  ];

  const quickActions = [
    {
      title: "Chat ao Vivo",
      description: "Fale conosco em tempo real",
      icon: MessageCircle,
      available: true,
      action: "Iniciar Chat"
    },
    {
      title: "Email de Suporte",
      description: "Envie sua dúvida por email",
      icon: Mail,
      available: true,
      action: "Enviar Email"
    },
    {
      title: "Ligação",
      description: "Suporte por telefone",
      icon: Phone,
      available: false,
      action: "Indisponível"
    },
    {
      title: "Tutoriais",
      description: "Aprenda com nossos vídeos",
      icon: Video,
      available: true,
      action: "Ver Tutoriais"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Central de Suporte</h1>
          <p className="text-gray-600">Estamos aqui para ajudar você a usar o AutoPostAI da melhor forma.</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Busque por ajuda, tutoriais ou perguntas frequentes..." 
                className="pl-12 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Card key={action.title} className={`${!action.available ? 'opacity-50' : 'hover:shadow-md'} transition-shadow`}>
              <CardContent className="p-6 text-center">
                <action.icon className={`h-12 w-12 mx-auto mb-4 ${
                  action.available ? 'text-purple-600' : 'text-gray-400'
                }`} />
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                <Button 
                  variant={action.available ? "default" : "secondary"} 
                  disabled={!action.available}
                  className="w-full"
                >
                  {action.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Perguntas Frequentes
                </CardTitle>
                <CardDescription>
                  Encontre respostas para as dúvidas mais comuns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Enviar Mensagem
                </CardTitle>
                <CardDescription>
                  Não encontrou sua resposta? Envie sua dúvida
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Qual é sua dúvida?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Descreva sua dúvida em detalhes..."
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Segunda a Sexta</span>
                  <span className="text-green-600">9h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span className="text-green-600">9h às 14h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span className="text-red-600">Fechado</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Sistema Online</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Todos os serviços funcionando normalmente
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recursos Úteis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Tutoriais em Vídeo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guia de Usuário
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Comunidade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
