import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, Shield, Globe, Trash2, Instagram, Facebook, Youtube, Linkedin, Twitter, Wifi } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const [selectedLanguage, setSelectedLanguage] = useState("pt");
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  const socialPlatforms = [
    { id: "instagram", name: "Instagram", icon: Instagram, description: "Feed, Reels, Stories" },
    { id: "facebook", name: "Facebook", icon: Facebook, description: "Páginas e Grupos" },
    { id: "tiktok", name: "TikTok", icon: Wifi, description: "Vídeos curtos" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, description: "Posts profissionais" },
    { id: "twitter", name: "Twitter/X", icon: Twitter, description: "Posts e threads" },
    { id: "pinterest", name: "Pinterest", icon: Wifi, description: "Pins e boards" },
    { id: "youtube", name: "YouTube", icon: Youtube, description: "Shorts, Comunidade" },
    { id: "kwai", name: "Kwai", icon: Wifi, description: "Vídeos curtos" },
    { id: "threads", name: "Threads", icon: Wifi, description: "Posts do Meta" },
  ];

  const handleConnect = (platformId: string) => {
    setConnectedPlatforms(prev => [...prev, platformId]);
    const platform = socialPlatforms.find(p => p.id === platformId);
    toast.success(`${platform?.name} conectado com sucesso!`);
  };

  const handleDisconnect = (platformId: string) => {
    setConnectedPlatforms(prev => prev.filter(id => id !== platformId));
    const platform = socialPlatforms.find(p => p.id === platformId);
    toast.info(`${platform?.name} desconectado`);
  };

  const isConnected = (platformId: string) => connectedPlatforms.includes(platformId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-gray-600">Gerencie suas preferências e configurações da conta.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Conexões
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Idiomas
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e de contato.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" placeholder="Seu sobrenome" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Conte um pouco sobre você" />
                </div>
                <Button>Salvar Alterações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connections">
            <Card>
              <CardHeader>
                <CardTitle>Conectar suas redes sociais</CardTitle>
                <CardDescription>
                  Conecte suas redes sociais para agendar e publicar automaticamente. As conexões feitas aqui serão usadas em todo o sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialPlatforms.map((platform) => (
                  <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <platform.icon className="h-6 w-6 text-gray-600" />
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-sm text-gray-500">{platform.description}</div>
                      </div>
                    </div>
                    
                    {isConnected(platform.id) ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDisconnect(platform.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Desconectar
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleConnect(platform.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Conectar
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Idioma</CardTitle>
                <CardDescription>
                  Defina o idioma padrão para geração de conteúdo e interface do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Idioma Padrão para Geração de Conteúdo</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">🇧🇷 Português (Brasil)</SelectItem>
                        <SelectItem value="en">🇺🇸 English (US)</SelectItem>
                        <SelectItem value="es">🇪🇸 Español</SelectItem>
                        <SelectItem value="fr">🇫🇷 Français</SelectItem>
                        <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                        <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                        <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                        <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                        <SelectItem value="zh">🇨🇳 中文</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">
                      Este será o idioma usado por padrão na geração de conteúdos pela IA.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="interfaceLanguage">Idioma da Interface</Label>
                    <Select defaultValue="pt">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">🇧🇷 Português (Brasil)</SelectItem>
                        <SelectItem value="en">🇺🇸 English (US)</SelectItem>
                        <SelectItem value="es">🇪🇸 Español</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">
                      Define o idioma dos menus, botões e textos da interface.
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base">Detecção Automática</div>
                      <div className="text-sm text-gray-500">
                        Detectar automaticamente o idioma baseado na localização
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button>Salvar Configurações de Idioma</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure como você quer receber notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Notificações por Email</div>
                    <div className="text-sm text-gray-500">
                      Receba atualizações sobre sua conta por email
                    </div>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Relatórios Semanais</div>
                    <div className="text-sm text-gray-500">
                      Receba um resumo semanal do desempenho dos seus conteúdos
                    </div>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Novidades do Produto</div>
                    <div className="text-sm text-gray-500">
                      Seja notificado sobre novas funcionalidades e atualizações
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>
                    Mantenha sua conta segura com uma senha forte.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>Alterar Senha</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
                  <CardDescription>
                    Ações irreversíveis relacionadas à sua conta.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Excluir Conta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
