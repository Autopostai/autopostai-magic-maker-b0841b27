
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Save, Eye } from "lucide-react";
import { toast } from "sonner";

interface VisualEditorProps {
  content: any;
  contentType?: string;
  artStyle?: string;
  carouselType?: string;
}

export const VisualEditor = ({ content, contentType = "post", artStyle = "educativo", carouselType = "single" }: VisualEditorProps) => {
  // Provide default values if content is null or undefined
  const safeContent = content || {
    title: "Título do Post",
    subtitle: "Subtítulo aqui",
    description: "Descrição do conteúdo",
    background: "#8B5CF6",
    textColor: "#FFFFFF"
  };

  const [editableContent, setEditableContent] = useState({
    title: safeContent.title || "Título do Post",
    subtitle: safeContent.subtitle || "Subtítulo aqui", 
    description: safeContent.description || "Descrição do conteúdo",
    background: safeContent.background || "#8B5CF6",
    textColor: safeContent.textColor || "#FFFFFF"
  });

  const handleSave = () => {
    toast.success("Conteúdo salvo com sucesso!");
  };

  const handleExport = () => {
    toast.success("Imagem exportada!");
  };

  const handlePreview = () => {
    toast.info("Abrindo preview...");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Preview Area */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Visualização</CardTitle>
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="aspect-square rounded-lg flex flex-col items-center justify-center p-8 text-center"
              style={{ 
                backgroundColor: editableContent.background,
                color: editableContent.textColor 
              }}
            >
              <h1 className="text-3xl font-bold mb-4">
                {editableContent.title}
              </h1>
              
              <h2 className="text-xl font-medium mb-6 opacity-90">
                {editableContent.subtitle}
              </h2>
              
              <p className="opacity-80 max-w-sm text-base">
                {editableContent.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Editor Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Editar Conteúdo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={editableContent.title}
                onChange={(e) => setEditableContent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Digite o título"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Input
                id="subtitle"
                value={editableContent.subtitle}
                onChange={(e) => setEditableContent(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Digite o subtítulo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={editableContent.description}
                onChange={(e) => setEditableContent(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Digite a descrição"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="background">Cor de Fundo</Label>
              <div className="flex gap-2">
                <Input
                  id="background"
                  type="color"
                  value={editableContent.background}
                  onChange={(e) => setEditableContent(prev => ({ ...prev, background: e.target.value }))}
                  className="w-16 h-10"
                />
                <Input
                  value={editableContent.background}
                  onChange={(e) => setEditableContent(prev => ({ ...prev, background: e.target.value }))}
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
                  value={editableContent.textColor}
                  onChange={(e) => setEditableContent(prev => ({ ...prev, textColor: e.target.value }))}
                  className="w-16 h-10"
                />
                <Input
                  value={editableContent.textColor}
                  onChange={(e) => setEditableContent(prev => ({ ...prev, textColor: e.target.value }))}
                  placeholder="#FFFFFF"
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};
