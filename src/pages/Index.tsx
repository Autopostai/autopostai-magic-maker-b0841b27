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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4 mr-2" />
                Sua plataforma completa de criação de conteúdo com IA
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
                Crie Conteúdo
                <br />
                com IA em Segundos
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0">
                Transforme sua criação de conteúdo com nossa plataforma completa de IA. Posts, carrosséis, vídeos, roteiros e muito mais — tudo automatizado.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                  <Link to="/register">
                    Comece Grátis Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demonstração
                </Button>
              </div>
            </div>

            {/* Right Side - Animated Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/dff2e3f0-a7c9-4e72-a52b-5b2ef799e069.png" 
                    alt="Criadora de conteúdo trabalhando" 
                    className="w-72 h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700 animate-pulse"
                    style={{ animationDuration: '3s' }}
                  />
                  
                  {/* Speech Bubble - Reposicionado para não cobrir o rosto */}
                  <div className="absolute -right-16 bottom-16 bg-white rounded-xl p-4 shadow-lg max-w-56 animate-bounce" style={{ animationDuration: '4s' }}>
                    <p className="text-sm text-gray-700 font-medium">
                      "2 minutos por dia e tenho conteúdo para a semana toda!"
                    </p>
                    <div className="absolute bottom-0 left-8 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white transform translate-y-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Criadores Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600">Conteúdos Gerados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 Dashboard Completo para Criadores
            </h2>
            <p className="text-xl text-gray-600">
              Gerencie todo seu conteúdo em um só lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>📊 Dashboard Intuitivo</CardTitle>
                <CardDescription>
                  Visualize suas métricas, agende conteúdos e monitore performance em tempo real.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>📝 Meus Conteúdos</CardTitle>
                <CardDescription>
                  Organize todos os seus posts, carrosséis, vídeos e materiais em uma biblioteca inteligente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>📅 Agendamento Inteligente</CardTitle>
                <CardDescription>
                  Programe suas publicações para múltiplas plataformas nos melhores horários.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Creation Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎨 Criação de Conteúdo Automatizada
            </h2>
            <p className="text-xl text-gray-600">
              Todas as ferramentas que você precisa em um só lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>📱 Posts</CardTitle>
                <CardDescription>
                  Crie posts envolventes para todas as redes sociais com IA.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>🎠 Carrosséis</CardTitle>
                <CardDescription>
                  Designs profissionais para carrosséis do Instagram e LinkedIn.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle>🖼️ Thumbnails</CardTitle>
                <CardDescription>
                  Thumbnails de alta conversão para YouTube e outras plataformas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>🎬 Vídeos & Roteiros</CardTitle>
                <CardDescription>
                  Roteiros completos e edição automática de vídeos curtos.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              🤖 Ferramentas Exclusivas de IA
            </h2>
            <p className="text-xl text-purple-100">
              Tecnologia de ponta para criadores profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">📽️ Resumir Vídeo</CardTitle>
                <CardDescription className="text-purple-100">
                  Extraia insights e crie conteúdo a partir de qualquer vídeo automaticamente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">🔥 Detector de Tendências</CardTitle>
                <CardDescription className="text-purple-100">
                  Descubra o que está bombando no seu nicho em tempo real.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">👤 Otimizar Bio</CardTitle>
                <CardDescription className="text-purple-100">
                  Crie bios otimizadas para todas as suas redes sociais com IA.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Digital Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📚 Produtos Digitais Completos
            </h2>
            <p className="text-xl text-gray-600">
              Crie materiais profissionais em minutos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Gere Apresentações Profissionais</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>E-books com design profissional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Apresentações de slides completas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Landing pages otimizadas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Materiais para cursos online</span>
                </li>
              </ul>
              <Button asChild className="mt-6 bg-purple-600 hover:bg-purple-700">
                <Link to="/content-generator">
                  Criar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Library */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">📊 Análises Detalhadas</CardTitle>
                <CardDescription className="text-lg">
                  Monitore o desempenho dos seus conteúdos com relatórios completos e insights acionáveis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Library className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">📚 Biblioteca Inteligente</CardTitle>
                <CardDescription className="text-lg">
                  Organize, reutilize e otimize todo seu conteúdo em uma biblioteca centralizada.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🌟 Avaliações de Quem Já Usa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Economizei horas de trabalho! O AutoPost AI virou meu braço direito."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Juliana M.</div>
                    <div className="text-sm text-gray-500">Social Media</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Fiz meu primeiro ebook em 3 minutos. Inacreditável."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Camila R.</div>
                    <div className="text-sm text-gray-500">Produtora de Conteúdo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Usei a versão gratuita e depois não pensei duas vezes: assinei o plano completo."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Rafael D.</div>
                    <div className="text-sm text-gray-500">Coach Digital</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              💳 Planos e Preços
            </h2>
            <p className="text-xl text-gray-600">
              🧪 Comece Gratuitamente Agora
            </p>
            <p className="text-lg text-gray-500 mt-4 max-w-3xl mx-auto">
              Crie uma conta grátis e experimente os principais recursos da plataforma.
              Com a versão gratuita, você poderá gerar conteúdo, explorar ferramentas e publicar — com limites de uso.
              Liberte o poder completo da plataforma com os planos pagos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plano Free */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-2xl">Plano Free</CardTitle>
                <div className="text-3xl font-bold text-gray-900 mt-2">Grátis</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Geração limitada de conteúdo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Templates básicos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    1 rede social conectada
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Plano Pro */}
            <Card className="border-2 border-purple-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </div>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Plano Pro</CardTitle>
                <div className="text-3xl font-bold text-purple-600 mt-2">R$49/mês</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Conteúdo ilimitado
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Agendamento e cross-posting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Biblioteca, análises e todas as ferramentas de IA
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Plano Agência */}
            <Card className="border-2 border-blue-500 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Plano Agência</CardTitle>
                <div className="text-3xl font-bold text-blue-600 mt-2">R$129/mês</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Multiusuário
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Workspaces separados
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Suporte prioritário
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Transformar sua Criação de Conteúdo?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Junte-se a milhares de criadores que já estão usando IA para crescer nas redes sociais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link to="/register">
                Comece Grátis Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
              <Link to="/dashboard">Ver Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">AutoPost.AI</h3>
              <p className="text-gray-400">
                A plataforma mais completa para criação de conteúdo com inteligência artificial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/pricing" className="hover:text-white">Planos</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/create" className="hover:text-white">Criar Conteúdo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/video-summarizer" className="hover:text-white">Resumir Vídeo</Link></li>
                <li><Link to="/trend-detector" className="hover:text-white">Detector de Tendências</Link></li>
                <li><Link to="/bio-optimizer" className="hover:text-white">Otimizador de Bio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/support" className="hover:text-white">Central de Ajuda</Link></li>
                <li><a href="mailto:contato@autopost.ai" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 AutoPost.AI. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
