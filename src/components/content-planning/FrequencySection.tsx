
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";

interface FrequencySectionProps {
  postsPerMonth: string;
  postsPerDay: string;
  onPostsPerMonthChange: (value: string) => void;
  onPostsPerDayChange: (value: string) => void;
  validationErrors: string[];
}

export function FrequencySection({
  postsPerMonth,
  postsPerDay,
  onPostsPerMonthChange,
  onPostsPerDayChange,
  validationErrors
}: FrequencySectionProps) {
  const shouldShowDailyPosts = parseInt(postsPerMonth) >= 30;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-600" />
          Frequência de Publicação *
        </CardTitle>
        <CardDescription>
          Defina quantos posts você quer publicar
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postsPerMonth">Quantidade de postagens no mês *</Label>
          <Input
            id="postsPerMonth"
            type="number"
            placeholder="Ex: 30"
            value={postsPerMonth}
            onChange={(e) => onPostsPerMonthChange(e.target.value)}
            className={validationErrors.includes("Quantidade de postagens no mês") ? "border-red-500" : ""}
          />
        </div>
        {shouldShowDailyPosts && (
          <div>
            <Label htmlFor="postsPerDay">Quantidade de postagens por dia</Label>
            <Input
              id="postsPerDay"
              type="number"
              placeholder="Ex: 1"
              value={postsPerDay}
              onChange={(e) => onPostsPerDayChange(e.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
