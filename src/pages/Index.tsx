
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Zap, ImageIcon, Video, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block p-2 bg-purple-100 rounded-full mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
            AutoPostAI
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl">
            Crie conteúdos profissionais para redes sociais com IA em segundos
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Começar Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-600">
              Ver Exemplos
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-t-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Crie conteúdo <span className="text-purple-600">sem esforço</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <div className="p-3 bg-purple-100 rounded-full mb-4">
                <ImageIcon className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Carrosséis Incríveis</CardTitle>
              <CardDescription>Crie slides profissionais para Instagram e LinkedIn</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Design atraente e conteúdo engajante com apenas alguns cliques.</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <div className="p-3 bg-purple-100 rounded-full mb-4">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Roteiros para Vídeos</CardTitle>
              <CardDescription>Scripts para TikTok, Reels e YouTube Shorts</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Roteiros otimizados para captar a atenção nos primeiros segundos.</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <div className="p-3 bg-purple-100 rounded-full mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Legendas Perfeitas</CardTitle>
              <CardDescription>Textos otimizados e hashtags inteligentes</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Aumente seu alcance com legendas que geram engajamento.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-purple-50">
        <h2 className="text-3xl font-bold text-center mb-12">Planos Simples e <span className="text-purple-600">Acessíveis</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
              <Button className="w-full mt-6">Começar Grátis</Button>
            </CardContent>
          </Card>
          
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
              <Button className="w-full mt-6 bg-white text-purple-600 hover:bg-gray-100">
                Assinar Agora
              </Button>
            </CardContent>
          </Card>
          
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
              <Button className="w-full mt-6">Assinar Agora</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-purple-800 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para revolucionar seu conteúdo?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Comece a criar conteúdo profissional para redes sociais em minutos, sem precisar de equipe ou conhecimento em design.
          </p>
          <Button size="lg" className="bg-white text-purple-800 hover:bg-gray-100">
            <Zap className="mr-2 h-4 w-4" /> Começar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">AutoPostAI</h2>
              <p className="text-gray-400 max-w-md">
                Revolucionando a criação de conteúdo para redes sociais com inteligência artificial.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Produto</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Recursos</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Exemplos</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Preços</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Empresa</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Sobre nós</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contato</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Termos</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacidade</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} AutoPostAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
