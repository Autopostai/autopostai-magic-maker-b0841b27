
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

interface NicheSectionProps {
  niche: string;
  onNicheChange: (value: string) => void;
  validationErrors: string[];
}

export function NicheSection({ niche, onNicheChange, validationErrors }: NicheSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Seu Nicho *
        </CardTitle>
        <CardDescription>
          Qual é o seu nicho ou área de atuação?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Ex: Saúde e bem-estar, Marketing digital, Culinária..."
          value={niche}
          onChange={(e) => onNicheChange(e.target.value)}
          className={validationErrors.includes("Nicho") ? "border-red-500" : ""}
        />
      </CardContent>
    </Card>
  );
}
