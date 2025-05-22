
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Download, Share, Image as ImageIcon, Text, Bold, Italic, 
  Underline, AlignLeft, AlignCenter, AlignRight, 
  ChevronLeft, ChevronRight, Upload, Music, Mic, 
  Film, Play, Square, Plus, CheckCircle2 
} from "lucide-react";
import { ContentGenerationData } from "@/pages/CreateContent";
import { toast } from "sonner";

interface VisualEditorProps {
  content: ContentGenerationData | null;
  contentType: string;
  artStyle?: string;
  carouselType?: string;
}

export function VisualEditor({ content, contentType, artStyle = "minimalista", carouselType = "multi" }: VisualEditorProps) {
  const [activeTab, setActiveTab] = useState("background");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const [background, setBackground] = useState<{
    type: "color" | "gradient" | "image";
    color: string;
    gradient: {
      colorStart: string;
      colorEnd: string;
      direction: "to-t" | "to-b" | "to-l" | "to-r" | "to-tr" | "to-tl" | "to-br" | "to-bl";
    };
    overlay: {
      enabled: boolean;
      color: string;
      opacity: number;
    };
  }>({
    type: "gradient",
    color: "#ffffff",
    gradient: {
      colorStart: getStyleColors(artStyle).start,
      colorEnd: getStyleColors(artStyle).end,
      direction: "to-b",
    },
    overlay: {
      enabled: true,
      color: "#000000",
      opacity: 0.2,
    },
  });

  // Slides com conteúdo para cada slide
  const [slides, setSlides] = useState<Array<{
    id: string;
    background: typeof background;
    textElements: Array<{
      id: string;
      content: string;
      fontSize: number;
      fontWeight: "normal" | "bold";
      fontStyle: "normal" | "italic";
      textDecoration: "none" | "underline";
      color: string;
      alignment: "left" | "center" | "right";
      position: { x: number; y: number };
      fontFamily: string;
    }>;
  }>>(
    carouselType === "multi" 
      ? (content?.slides || []).map((slide, index) => ({
          id: `slide-${index}`,
          background: {
            ...background,
            gradient: {
              ...background.gradient,
              colorStart: getStyleColors(artStyle).start,
              colorEnd: getStyleColors(artStyle).end,
            }
          },
          textElements: [
            {
              id: index === 0 ? "title" : `slide-text-${index}`,
              content: index === 0 ? (content?.title || "Título do Conteúdo") : slide,
              fontSize: index === 0 ? 24 : 18,
              fontWeight: index === 0 ? "bold" : "normal",
              fontStyle: "normal",
              textDecoration: "none",
              color: "#ffffff",
              alignment: index === 0 ? "center" : "left",
              position: { x: 0, y: index === 0 ? 0 : 50 },
              fontFamily: "Inter",
            },
          ],
        }))
      : [{
          id: "single-post",
          background: {
            ...background,
            gradient: {
              ...background.gradient,
              colorStart: getStyleColors(artStyle).start,
              colorEnd: getStyleColors(artStyle).end,
            }
          },
          textElements: [
            {
              id: "title",
              content: content?.title || "Título do Conteúdo",
              fontSize: 24,
              fontWeight: "bold",
              fontStyle: "normal",
              textDecoration: "none",
              color: "#ffffff",
              alignment: "center",
              position: { x: 0, y: 0 },
              fontFamily: "Inter",
            },
            {
              id: "main-content",
              content: content?.slides?.[0] || "Conteúdo principal",
              fontSize: 18,
              fontWeight: "normal",
              fontStyle: "normal",
              textDecoration: "none",
              color: "#ffffff",
              alignment: "left",
              position: { x: 0, y: 60 },
              fontFamily: "Inter",
            },
          ],
        }]
  );

  // Estado para edição de vídeo
  const [videoEditor, setVideoEditor] = useState({
    caption: {
      enabled: true,
      text: content?.caption || "Legenda do vídeo",
      fontSize: 16,
      fontColor: "#ffffff",
      fontFamily: "Inter",
      fontWeight: "bold",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "bottom", // Pode ser "top", "middle", "bottom"
    },
    audio: {
      volume: 1.0,
      musicVolume: 0.5,
      musicTrack: "none",
    },
    trim: {
      start: 0,
      end: 100,
    }
  });

  const [selectedTextId, setSelectedTextId] = useState<string | null>(slides[0]?.textElements[0]?.id || null);

  const gradientDirections = {
    "to-b": "De cima para baixo",
    "to-t": "De baixo para cima",
    "to-r": "Da esquerda para a direita",
    "to-l": "Da direita para a esquerda",
    "to-tr": "Diagonal (Esq. inferior para Dir. superior)",
    "to-tl": "Diagonal (Dir. inferior para Esq. superior)",
    "to-br": "Diagonal (Esq. superior para Dir. inferior)",
    "to-bl": "Diagonal (Dir. superior para Esq. inferior)",
  };

  const fontFamilies = [
    "Inter", "Arial", "Helvetica", "Roboto", "Montserrat", 
    "Playfair Display", "Merriweather", "Open Sans", "Poppins", "Lato"
  ];

  // Função para obter cores com base no estilo de arte selecionado
  function getStyleColors(style: string) {
    switch (style) {
      case "minimalista": 
        return { start: "#ffffff", end: "#f0f0f0" };
      case "tumblr": 
        return { start: "#9b87f5", end: "#ffffff" };
      case "informal": 
        return { start: "#FFC8DD", end: "#FFAFCC" };
      case "corporativo": 
        return { start: "#003049", end: "#1a659e" };
      case "moderno": 
        return { start: "#F15BB5", end: "#9B5DE5" };
      case "elegante": 
        return { start: "#16213E", end: "#0F3460" };
      case "retro": 
        return { start: "#FFB347", end: "#FFCC33" };
      default: 
        return { start: "#9b87f5", end: "#ffffff" };
    }
  }

  const handleGradientChange = (field: keyof typeof background.gradient, value: any) => {
    const updatedSlides = [...slides];
    const currentSlideData = updatedSlides[currentSlide];
    
    updatedSlides[currentSlide] = {
      ...currentSlideData,
      background: {
        ...currentSlideData.background,
        gradient: {
          ...currentSlideData.background.gradient,
          [field]: value,
        },
      }
    };
    
    setSlides(updatedSlides);
  };

  const handleBackgroundTypeChange = (value: "color" | "gradient" | "image") => {
    const updatedSlides = [...slides];
    const currentSlideData = updatedSlides[currentSlide];
    
    updatedSlides[currentSlide] = {
      ...currentSlideData,
      background: {
        ...currentSlideData.background,
        type: value,
      }
    };
    
    setSlides(updatedSlides);
  };

  const handleColorChange = (value: string) => {
    const updatedSlides = [...slides];
    const currentSlideData = updatedSlides[currentSlide];
    
    updatedSlides[currentSlide] = {
      ...currentSlideData,
      background: {
        ...currentSlideData.background,
        color: value,
      }
    };
    
    setSlides(updatedSlides);
  };

  const handleOverlayChange = (field: keyof typeof background.overlay, value: any) => {
    const updatedSlides = [...slides];
    const currentSlideData = updatedSlides[currentSlide];
    
    updatedSlides[currentSlide] = {
      ...currentSlideData,
      background: {
        ...currentSlideData.background,
        overlay: {
          ...currentSlideData.background.overlay,
          [field]: value,
        }
      }
    };
    
    setSlides(updatedSlides);
  };

  const handleTextElementChange = (id: string, field: string, value: any) => {
    const updatedSlides = [...slides];
    const currentSlideData = updatedSlides[currentSlide];
    
    updatedSlides[currentSlide] = {
      ...currentSlideData,
      textElements: currentSlideData.textElements.map(el => 
        el.id === id ? { ...el, [field]: value } : el
      )
    };
    
    setSlides(updatedSlides);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        toast.success("Imagem carregada com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedVideo(event.target?.result as string);
        toast.success("Vídeo carregado com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTextElement = () => {
    const updatedSlides = [...slides];
    const currentSlideData = updatedSlides[currentSlide];
    
    const newId = `text-${currentSlide}-${Date.now()}`;
    
    updatedSlides[currentSlide] = {
      ...currentSlideData,
      textElements: [
        ...currentSlideData.textElements,
        {
          id: newId,
          content: "Novo texto",
          fontSize: 16,
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
          color: "#ffffff",
          alignment: "left",
          position: { x: 10, y: 10 + currentSlideData.textElements.length * 30 },
          fontFamily: "Inter",
        }
      ]
    };
    
    setSlides(updatedSlides);
    setSelectedTextId(newId);
  };

  const handleDeleteTextElement = (id: string) => {
    if (slides[currentSlide].textElements.length <= 1) {
      toast.error("Você não pode remover todos os elementos de texto!");
      return;
    }
    
    const updatedSlides = [...slides];
    const currentSlideData = updatedSlides[currentSlide];
    
    updatedSlides[currentSlide] = {
      ...currentSlideData,
      textElements: currentSlideData.textElements.filter(el => el.id !== id)
    };
    
    setSlides(updatedSlides);
    setSelectedTextId(updatedSlides[currentSlide].textElements[0]?.id || null);
  };

  const handleExport = () => {
    // Em uma implementação real, isso geraria e baixaria a imagem/PDF
    toast.success("Conteúdo exportado com sucesso!", {
      description: "O download deve começar automaticamente.",
    });
  };

  const handleCopyCaption = () => {
    if (content?.caption) {
      navigator.clipboard.writeText(
        `${content.caption}\n\n${content.hashtags?.join(' ') || ''}`
      );
      toast.success("Legenda copiada para a área de transferência!");
    }
  };
  
  const selectedText = selectedTextId ? 
    slides[currentSlide]?.textElements.find(el => el.id === selectedTextId) || null : null;

  const getEditorStyles = (slide: typeof slides[0]) => {
    let bgStyle: React.CSSProperties = {};
    
    if (slide.background.type === "color") {
      bgStyle.backgroundColor = slide.background.color;
    } else if (slide.background.type === "gradient") {
      bgStyle.backgroundImage = `linear-gradient(${slide.background.gradient.direction}, ${slide.background.gradient.colorStart}, ${slide.background.gradient.colorEnd})`;
    } else if (slide.background.type === "image" && uploadedImage) {
      bgStyle.backgroundImage = `url(${uploadedImage})`;
      bgStyle.backgroundSize = "cover";
      bgStyle.backgroundPosition = "center";
    }
    
    if (slide.background.overlay.enabled) {
      bgStyle.position = "relative";
    }
    
    return bgStyle;
  };

  const renderEditorContent = () => {
    if (contentType === "reels") {
      return (
        <div className="space-y-4">
          <div className="bg-black aspect-[9/16] flex items-center justify-center text-white relative overflow-hidden">
            {uploadedVideo ? (
              <video 
                src={uploadedVideo} 
                controls 
                className="w-full h-full object-contain"
              ></video>
            ) : videoUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p>Vídeo de URL carregado: {videoUrl}</p>
                <Play className="h-16 w-16" />
              </div>
            ) : (
              <div className="text-center p-4">
                <Film className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Nenhum vídeo selecionado</p>
                <p className="text-sm text-gray-400">Faça upload ou insira uma URL para visualizar</p>
              </div>
            )}
            
            {videoEditor.caption.enabled && (
              <div 
                className={`absolute ${videoEditor.caption.position === "top" ? "top-8" : videoEditor.caption.position === "middle" ? "top-1/2 -translate-y-1/2" : "bottom-8"} left-4 right-4 p-2`}
                style={{
                  backgroundColor: videoEditor.caption.backgroundColor,
                  fontSize: `${videoEditor.caption.fontSize}px`,
                  color: videoEditor.caption.fontColor,
                  fontFamily: videoEditor.caption.fontFamily,
                  fontWeight: videoEditor.caption.fontWeight,
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                {videoEditor.caption.text}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Legendas</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="caption-toggle"
                  checked={videoEditor.caption.enabled}
                  onChange={(e) => setVideoEditor({
                    ...videoEditor,
                    caption: {
                      ...videoEditor.caption,
                      enabled: e.target.checked
                    }
                  })}
                  className="h-4 w-4"
                />
                <Label htmlFor="caption-toggle">Mostrar Legendas</Label>
              </div>
              
              {videoEditor.caption.enabled && (
                <>
                  <Textarea 
                    value={videoEditor.caption.text}
                    onChange={(e) => setVideoEditor({
                      ...videoEditor,
                      caption: {
                        ...videoEditor.caption,
                        text: e.target.value
                      }
                    })}
                    placeholder="Digite o texto da legenda"
                    className="min-h-[80px]"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="captionFont">Tamanho da Fonte</Label>
                      <div className="flex gap-2 items-center">
                        <Slider 
                          id="captionFont"
                          min={12}
                          max={32}
                          step={1}
                          value={[videoEditor.caption.fontSize]}
                          onValueChange={(values) => setVideoEditor({
                            ...videoEditor,
                            caption: {
                              ...videoEditor.caption,
                              fontSize: values[0]
                            }
                          })}
                        />
                        <span className="text-sm w-8 text-right">{videoEditor.caption.fontSize}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="captionColor">Cor do Texto</Label>
                      <Input 
                        id="captionColor"
                        type="color"
                        value={videoEditor.caption.fontColor}
                        onChange={(e) => setVideoEditor({
                          ...videoEditor,
                          caption: {
                            ...videoEditor.caption,
                            fontColor: e.target.value
                          }
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="captionFont">Posição</Label>
                      <Select 
                        value={videoEditor.caption.position}
                        onValueChange={(value) => setVideoEditor({
                          ...videoEditor,
                          caption: {
                            ...videoEditor.caption,
                            position: value as "top" | "middle" | "bottom"
                          }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a posição" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Topo</SelectItem>
                          <SelectItem value="middle">Meio</SelectItem>
                          <SelectItem value="bottom">Base</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="captionBg">Fundo da Legenda</Label>
                      <Input 
                        id="captionBg"
                        type="color"
                        value={videoEditor.caption.backgroundColor.replace("rgba(", "").replace(")", "").split(",").slice(0, 3).join(",") + ")"}
                        onChange={(e) => {
                          const rgb = e.target.value;
                          const rgba = rgb.replace(")", ", 0.5)").replace("rgb", "rgba");
                          setVideoEditor({
                            ...videoEditor,
                            caption: {
                              ...videoEditor.caption,
                              backgroundColor: rgba
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Áudio</Label>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="videoVolume">Volume do Vídeo</Label>
                  <div className="flex gap-2 items-center">
                    <Slider 
                      id="videoVolume"
                      min={0}
                      max={1}
                      step={0.1}
                      value={[videoEditor.audio.volume]}
                      onValueChange={(values) => setVideoEditor({
                        ...videoEditor,
                        audio: {
                          ...videoEditor.audio,
                          volume: values[0]
                        }
                      })}
                    />
                    <span className="text-sm w-8 text-right">{Math.round(videoEditor.audio.volume * 100)}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="musicTrack">Trilha Sonora</Label>
                  <Select
                    value={videoEditor.audio.musicTrack}
                    onValueChange={(value) => setVideoEditor({
                      ...videoEditor,
                      audio: {
                        ...videoEditor.audio,
                        musicTrack: value
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma trilha sonora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      <SelectItem value="upbeat">Animada</SelectItem>
                      <SelectItem value="relaxing">Relaxante</SelectItem>
                      <SelectItem value="corporate">Corporativa</SelectItem>
                      <SelectItem value="inspiring">Inspiradora</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {videoEditor.audio.musicTrack !== "none" && (
                    <div className="space-y-2 mt-2">
                      <Label htmlFor="musicVolume">Volume da Música</Label>
                      <div className="flex gap-2 items-center">
                        <Slider 
                          id="musicVolume"
                          min={0}
                          max={1}
                          step={0.1}
                          value={[videoEditor.audio.musicVolume]}
                          onValueChange={(values) => setVideoEditor({
                            ...videoEditor,
                            audio: {
                              ...videoEditor.audio,
                              musicVolume: values[0]
                            }
                          })}
                        />
                        <span className="text-sm w-8 text-right">{Math.round(videoEditor.audio.musicVolume * 100)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Cortar Vídeo</Label>
              <div className="bg-gray-100 h-10 relative rounded-md">
                <div 
                  className="absolute h-full bg-purple-200 rounded-md"
                  style={{
                    left: `${videoEditor.trim.start}%`,
                    right: `${100 - videoEditor.trim.end}%`
                  }}
                ></div>
                <div className="absolute inset-0 flex justify-between items-center px-2">
                  <div 
                    className="h-8 w-3 bg-purple-500 rounded cursor-ew-resize"
                    style={{ left: `${videoEditor.trim.start}%` }}
                    // Simplificado - em uma implementação real adicionaríamos eventos de arrastar
                  ></div>
                  <div 
                    className="h-8 w-3 bg-purple-500 rounded cursor-ew-resize"
                    style={{ right: `${100 - videoEditor.trim.end}%` }}
                    // Simplificado - em uma implementação real adicionaríamos eventos de arrastar
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Início: {videoEditor.trim.start}%</span>
                <span>Fim: {videoEditor.trim.end}%</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (contentType === "video") {
      return (
        <div className="space-y-4">
          <div className="bg-gray-100 p-6 rounded-md">
            <h3 className="font-bold text-lg mb-4">Roteiro para Vídeo</h3>
            <div className="space-y-3">
              {content?.script ? (
                <div className="whitespace-pre-wrap">{content.script}</div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Text className="h-8 w-8 mx-auto mb-2" />
                  <p>Roteiro gerado será exibido aqui</p>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                if (content?.script) {
                  navigator.clipboard.writeText(content.script);
                  toast.success("Roteiro copiado para a área de transferência!");
                }
              }}
            >
              Copiar Roteiro
            </Button>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Dicas para gravação:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Grave em um ambiente bem iluminado</li>
              <li>Use um microfone externo para melhor qualidade de áudio</li>
              <li>Mantenha contato visual com a câmera</li>
              <li>Faça variações de tom para manter o interesse</li>
              <li>Ensaie algumas vezes antes da gravação final</li>
            </ul>
          </div>
        </div>
      );
    } else if (contentType === "legenda") {
      return (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Legenda Gerada</h3>
              <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap border">
                {content?.caption || "A legenda gerada aparecerá aqui."}
                {content?.hashtags && content.hashtags.length > 0 && (
                  <div className="mt-3">
                    {content.hashtags.map((tag, index) => (
                      <span key={index} className="mr-1 text-blue-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={handleCopyCaption}>
                  Copiar Legenda Completa
                </Button>
                <Button variant="outline" onClick={() => {
                  if (content?.hashtags && content.hashtags.length > 0) {
                    navigator.clipboard.writeText(content.hashtags.join(' '));
                    toast.success("Hashtags copiadas para a área de transferência!");
                  }
                }}>
                  Copiar Apenas Hashtags
                </Button>
              </div>
              <div className="mt-6 space-y-2">
                <Label>Análise de Engajamento</Label>
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Legenda com boa densidade de hashtags relevantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Contém chamada para ação (CTA) para aumentar comentários</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Comprimento ideal para maior visibilidade no feed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      // Carrossel ou Post Único
      return (
        <>
          <div className="relative w-full max-w-lg aspect-[9/16] sm:aspect-video mx-auto overflow-hidden">
            <div 
              className="w-full h-full p-6"
              style={getEditorStyles(slides[currentSlide])}
            >
              {slides[currentSlide].background.overlay.enabled && (
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    backgroundColor: slides[currentSlide].background.overlay.color,
                    opacity: slides[currentSlide].background.overlay.opacity,
                  }}
                ></div>
              )}
              
              <div className="relative z-10">
                {slides[currentSlide].textElements.map((element) => (
                  <div 
                    key={element.id}
                    className={`mb-4 cursor-pointer ${element.id === selectedTextId ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    style={{
                      fontWeight: element.fontWeight,
                      fontStyle: element.fontStyle,
                      textDecoration: element.textDecoration,
                      color: element.color,
                      fontSize: `${element.fontSize}px`,
                      textAlign: element.alignment,
                      fontFamily: element.fontFamily,
                    }}
                    onClick={() => setSelectedTextId(element.id)}
                  >
                    {element.content}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navegação de slides para carrossel */}
            {carouselType === "multi" && slides.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-white/80 shadow-md ml-2"
                    onClick={() => setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev))}
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-white/80 shadow-md mr-2"
                    onClick={() => setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev))}
                    disabled={currentSlide === slides.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
          
          {/* Preview de slides para carrossel */}
          {carouselType === "multi" && (
            <div className="mt-6 space-y-2">
              <Label>Preview de Slides</Label>
              <div className="flex gap-2 overflow-x-auto p-1">
                {slides.map((slide, index) => (
                  <div 
                    key={index}
                    className={`flex-shrink-0 aspect-square w-16 rounded-md border overflow-hidden cursor-pointer
                      ${index === currentSlide ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    style={getEditorStyles(slide)}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div className="w-full h-full p-1 flex items-center justify-center relative">
                      {slide.background.overlay.enabled && (
                        <div 
                          className="absolute inset-0" 
                          style={{ 
                            backgroundColor: slide.background.overlay.color,
                            opacity: slide.background.overlay.opacity,
                          }}
                        ></div>
                      )}
                      
                      <p className="text-[8px] text-center relative z-10" 
                        style={{ color: slide.textElements[0]?.color || "#fff" }}>
                        Slide {index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Legenda gerada para carrossel/post */}
          {content?.caption && (
            <div className="mt-6 space-y-2">
              <Label>Legenda Gerada</Label>
              <div className="bg-white text-sm p-4 rounded-md border">
                {content.caption}
                <div className="mt-2">
                  {content.hashtags?.map((tag) => (
                    <span key={tag} className="mr-1 text-blue-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCopyCaption}
              >
                Copiar Legenda
              </Button>
            </div>
          )}
        </>
      );
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="text">Texto</TabsTrigger>
                {contentType === "reels" && (
                  <TabsTrigger value="audio">Áudio</TabsTrigger>
                )}
                {contentType !== "reels" && (
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                )}
              </TabsList>
              
              {contentType !== "video" && contentType !== "legenda" && (
                <>
                  <TabsContent value="background" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tipo de Fundo</Label>
                      <Select value={slides[currentSlide].background.type} onValueChange={handleBackgroundTypeChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="color">Cor Sólida</SelectItem>
                          <SelectItem value="gradient">Degradê</SelectItem>
                          <SelectItem value="image">Imagem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {slides[currentSlide].background.type === "color" && (
                      <div className="space-y-2">
                        <Label htmlFor="bgcolor">Cor de Fundo</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded border" style={{ backgroundColor: slides[currentSlide].background.color }}></div>
                          <Input 
                            id="bgcolor" 
                            type="color" 
                            value={slides[currentSlide].background.color} 
                            onChange={(e) => handleColorChange(e.target.value)} 
                          />
                        </div>
                      </div>
                    )}
                    
                    {slides[currentSlide].background.type === "gradient" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="gradientStart">Cor Inicial</Label>
                          <div className="flex gap-2">
                            <div className="w-10 h-10 rounded border" style={{ backgroundColor: slides[currentSlide].background.gradient.colorStart }}></div>
                            <Input 
                              id="gradientStart" 
                              type="color" 
                              value={slides[currentSlide].background.gradient.colorStart} 
                              onChange={(e) => handleGradientChange("colorStart", e.target.value)} 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="gradientEnd">Cor Final</Label>
                          <div className="flex gap-2">
                            <div className="w-10 h-10 rounded border" style={{ backgroundColor: slides[currentSlide].background.gradient.colorEnd }}></div>
                            <Input 
                              id="gradientEnd" 
                              type="color" 
                              value={slides[currentSlide].background.gradient.colorEnd} 
                              onChange={(e) => handleGradientChange("colorEnd", e.target.value)} 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="gradientDirection">Direção</Label>
                          <Select 
                            value={slides[currentSlide].background.gradient.direction} 
                            onValueChange={(value) => handleGradientChange("direction", value as any)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(gradientDirections).map(([value, label]) => (
                                <SelectItem key={value} value={value}>{label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    {slides[currentSlide].background.type === "image" && (
                      <div className="space-y-2">
                        <Label>Imagem de Fundo</Label>
                        {uploadedImage ? (
                          <div className="relative aspect-video rounded-md overflow-hidden">
                            <img 
                              src={uploadedImage} 
                              alt="Background" 
                              className="object-cover w-full h-full"
                            />
                            <Button 
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setUploadedImage(null)}
                            >
                              Remover
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Faça upload de uma imagem para usar como fundo</p>
                            <Input 
                              type="file"
                              accept="image/*"
                              className="mt-4"
                              onChange={handleImageUpload}
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="overlay-toggle">Overlay (Filtro)</Label>
                        <input 
                          id="overlay-toggle" 
                          type="checkbox" 
                          checked={slides[currentSlide].background.overlay.enabled} 
                          onChange={(e) => handleOverlayChange("enabled", e.target.checked)}
                          className="h-4 w-4"
                        />
                      </div>
                      
                      {slides[currentSlide].background.overlay.enabled && (
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <Label htmlFor="overlayColor">Cor do Overlay</Label>
                            <div className="flex gap-2">
                              <div className="w-10 h-10 rounded border" style={{ backgroundColor: slides[currentSlide].background.overlay.color }}></div>
                              <Input 
                                id="overlayColor" 
                                type="color" 
                                value={slides[currentSlide].background.overlay.color} 
                                onChange={(e) => handleOverlayChange("color", e.target.value)} 
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="overlayOpacity">Opacidade</Label>
                              <span>{Math.round(slides[currentSlide].background.overlay.opacity * 100)}%</span>
                            </div>
                            <Slider 
                              id="overlayOpacity" 
                              min={0} 
                              max={1} 
                              step={0.01} 
                              value={[slides[currentSlide].background.overlay.opacity]} 
                              onValueChange={(values) => handleOverlayChange("opacity", values[0])} 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Selecionar Texto</Label>
                      <Select value={selectedTextId || ""} onValueChange={setSelectedTextId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um elemento de texto" />
                        </SelectTrigger>
                        <SelectContent>
                          {slides[currentSlide].textElements.map((element) => (
                            <SelectItem key={element.id} value={element.id}>
                              {element.content.length > 20 ? `${element.content.substring(0, 20)}...` : element.content}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedText && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="textContent">Conteúdo</Label>
                          <Textarea 
                            id="textContent" 
                            value={selectedText.content} 
                            onChange={(e) => handleTextElementChange(selectedText.id, "content", e.target.value)} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fontFamily">Fonte</Label>
                          <Select 
                            value={selectedText.fontFamily} 
                            onValueChange={(value) => handleTextElementChange(selectedText.id, "fontFamily", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fontFamilies.map((font) => (
                                <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                                  {font}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                          <div className="flex items-center gap-2">
                            <Slider 
                              id="fontSize" 
                              min={10} 
                              max={48} 
                              step={1} 
                              value={[selectedText.fontSize]} 
                              onValueChange={(values) => handleTextElementChange(selectedText.id, "fontSize", values[0])} 
                            />
                            <span className="w-10 text-right">{selectedText.fontSize}px</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="textColor">Cor do Texto</Label>
                          <div className="flex gap-2">
                            <div className="w-10 h-10 rounded border" style={{ backgroundColor: selectedText.color }}></div>
                            <Input 
                              id="textColor" 
                              type="color" 
                              value={selectedText.color} 
                              onChange={(e) => handleTextElementChange(selectedText.id, "color", e.target.value)} 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="block mb-2">Estilo</Label>
                            <div className="flex gap-1">
                              <Button 
                                type="button"
                                size="sm"
                                variant={selectedText.fontWeight === "bold" ? "default" : "outline"}
                                onClick={() => handleTextElementChange(
                                  selectedText.id, 
                                  "fontWeight", 
                                  selectedText.fontWeight === "bold" ? "normal" : "bold"
                                )}
                              >
                                <Bold className="h-4 w-4" />
                              </Button>
                              <Button 
                                type="button"
                                size="sm"
                                variant={selectedText.fontStyle === "italic" ? "default" : "outline"}
                                onClick={() => handleTextElementChange(
                                  selectedText.id, 
                                  "fontStyle", 
                                  selectedText.fontStyle === "italic" ? "normal" : "italic"
                                )}
                              >
                                <Italic className="h-4 w-4" />
                              </Button>
                              <Button 
                                type="button"
                                size="sm"
                                variant={selectedText.textDecoration === "underline" ? "default" : "outline"}
                                onClick={() => handleTextElementChange(
                                  selectedText.id, 
                                  "textDecoration", 
                                  selectedText.textDecoration === "underline" ? "none" : "underline"
                                )}
                              >
                                <Underline className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="block mb-2">Alinhamento</Label>
                            <div className="flex gap-1">
                              <Button 
                                type="button"
                                size="sm"
                                variant={selectedText.alignment === "left" ? "default" : "outline"}
                                onClick={() => handleTextElementChange(selectedText.id, "alignment", "left")}
                              >
                                <AlignLeft className="h-4 w-4" />
                              </Button>
                              <Button 
                                type="button"
                                size="sm"
                                variant={selectedText.alignment === "center" ? "default" : "outline"}
                                onClick={() => handleTextElementChange(selectedText.id, "alignment", "center")}
                              >
                                <AlignCenter className="h-4 w-4" />
                              </Button>
                              <Button 
                                type="button"
                                size="sm"
                                variant={selectedText.alignment === "right" ? "default" : "outline"}
                                onClick={() => handleTextElementChange(selectedText.id, "alignment", "right")}
                              >
                                <AlignRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteTextElement(selectedText.id)}
                        >
                          Remover Elemento
                        </Button>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={handleAddTextElement}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Texto
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {contentType === "reels" && (
                    <TabsContent value="audio" className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Áudio Original</Label>
                          <div className="flex gap-2 items-center">
                            <Slider 
                              min={0}
                              max={1}
                              step={0.1}
                              value={[videoEditor.audio.volume]}
                              onValueChange={(values) => setVideoEditor({
                                ...videoEditor,
                                audio: {
                                  ...videoEditor.audio,
                                  volume: values[0]
                                }
                              })}
                            />
                            <span className="text-sm w-8 text-right">{Math.round(videoEditor.audio.volume * 100)}%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Adicionar Trilha Sonora</Label>
                          <Select
                            value={videoEditor.audio.musicTrack}
                            onValueChange={(value) => setVideoEditor({
                              ...videoEditor,
                              audio: {
                                ...videoEditor.audio,
                                musicTrack: value
                              }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma música" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Nenhuma</SelectItem>
                              <SelectItem value="upbeat">Animada</SelectItem>
                              <SelectItem value="relaxing">Relaxante</SelectItem>
                              <SelectItem value="corporate">Corporativa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Áudio Personalizado</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                            <Music className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload de arquivo de áudio (MP3, WAV)</p>
                            <Input 
                              type="file"
                              accept="audio/*"
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Gravação de Voz</Label>
                          <div className="flex justify-center">
                            <Button variant="outline" className="flex items-center gap-2">
                              <Mic className="h-4 w-4" />
                              Iniciar Gravação
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  )}
                  
                  {contentType !== "reels" && (
                    <TabsContent value="upload" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Upload de Imagem</Label>
                        {uploadedImage ? (
                          <div className="relative aspect-video rounded-md overflow-hidden">
                            <img 
                              src={uploadedImage} 
                              alt="Uploaded" 
                              className="object-cover w-full h-full"
                            />
                            <Button 
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setUploadedImage(null)}
                            >
                              Remover
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Clique ou arraste uma imagem para upload</p>
                            <Input 
                              type="file"
                              accept="image/*"
                              className="mt-4"
                              onChange={handleImageUpload}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label>URL de Imagem</Label>
                        <div className="space-y-2">
                          <Input 
                            placeholder="Cole a URL da imagem aqui..."
                            onChange={(e) => {
                              if (e.target.value) {
                                setUploadedImage(e.target.value);
                              }
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              // Simulation: Show a gallery picker
                              toast.info("Galeria de imagens será implementada em breve.");
                            }}
                          >
                            Escolher da Galeria
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  )}
                </>
              )}
              
              {contentType === "video" && (
                <TabsContent value="background" className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-md text-center">
                    <Text className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                    <p className="text-gray-600 font-medium">Opções de Edição de Roteiro</p>
                    <p className="text-sm text-gray-500 mt-1">
                      O roteiro gerado pode ser copiado ou editado para utilização em seus vídeos.
                    </p>
                  </div>
                </TabsContent>
              )}
              
              {contentType === "legenda" && (
                <TabsContent value="background" className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-md text-center">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                    <p className="text-gray-600 font-medium">Opções de Edição de Legenda</p>
                    <p className="text-sm text-gray-500 mt-1">
                      A legenda gerada pode ser copiada ou personalizada para suas postagens.
                    </p>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex flex-col gap-3">
          <Button onClick={handleExport} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar Conteúdo
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compartilhar Conteúdo</DialogTitle>
                <DialogDescription>
                  Compartilhe seu conteúdo nas redes sociais ou copie o link.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Essa funcionalidade estará disponível em breve.
                </p>
                <Input readOnly value="https://autopostai.app/content/exemplo" />
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  navigator.clipboard.writeText("https://autopostai.app/content/exemplo");
                  toast.success("Link copiado para a área de transferência!");
                }}>
                  Copiar Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            Plano gratuito: conteúdo exportado terá marca d'água.{" "}
            <a href="/pricing" className="text-purple-600 hover:underline">Upgrade</a>
          </p>
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full flex justify-center p-4">
              {renderEditorContent()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
