
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy, Edit, Download, RefreshCw } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type BioResultData = {
  bio: string;
  platform: string;
  persona: string;
  tom: string;
};

export default function BioResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bioData, setBioData] = useState<BioResultData | null>(null);
  const [editedBio, setEditedBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = location.state as BioResultData;
    if (!data) {
      navigate('/bio-optimizer');
      return;
    }
    setBioData(data);
    setEditedBio(data.bio);
  }, [location.state, navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedBio);
    toast.success("Bio copiada para a área de transferência!");
  };

  const downloadBio = () => {
    const element = document.createElement("a");
    const file = new Blob([editedBio], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `bio_${bioData?.platform || 'otimizada'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Bio baixada com sucesso!");
  };

  const saveChanges = () => {
    setIsEditing(false);
    toast.success("Alterações salvas!");
  };

  if (!bioData) {
    return <div>Carregando...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/bio-optimizer">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Bio Otimizada</h1>
            <p className="text-gray-600">
              Sua bio personalizada está pronta!
            </p>
          </div>
        </div>

        {/* Result Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✨ Bio Gerada com Sucesso
            </CardTitle>
            <CardDescription>
              Bio otimizada para {bioData.platform} no tom {bioData.tom.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bio Display/Edit */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="bio-result" className="text-lg font-medium">
                  Sua Bio Otimizada:
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={saveChanges}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Salvar
                    </Button>
                  )}
                </div>
              </div>

              <Textarea
                id="bio-result"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className={`min-h-[200px] text-base ${!isEditing ? 'bg-gray-50' : ''}`}
                readOnly={!isEditing}
              />

              <div className="text-sm text-gray-500">
                {editedBio.length} caracteres
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={copyToClipboard} className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copiar Bio
              </Button>
              
              <Button 
                variant="outline" 
                onClick={downloadBio}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Baixar
              </Button>

              <Button 
                variant="outline" 
                asChild
                className="flex items-center gap-2"
              >
                <Link to="/bio-optimizer">
                  <RefreshCw className="h-4 w-4" />
                  Gerar Nova Bio
                </Link>
              </Button>
            </div>

            {/* Bio Info */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Informações da Bio:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Persona:</span> {bioData.persona}
                </div>
                <div>
                  <span className="font-medium">Plataforma:</span> {bioData.platform}
                </div>
                <div>
                  <span className="font-medium">Tom:</span> {bioData.tom}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Dicas para Usar sua Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• Teste diferentes versões para ver qual converte melhor</li>
              <li>• Atualize sua bio regularmente com novas conquistas</li>
              <li>• Use emojis estrategicamente para chamar atenção</li>
              <li>• Inclua uma chamada para ação clara</li>
              <li>• Monitore o engajamento após atualizar sua bio</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
