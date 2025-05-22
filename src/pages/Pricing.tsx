
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Free",
      description: "Perfeito para experimentar a plataforma",
      price: billingCycle === "annual" ? "R$0" : "R$0",
      features: [
        "3 gerações de conteúdo por mês",
        "Posts únicos",
        "Acesso básico ao editor visual",
        "Sem marca d'água",
        "Suporte por e-mail"
      ],
      limitations: [
        "Sem carrosséis",
        "Sem geração de vídeo/reels",
        "Sem transcrição automática"
      ],
      cta: "Começar Grátis",
      popular: false,
      link: "/register"
    },
    {
      name: "Creator",
      description: "Para criadores de conteúdo independentes",
      price: billingCycle === "annual" ? "R$39,90" : "R$49,90",
      period: billingCycle === "annual" ? "/mês" : "/mês",
      features: [
        "30 gerações de conteúdo por mês",
        "Posts únicos e carrosséis",
        "Editor visual completo",
        "Transcrição automática (limite de 10 min)",
        "Geração de roteiros",
        "Biblioteca de templates",
        "Geração de hashtags otimizados",
        "Suporte prioritário"
      ],
      cta: "Assinar Creator",
      popular: true,
      save: billingCycle === "annual" ? "Economize 20%" : null,
      link: "/register?plan=creator"
    },
    {
      name: "Pro",
      description: "Para agências e times de marketing",
      price: billingCycle === "annual" ? "R$99,90" : "R$129,90",
      period: billingCycle === "annual" ? "/mês" : "/mês",
      features: [
        "Gerações ilimitadas",
        "Todos os tipos de conteúdo",
        "Geração em lote",
        "Transcrição automática ilimitada",
        "Integração com redes sociais",
        "Agendamento de publicações",
        "Análise de desempenho",
        "Geração de imagens com IA",
        "Personalização avançada de marca",
        "Multi-usuários (até 5)",
        "Suporte VIP"
      ],
      cta: "Assinar Pro",
      popular: false,
      save: billingCycle === "annual" ? "Economize 20%" : null,
      link: "/register?plan=pro"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Planos que cabem no seu bolso</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crie conteúdo para todas as redes sociais em menos de 30 segundos, com IA avançada e ferramentas intuitivas.
          </p>
          
          <div className="flex items-center justify-center mt-8 bg-white rounded-lg p-1 w-fit mx-auto border">
            <button
              className={`px-5 py-2 rounded-md transition-all ${
                billingCycle === "annual" ? "bg-primary text-white" : "bg-transparent text-gray-500"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Anual (20% off)
            </button>
            <button
              className={`px-5 py-2 rounded-md transition-all ${
                billingCycle === "monthly" ? "bg-primary text-white" : "bg-transparent text-gray-500"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Mensal
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={`overflow-hidden ${plan.popular ? 'border-primary border-2 relative' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl">
                  Mais popular
                </div>
              )}
              <CardHeader className={`${plan.popular ? 'bg-primary/5' : ''}`}>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription className="pt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="flex items-end justify-center">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {plan.save && (
                    <span className="text-green-600 text-sm font-medium mt-1 block">
                      {plan.save}
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && (
                    <>
                      <div className="border-t border-gray-200 my-4"></div>
                      {plan.limitations.map((limitation) => (
                        <div key={limitation} className="flex items-start text-gray-400">
                          <span className="h-5 w-5 text-gray-300 mr-2 flex items-center justify-center text-lg">-</span>
                          <span className="text-sm">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full"
                  asChild
                >
                  <Link to={plan.link}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Por que escolher nossa plataforma?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-bold mb-2">Economize tempo</h3>
              <p className="text-gray-600">Crie conteúdo para todas as suas redes sociais em menos de 30 segundos.</p>
            </div>
            
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-bold mb-2">IA especializada</h3>
              <p className="text-gray-600">Nossa IA é treinada especificamente para marketing e redes sociais.</p>
            </div>
            
            <div className="p-6 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-bold mb-2">Tudo em um só lugar</h3>
              <p className="text-gray-600">Crie, edite, agende e analise seu conteúdo em uma única plataforma.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Ainda não está convencido?</p>
          <Button asChild>
            <Link to="/register">Experimente grátis por 7 dias</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
