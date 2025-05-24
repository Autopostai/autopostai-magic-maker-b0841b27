
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { 
  Layout, 
  MessageSquare, 
  Edit, 
  Calendar, 
  BarChart3,
  Play,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Escolha o Tipo de Conteúdo",
    description: "Posts, Carrosséis, Reels, Shorts, Roteiros",
    icon: Layout,
    color: "bg-purple-100 text-purple-600",
    details: "Selecione entre mais de 10 formatos diferentes de conteúdo otimizados para cada rede social."
  },
  {
    id: 2,
    title: "Personalize com IA",
    description: "Insira tema, objetivo, tom de voz, público-alvo",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-600",
    details: "Nossa IA gera conteúdo personalizado baseado nas suas especificações em segundos."
  },
  {
    id: 3,
    title: "Edite com Templates",
    description: "Edite textos, troque imagens ou use modelos prontos",
    icon: Edit,
    color: "bg-green-100 text-green-600",
    details: "Editor visual intuitivo com biblioteca de templates profissionais para personalizar seu conteúdo."
  },
  {
    id: 4,
    title: "Publique e Agende",
    description: "Integração com Instagram, Facebook, LinkedIn, TikTok",
    icon: Calendar,
    color: "bg-orange-100 text-orange-600",
    details: "Publique instantaneamente ou agende para o melhor horário de engajamento em múltiplas plataformas."
  },
  {
    id: 5,
    title: "Acompanhe os Resultados",
    description: "Veja engajamento, curtidas, comentários em tempo real",
    icon: BarChart3,
    color: "bg-red-100 text-red-600",
    details: "Dashboard completo com métricas de performance e insights para otimizar sua estratégia."
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="como-funciona" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Veja o AUTOPOST.AI em Ação
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Entenda como criar conteúdo incrível em poucos cliques com inteligência artificial.
          </p>
        </div>

        {/* Video Demo Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-8 text-white text-center">
              <div className="relative aspect-video bg-black/20 rounded-xl flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-xl"></div>
                <Button 
                  size="lg" 
                  className="relative bg-white/20 hover:bg-white/30 border-white/30 text-white z-10"
                >
                  <Play className="mr-2 h-6 w-6" />
                  Assistir Demonstração
                </Button>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Criação de Carrossel em 30 Segundos
              </h3>
              <p className="text-purple-100">
                Veja como nossa IA cria um carrossel completo do zero com apenas algumas palavras-chave
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Steps Carousel */}
        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {steps.map((step) => (
                <CarouselItem key={step.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className={`h-full transition-all duration-300 cursor-pointer ${
                      activeStep === step.id 
                        ? 'ring-2 ring-purple-500 shadow-lg scale-105' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <CardContent className="p-6 text-center h-full flex flex-col">
                      <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                        <step.icon className="h-8 w-8" />
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-purple-600 mb-1">
                          Etapa {step.id}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                      </div>
                      <div className="mt-auto">
                        <p className="text-xs text-gray-500">{step.details}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Step Details for Active Step */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-8">
              {steps.map((step) => (
                activeStep === step.id && (
                  <div key={step.id} className="text-center">
                    <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mx-auto mb-6`}>
                      <step.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Etapa {step.id}: {step.title}
                    </h3>
                    <p className="text-gray-700 text-lg mb-6">{step.details}</p>
                    <div className="flex justify-center gap-2">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index + 1 === activeStep ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )
              ))}
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link to="/register">
              Testar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Comece grátis • Sem cartão de crédito • Resultados em 30 segundos
          </p>
        </div>
      </div>
    </section>
  );
}
