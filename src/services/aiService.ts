
import { toast } from "sonner";

export type AIContentGeneratorParams = {
  niche?: string;
  style?: string;
  target?: string; 
  topic?: string;
  contentType: "carrossel" | "video" | "legenda" | "reels";
  carouselType?: "multi" | "single";
  slides?: number;
  duration?: number;
  length?: "short" | "medium" | "long";
};

export type GeneratedContent = {
  title: string;
  slides?: string[];
  script?: string;
  caption?: string;
  hashtags: string[];
};

// Esta é uma implementação simulada, em um sistema real você conectaria com uma API de IA
export const generateContent = async (params: AIContentGeneratorParams): Promise<GeneratedContent> => {
  // Para desenvolvimento/testes, simulamos um atraso de API
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Dados simulados com base nos parâmetros
  let result: GeneratedContent = {
    title: "",
    hashtags: []
  };
  
  // Simulação de conteúdos com base no nicho e tipo
  const nicheText = params.niche || "geral";
  
  if (params.contentType === "carrossel") {
    result.title = `${params.topic || `As principais tendências de ${nicheText} em 2024`}`;
    
    const slideCount = params.slides || 5;
    result.slides = [];
    
    for (let i = 1; i <= slideCount; i++) {
      if (i === 1) {
        result.slides.push(result.title);
      } else {
        result.slides.push(`Slide ${i}: Informação importante sobre ${nicheText}`);
      }
    }
    
    result.caption = `Você já parou para pensar como ${nicheText} pode transformar sua vida? Neste post compartilho dicas práticas que você pode implementar hoje mesmo! Salve para consultar depois. 💡 #${nicheText.replace(/\s/g, "")} #dicas`;
    result.hashtags = [`#${nicheText.replace(/\s/g, "")}`, "#dicas", "#conteúdoútil", "#aprendizado", "#melhorespraticas"];
  }
  else if (params.contentType === "video") {
    result.title = `${params.topic || `Como implementar ${nicheText} no seu dia-a-dia`}`;
    result.script = `[INTRODUÇÃO - 10s]\nOlá pessoal! Hoje vamos falar sobre ${nicheText}.\n\n[PONTO 1 - 15s]\nO primeiro aspecto importante é entender o básico.\n\n[PONTO 2 - 15s]\nEm segundo lugar, vamos explorar como aplicar isso na prática.\n\n[CONCLUSÃO - 10s]\nE é isso! Não esqueça de curtir e compartilhar este vídeo se foi útil para você!`;
    result.caption = `Vídeo completo sobre ${nicheText}! Aperte o ▶️ para aprender mais sobre este tema fascinante. Se gostou, deixe seu comentário! 👇`;
    result.hashtags = [`#${nicheText.replace(/\s/g, "")}`, "#video", "#aprendizado", "#dicasvaliosas"];
  }
  else if (params.contentType === "legenda") {
    result.title = `${params.topic || `Reflexão sobre ${nicheText}`}`;
    
    let captionLength = 150;
    if (params.length === "short") captionLength = 80;
    if (params.length === "long") captionLength = 300;
    
    result.caption = `Hoje quero compartilhar com vocês algumas reflexões sobre ${nicheText}. Este é um tema que tem ganhado cada vez mais relevância no nosso dia a dia. Quando paramos para analisar o impacto de ${nicheText} em nossas vidas, percebemos quantas oportunidades estamos deixando passar. Por isso é importante estar sempre atualizado! O que você acha sobre isso?`.slice(0, captionLength) + "...";
    result.hashtags = [`#${nicheText.replace(/\s/g, "")}`, "#reflexão", "#aprendizado", "#crescimentopessoal"];
  }
  else if (params.contentType === "reels") {
    result.title = `${params.topic || `${nicheText} em 30 segundos`}`;
    result.script = `[0:00-0:05] Abertura chamativa sobre ${nicheText}\n[0:05-0:15] Mostrar rapidamente 3 pontos chave\n[0:15-0:25] Revelar dicas práticas\n[0:25-0:30] Call to action para seguir e comentar`;
    result.caption = `${nicheText} explicado em apenas 30 segundos! 🚀 Quer mais conteúdo assim? Deixa nos comentários!`;
    result.hashtags = [`#${nicheText.replace(/\s/g, "")}`, "#reels", "#viral", "#dicasrápidas", "#aprenda"];
  }

  return result;
};

// Serviço para transcrição de áudio (simulado)
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    // Em uma implementação real, você enviaria o Blob para uma API como Whisper da OpenAI
    console.log("Transcrevendo áudio de tamanho:", audioBlob.size);
    
    // Simulando um atraso da API
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Texto de transcrição simulado
    return "Esta é uma transcrição simulada do áudio. Em um sistema real, este texto seria o resultado da transcrição do áudio enviado para uma API como Whisper da OpenAI.";
  } catch (error) {
    console.error("Erro ao transcrever áudio:", error);
    toast.error("Erro ao transcrever áudio", {
      description: "Não foi possível processar o áudio. Tente novamente."
    });
    throw new Error("Falha na transcrição");
  }
};

// Serviço para geração de imagens com IA
export const generateImage = async (prompt: string, style?: string): Promise<string> => {
  try {
    // Em uma implementação real, você enviaria o prompt para uma API como DALL-E ou Midjourney
    console.log("Gerando imagem com prompt:", prompt, "e estilo:", style);
    
    // Simulando um atraso da API
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // URL de imagem simulada (em um sistema real, esta seria a URL da imagem gerada)
    const mockImages = [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    
    return mockImages[Math.floor(Math.random() * mockImages.length)];
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    toast.error("Erro na geração de imagem", {
      description: "Não foi possível gerar a imagem. Tente novamente com um prompt diferente."
    });
    throw new Error("Falha na geração de imagem");
  }
};

// Serviço para sugestão de hashtags otimizadas
export const generateHashtags = async (topic: string, count: number = 5): Promise<string[]> => {
  try {
    // Em uma implementação real, você enviaria o tópico para uma API de IA 
    console.log("Gerando hashtags para:", topic, "quantidade:", count);
    
    // Simulando um atraso da API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Hashtags simuladas
    const baseHashtags = [
      "marketing", "empreendedorismo", "negocios", "sucesso", 
      "motivacao", "crescimento", "estrategia", "vendas", 
      "digitalmarketing", "socialmedia", "conteudo", "branding",
      "saude", "bemestar", "fitness", "nutricao", "autocuidado",
      "desenvolvimento", "produtividade", "aprendizado"
    ];
    
    // Normaliza o tópico para criar uma hashtag
    const topicHashtag = `#${topic.toLowerCase().replace(/\s+/g, "")}`;
    
    // Cria um array com a hashtag do tópico e mais hashtags aleatórias do array base
    const result = [topicHashtag];
    
    while (result.length < count) {
      const randomHashtag = `#${baseHashtags[Math.floor(Math.random() * baseHashtags.length)]}`;
      if (!result.includes(randomHashtag)) {
        result.push(randomHashtag);
      }
    }
    
    return result;
  } catch (error) {
    console.error("Erro ao gerar hashtags:", error);
    toast.error("Erro ao gerar hashtags", {
      description: "Não foi possível sugerir hashtags. Tente novamente."
    });
    throw new Error("Falha na geração de hashtags");
  }
};
