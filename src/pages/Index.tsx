import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HowItWorks } from "@/components/HowItWorks";
import { StatsComponent } from "@/components/StatsComponent";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      
      {/* Centralized container with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Crie Conteúdo Profissional para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Redes Sociais
              </span>{" "}
              com IA
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transforme suas ideias em conteúdo viral. Posts, stories, reels e muito mais 
              criados automaticamente em segundos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/register">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">Ver Planos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas para criar, editar e agendar seu conteúdo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">IA Criativa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gere conteúdo único e envolvente com nossa inteligência artificial avançada
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Editor Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ferramentas de edição completas para vídeos e imagens, estilo Canva e CapCut
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Multi-Plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Publique automaticamente no Instagram, TikTok, YouTube e muito mais
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Análise Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Acompanhe performance e otimize seu conteúdo com insights detalhados
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Stats */}
        <StatsComponent />

        {/* CTA Section */}
        <section className="py-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white text-center p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para revolucionar seu conteúdo?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de criadores que já estão criando conteúdo viral
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Começar Agora - Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">AutoPostAI</h3>
            <p className="text-gray-400 mb-4">
              O futuro da criação de conteúdo para redes sociais
            </p>
            <div className="flex justify-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Termos
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                Suporte
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
