
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const isLoggedIn = false; // Substituir por lógica de autenticação real
  
  // Lista de rotas onde o navbar não deve aparecer (usuário logado)
  const hiddenRoutes = [
    '/dashboard', '/create', '/content', '/schedule', '/analytics', 
    '/library', '/settings', '/support'
  ];
  const shouldHideNavbar = hiddenRoutes.some(route => location.pathname.startsWith(route));

  if (shouldHideNavbar) {
    return null;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-purple-100 p-1 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
            AutoPostAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('inicio')} 
            className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('como-funciona')} 
            className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Como Funciona
          </button>
          <button 
            onClick={() => scrollToSection('funcionalidades')} 
            className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Funcionalidades
          </button>
          <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
            Planos
          </Link>
          <button 
            onClick={() => scrollToSection('depoimentos')} 
            className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Depoimentos
          </button>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/create">
                <Button>Criar Conteúdo</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button>Comece Grátis</Button>
              </Link>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    </nav>
  );
}
