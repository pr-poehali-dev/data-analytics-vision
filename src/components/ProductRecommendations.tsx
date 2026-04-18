import Icon from "@/components/ui/icon";
import { SkinType } from "@/components/SkinQuiz";

type Product = {
  name: string;
  description: string;
  step: string;
  emoji: string;
  tags: string[];
  image: string;
};

type SkinProfile = {
  title: string;
  description: string;
  emoji: string;
  color: string;
  tips: string[];
  products: Product[];
};

const skinProfiles: Record<SkinType, SkinProfile> = {
  oily: {
    title: "Жирная кожа",
    emoji: "✨",
    color: "from-yellow-100 to-orange-100",
    description: "Твоя кожа активно вырабатывает себум — это нормально для подростков! Главное — правильный уход без пересушивания.",
    tips: [
      "Умывайся дважды в день мягким гелем",
      "Не выдавливай прыщи — это усиливает воспаление",
      "Используй лёгкие увлажняющие кремы без масел",
    ],
    products: [
      { name: "Гель для умывания", step: "Шаг 1", emoji: "🫧", description: "Мягкий очищающий гель с салициловой кислотой. Убирает излишки жира, не пересушивая кожу.", tags: ["салициловая кислота", "без мыла"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/d2802218-5787-4af8-929a-32f693a6c81a.jpg" },
      { name: "Матирующий тонер", step: "Шаг 2", emoji: "💦", description: "Тонер с ниацинамидом сужает поры и контролирует жирность в течение дня.", tags: ["ниацинамид", "без спирта"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/6acb37be-67c7-4bda-9224-165e60fb126d.jpg" },
      { name: "Сыворотка с ниацинамидом", step: "Шаг 3", emoji: "🧪", description: "Концентрированная сыворотка сужает поры, выравнивает тон и снижает выработку кожного жира.", tags: ["ниацинамид 10%", "против расширенных пор"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/f02e9577-6dc8-4e3b-af69-05ed967dd33a.jpg" },
      { name: "Мягкий BHA-пилинг", step: "Шаг 4", emoji: "✨", description: "Пилинг с салициловой кислотой 1–2 раза в неделю — очищает поры изнутри и уменьшает прыщи.", tags: ["BHA", "1–2 раза в неделю"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/2aaf525c-5ecd-4acb-bd0e-c163375e2212.jpg" },
      { name: "Точечное средство", step: "Шаг 5", emoji: "🎯", description: "Гель локального действия против прыщей с чайным деревом или цинком.", tags: ["цинк", "чайное дерево"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/2aaf525c-5ecd-4acb-bd0e-c163375e2212.jpg" },
      { name: "Лёгкий флюид SPF", step: "Шаг 6", emoji: "☀️", description: "Невесомый солнцезащитный флюид — обязателен каждое утро, даже зимой!", tags: ["SPF 30+", "матирующий"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/56980674-153d-4916-922f-5c1983bd5577.jpg" },
    ],
  },
  dry: {
    title: "Сухая кожа",
    emoji: "🌸",
    color: "from-pink-100 to-rose-100",
    description: "Твоей коже нужно усиленное увлажнение и бережное отношение. Избегай агрессивных средств и горячей воды.",
    tips: [
      "Умывайся тёплой (не горячей) водой",
      "Наноси крем сразу после умывания",
      "Избегай спиртосодержащих средств",
    ],
    products: [
      { name: "Кремовое молочко для умывания", step: "Шаг 1", emoji: "🍶", description: "Нежное молочко с гиалуроновой кислотой очищает, не нарушая гидробаланс кожи.", tags: ["гиалуроновая кислота", "питательное"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/1ed891fe-8ed7-44c9-9971-e2bcc07c414e.jpg" },
      { name: "Увлажняющая сыворотка", step: "Шаг 2", emoji: "💧", description: "Сыворотка с гиалуроновой кислотой наполняет кожу влагой на весь день.", tags: ["гиалуронка", "глубокое увлажнение"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/f02e9577-6dc8-4e3b-af69-05ed967dd33a.jpg" },
      { name: "Мягкий AHA-пилинг", step: "Шаг 3", emoji: "🌸", description: "Нежный пилинг с молочной кислотой 1 раз в неделю — убирает сухие чешуйки и выравнивает текстуру.", tags: ["AHA", "молочная кислота", "1 раз в неделю"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/2aaf525c-5ecd-4acb-bd0e-c163375e2212.jpg" },
      { name: "Восстанавливающая сыворотка", step: "Шаг 4", emoji: "🧴", description: "Сыворотка с пептидами и церамидами восстанавливает кожный барьер и снимает ощущение стянутости.", tags: ["пептиды", "церамиды"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/6acb37be-67c7-4bda-9224-165e60fb126d.jpg" },
      { name: "Питательный крем", step: "Шаг 5", emoji: "🧴", description: "Насыщенный крем с церамидами восстанавливает кожный барьер и убирает ощущение стянутости.", tags: ["церамиды", "питательный"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/4530d02e-4ab0-422e-9b68-32b1bd0ff4ee.jpg" },
      { name: "Солнцезащитный крем", step: "Шаг 6", emoji: "🌞", description: "Увлажняющий крем с SPF — защита от солнца и дополнительное питание.", tags: ["SPF 30+", "увлажняющий"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/56980674-153d-4916-922f-5c1983bd5577.jpg" },
    ],
  },
  combination: {
    title: "Комбинированная кожа",
    emoji: "⚖️",
    color: "from-purple-100 to-pink-100",
    description: "Жирная T-зона и сухие щёки — классическая комбинированная кожа. Ей нужен балансирующий уход.",
    tips: [
      "Используй разные средства для разных зон при необходимости",
      "T-зону очищай тщательнее",
      "Щёки увлажняй активнее",
    ],
    products: [
      { name: "Балансирующий гель", step: "Шаг 1", emoji: "🫧", description: "Мягкий гель мягко очищает кожу, балансируя жирность в T-зоне и не пересушивая щёки.", tags: ["балансирующий", "без мыла"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/d2802218-5787-4af8-929a-32f693a6c81a.jpg" },
      { name: "Тонер с ниацинамидом", step: "Шаг 2", emoji: "✨", description: "Выравнивает тон кожи, сужает поры в T-зоне и мягко увлажняет щёки.", tags: ["ниацинамид", "выравнивающий"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/6acb37be-67c7-4bda-9224-165e60fb126d.jpg" },
      { name: "Балансирующая сыворотка", step: "Шаг 3", emoji: "🧪", description: "Сыворотка с ниацинамидом и гиалуроновой кислотой — матирует T-зону и увлажняет сухие участки.", tags: ["ниацинамид", "гиалуронка"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/f02e9577-6dc8-4e3b-af69-05ed967dd33a.jpg" },
      { name: "Комби-пилинг BHA+AHA", step: "Шаг 4", emoji: "🔬", description: "Мягкий пилинг 1–2 раза в неделю: BHA очищает T-зону, AHA выравнивает текстуру щёк.", tags: ["BHA+AHA", "1–2 раза в неделю"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/2aaf525c-5ecd-4acb-bd0e-c163375e2212.jpg" },
      { name: "Лёгкий гель-крем", step: "Шаг 5", emoji: "💆", description: "Невесомая текстура увлажняет кожу, не утяжеляя жирные зоны.", tags: ["лёгкая текстура", "гель"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/1ed891fe-8ed7-44c9-9971-e2bcc07c414e.jpg" },
      { name: "Флюид SPF", step: "Шаг 6", emoji: "☀️", description: "Лёгкий солнцезащитный флюид для ежедневной защиты.", tags: ["SPF 30+", "лёгкий"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/56980674-153d-4916-922f-5c1983bd5577.jpg" },
    ],
  },
  normal: {
    title: "Нормальная кожа",
    emoji: "🌟",
    color: "from-green-100 to-teal-100",
    description: "Тебе повезло! Нормальная кожа не требует сложного ухода — главное поддерживать её баланс.",
    tips: [
      "Придерживайся простого ухода утром и вечером",
      "Не забывай про SPF каждый день",
      "Пей достаточно воды",
    ],
    products: [
      { name: "Мягкий очищающий гель", step: "Шаг 1", emoji: "🫧", description: "Нежный очищающий гель для ежедневного использования. Не нарушает баланс кожи.", tags: ["мягкий", "ежедневный"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/d2802218-5787-4af8-929a-32f693a6c81a.jpg" },
      { name: "Сыворотка с витамином С", step: "Шаг 2", emoji: "💎", description: "Лёгкая сыворотка поддерживает естественный баланс, осветляет и придаёт коже сияние.", tags: ["витамин С", "сияние", "антиоксидант"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/f02e9577-6dc8-4e3b-af69-05ed967dd33a.jpg" },
      { name: "Мягкий AHA-пилинг", step: "Шаг 3", emoji: "✨", description: "Гликолевый или молочнокислый пилинг 1–2 раза в неделю — шлифует кожу и делает её гладкой.", tags: ["AHA", "гликолевая кислота", "1–2 раза в неделю"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/2aaf525c-5ecd-4acb-bd0e-c163375e2212.jpg" },
      { name: "Лёгкий увлажняющий крем", step: "Шаг 4", emoji: "🧴", description: "Поддерживающий крем с антиоксидантами для здорового вида кожи.", tags: ["антиоксиданты", "увлажнение"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/4530d02e-4ab0-422e-9b68-32b1bd0ff4ee.jpg" },
      { name: "Солнцезащитный крем SPF", step: "Шаг 5", emoji: "🌞", description: "Ежедневная защита от UV — залог здоровой кожи в будущем.", tags: ["SPF 30+", "ежедневный"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/56980674-153d-4916-922f-5c1983bd5577.jpg" },
    ],
  },
  sensitive: {
    title: "Чувствительная кожа",
    emoji: "🌷",
    color: "from-rose-100 to-pink-100",
    description: "Твоя кожа требует особой бережности. Выбирай гипоаллергенные средства с минимальным составом.",
    tips: [
      "Тестируй новые средства на запястье перед нанесением",
      "Избегай отдушек и спирта в составе",
      "Не трогай лицо руками лишний раз",
    ],
    products: [
      { name: "Мицеллярная вода", step: "Шаг 1", emoji: "💧", description: "Бережное очищение без воды — идеально для чувствительной кожи, не вызывает раздражения.", tags: ["без отдушек", "гипоаллергенный"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/1ed891fe-8ed7-44c9-9971-e2bcc07c414e.jpg" },
      { name: "Успокаивающий тонер", step: "Шаг 2", emoji: "🌿", description: "Тонер с пантенолом и алоэ снимает покраснение и успокаивает кожу.", tags: ["пантенол", "алоэ"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/6acb37be-67c7-4bda-9224-165e60fb126d.jpg" },
      { name: "Успокаивающая сыворотка", step: "Шаг 3", emoji: "🕊️", description: "Сыворотка с центеллой и мадекасосидом снимает воспаление и восстанавливает барьер без раздражения.", tags: ["центелла", "мадекасосид", "антистресс"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/f02e9577-6dc8-4e3b-af69-05ed967dd33a.jpg" },
      { name: "Фермент-пилинг", step: "Шаг 4", emoji: "🌾", description: "Ферментный пилинг (энзимная пудра) 1 раз в неделю — мягко отшелушивает без кислот и раздражения.", tags: ["энзимы", "без кислот", "1 раз в неделю"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/2aaf525c-5ecd-4acb-bd0e-c163375e2212.jpg" },
      { name: "Успокаивающий крем", step: "Шаг 5", emoji: "🧴", description: "Крем с минимальным составом для восстановления кожного барьера и снятия раздражения.", tags: ["без ароматизаторов", "барьерный"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/4530d02e-4ab0-422e-9b68-32b1bd0ff4ee.jpg" },
      { name: "Минеральный SPF", step: "Шаг 6", emoji: "☀️", description: "Минеральный солнцезащитный крем — не раздражает даже самую чувствительную кожу.", tags: ["минеральный", "SPF 30+"], image: "https://cdn.poehali.dev/projects/7e29ae51-3cb1-4266-8781-20467d43bf11/files/56980674-153d-4916-922f-5c1983bd5577.jpg" },
    ],
  },
};

type Props = {
  skinType: SkinType;
  onRestart: () => void;
};

const ProductRecommendations = ({ skinType, onRestart }: Props) => {
  const profile = skinProfiles[skinType];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in">
      <div className={`rounded-3xl bg-gradient-to-br ${profile.color} p-6 mb-8 text-center`}>
        <div className="text-5xl mb-3">{profile.emoji}</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {profile.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{profile.description}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          Советы для тебя
        </h3>
        <div className="space-y-2">
          {profile.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border">
              <span className="text-primary font-bold text-sm mt-0.5">{i + 1}</span>
              <span className="text-sm text-foreground">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Sparkles" size={20} className="text-primary" />
          Твой уходовый ритуал
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.products.map((product, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary bg-secondary px-2 py-0.5 rounded-full">
                    {product.step}
                  </span>
                  <span className="text-base">{product.emoji}</span>
                </div>
                <h4 className="font-bold text-foreground mb-1">{product.name}</h4>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag, j) => (
                    <span key={j} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Прошла тест на тип кожи — советую пройти тебе! 🌸')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-4 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Icon name="Send" size={18} />
          Поделиться с подругой
        </a>
        <button
          onClick={onRestart}
          className="flex-1 py-4 rounded-2xl border-2 border-border bg-card hover:bg-secondary font-semibold text-foreground transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Icon name="RotateCcw" size={18} />
          Пройти тест заново
        </button>
      </div>
    </div>
  );
};

export default ProductRecommendations;