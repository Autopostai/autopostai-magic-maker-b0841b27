
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Play, CheckCircle, Star, Users, TrendingUp, Clock, Sparkles, Brain, BarChart3, Calendar, FileText, MessageSquare, Video, Image, Zap, Target, Globe, Heart, BookOpen, Mic } from "lucide-react";
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
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 mr-2" />
            Nova Era da Criação de Conteúdo
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
            Crie Conteúdo
            <br />
            com IA em Segundos
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            A plataforma mais completa para criadores digitais. Gere posts, carrosséis, vídeos, roteiros e muito mais 
            com inteligência artificial avançada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
              <Link to="/register">
                Começar Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              <Link to="/pricing">Ver Planos</Link>
            </Button>
          </div>

          {/* Video Demo */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-auto"
                poster="/placeholder.svg"
                preload="metadata"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button
                  onClick={handlePlayVideo}
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
                >
                  <Play className="h-6 w-6 mr-2" />
                  {isPlaying ? 'Pausar' : 'Ver Demo'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
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

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todas as Ferramentas que Você Precisa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma plataforma completa para criação, edição, agendamento e análise de conteúdo para redes sociais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Geração de Conteúdo */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Geração com IA</CardTitle>
                <CardDescription>
                  Crie posts, carrosséis, legendas e roteiros com inteligência artificial avançada.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Templates Personalizáveis */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Image className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Templates Profissionais</CardTitle>
                <CardDescription>
                  Mockups personalizáveis com designs otimizados para cada rede social.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Agendamento */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Agendamento Inteligente</CardTitle>
                <CardDescription>
                  Programe suas postagens para múltiplas plataformas no melhor horário.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Análise de Desempenho */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Analytics Avançados</CardTitle>
                <CardDescription>
                  Monitore o desempenho do seu conteúdo e otimize sua estratégia.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Biblioteca de Conteúdo */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Biblioteca Organizada</CardTitle>
                <CardDescription>
                  Organize e reutilize todo seu conteúdo em um só lugar.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Múltiplas Plataformas */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Múltiplas Plataformas</CardTitle>
                <CardDescription>
                  Publique simultaneamente no Instagram, Facebook, LinkedIn e mais.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FERRAMENTAS ADICIONAIS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              FERRAMENTAS ADICIONAIS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Funcionalidades avançadas para potencializar sua presença digital e otimizar sua estratégia de conteúdo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Resumir Vídeo */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Resumir Vídeo</CardTitle>
                <CardDescription>
                  Extraia insights e resumos de vídeos do YouTube ou uploads da galeria
                </CardDescription>
                {/* Mockup */}
                <div className="mt-4 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="w-full h-20 bg-red-200 rounded mb-2 flex items-center justify-center">
                      <Play className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Detector de Tendências */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Detector de Tendências</CardTitle>
                <CardDescription>
                  Descubra tendências em tempo real para criar conteúdo viral
                </CardDescription>
                {/* Mockup */}
                <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">Trending Now</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="h-2 bg-blue-200 rounded w-2/3"></div>
                        <span className="text-xs text-green-600">↗ 245%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-2 bg-blue-200 rounded w-1/2"></div>
                        <span className="text-xs text-green-600">↗ 189%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                        <span className="text-xs text-green-600">↗ 156%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Otimizador de Bio */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Otimizador de Bio</CardTitle>
                <CardDescription>
                  Crie bios otimizadas para diferentes plataformas sociais
                </CardDescription>
                {/* Mockup */}
                <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-green-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-1 bg-green-200 rounded w-full"></div>
                      <div className="h-1 bg-green-200 rounded w-3/4"></div>
                      <div className="h-1 bg-green-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Gerador de eBook/PDF */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Gerador de eBook/PDF</CardTitle>
                <CardDescription>
                  Crie materiais educativos completos e apresentações profissionais
                </CardDescription>
                {/* Mockup */}
                <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="bg-purple-200 rounded mb-2 h-16 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="h-1 bg-purple-200 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mais de 10.000 Criadores Confiam em Nós
            </h2>
            <p className="text-xl text-gray-600">
              Veja o que nossos usuários estão dizendo sobre a plataforma
            </p>
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
                  "Revolucionou minha criação de conteúdo. Agora consigo produzir 10x mais em metade do tempo!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Maria Silva</div>
                    <div className="text-sm text-gray-500">Influenciadora Digital</div>
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
                  "A qualidade dos conteúdos gerados é impressionante. Meu engajamento aumentou 300%!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">João Santos</div>
                    <div className="text-sm text-gray-500">Empreendedor</div>
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
                  "Essencial para quem trabalha com marketing digital. Não consigo mais viver sem!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Ana Costa</div>
                    <div className="text-sm text-gray-500">Marketing Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Revolucionar seu Conteúdo?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Junte-se a milhares de criadores que já estão usando IA para crescer nas redes sociais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link to="/register">
                Começar Agora - É Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
              <Link to="/pricing">Ver Demonstração</Link>
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
