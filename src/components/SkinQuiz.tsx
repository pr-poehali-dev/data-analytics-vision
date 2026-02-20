import { useState } from "react";
import Icon from "@/components/ui/icon";

type SkinType = "oily" | "dry" | "combination" | "normal" | "sensitive";

type Answer = {
  label: string;
  value: string;
  skinPoints: Partial<Record<SkinType, number>>;
};

type Question = {
  id: number;
  text: string;
  emoji: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "Как выглядит твоя кожа к середине дня?",
    emoji: "☀️",
    answers: [
      { label: "Блестит и жирная", value: "oily_midday", skinPoints: { oily: 3 } },
      { label: "Стянута и шелушится", value: "dry_midday", skinPoints: { dry: 3, sensitive: 1 } },
      { label: "Блестит только лоб и нос", value: "combo_midday", skinPoints: { combination: 3 } },
      { label: "Выглядит нормально", value: "normal_midday", skinPoints: { normal: 3 } },
    ],
  },
  {
    id: 2,
    text: "Часто ли появляются прыщи?",
    emoji: "😬",
    answers: [
      { label: "Да, постоянно и много", value: "acne_often", skinPoints: { oily: 2 } },
      { label: "Иногда, перед критическими днями", value: "acne_sometimes", skinPoints: { combination: 1, normal: 1 } },
      { label: "Редко или никогда", value: "acne_rare", skinPoints: { dry: 1, normal: 2 } },
      { label: "Есть покраснения и раздражения", value: "acne_sensitive", skinPoints: { sensitive: 3 } },
    ],
  },
  {
    id: 3,
    text: "Как кожа реагирует на новые средства?",
    emoji: "🧴",
    answers: [
      { label: "Без проблем, привыкает быстро", value: "react_ok", skinPoints: { normal: 2, oily: 1 } },
      { label: "Часто краснеет или зудит", value: "react_bad", skinPoints: { sensitive: 3 } },
      { label: "Иногда бывают реакции", value: "react_sometimes", skinPoints: { combination: 1, sensitive: 1 } },
      { label: "Становится ещё суше", value: "react_dry", skinPoints: { dry: 2 } },
    ],
  },
  {
    id: 4,
    text: "Как ощущается кожа после умывания?",
    emoji: "💧",
    answers: [
      { label: "Чистой и комфортной", value: "after_ok", skinPoints: { normal: 3 } },
      { label: "Очень стянутой", value: "after_tight", skinPoints: { dry: 3 } },
      { label: "Немного стянутой в щеках", value: "after_combo", skinPoints: { combination: 2 } },
      { label: "Почти сразу снова жирной", value: "after_oily", skinPoints: { oily: 3 } },
    ],
  },
  {
    id: 5,
    text: "Есть ли расширенные поры?",
    emoji: "🔍",
    answers: [
      { label: "Да, заметные по всему лицу", value: "pores_all", skinPoints: { oily: 2 } },
      { label: "Только в T-зоне", value: "pores_tzone", skinPoints: { combination: 3 } },
      { label: "Поры почти незаметны", value: "pores_none", skinPoints: { dry: 2, normal: 1, sensitive: 1 } },
    ],
  },
];

type SkinQuizProps = {
  onComplete: (skinType: SkinType, scores: Record<SkinType, number>) => void;
};

const SkinQuiz = ({ onComplete }: SkinQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<SkinType, number>>({
    oily: 0,
    dry: 0,
    combination: 0,
    normal: 0,
    sensitive: 0,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  const handleAnswer = (answer: Answer) => {
    setSelectedAnswer(answer.value);
    const newScores = { ...scores };
    Object.entries(answer.skinPoints).forEach(([type, points]) => {
      newScores[type as SkinType] += points ?? 0;
    });

    setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
          setScores(newScores);
          setIsAnimating(false);
        } else {
          const winner = (Object.entries(newScores) as [SkinType, number][]).reduce(
            (a, b) => (b[1] > a[1] ? b : a)
          );
          onComplete(winner[0], newScores);
        }
      }, 300);
    }, 400);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground font-medium">
            Вопрос {currentQuestion + 1} из {questions.length}
          </span>
          <span className="text-sm font-semibold text-primary">
            {Math.round(((currentQuestion) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">{question.emoji}</div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
            {question.text}
          </h2>
        </div>

        <div className="space-y-3">
          {question.answers.map((answer) => (
            <button
              key={answer.value}
              onClick={() => handleAnswer(answer)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-2xl text-left font-semibold transition-all duration-200 border-2 flex items-center gap-3
                ${selectedAnswer === answer.value
                  ? "border-primary bg-primary text-primary-foreground scale-[1.02]"
                  : selectedAnswer !== null
                  ? "border-border bg-card text-muted-foreground opacity-60"
                  : "border-border bg-card hover:border-primary hover:bg-secondary hover:scale-[1.01] cursor-pointer"
                }`}
            >
              <span className="flex-1">{answer.label}</span>
              {selectedAnswer === answer.value && (
                <Icon name="Check" size={20} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export type { SkinType };
export default SkinQuiz;
