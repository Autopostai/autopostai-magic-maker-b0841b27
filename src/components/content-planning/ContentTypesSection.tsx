
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface ContentTypesSectionProps {
  contentTypes: string[];
  onContentTypeChange: (type: string, checked: boolean) => void;
  validationErrors: string[];
}

const contentTypeOptions = [
  "Vídeos",
  "Carrossel",
  "Imagem com texto",
  "Reels",
  "Stories",
  "Infográficos",
  "Citações",
  "Tutoriais"
];

export function ContentTypesSection({
  contentTypes,
  onContentTypeChange,
  validationErrors
}: ContentTypesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Tipos de Conteúdo Preferido *
        </CardTitle>
        <CardDescription>
          Selecione os formatos que você prefere criar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contentTypeOptions.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={contentTypes.includes(type)}
                onCheckedChange={(checked) => onContentTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={type} className="text-sm">{type}</Label>
            </div>
          ))}
        </div>
        {validationErrors.includes("Tipo de conteúdo preferido") && (
          <p className="text-sm text-red-600 mt-2">Selecione pelo menos um tipo de conteúdo</p>
        )}
      </CardContent>
    </Card>
  );
}
