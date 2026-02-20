import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

type AnalysisResult = {
  oiliness: { level: string; score: number; comment: string };
  inflammation: { level: string; score: number; comment: string };
  pores: { level: string; score: number; comment: string };
  texture: { level: string; score: number; comment: string };
  pigmentation: { level: string; score: number; comment: string };
  overall_skin_type: string;
  summary: string;
  top_tips: string[];
};

type Props = {
  onComplete: (skinType: string) => void;
  onSkip: () => void;
};

const SKIN_TYPE_MAP: Record<string, string> = {
  жирная: "oily",
  сухая: "dry",
  комбинированная: "combination",
  нормальная: "normal",
  чувствительная: "sensitive",
};

const METRIC_COLORS: Record<string, string> = {
  low: "bg-green-400",
  medium: "bg-yellow-400",
  high: "bg-red-400",
};

function scoreColor(score: number) {
  if (score <= 3) return "bg-green-400";
  if (score <= 6) return "bg-yellow-400";
  return "bg-red-400";
}

const SkinPhotoAnalysis = ({ onComplete, onSkip }: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      const base64 = dataUrl.split(",")[1];
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(func2url["analyze-skin"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Ошибка анализа");
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!result) return;
    const mapped = SKIN_TYPE_MAP[result.overall_skin_type] || "normal";
    onComplete(mapped);
  };

  const metrics = result
    ? [
        { label: "Жирность", icon: "Droplets", ...result.oiliness },
        { label: "Воспаления", icon: "Flame", ...result.inflammation },
        { label: "Поры", icon: "CircleDot", ...result.pores },
        { label: "Текстура", icon: "Layers", ...result.texture },
        { label: "Пигментация", icon: "Sun", ...result.pigmentation },
      ]
    : [];

  return (
    <div className="w-full max-w-lg mx-auto px-4 animate-fade-in">
      {!result ? (
        <>
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">📸</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Анализ кожи по фото</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Сделай селфи при хорошем освещении — ИИ проанализирует состояние кожи и подберёт уход именно для тебя
            </p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-3xl transition-all duration-200 mb-6 overflow-hidden cursor-pointer ${
              preview ? "border-primary" : "border-border hover:border-primary/60"
            }`}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Селфи" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white font-semibold text-sm bg-black/50 px-4 py-2 rounded-full">
                    Заменить фото
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Icon name="Camera" size={28} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground mb-1">Загрузи селфи</p>
                <p className="text-sm text-muted-foreground">Нажми или перетащи фото сюда</p>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          <div className="bg-secondary/50 rounded-2xl p-4 mb-6 flex gap-3 items-start">
            <span className="text-lg">💡</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Для лучшего результата: дневной свет, без фильтров, чистое лицо без макияжа
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base transition-all duration-200 hover:bg-primary/90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={20} className="animate-spin" />
                  Анализирую кожу…
                </>
              ) : (
                <>
                  <Icon name="Sparkles" size={20} />
                  Анализировать кожу
                </>
              )}
            </button>
            <button
              onClick={onSkip}
              className="w-full py-3 rounded-2xl border border-border text-muted-foreground text-sm font-medium hover:bg-secondary transition-all duration-200"
            >
              Пропустить, пройти тест вручную
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">✨</div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Результаты анализа</h2>
            <p className="text-sm text-muted-foreground">
              Тип кожи: <span className="font-semibold text-primary">{result.overall_skin_type}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-6">
            {metrics.map((m) => (
              <div key={m.label} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon name={m.icon as never} size={16} className="text-primary" />
                    <span className="font-semibold text-sm text-foreground">{m.label}</span>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{m.level}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${scoreColor(m.score)}`}
                    style={{ width: `${m.score * 10}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.comment}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-4 mb-6">
            <p className="text-sm text-foreground leading-relaxed">{result.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Lightbulb" size={16} className="text-primary" />
              Советы для тебя
            </h3>
            <div className="space-y-2">
              {result.top_tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border">
                  <span className="text-primary font-bold text-sm mt-0.5">{i + 1}</span>
                  <span className="text-sm text-foreground">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleContinue}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base transition-all duration-200 hover:bg-primary/90 shadow-md flex items-center justify-center gap-2"
            >
              <Icon name="ArrowRight" size={20} />
              Получить уходовый ритуал
            </button>
            <button
              onClick={() => { setResult(null); setPreview(null); setImage(null); }}
              className="w-full py-3 rounded-2xl border border-border text-muted-foreground text-sm font-medium hover:bg-secondary transition-all duration-200"
            >
              Загрузить другое фото
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SkinPhotoAnalysis;
