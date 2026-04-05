export const PARAM_LABELS: Record<string, string> = {
    type: "Тип",
    brand: "Бренд",
    model: "Модель",
    address: "Адрес",
    area: "Площадь (м²)",
    floor: "Этаж",
    yearOfManufacture: "Год выпуска",
    transmission: "Коробка передач",
    mileage: "Пробег (км)",
    enginePower: "Мощность (л.с.)",
    condition: "Состояние",
    color: "Цвет",
  };
  
  export const VALUE_LABELS: Record<string, string> = {
    // Трансмиссия
    automatic: "Автомат",
    manual: "Механика",
    // Недвижимость
    flat: "Квартира",
    house: "Дом",
    room: "Комната",
    // Состояние
    new: "Новое",
    used: "Б/у",
    // Электроника
    phone: "Телефон",
    laptop: "Ноутбук",
    misc: "Микрофон", 
  };
  export const CATEGORY_FIELDS = {
    auto: [
      "brand",
      "model",
      "yearOfManufacture",
      "transmission",
      "mileage",
      "enginePower",
    ],
    real_estate: ["type", "address", "area", "floor"],
    electronics: ["type", "brand", "model", "condition", "color"],
  };