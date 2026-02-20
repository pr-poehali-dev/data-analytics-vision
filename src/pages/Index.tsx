import { useState } from "react";
import ArcGalleryHero from "@/components/ArcGalleryHero";
import SkinQuiz, { SkinType } from "@/components/SkinQuiz";
import ProductRecommendations from "@/components/ProductRecommendations";

type AppStep = "hero" | "quiz" | "results";

const galleryImages = [
  "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/1ed891fe-8ed7-44c9-9971-e2bcc07c414e.jpg",
  "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/4530d02e-4ab0-422e-9b68-32b1bd0ff4ee.jpg",
  "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/f02e9577-6dc8-4e3b-af69-05ed967dd33a.jpg",
  "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/d2802218-5787-4af8-929a-32f693a6c81a.jpg",
  "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/6acb37be-67c7-4bda-9224-165e60fb126d.jpg",
  "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/56980674-153d-4916-922f-5c1983bd5577.jpg",
  "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/0884292f-936d-4350-9192-71fac7855a32.jpg",
  "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/2aaf525c-5ecd-4acb-bd0e-c163375e2212.jpg",
];

const Index = () => {
  const [step, setStep] = useState<AppStep>("hero");
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [skinScores, setSkinScores] = useState<Record<SkinType, number> | null>(null);

  const handleQuizComplete = (type: SkinType, scores: Record<SkinType, number>) => {
    setSkinType(type);
    setSkinScores(scores);
    setStep("results");
  };

  const handleRestart = () => {
    setSkinType(null);
    setSkinScores(null);
    setStep("hero");
  };

  return (
    <main className="relative min-h-screen bg-background">
      {step === "hero" && (
        <>
          <ArcGalleryHero
            images={galleryImages}
            startAngle={20}
            endAngle={160}
            radiusLg={480}
            radiusMd={360}
            radiusSm={260}
            cardSizeLg={120}
            cardSizeMd={100}
            cardSizeSm={80}
            className="pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
          />
          <div
            className="relative z-10 flex items-center justify-center px-6 pb-20 -mt-40 md:-mt-52 lg:-mt-64"
          >
            <div className="text-center max-w-2xl px-6 opacity-0 animate-fade-in" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
              <div className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                🌸 Бесплатная диагностика кожи
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                Узнай свой тип кожи и подбери уход
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Ответь на 5 простых вопросов — получишь персональную программу ухода специально для подростковой кожи.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setStep("quiz")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-bold text-lg"
                >
                  Пройти тест ✨
                </button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>⏱️</span>
                  <span>Займёт 1 минуту</span>
                </div>
              </div>
              <div className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground">
                <span>✅ Бесплатно</span>
                <span>✅ Без регистрации</span>
                <span>✅ Для 12–19 лет</span>
              </div>
            </div>
          </div>
        </>
      )}

      {step === "quiz" && (
        <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4">
          <div className="w-full max-w-lg mx-auto mb-8 text-center">
            <button
              onClick={() => setStep("hero")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-flex items-center gap-1"
            >
              ← Назад
            </button>
            <h1 className="text-2xl font-extrabold text-foreground mb-1">🔍 Диагностика кожи</h1>
            <p className="text-muted-foreground text-sm">Отвечай честно — чем точнее ответы, тем лучше результат!</p>
          </div>
          <SkinQuiz onComplete={handleQuizComplete} />
        </div>
      )}

      {step === "results" && skinType && (
        <div className="min-h-screen flex flex-col items-center py-16 px-4">
          <div className="w-full max-w-2xl mx-auto mb-8 text-center">
            <h1 className="text-2xl font-extrabold text-foreground mb-1">💌 Твои рекомендации</h1>
            <p className="text-muted-foreground text-sm">Персональный уход подобран специально для тебя</p>
          </div>
          <ProductRecommendations skinType={skinType} onRestart={handleRestart} />
        </div>
      )}
    </main>
  );
};

export default Index;
