
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ValidationErrors } from "@/components/content-planning/ValidationErrors";
import { FrequencySection } from "@/components/content-planning/FrequencySection";
import { NicheSection } from "@/components/content-planning/NicheSection";
import { ContentTypesSection } from "@/components/content-planning/ContentTypesSection";
import { PlatformsSection } from "@/components/content-planning/PlatformsSection";
import { CommunicationToneSection } from "@/components/content-planning/CommunicationToneSection";
import { ContentIdeasSection } from "@/components/content-planning/ContentIdeasSection";
import { ImportantDatesSection } from "@/components/content-planning/ImportantDatesSection";

export default function ContentPlanning() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postsPerMonth: "",
    postsPerDay: "",
    niche: "",
    contentTypes: [] as string[],
    platforms: [] as string[],
    communicationTone: "",
    customTone: "",
    contentIdeas: "",
    importantDates: ""
  });

  const [showCustomTone, setShowCustomTone] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleContentTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: checked 
        ? [...prev.contentTypes, type]
        : prev.contentTypes.filter(t => t !== type)
    }));
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleToneChange = (value: string) => {
    setFormData(prev => ({ ...prev, communicationTone: value }));
    if (value === "Outro") {
      setShowCustomTone(true);
    } else {
      setShowCustomTone(false);
      setFormData(prev => ({ ...prev, customTone: "" }));
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.postsPerMonth) {
      errors.push("Quantidade de postagens no mês");
    }

    if (!formData.niche.trim()) {
      errors.push("Nicho");
    }

    if (formData.contentTypes.length === 0) {
      errors.push("Tipo de conteúdo preferido");
    }

    if (formData.platforms.length === 0) {
      errors.push("Principais plataformas");
    }

    if (!formData.communicationTone) {
      errors.push("Tom de comunicação");
    }

    if (formData.communicationTone === "Outro" && !formData.customTone.trim()) {
      errors.push("Tom de comunicação personalizado");
    }

    return errors;
  };

  const handleGeneratePlanning = () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      toast.error("Campos obrigatórios não preenchidos", {
        description: "Por favor, preencha todas as informações obrigatórias para continuar."
      });
      return;
    }

    setValidationErrors([]);

    const finalData = {
      ...formData,
      communicationTone: formData.communicationTone === "Outro" ? formData.customTone : formData.communicationTone
    };

    navigate("/content-calendar", { state: finalData });
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Calendar className="h-8 w-8 text-purple-600" />
            Planejamento de Conteúdo
          </h1>
          <p className="text-gray-600">
            Configure suas preferências para gerar um planejamento personalizado de conteúdo
          </p>
        </div>

        <ValidationErrors errors={validationErrors} />

        <div className="grid gap-6">
          <FrequencySection
            postsPerMonth={formData.postsPerMonth}
            postsPerDay={formData.postsPerDay}
            onPostsPerMonthChange={(value) => setFormData(prev => ({ ...prev, postsPerMonth: value }))}
            onPostsPerDayChange={(value) => setFormData(prev => ({ ...prev, postsPerDay: value }))}
            validationErrors={validationErrors}
          />

          <NicheSection
            niche={formData.niche}
            onNicheChange={(value) => setFormData(prev => ({ ...prev, niche: value }))}
            validationErrors={validationErrors}
          />

          <ContentTypesSection
            contentTypes={formData.contentTypes}
            onContentTypeChange={handleContentTypeChange}
            validationErrors={validationErrors}
          />

          <PlatformsSection
            platforms={formData.platforms}
            onPlatformChange={handlePlatformChange}
            validationErrors={validationErrors}
          />

          <CommunicationToneSection
            communicationTone={formData.communicationTone}
            customTone={formData.customTone}
            showCustomTone={showCustomTone}
            onToneChange={handleToneChange}
            onCustomToneChange={(value) => setFormData(prev => ({ ...prev, customTone: value }))}
            validationErrors={validationErrors}
          />

          <ContentIdeasSection
            contentIdeas={formData.contentIdeas}
            onContentIdeasChange={(value) => setFormData(prev => ({ ...prev, contentIdeas: value }))}
          />

          <ImportantDatesSection
            importantDates={formData.importantDates}
            onImportantDatesChange={(value) => setFormData(prev => ({ ...prev, importantDates: value }))}
          />

          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleGeneratePlanning}
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              GERAR PLANEJAMENTO DE CONTEÚDO
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
