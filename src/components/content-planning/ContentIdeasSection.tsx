
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";

interface ContentIdeasSectionProps {
  contentIdeas: string;
  onContentIdeasChange: (value: string) => void;
}

export function ContentIdeasSection({ contentIdeas, onContentIdeasChange }: ContentIdeasSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-purple-600" />
          Ideias de Conteúdos que Quer Gerar
        </CardTitle>
        <CardDescription>
          Compartilhe suas ideias, tópicos ou temas específicos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Ex: Dicas de produtividade, receitas saudáveis, tutoriais de marketing..."
          value={contentIdeas}
          onChange={(e) => onContentIdeasChange(e.target.value)}
          rows={4}
        />
      </CardContent>
    </Card>
  );
}
