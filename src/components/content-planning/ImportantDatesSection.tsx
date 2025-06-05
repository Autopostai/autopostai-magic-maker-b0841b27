
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Clock } from "lucide-react";

interface ImportantDatesSectionProps {
  importantDates: string;
  onImportantDatesChange: (value: string) => void;
}

export function ImportantDatesSection({ importantDates, onImportantDatesChange }: ImportantDatesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-600" />
          Datas Importantes ou Eventos no Mês
        </CardTitle>
        <CardDescription>
          Mencione datas especiais, lançamentos ou eventos importantes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Ex: Black Friday (29/11), Natal (25/12), lançamento do produto (15/12)..."
          value={importantDates}
          onChange={(e) => onImportantDatesChange(e.target.value)}
          rows={3}
        />
      </CardContent>
    </Card>
  );
}
