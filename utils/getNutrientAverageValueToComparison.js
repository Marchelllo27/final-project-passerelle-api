const getNutrientAverageValueToComparison = (nutrient, collection) => {
  let nutrimentsObject;

  if (collection === "dishes") {
    nutrimentsObject = {
      calcium: 48.85,
      carbohydrates: 15.95,
      dietaryFiber: 2.12,
      energy: 162.16,
      iron: 0.74,
      lipids: 8.86,
      magnesium: 16.13,
      proteins: 8.74,
      sugars: 2.26,
      vitaminB1: 0.07,
      vitaminB12: 0.35,
      vitaminB2: 0.06,
      vitaminB3: 0.92,
      vitaminB5: 0.21,
      vitaminB6: 0.07,
      vitaminB9: 16.57,
      vitaminC: 2.11,
      vitaminD: 0.21,
      vitaminE: 0.99,
      vitaminK1: 2.36,
      zinc: 0.68,
    };
  } else if (collection === "desserts") {
    nutrimentsObject = {
      calcium: 39.36,
      carbohydrates: 46.8,
      dietaryFiber: 1.96,
      energy: 37.95,
      iron: 1,
      lipids: 16.72,
      magnesium: 17.99,
      proteins: 5.39,
      sugars: 26,
      vitaminB1: 0.05,
      vitaminB12: 1.17,
      vitaminB2: 0.12,
      vitaminB3: 0.36,
      vitaminB5: 0.28,
      vitaminB6: 0.04,
      vitaminB9: 24.46,
      vitaminC: 1.43,
      vitaminD: 0.08,
      vitaminE: 1.52,
      vitaminK1: 3.89,
      zinc: 0.47,
    };
  } else if (collection === "drinks") {
    nutrimentsObject = {
      calcium: 19.36,
      carbohydrates: 11,
      dietaryFiber: 1.12,
      energy: 53.55,
      iron: 0.68,
      lipids: 0.7,
      magnesium: 17.52,
      proteins: 1.16,
      sugars: 8.29,
      vitaminB1: 0.03,
      vitaminB12: 0.03,
      vitaminB2: 0.05,
      vitaminB3: 1.03,
      vitaminB5: 0.16,
      vitaminB6: 0.07,
      vitaminB9: 8.98,
      vitaminC: 6.98,
      vitaminD: 0.05,
      vitaminE: 0.26,
      vitaminK1: 0.47,
      zinc: 0.12,
    };
  }

  let valueForNutriment;
  for (const key in nutrimentsObject) {
    if (key === nutrient) {
      valueForNutriment = nutrimentsObject[key];
      break;
    }
  }

  return valueForNutriment;
};

export default getNutrientAverageValueToComparison;
