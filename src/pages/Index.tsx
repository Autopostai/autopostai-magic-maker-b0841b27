
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Play, CheckCircle, Star, Users, TrendingUp, Clock, Sparkles, Brain, BarChart3, Calendar, FileText, MessageSquare, Video, Image, Zap, Target, Globe, Heart, BookOpen, Mic, Shield, Rocket, Lock } from "lucide-react";
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
      
      {/* Hero Section with Dra. Ana */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4 mr-2" />
                Seu Social Media Online. Tudo o que você precisa em uma única plataforma.
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
                Crie Conteúdo
                <br />
                com IA em 30 Segundos
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0">
                A plataforma mais completa para criadores digitais. Crie posts, carrosséis, vídeos, roteiros, bios e muito mais com inteligência artificial — em minutos.
              </p>
              
              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0">
                Comece gratuitamente hoje mesmo. Use recursos essenciais com limitações e experimente o poder da IA.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                  <Link to="/register">
                    Comece Grátis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  <Link to="/pricing">Ver Planos</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Dra. Ana Character */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Dra. Ana Illustration */}
                <div className="w-80 h-96 bg-gradient-to-b from-blue-100 to-purple-100 rounded-3xl flex items-end justify-center overflow-hidden relative">
                  {/* Background elements */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-purple-200 rounded-full opacity-50"></div>
                  <div className="absolute top-16 right-8 w-8 h-8 bg-blue-200 rounded-full opacity-50"></div>
                  <div className="absolute bottom-20 left-4 w-6 h-6 bg-pink-200 rounded-full opacity-50"></div>
                  
                  {/* Dra. Ana Character - represented as styled elements */}
                  <div className="relative z-10 mb-8">
                    {/* Head */}
                    <div className="w-24 h-28 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-full mx-auto mb-2 relative">
                      {/* Hair */}
                      <div className="absolute -top-2 -left-2 w-28 h-20 bg-gradient-to-b from-yellow-600 to-yellow-500 rounded-full"></div>
                      {/* Face */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                        {/* Eyes */}
                        <div className="flex gap-3 mb-2">
                          <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                          <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                        </div>
                        {/* Smile */}
                        <div className="w-4 h-2 border-b-2 border-pink-600 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Body - Lab Coat */}
                    <div className="w-32 h-40 bg-white rounded-t-3xl mx-auto relative shadow-lg">
                      {/* Stethoscope */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-700"></div>
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-6 border-2 border-gray-700 rounded-full"></div>
                      
                      {/* Arms pointing */}
                      <div className="absolute top-8 -right-6 w-12 h-3 bg-yellow-200 rounded-full transform rotate-12"></div>
                      <div className="absolute top-12 -right-8 w-3 h-3 bg-yellow-200 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Floating elements around Dra. Ana */}
                  <div className="absolute top-12 right-12 animate-bounce">
                    <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-32 left-8 animate-pulse">
                    <div className="w-6 h-6 bg-blue-200 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-3 h-3 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                {/* Speech Bubble */}
                <div className="absolute -left-16 top-8 bg-white rounded-xl p-4 shadow-lg max-w-48">
                  <p className="text-sm text-gray-700 font-medium">
                    "2 minutos por dia e tenho conteúdo para a semana toda!"
                  </p>
                  <div className="absolute bottom-0 right-8 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white transform translate-y-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Demo Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">👉 Ver Demo da Plataforma</h3>
            </div>
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
              🚀 Tudo que você pode fazer com o AutoPost AI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Geração de Conteúdo */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>🧠 Geração de Conteúdo com IA</CardTitle>
                <CardDescription>
                  Crie posts, legendas, carrosséis e roteiros em segundos com IA avançada.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Templates Personalizáveis */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Image className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>🎨 Templates e Mockups Otimizados</CardTitle>
                <CardDescription>
                  Modelos prontos para todas as redes sociais — personalizáveis e profissionais.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Agendamento */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>📅 Agendamento Inteligente + Cross-posting</CardTitle>
                <CardDescription>
                  Agende postagens para múltiplas plataformas com um clique e nos horários ideais.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Análise de Desempenho */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>📊 Analytics Avançado</CardTitle>
                <CardDescription>
                  Entenda o que funciona com relatórios completos e sugestões de melhoria.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Biblioteca de Conteúdo */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>🗂️ Biblioteca de Conteúdo</CardTitle>
                <CardDescription>
                  Salve, edite, organize e reutilize tudo em um só lugar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FERRAMENTAS EXCLUSIVAS DE IA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🛠️ Ferramentas Exclusivas de IA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Detector de Tendências */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>🔥 Detector de Tendências em Tempo Real</CardTitle>
                <CardDescription>
                  Veja o que está bombando no seu nicho — direto de TikTok, Reels, Shorts, Twitter e Google Trends.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Shorts e Reels */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>🎬 Shorts e Reels Editados por IA</CardTitle>
                <CardDescription>
                  Suba um vídeo, e a IA adiciona trilha sonora, legenda automática e ajuste de cor.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Roteiros */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>📝 Roteiros Instantâneos para Vídeos</CardTitle>
                <CardDescription>
                  Defina tema e nicho, e receba roteiros prontos com gancho, conteúdo e chamada final.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* E-books */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>📘 Gerador de E-books, PDFs e Apresentações</CardTitle>
                <CardDescription>
                  Insira um tema e receba um material visual completo com estrutura, conteúdo e design prontos.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Bio Optimizer */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>👤 Otimizador de Bio</CardTitle>
                <CardDescription>
                  A IA cria bios otimizadas para Instagram, TikTok, Twitter e LinkedIn com base na sua persona.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Thumbnails */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>🖼️ Criador de Thumbnails para YouTube</CardTitle>
                <CardDescription>
                  Use um prompt ou imagens para gerar thumbnails profissionais que aumentam os cliques.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Resumo de Vídeos */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle>📽️ Resumo Inteligente de Vídeos</CardTitle>
                <CardDescription>
                  Cole um link de vídeo ou envie o seu → receba o resumo + sugestões de conteúdo.
                </CardDescription>
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
            Pronto para Revolucionar seu Conteúdo?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Junte-se a milhares de criadores que já estão usando IA para crescer nas redes sociais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link to="/register">
                ➡️ Comece Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
              <Link to="/pricing">➡️ Ver Planos</Link>
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
