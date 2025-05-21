
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Planos Simples e Acessíveis</h1>
          <p className="text-lg text-gray-700">
            Escolha o plano que melhor se adapta às suas necessidades de criação de conteúdo
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Plano Gratuito */}
          <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Gratuito</CardTitle>
              <div className="text-3xl font-bold">R$0</div>
              <CardDescription>Para experimentar</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>2 conteúdos por semana</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>2 templates disponíveis</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Marca d'água</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Começar Grátis</Button>
            </CardFooter>
          </Card>
          
          {/* Plano Básico */}
          <Card className="border-none shadow-md hover:shadow-xl transition-shadow relative bg-gradient-to-b from-purple-600 to-blue-600 text-white">
            <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg text-gray-800">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle>Básico</CardTitle>
              <div className="text-3xl font-bold">R$19/mês</div>
              <CardDescription className="text-purple-100">Para criadores iniciantes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>20 conteúdos por mês</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>Sem marca d'água</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>Todos os templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>Exportação para Canva</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                Assinar Agora
              </Button>
            </CardFooter>
          </Card>
          
          {/* Plano Profissional */}
          <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Profissional</CardTitle>
              <div className="text-3xl font-bold">R$39/mês</div>
              <CardDescription>Para profissionais e empresas</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Conteúdo ilimitado</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Roteiros com voz IA</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Banco de imagens/ícones</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Integrações com redes</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Atendimento prioritário</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Assinar Agora</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-16 bg-white rounded-xl p-8 shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Como funciona o limite de conteúdo?</h3>
              <p className="text-gray-700">
                No plano gratuito, você pode criar até 2 conteúdos por semana. No plano Básico, até 20 por mês. 
                No plano Profissional, conteúdo ilimitado.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-gray-700">
                Sim, você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento 
                e você pode continuar usando o serviço até o final do período pago.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">O que é a marca d'água?</h3>
              <p className="text-gray-700">
                No plano gratuito, os conteúdos gerados incluem uma pequena marca "Criado com AutoPostAI" 
                no canto inferior. Essa marca é removida nos planos pagos.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Como funciona a exportação para Canva?</h3>
              <p className="text-gray-700">
                Nos planos pagos, você pode exportar seus carrosséis diretamente para o Canva, 
                onde poderá fazer edições adicionais usando todas as ferramentas disponíveis na plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
