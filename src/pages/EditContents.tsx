
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function EditContents() {
  const location = useLocation();
  const navigate = useNavigate();
  const { calendarData, planningData } = location.state || {};
  
  const [editableContents, setEditableContents] = useState(calendarData || []);

  const handleContentChange = (index: number, field: string, value: string) => {
    const updatedContents = [...editableContents];
    if (field === 'date' || field === 'time') {
      updatedContents[index] = { ...updatedContents[index], [field]: value };
    } else {
      updatedContents[index] = {
        ...updatedContents[index],
        content: { ...updatedContents[index].content, [field]: value }
      };
    }
    setEditableContents(updatedContents);
  };

  const handleSaveChanges = () => {
    // Salvar as alterações e voltar para o calendário
    navigate("/content-calendar", { 
      state: { 
        ...planningData, 
        calendarData: editableContents 
      } 
    });
    toast.success("Alterações salvas com sucesso!");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/content-calendar", { state: planningData })}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Calendário
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Editar Conteúdos do Calendário
          </h1>
          <p className="text-gray-600">
            Edite todos os conteúdos do seu planejamento de forma organizada
          </p>
        </div>

        <div className="space-y-6">
          {editableContents.map((item: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Conteúdo {index + 1} - {formatDate(item.date)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`date-${index}`}>Data</Label>
                    <Input
                      id={`date-${index}`}
                      type="date"
                      value={item.date}
                      onChange={(e) => handleContentChange(index, 'date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`time-${index}`}>Horário</Label>
                    <Input
                      id={`time-${index}`}
                      value={item.content.time}
                      onChange={(e) => handleContentChange(index, 'time', e.target.value)}
                      placeholder="Ex: 14:00"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`platform-${index}`}>Plataforma</Label>
                    <Select 
                      value={item.content.platform} 
                      onValueChange={(value) => handleContentChange(index, 'platform', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`type-${index}`}>Tipo de Conteúdo</Label>
                    <Select 
                      value={item.content.type} 
                      onValueChange={(value) => handleContentChange(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Carrossel">Carrossel</SelectItem>
                        <SelectItem value="Vídeo">Vídeo</SelectItem>
                        <SelectItem value="Imagem com texto">Imagem com texto</SelectItem>
                        <SelectItem value="Reels">Reels</SelectItem>
                        <SelectItem value="Stories">Stories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`title-${index}`}>Título do Conteúdo</Label>
                    <Input
                      id={`title-${index}`}
                      value={item.content.title}
                      onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                      placeholder="Título do post"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`description-${index}`}>Descrição/Legenda</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={item.content.description}
                    onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                    rows={3}
                    placeholder="Descrição detalhada do conteúdo ou legenda"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            onClick={handleSaveChanges}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            <Save className="mr-2 h-5 w-5" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
