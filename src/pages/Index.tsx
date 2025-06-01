
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Play, CheckCircle, Star, Users, TrendingUp, Clock, Sparkles, Brain, BarChart3, Calendar, FileText, MessageSquare, Video, Image, Zap, Target, Globe, Heart, BookOpen, Mic, Shield, Rocket, Lock, PenTool, Monitor, BarChart, Library, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section id="inicio" className="pt-32 pb-20 px-4 text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                Crie Conteúdo com
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> IA em 30 Segundos</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                A plataforma de criação e gestão de conteúdo mais completa do MUNDO
              </p>

              <ul className="text-lg text-gray-600 mb-8 space-y-3 text-left max-w-xl mx-auto lg:mx-0">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Comece grátis agora
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Geração automática de posts, carrosséis, vídeos e mais
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Use IA ou edite mockups prontos
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                  <Link to="/register">
                    Começar grátis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Ver demonstração
                </Button>
              </div>
            </div>

            {/* Right Side - Dra. Ana */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="relative animate-pulse" style={{ animationDuration: '3s' }}>
                  <img 
                    src="/lovable-uploads/dff2e3f0-a7c9-4e72-a52b-5b2ef799e069.png" 
                    alt="Dra. Ana" 
                    className="w-80 h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Speech Bubble */}
                  <div className="absolute -left-20 top-20 bg-white rounded-xl p-4 shadow-lg max-w-64 animate-bounce border border-purple-200" style={{ animationDuration: '4s' }}>
                    <p className="text-sm text-gray-700 font-medium">
                      "Em 2 minutos por dia, eu tenho conteúdo planejado para o mês inteiro."
                    </p>
                    <div className="absolute bottom-0 right-8 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white transform translate-y-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VÍDEO DE INTRODUÇÃO */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Como funciona a AutoPost AI?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Veja em ação como gerar conteúdos prontos com apenas alguns cliques
          </p>
          
          <div className="relative bg-black rounded-2xl border-2 border-green-500/30 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-green-600/20 to-purple-600/20 flex items-center justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white rounded-full p-6"
                onClick={handlePlayVideo}
              >
                <Play className="h-8 w-8 mr-2" />
                Assistir Demonstração
              </Button>
            </div>
          </div>
          
          <Button asChild size="lg" className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
            <Link to="/dashboard">
              Ver demonstração
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 3. O QUE É A AUTOPOST AI */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                O que é a AutoPost AI?
              </h2>
              <p className="text-xl leading-relaxed">
                Plataforma completa para quem quer crescer nas redes sociais sem perder tempo. 
                Crie conteúdos de alta performance, mesmo que você não venda nada. 
                Ideal para criadores, empreendedores e iniciantes.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-64 bg-white/20 rounded-xl flex items-center justify-center border border-white/20">
                <Monitor className="h-32 w-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FUNCIONA PRA MIM? */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-96 h-64 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                <Users className="h-32 w-32 text-purple-600" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Funciona pra mim?
              </h2>
              <ul className="space-y-4 text-lg text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                  Não vende nada, mas quer melhorar seu Instagram
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                  É criador de conteúdo
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                  Tem um negócio local
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                  É social media ou agência
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                  Tem pouco tempo e precisa de agilidade
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OS 7 DIFERENCIAIS DA AUTOPOST AI */}
      <section id="funcionalidades" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Os 7 Diferenciais da AutoPost AI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card className="bg-white border-purple-200 hover:border-purple-400 transition-all shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-gray-900">Criação com IA</CardTitle>
                <CardDescription className="text-gray-600">
                  Posts, carrosséis, vídeos e e-books em segundos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-green-200 hover:border-green-400 transition-all shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Mockups Editáveis</CardTitle>
                <CardDescription className="text-gray-600">
                  Templates prontos para personalizar
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Detector de Tendências</CardTitle>
                <CardDescription className="text-gray-600">
                  Veja o que está bombando em seu nicho
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-red-200 hover:border-red-400 transition-all shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-gray-900">Editor de Vídeos Automático</CardTitle>
                <CardDescription className="text-gray-600">
                  Suba o vídeo, receba a versão editada
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-yellow-200 hover:border-yellow-400 transition-all shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-gray-900">Resumo Inteligente</CardTitle>
                <CardDescription className="text-gray-600">
                  Receba o resumo e crie conteúdo com 1 clique
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-green-200 hover:border-green-400 transition-all shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Agendamento Automático</CardTitle>
                <CardDescription className="text-gray-600">
                  Publique automaticamente em todas as plataformas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-purple-200 hover:border-purple-400 transition-all shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-gray-900">Dashboard e Desempenho</CardTitle>
                <CardDescription className="text-gray-600">
                  Veja o que está funcionando e otimize
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. DEPOIMENTOS REAIS */}
      <section id="depoimentos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Veja como a AutoPost AI tem transformado o conteúdo de nossos usuários
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Eu nunca soube o que postar. Agora tenho conteúdo para o mês todo.",
              "Uso 10 minutos por semana e meu engajamento triplicou.",
              "A IA escreve melhor que eu! Economizo horas todo dia.",
              "Minha agenda nunca mais ficou vazia. Obrigada AutoPost!",
              "Criei 50 posts em uma tarde. Impossível sem a plataforma.",
              "Finalmente consigo ser consistente nas redes sociais.",
              "Meus clientes ficaram impressionados com a qualidade.",
              "De 100 para 5000 seguidores em 3 meses usando AutoPost."
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-center italic">
                    "{testimonial}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GARANTIA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="bg-white/10 border border-green-400/30 rounded-2xl p-12">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Teste grátis por 7 dias. Sem compromisso.
            </h2>
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link to="/register">
                Começar grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. QUEM ESTÁ POR TRÁS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Quem criou a AutoPost AI?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Profissionais com experiência em marketing, tecnologia e IA, criaram a AutoPost AI 
                para resolver o maior problema de todos: falta de tempo e criatividade.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-64 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                <Users className="h-32 w-32 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. RESULTADOS GERADOS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Prints que não deixam dúvidas
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reais de quem testou e aprovou a AutoPost AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Image className="h-16 w-16 text-purple-600" />
                  </div>
                  <p className="text-gray-700 text-center">
                    Resultado real #{item}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "A plataforma serve pra quem não vende nada?",
                answer: "Sim! A AutoPost AI é perfeita para qualquer pessoa que quer melhorar sua presença nas redes sociais."
              },
              {
                question: "Como funciona a criação de conteúdo?",
                answer: "Nossa IA analisa seu nicho e cria conteúdo personalizado em segundos. Você pode usar templates ou gerar do zero."
              },
              {
                question: "Preciso pagar algo agora?",
                answer: "Não! Você pode testar gratuitamente por 7 dias, sem compromisso."
              },
              {
                question: "Posso usar sem entender de design?",
                answer: "Claro! Nossa plataforma é super intuitiva e tem templates prontos para você personalizar."
              },
              {
                question: "A IA escreve mesmo os textos pra mim?",
                answer: "Sim! Nossa IA cria textos, legendas, roteiros e muito mais, tudo personalizado para seu estilo."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    {faq.question}
                  </CardTitle>
                  <CardDescription className="text-gray-600 ml-9">
                    {faq.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                <Link to="/register">
                  Começar grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4">
                <Link to="/dashboard">Ver demonstração</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AutoPost.AI
              </h3>
              <p className="text-gray-400">
                A plataforma mais completa para criação de conteúdo com inteligência artificial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/create" className="hover:text-white transition-colors">Criar Conteúdo</Link></li>
                <li><Link to="/analytics" className="hover:text-white transition-colors">Análises</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/video-summarizer" className="hover:text-white transition-colors">Resumir Vídeo</Link></li>
                <li><Link to="/trend-detector" className="hover:text-white transition-colors">Detector de Tendências</Link></li>
                <li><Link to="/bio-optimizer" className="hover:text-white transition-colors">Otimizador de Bio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/support" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><a href="mailto:contato@autopost.ai" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 AutoPost.AI. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
