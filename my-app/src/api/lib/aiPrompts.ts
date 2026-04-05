type AiPromptParams = {
    title: string;
    category: string;
    price?: number | string;
    params: unknown;
    description?: string;
  };
  
  type ChatMessage = {
    role: "user" | "assistant";
    text: string;
  };
  
  type AiChatPromptParams = {
    title: string;
    category: string;
    price?: number | string;
    params: unknown;
    description?: string;
    history: ChatMessage[];
    question: string;
  };
  
  export function buildPricePrompt({
    title,
    category,
    params,
  }: AiPromptParams) {
    return `Ты эксперт по оценке товаров на Avito.
  
  Проанализируй объявление:
  - Название: ${title}
  - Категория: ${category}
  - Характеристики: ${JSON.stringify(params, null, 2)}
  
  Верни ответ в формате:
  
  Средняя цена на [НАЗВАНИЕ]:
  [МИН] – [МАКС] ₽ — отличное состояние.
  От [ЦЕНА] ₽ — идеал, малый износ.
  [МИН_НИЖЕ] – [МАКС_НИЖЕ] ₽ — срочно или с дефектами.
  
  Используй реальные рыночные цены в рублях. Будь конкретен. Отвечай кратко, только то что требуется. Отвечай всегда только на русском языке.
  Генерируй итоговую цену в любом случае.
  Пиши обязательно в конце:
  Итоговая предлагаемая цена: [ЧИСЛО]`;
  }
  
  export function buildDescriptionPrompt({
    title,
    category,
    price,
    params,
    description,
  }: AiPromptParams) {
    const isEmptyDescription = !description?.trim();
  
    if (isEmptyDescription) {
      return `Ты помогаешь составить объявление.
  
  Сгенерируй краткое, естественное и продающее описание на русском языке для объявления.
  
  Данные объявления:
  - Название: ${title}
  - Категория: ${category}
  - Характеристики: ${JSON.stringify(params, null, 2)}
  - Цена: ${price}
  
  Требования:
  - 2-4 предложения
  - Без списков
  - Без markdown
  - Без лишней воды
  - Только готовый текст описания на русском языке`;
    }
  
    return `Ты помогаешь улучшить описание объявления.
  
  Улучши текущее описание, сделай его более естественным, грамотным и продающим, но без выдумывания фактов. ОБЯЗАТЕЛЬНО НА РУССКОМ ЯЗЫКЕ!!!
  
  Данные объявления:
  - Название: ${title}
  - Категория: ${category}
  - Характеристики: ${JSON.stringify(params, null, 2)}
  - Цена: ${price}
  - Текущее описание: ${description}
  
  Требования:
  - Сохрани смысл
  - Не добавляй факты, которых нет во входных данных
  - 2-4 предложения
  - Без списков
  - Без markdown
  - Только готовый улучшенный текст на русском языке ОБЯЗАТЕЛЬНО НА РУССКОМ ЯЗЫКЕ!!!`;
  }
  
  export function buildChatPrompt({
    title,
    category,
    price,
    params,
    description,
    history,
    question,
  }: AiChatPromptParams) {
    return `Ты помощник по редактированию объявления.
  Отвечай только на русском языке.
  Ты видишь текущее объявление и отвечаешь на вопрос пользователя с учетом его контекста.
  
  Текущее объявление:
  - Название: ${title}
  - Категория: ${category}
  - Цена: ${price}
  - Описание: ${description || "Описание отсутствует"}
  - Характеристики: ${JSON.stringify(params, null, 2)}
  
  История сообщений:
  ${history
    .map((msg) => `${msg.role === "user" ? "Пользователь" : "AI"}: ${msg.text}`)
    .join("\n")}
  
  Новый вопрос пользователя:
  ${question}
  
  Ответь кратко, полезно и по делу.`;
  }