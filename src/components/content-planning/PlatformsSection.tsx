
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

interface PlatformsSectionProps {
  platforms: string[];
  onPlatformChange: (platform: string, checked: boolean) => void;
  validationErrors: string[];
}

const platformOptions = [
  "Instagram",
  "TikTok",
  "YouTube Shorts",
  "Facebook",
  "LinkedIn",
  "Twitter",
  "Pinterest",
  "WhatsApp Status"
];

export function PlatformsSection({
  platforms,
  onPlatformChange,
  validationErrors
}: PlatformsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-600" />
          Principais Plataformas de Publicação *
        </CardTitle>
        <CardDescription>
          Onde você vai publicar seu conteúdo?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platformOptions.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={platform}
                checked={platforms.includes(platform)}
                onCheckedChange={(checked) => onPlatformChange(platform, checked as boolean)}
              />
              <Label htmlFor={platform} className="text-sm">{platform}</Label>
            </div>
          ))}
        </div>
        {validationErrors.includes("Principais plataformas") && (
          <p className="text-sm text-red-600 mt-2">Selecione pelo menos uma plataforma</p>
        )}
      </CardContent>
    </Card>
  );
}
