
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Download, Eye, Type, Palette, Image } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function MockupEditor() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  
  const contentType = searchParams.get('type') || 'post';
  const platforms = searchParams.get('platforms')?.split(',') || [];

  // Estados do editor
  const [title, setTitle] = useState("Seu Título Aqui");
  const [subtitle, setSubtitle] = useState("Subtítulo motivacional");
  const [description, setDescription] = useState("Adicione sua descrição ou conteúdo principal aqui.");
  const [backgroundColor, setBackgroundColor] = useState("#8B5CF6");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState("medium");

  const handleSave = () => {
    toast.success("Template salvo com sucesso!");
  };

  const handleExport = () => {
    toast.success("Imagem exportada para download!");
  };

  const handlePreview = () => {
    toast.info("Abrindo visualização...");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/mockup/preview/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Preview
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Editor de Template</h1>
            <p className="text-gray-600">Personalize seu conteúdo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Visualização ao Vivo</CardTitle>
                  <Button variant="outline" size="sm" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-1" />
                    Tela Cheia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="aspect-square rounded-lg flex flex-col items-center justify-center p-8 text-center"
                  style={{ 
                    backgroundColor: backgroundColor,
                    color: textColor 
                  }}
                >
                  <h1 
                    className={`font-bold mb-4 ${
                      fontSize === 'small' ? 'text-2xl' : 
                      fontSize === 'medium' ? 'text-3xl' : 'text-4xl'
                    }`}
                  >
                    {title}
                  </h1>
                  
                  <h2 
                    className={`font-medium mb-6 opacity-90 ${
                      fontSize === 'small' ? 'text-lg' : 
                      fontSize === 'medium' ? 'text-xl' : 'text-2xl'
                    }`}
                  >
                    {subtitle}
                  </h2>
                  
                  <p 
                    className={`opacity-80 max-w-sm ${
                      fontSize === 'small' ? 'text-sm' : 
                      fontSize === 'medium' ? 'text-base' : 'text-lg'
                    }`}
                  >
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Conteúdo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Conteúdo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título Principal</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Digite o subtítulo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite a descrição"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Estilo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Estilo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#8B5CF6"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textColor">Cor do Texto</Label>
                  <div className="flex gap-2">
                    <Input
                      id="textColor"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      placeholder="#FFFFFF"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequena</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Template
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar como Imagem
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
