
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare } from "lucide-react";

interface CommunicationToneSectionProps {
  communicationTone: string;
  customTone: string;
  showCustomTone: boolean;
  onToneChange: (value: string) => void;
  onCustomToneChange: (value: string) => void;
  validationErrors: string[];
}

const toneOptions = [
  "Educativo",
  "Inspirador",
  "Engraçado",
  "Direto",
  "Profundo",
  "Casual",
  "Profissional",
  "Motivacional",
  "Outro"
];

export function CommunicationToneSection({
  communicationTone,
  customTone,
  showCustomTone,
  onToneChange,
  onCustomToneChange,
  validationErrors
}: CommunicationToneSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-purple-600" />
          Tom de Comunicação Desejado *
        </CardTitle>
        <CardDescription>
          Como você quer se comunicar com sua audiência?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={communicationTone} onValueChange={onToneChange}>
          <SelectTrigger className={validationErrors.includes("Tom de comunicação") ? "border-red-500" : ""}>
            <SelectValue placeholder="Selecione o tom de comunicação" />
          </SelectTrigger>
          <SelectContent>
            {toneOptions.map((tone) => (
              <SelectItem key={tone} value={tone}>{tone}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {showCustomTone && (
          <div>
            <Label htmlFor="customTone">Digite seu tom de comunicação personalizado *</Label>
            <Input
              id="customTone"
              placeholder="Ex: Descontraído e amigável"
              value={customTone}
              onChange={(e) => onCustomToneChange(e.target.value)}
              className={validationErrors.includes("Tom de comunicação personalizado") ? "border-red-500" : ""}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
