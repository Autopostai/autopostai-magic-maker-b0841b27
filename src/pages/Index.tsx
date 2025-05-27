
import { Navbar } from "@/components/Navbar";
import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Clock, SquarePlay, Film, Layout, MessageSquare, TrendingUp, Users, BookOpen, PlayCircle, Calendar, BarChart3 } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Crie conteúdo para redes sociais em menos de 30 segundos
          </h1>
          <p className="text-xl text-gray-700 mb-10">
            Uma plataforma all-in-one com IA avançada para criar posts perfeitos, carrosséis, reels, shorts e roteiros - sem precisar ser especialista.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/register">Começar Grátis</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link to="/pricing">Ver Planos</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Main Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tudo que você precisa em um só lugar</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma foi projetada para criar conteúdo para todas as redes sociais com apenas alguns cliques.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Layout className="h-6 w-6 text-purple-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-16 h-10 bg-purple-300 rounded mb-2"></div>
                  <div className="w-12 h-2 bg-gray-300 rounded"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Posts & Carrosséis</h3>
              <p className="text-gray-600">
                Crie posts únicos e carrosséis envolventes para Instagram, Facebook e LinkedIn em segundos.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-blue-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm relative">
                  <div className="w-16 h-10 bg-blue-300 rounded"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-r"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Reels & Shorts</h3>
              <p className="text-gray-600">
                Produza vídeos curtos para Instagram, TikTok e YouTube com legendas automáticas.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="space-y-1">
                    <div className="w-14 h-1 bg-green-400 rounded"></div>
                    <div className="w-16 h-1 bg-gray-300 rounded"></div>
                    <div className="w-12 h-1 bg-gray-300 rounded"></div>
                    <div className="w-10 h-1 bg-green-400 rounded"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Roteiros & Legendas</h3>
              <p className="text-gray-600">
                Gere roteiros persuasivos e legendas otimizadas para maximizar o engajamento.
              </p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-bold text-orange-600">30s</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="w-12 h-1 bg-orange-400 rounded"></div>
                    <div className="w-14 h-1 bg-orange-300 rounded"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Em menos de 30s</h3>
              <p className="text-gray-600">
                Economize horas do seu dia com nossa IA especializada em marketing digital.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Tools Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">FERRAMENTAS ADICIONAIS</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra todas as funcionalidades avançadas do AutoPost AI para turbinar sua estratégia de conteúdo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <PlayCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-red-50 to-red-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm w-20">
                  <div className="w-full h-12 bg-red-200 rounded mb-2 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <PlayCircle className="h-4 w-4 text-red-600" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-1 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Resumir Vídeo</h3>
              <p className="text-gray-600 mb-4">
                Transforme vídeos do YouTube ou da sua galeria em posts, carrosséis ou shorts automaticamente.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/video-summarizer">Experimentar</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-pink-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-end space-x-1 h-16">
                    <div className="w-2 h-8 bg-pink-400 rounded-t"></div>
                    <div className="w-2 h-12 bg-pink-500 rounded-t"></div>
                    <div className="w-2 h-16 bg-pink-600 rounded-t"></div>
                    <div className="w-2 h-10 bg-pink-400 rounded-t"></div>
                  </div>
                  <TrendingUp className="h-3 w-3 text-pink-600 mt-1" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Detector de Tendências</h3>
              <p className="text-gray-600 mb-4">
                Monitore tendências em tempo real e descubra o que está viral no seu nicho.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/trend-detector">Explorar</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-indigo-300 rounded-full"></div>
                    <div>
                      <div className="w-8 h-1 bg-indigo-400 rounded mb-1"></div>
                      <div className="w-6 h-1 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-1 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Otimizador de Bio</h3>
              <p className="text-gray-600 mb-4">
                Crie bios otimizadas para Instagram, LinkedIn, TikTok e outras plataformas.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/bio-optimizer">Otimizar</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="space-y-2">
                    <div className="w-16 h-8 bg-emerald-300 rounded border-l-2 border-emerald-500"></div>
                    <div className="space-y-1">
                      <div className="w-12 h-1 bg-gray-400 rounded"></div>
                      <div className="w-14 h-1 bg-gray-300 rounded"></div>
                      <div className="w-10 h-1 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Gerador de eBook/PDF</h3>
              <p className="text-gray-600 mb-4">
                Crie eBooks, PDFs e apresentações profissionais com design aplicado automaticamente.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/content-generator">Gerar</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded ${i === 4 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center space-x-1">
                    <Clock className="h-2 w-2 text-blue-500" />
                    <div className="w-8 h-1 bg-blue-400 rounded"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Agendamento</h3>
              <p className="text-gray-600 mb-4">
                Agende seus posts para múltiplas plataformas e mantenha sua presença online consistente.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/schedule">Agendar</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="h-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-end space-x-1 h-12">
                    <div className="w-3 h-6 bg-purple-400 rounded-t"></div>
                    <div className="w-3 h-8 bg-purple-500 rounded-t"></div>
                    <div className="w-3 h-12 bg-purple-600 rounded-t"></div>
                    <div className="w-3 h-4 bg-purple-400 rounded-t"></div>
                  </div>
                  <div className="mt-1 text-xs text-purple-600 font-bold">89%</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics Avançado</h3>
              <p className="text-gray-600 mb-4">
                Monitore performance, engajamento e métricas detalhadas de todos os seus conteúdos.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/analytics">Analisar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Resultados reais</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veja como nossos clientes estão economizando tempo e melhorando seus resultados
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4 flex items-center justify-center font-bold text-blue-600">
                  MK
                </div>
                <div>
                  <h4 className="font-bold">Marina Kowalski</h4>
                  <p className="text-sm text-gray-500">Social Media Manager</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Reduzi meu tempo de criação de conteúdo de 3 horas para 20 minutos por dia. A qualidade das legendas e carrosséis é impressionante!"
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full mr-4 flex items-center justify-center font-bold text-green-600">
                  RA
                </div>
                <div>
                  <h4 className="font-bold">Rafael Almeida</h4>
                  <p className="text-sm text-gray-500">Criador de conteúdo</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Consigo criar roteiros para meus vídeos em minutos. As legendas automáticas economizam horas de trabalho tedioso."
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full mr-4 flex items-center justify-center font-bold text-purple-600">
                  FM
                </div>
                <div>
                  <h4 className="font-bold">Fernanda Martins</h4>
                  <p className="text-sm text-gray-500">Empreendedora</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Mesmo sem experiência em marketing, consigo criar conteúdo profissional para minha marca. Meu engajamento aumentou em 300%."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para revolucionar sua produção de conteúdo?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Comece agora e crie seu primeiro conteúdo em menos de 30 segundos. Sem cartão de crédito. Sem compromissos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link to="/register">Começar Grátis</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10" asChild>
              <Link to="/pricing">Ver Planos</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">AutoPostAI</h3>
              <p className="text-gray-400">
                Crie conteúdo para redes sociais em segundos com a ajuda da nossa IA especializada.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Recursos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white">Posts & Carrosséis</Link></li>
                <li><Link to="/login" className="hover:text-white">Reels & Shorts</Link></li>
                <li><Link to="/login" className="hover:text-white">Roteiros & Legendas</Link></li>
                <li><Link to="/login" className="hover:text-white">Editor Visual</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Ferramentas IA</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/video-summarizer" className="hover:text-white">Resumir Vídeo</Link></li>
                <li><Link to="/trend-detector" className="hover:text-white">Detector de Tendências</Link></li>
                <li><Link to="/bio-optimizer" className="hover:text-white">Otimizar Bio</Link></li>
                <li><Link to="/content-generator" className="hover:text-white">Gerar eBook/PDF</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoPostAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
