export type Group = "protein" | "produce" | "dairy" | "pantry";

export type Diet = "any" | "vegetarian" | "vegan" | "gluten-free";

export type DietTag = "vegetarian" | "vegan" | "gluten-free";

export type Minutes = 20 | 35 | 50 | 90;

export type Ingredient = {
  id: string;
  name: string;
  group: Group;
  listAs?: string;
};

export type Use = {
  id: string;
  qty: number;
  unit: string;
  note?: string;
  optional?: boolean;
};

export type Recipe = {
  id: string;
  name: string;
  blurb: string;
  minutes: number;
  servings: number;
  diets: DietTag[];
  uses: Use[];
  steps: string[];
};

export type KitchenState = {
  have: string[];
  minutes: Minutes;
  diet: Diet;
  servings: number;
  saved: string[];
};

export const DEFAULT_KITCHEN: KitchenState = {
  have: [],
  minutes: 35,
  diet: "any",
  servings: 2,
  saved: [],
};

export const TIME_OPTIONS: { minutes: Minutes; label: string }[] = [
  { minutes: 20, label: "20 min" },
  { minutes: 35, label: "35 min" },
  { minutes: 50, label: "50 min" },
  { minutes: 90, label: "Unhurried" },
];

export const DIET_OPTIONS: { diet: Diet; label: string }[] = [
  { diet: "any", label: "Anything" },
  { diet: "vegetarian", label: "Vegetarian" },
  { diet: "vegan", label: "Vegan" },
  { diet: "gluten-free", label: "Gluten-free" },
];

export const GROUPS: { id: Group; label: string }[] = [
  { id: "protein", label: "Proteins" },
  { id: "produce", label: "Produce" },
  { id: "dairy", label: "Dairy" },
  { id: "pantry", label: "Cupboard" },
];

export const BASICS = [
  "eggs",
  "onion",
  "garlic",
  "rice",
  "pasta",
  "canned-tomatoes",
  "cheese",
  "butter",
];

export const INGREDIENTS: Ingredient[] = [
  { id: "eggs", name: "Eggs", group: "protein" },
  { id: "chicken", name: "Chicken", group: "protein" },
  { id: "shrimp", name: "Shrimp", group: "protein" },
  { id: "tuna", name: "Canned tuna", group: "protein", listAs: "tuna" },
  { id: "tofu", name: "Tofu", group: "protein" },
  { id: "chickpeas", name: "Chickpeas", group: "protein" },
  { id: "black-beans", name: "Black beans", group: "protein" },
  { id: "lentils", name: "Lentils", group: "protein" },
  { id: "onion", name: "Onion", group: "produce" },
  { id: "garlic", name: "Garlic", group: "produce" },
  { id: "tomato", name: "Fresh tomato", group: "produce", listAs: "tomato" },
  { id: "spinach", name: "Spinach", group: "produce" },
  { id: "potato", name: "Potato", group: "produce" },
  { id: "pepper", name: "Bell pepper", group: "produce", listAs: "bell pepper" },
  { id: "broccoli", name: "Broccoli", group: "produce" },
  { id: "carrot", name: "Carrot", group: "produce" },
  { id: "zucchini", name: "Zucchini", group: "produce" },
  { id: "mushroom", name: "Mushrooms", group: "produce", listAs: "mushrooms" },
  { id: "lemon", name: "Lemon", group: "produce" },
  { id: "lime", name: "Lime", group: "produce" },
  { id: "avocado", name: "Avocado", group: "produce" },
  { id: "butter", name: "Butter", group: "dairy" },
  { id: "cheese", name: "Cheese", group: "dairy" },
  { id: "milk", name: "Milk", group: "dairy" },
  { id: "yogurt", name: "Yogurt", group: "dairy" },
  { id: "rice", name: "Rice", group: "pantry" },
  { id: "pasta", name: "Pasta", group: "pantry" },
  { id: "bread", name: "Bread", group: "pantry" },
  { id: "tortillas", name: "Tortillas", group: "pantry" },
  { id: "oats", name: "Oats", group: "pantry" },
  {
    id: "canned-tomatoes",
    name: "Canned tomatoes",
    group: "pantry",
    listAs: "canned tomatoes",
  },
  { id: "broth", name: "Broth", group: "pantry" },
  { id: "soy", name: "Soy sauce", group: "pantry", listAs: "soy sauce" },
  { id: "peanut-butter", name: "Peanut butter", group: "pantry", listAs: "peanut butter" },
];

const INGREDIENT_IDS = new Set(INGREDIENTS.map((item) => item.id));

const byId = new Map(INGREDIENTS.map((item) => [item.id, item]));

export function ingredientById(id: string): Ingredient | undefined {
  return byId.get(id);
}

export function ingredientsIn(group: Group): Ingredient[] {
  return INGREDIENTS.filter((item) => item.group === group);
}

export const RECIPES: Recipe[] = [
  {
    id: "shakshuka",
    name: "Skillet shakshuka",
    blurb: "Eggs poached in a pepper and tomato sauce. One pan, eaten with a spoon.",
    minutes: 30,
    servings: 2,
    diets: ["vegetarian", "gluten-free"],
    uses: [
      { id: "eggs", qty: 4, unit: "" },
      { id: "canned-tomatoes", qty: 1, unit: "can" },
      { id: "onion", qty: 1, unit: "" },
      { id: "garlic", qty: 3, unit: "clove" },
      { id: "pepper", qty: 1, unit: "" },
    ],
    steps: [
      "Warm a slick of oil in a skillet over medium heat. Cook the onion and pepper until soft, about 8 minutes. Stir in the garlic for one minute.",
      "Add the tomatoes, a pinch of salt, and chili flakes or cumin if you have them. Simmer until the sauce thickens, about 10 minutes.",
      "Make a well for each egg and crack them in. Cover and cook until the whites set and the yolks are still soft, 5 to 7 minutes.",
      "Pepper it heavily. Eat from the pan, with bread if you have some.",
    ],
  },
  {
    id: "chickpea-stew",
    name: "Chickpea tomato stew",
    blurb: "A thick, garlicky pot of chickpeas and spinach. Fine as leftovers tomorrow.",
    minutes: 25,
    servings: 3,
    diets: ["vegan", "vegetarian", "gluten-free"],
    uses: [
      { id: "chickpeas", qty: 2, unit: "can" },
      { id: "canned-tomatoes", qty: 1, unit: "can" },
      { id: "onion", qty: 1, unit: "" },
      { id: "garlic", qty: 3, unit: "clove" },
      { id: "spinach", qty: 4, unit: "cup" },
    ],
    steps: [
      "Soften the onion in oil over medium heat, about 6 minutes. Add the garlic and cook until it smells sweet.",
      "Stir in the tomatoes and drained chickpeas with a good pinch of salt. Simmer 12 minutes, until thick enough to coat a spoon.",
      "Fold in the spinach and cook until it just wilts.",
      "Taste for salt and pepper. A squeeze of lemon is welcome if you have one.",
    ],
  },
  {
    id: "garlic-pasta",
    name: "Garlic butter pasta",
    blurb: "The weeknight fallback: pasta, garlic, butter, and a handful of cheese.",
    minutes: 18,
    servings: 2,
    diets: ["vegetarian"],
    uses: [
      { id: "pasta", qty: 8, unit: "oz" },
      { id: "garlic", qty: 4, unit: "clove" },
      { id: "butter", qty: 3, unit: "tbsp" },
      { id: "cheese", qty: 0.5, unit: "cup" },
      { id: "lemon", qty: 0.5, unit: "", optional: true },
    ],
    steps: [
      "Boil the pasta in well-salted water until just tender. Save a cup of the water before you drain it.",
      "While it cooks, melt the butter over medium-low heat and cook the garlic until fragrant, not browned.",
      "Add the pasta and a splash of the pasta water. Toss until the sauce looks glossy.",
      "Take it off the heat, add the cheese, and lemon if you have it. Salt if it needs it.",
    ],
  },
  {
    id: "fried-rice",
    name: "Egg fried rice",
    blurb: "Best with leftover rice. Fresh rice works if you spread it out to steam dry.",
    minutes: 20,
    servings: 2,
    diets: ["vegetarian"],
    uses: [
      { id: "rice", qty: 3, unit: "cup", note: "cooked" },
      { id: "eggs", qty: 3, unit: "" },
      { id: "soy", qty: 2, unit: "tbsp" },
      { id: "onion", qty: 0.5, unit: "" },
      { id: "garlic", qty: 2, unit: "clove" },
      { id: "carrot", qty: 1, unit: "", optional: true },
    ],
    steps: [
      "Heat a slick of oil in a wide pan until it shimmers. Scramble the eggs, break them into pieces, and scoop them out.",
      "Add a little more oil. Cook the onion and carrot, if using, until they soften. Stir in the garlic.",
      "Add the rice and press it flat for a minute so a few grains toast. Toss with the soy sauce.",
      "Return the eggs and toss again. Taste — leftover rice often needs more salt than you think.",
    ],
  },
  {
    id: "black-bean-tacos",
    name: "Black bean tacos",
    blurb: "Warm beans, raw onion, and lime. Dinner in the time it takes to heat a pan.",
    minutes: 20,
    servings: 2,
    diets: ["vegetarian"],
    uses: [
      { id: "black-beans", qty: 1, unit: "can" },
      { id: "tortillas", qty: 6, unit: "" },
      { id: "onion", qty: 0.5, unit: "" },
      { id: "lime", qty: 1, unit: "" },
      { id: "avocado", qty: 1, unit: "", optional: true },
      { id: "cheese", qty: 0.5, unit: "cup", optional: true },
    ],
    steps: [
      "Drain the beans, then warm them in a pan with a spoon of oil, a pinch of salt, and half the lime juice. Mash a few so they hold together.",
      "Warm the tortillas in a dry skillet, a few seconds a side.",
      "Chop the onion finely. Slice the avocado if you have it.",
      "Fill the tortillas with beans, onion, cheese if you want it, and the rest of the lime.",
    ],
  },
  {
    id: "lemon-chicken",
    name: "Lemon chicken and potatoes",
    blurb: "Chicken, potatoes, and lemon on one sheet. Mostly hands-off once it’s in.",
    minutes: 45,
    servings: 2,
    diets: ["gluten-free"],
    uses: [
      { id: "chicken", qty: 1, unit: "lb" },
      { id: "potato", qty: 1, unit: "lb" },
      { id: "onion", qty: 1, unit: "" },
      { id: "lemon", qty: 1, unit: "" },
      { id: "garlic", qty: 3, unit: "clove" },
    ],
    steps: [
      "Heat the oven to 425°F. Cut the potatoes and onion into bite-size pieces and toss with oil, salt, and pepper on a sheet pan.",
      "Roast the vegetables alone for 15 minutes.",
      "Season the chicken with salt, pepper, and the zest of the lemon. Nestle it among the vegetables with the garlic cloves and lemon wedges.",
      "Roast until the chicken is cooked through and the potatoes are browned, about 25 minutes more. Squeeze the roasted lemon over the top.",
    ],
  },
  {
    id: "lentil-soup",
    name: "Red or brown lentil soup",
    blurb: "Onion, carrot, tomato, and lentils. A pot that feeds more than tonight.",
    minutes: 40,
    servings: 4,
    diets: ["vegan", "vegetarian", "gluten-free"],
    uses: [
      { id: "lentils", qty: 1, unit: "cup" },
      { id: "carrot", qty: 2, unit: "" },
      { id: "onion", qty: 1, unit: "" },
      { id: "garlic", qty: 3, unit: "clove" },
      { id: "canned-tomatoes", qty: 1, unit: "can" },
      { id: "broth", qty: 4, unit: "cup" },
    ],
    steps: [
      "Rinse the lentils. Soften the onion and carrot in oil with a pinch of salt, about 8 minutes. Add the garlic.",
      "Stir in the tomatoes, lentils, and broth. Add cumin if you have it; pepper if you don’t.",
      "Simmer until the lentils are tender, 20 to 25 minutes for red lentils, closer to 30 for brown. Add water if it gets too thick.",
      "Taste for salt. Mash a few lentils against the pot if you want it thicker.",
    ],
  },
  {
    id: "tofu-stir-fry",
    name: "Tofu and broccoli stir-fry",
    blurb: "Crisp tofu, broccoli, and rice. Soy sauce does the seasoning.",
    minutes: 25,
    servings: 2,
    diets: ["vegan", "vegetarian"],
    uses: [
      { id: "tofu", qty: 14, unit: "oz" },
      { id: "broccoli", qty: 1, unit: "head" },
      { id: "pepper", qty: 1, unit: "" },
      { id: "soy", qty: 3, unit: "tbsp" },
      { id: "garlic", qty: 3, unit: "clove" },
      { id: "rice", qty: 2, unit: "cup", note: "cooked" },
    ],
    steps: [
      "Press the tofu dry and cut it into cubes. Pat again — dry tofu browns, wet tofu steams.",
      "Fry the tofu in oil over medium-high heat until the sides are golden. Set it aside.",
      "In the same pan, stir-fry the broccoli and pepper with a splash of water and a lid for 3 minutes. Add the garlic.",
      "Return the tofu, add the soy sauce, and toss. Serve over the rice.",
    ],
  },
  {
    id: "tuna-pasta",
    name: "Tuna, lemon, and spinach pasta",
    blurb: "A pantry pasta that still tastes like you meant to cook.",
    minutes: 20,
    servings: 2,
    diets: [],
    uses: [
      { id: "tuna", qty: 2, unit: "can" },
      { id: "pasta", qty: 8, unit: "oz" },
      { id: "lemon", qty: 1, unit: "" },
      { id: "garlic", qty: 2, unit: "clove" },
      { id: "spinach", qty: 3, unit: "cup" },
    ],
    steps: [
      "Boil the pasta in salted water. Save some of the cooking water.",
      "Warm oil in a skillet, cook the garlic for a minute, then add the drained tuna and break it up.",
      "Add the spinach and let it collapse. Toss in the pasta, lemon zest, and lemon juice, plus a splash of pasta water.",
      "Pepper it well. The tuna is already salty, so taste before you add more salt.",
    ],
  },
  {
    id: "peanut-noodles",
    name: "Peanut noodles",
    blurb: "Peanut butter, soy, lime, and garlic over warm noodles. Carrot for crunch.",
    minutes: 20,
    servings: 2,
    diets: ["vegan", "vegetarian"],
    uses: [
      { id: "pasta", qty: 8, unit: "oz" },
      { id: "peanut-butter", qty: 0.33, unit: "cup" },
      { id: "soy", qty: 2, unit: "tbsp" },
      { id: "garlic", qty: 2, unit: "clove" },
      { id: "lime", qty: 1, unit: "" },
      { id: "carrot", qty: 1, unit: "" },
    ],
    steps: [
      "Boil the pasta. Before draining, steal about half a cup of the hot water.",
      "Stir the peanut butter, soy sauce, grated garlic, and lime juice with enough hot water to make a sauce that drizzles.",
      "Toss the pasta in the sauce. It thickens as it sits, so loosen it if you need to.",
      "Top with the carrot, cut into thin strips or grated. Add chili flakes if you like heat.",
    ],
  },
  {
    id: "frittata",
    name: "Potato and spinach frittata",
    blurb: "A baked egg cake. Good hot, and just as good cold from the fridge.",
    minutes: 35,
    servings: 3,
    diets: ["vegetarian", "gluten-free"],
    uses: [
      { id: "eggs", qty: 6, unit: "" },
      { id: "potato", qty: 2, unit: "" },
      { id: "spinach", qty: 3, unit: "cup" },
      { id: "cheese", qty: 0.5, unit: "cup" },
      { id: "onion", qty: 0.5, unit: "" },
    ],
    steps: [
      "Heat the oven to 400°F. Slice the potatoes thin. Soften them with the onion in an oven-safe skillet with oil, covered, about 10 minutes.",
      "Add the spinach and stir until it wilts. Spread everything into an even layer.",
      "Beat the eggs with salt, pepper, and the cheese. Pour them over the vegetables.",
      "Cook on the stove until the edges set, then bake until the center is just firm, about 12 minutes. Rest 5 minutes before cutting.",
    ],
  },
  {
    id: "tomato-toast",
    name: "Tomato soup and cheese toast",
    blurb: "A quick soup from a can of tomatoes, plus the toast that belongs with it.",
    minutes: 30,
    servings: 2,
    diets: ["vegetarian"],
    uses: [
      { id: "canned-tomatoes", qty: 1, unit: "can" },
      { id: "onion", qty: 1, unit: "" },
      { id: "garlic", qty: 2, unit: "clove" },
      { id: "milk", qty: 1, unit: "cup" },
      { id: "butter", qty: 2, unit: "tbsp" },
      { id: "bread", qty: 4, unit: "slice" },
      { id: "cheese", qty: 1, unit: "cup" },
    ],
    steps: [
      "Cook the onion in the butter until soft. Add the garlic, then the tomatoes and a pinch of salt. Simmer 12 minutes.",
      "Blend the soup if you can, or mash it with a spoon. Stir in the milk and warm it through. Don’t boil it.",
      "Toast the bread, cover it with cheese, and broil or pan-toast until the cheese melts.",
      "Pepper the soup and eat it with the toast. Add a little more salt if the tomatoes taste flat.",
    ],
  },
  {
    id: "mushroom-rice",
    name: "Mushroom spinach rice",
    blurb: "Mushrooms cooked until they actually brown, then rice, spinach, and an egg.",
    minutes: 25,
    servings: 2,
    diets: ["vegetarian"],
    uses: [
      { id: "mushroom", qty: 8, unit: "oz" },
      { id: "rice", qty: 2, unit: "cup", note: "cooked" },
      { id: "soy", qty: 1, unit: "tbsp" },
      { id: "garlic", qty: 2, unit: "clove" },
      { id: "eggs", qty: 2, unit: "" },
      { id: "spinach", qty: 2, unit: "cup" },
    ],
    steps: [
      "Slice the mushrooms. Cook them in oil in a hot pan without stirring much, until the water cooks off and they brown.",
      "Add the garlic, then the rice and soy sauce. Toss until the rice is hot.",
      "Add the spinach and stir until it wilts.",
      "Fry the eggs in a little oil in the same pan, or another one, and set them on top. Salt the eggs, not the rice, first.",
    ],
  },
  {
    id: "shrimp-scampi",
    name: "Shrimp scampi",
    blurb: "Garlic, butter, lemon, and shrimp over pasta. Don’t walk away from the shrimp.",
    minutes: 20,
    servings: 2,
    diets: [],
    uses: [
      { id: "shrimp", qty: 12, unit: "oz" },
      { id: "pasta", qty: 8, unit: "oz" },
      { id: "garlic", qty: 4, unit: "clove" },
      { id: "lemon", qty: 1, unit: "" },
      { id: "butter", qty: 3, unit: "tbsp" },
    ],
    steps: [
      "Start the pasta in salted water. Pat the shrimp dry and season with salt.",
      "Melt the butter over medium heat. Cook the garlic for a minute, then add the shrimp in a single layer.",
      "Cook until the shrimp turn pink, about 1 to 2 minutes a side. Take the pan off the heat and add the lemon juice.",
      "Toss with the drained pasta and a splash of pasta water. Pepper, then eat immediately.",
    ],
  },
  {
    id: "avocado-toast",
    name: "Egg and avocado toast",
    blurb: "When cooking should take less time than deciding. Still a real plate.",
    minutes: 12,
    servings: 1,
    diets: ["vegetarian"],
    uses: [
      { id: "bread", qty: 2, unit: "slice" },
      { id: "avocado", qty: 1, unit: "" },
      { id: "eggs", qty: 2, unit: "" },
      { id: "lemon", qty: 0.5, unit: "" },
    ],
    steps: [
      "Toast the bread until it’s actually crisp.",
      "Fry or boil the eggs the way you like them. Salt them.",
      "Mash the avocado with lemon juice and a pinch of salt. Pile it on the toast.",
      "Top with the eggs and plenty of pepper.",
    ],
  },
  {
    id: "yogurt-oats",
    name: "Yogurt oats with peanut butter",
    blurb: "Not a ceremony. Useful on the night you will not turn on the stove.",
    minutes: 8,
    servings: 1,
    diets: ["vegetarian", "gluten-free"],
    uses: [
      { id: "yogurt", qty: 1, unit: "cup" },
      { id: "oats", qty: 0.5, unit: "cup" },
      { id: "peanut-butter", qty: 1, unit: "tbsp" },
    ],
    steps: [
      "Stir the oats into the yogurt with a pinch of salt. Use certified gluten-free oats if that matters for you.",
      "Let it sit five minutes so the oats soften, or eat it as is.",
      "Swirl in the peanut butter.",
      "If you have honey, jam, or fruit, this is the moment. The bowl is already dinner without them.",
    ],
  },
  {
    id: "zucchini-pasta",
    name: "Zucchini butter pasta",
    blurb: "Zucchini cooked down with garlic and butter until it becomes the sauce.",
    minutes: 25,
    servings: 2,
    diets: ["vegetarian"],
    uses: [
      { id: "zucchini", qty: 2, unit: "" },
      { id: "pasta", qty: 8, unit: "oz" },
      { id: "garlic", qty: 2, unit: "clove" },
      { id: "butter", qty: 2, unit: "tbsp" },
      { id: "cheese", qty: 0.5, unit: "cup" },
      { id: "lemon", qty: 1, unit: "" },
    ],
    steps: [
      "Cut the zucchini into small half-moons. Start the pasta in salted water.",
      "Cook the zucchini in the butter over medium heat with a pinch of salt until it turns soft and golden, about 10 minutes. Add the garlic near the end.",
      "Toss in the pasta and a splash of pasta water. The zucchini should cling to the noodles.",
      "Off the heat, add the cheese and a squeeze of lemon.",
    ],
  },
  {
    id: "chicken-skillet",
    name: "Chicken and black bean skillet",
    blurb: "Chicken simmered with beans and tomatoes. Tortillas if you have them.",
    minutes: 35,
    servings: 3,
    diets: [],
    uses: [
      { id: "chicken", qty: 1, unit: "lb" },
      { id: "black-beans", qty: 1, unit: "can" },
      { id: "canned-tomatoes", qty: 1, unit: "can" },
      { id: "onion", qty: 1, unit: "" },
      { id: "lime", qty: 1, unit: "" },
      { id: "tortillas", qty: 4, unit: "", optional: true },
    ],
    steps: [
      "Cut the chicken into bite-size pieces and season with salt. Brown it in oil in a skillet, then set it aside.",
      "Soften the onion in the same pan. Add the tomatoes, drained beans, and chicken.",
      "Simmer until the chicken is cooked through and the sauce thickens, about 15 minutes.",
      "Finish with lime juice. Serve in tortillas or in a bowl.",
    ],
  },
  {
    id: "dal",
    name: "Carrot lentil dal",
    blurb: "Lentils cooked soft with carrot, onion, and tomato. Spoon, not a knife.",
    minutes: 35,
    servings: 4,
    diets: ["vegan", "vegetarian", "gluten-free"],
    uses: [
      { id: "lentils", qty: 1, unit: "cup" },
      { id: "carrot", qty: 3, unit: "" },
      { id: "onion", qty: 1, unit: "" },
      { id: "garlic", qty: 3, unit: "clove" },
      { id: "canned-tomatoes", qty: 1, unit: "can" },
    ],
    steps: [
      "Rinse the lentils. Dice the carrot and onion small so they cook in the same time.",
      "Soften the onion and carrot in oil with salt, about 8 minutes. Add the garlic.",
      "Add the tomatoes, lentils, and 3 cups of water. Cumin or turmeric is excellent here; pepper works if the spice tin is empty.",
      "Simmer until the lentils collapse and the dal is thick, about 20 minutes. Add water if it sticks. Salt at the end.",
    ],
  },
];

const RECIPE_IDS = new Set(RECIPES.map((recipe) => recipe.id));

const FRACTIONS: [number, string][] = [
  [0.25, "¼"],
  [0.33, "⅓"],
  [0.5, "½"],
  [0.67, "⅔"],
  [0.75, "¾"],
];

export function formatAmount(qty: number, scale: number): string {
  const n = qty * scale;
  if (n <= 0) return "0";
  const whole = Math.floor(n + 1e-9);
  const frac = n - whole;
  if (frac <= 0.08) return String(whole === 0 ? Math.round(n * 10) / 10 : whole);

  let best = FRACTIONS[0];
  let bestDiff = Infinity;
  for (const entry of FRACTIONS) {
    const diff = Math.abs(frac - entry[0]);
    if (diff < bestDiff) {
      best = entry;
      bestDiff = diff;
    }
  }
  if (bestDiff > 0.08) {
    const rounded = Math.round(n * 10) / 10;
    return String(rounded);
  }
  if (whole === 0) return best[1];
  return `${whole} ${best[1]}`;
}

function pluralUnit(unit: string, amount: number): string {
  if (!unit) return "";
  if (amount <= 1.01) return unit;
  if (unit === "clove") return "cloves";
  if (unit === "can") return "cans";
  if (unit === "slice") return "slices";
  if (unit === "head") return "heads";
  if (unit === "cup") return "cups";
  return unit;
}

function listName(id: string, amount: number, unit: string): string {
  const item = byId.get(id);
  const base = (item?.listAs ?? item?.name ?? id).toLowerCase();
  if (unit || amount <= 1.01) return base;
  if (base === "potato") return "potatoes";
  if (base === "tomato") return "tomatoes";
  if (base.endsWith("s")) return base;
  return `${base}s`;
}

export function formatUse(use: Use, scale: number): string {
  const amount = use.qty * scale;
  const shown = formatAmount(use.qty, scale);
  const unit = pluralUnit(use.unit, amount);
  const name = listName(use.id, amount, use.unit);
  const bits = [shown, unit, name].filter(Boolean);
  let text = bits.join(" ");
  if (use.note) text += `, ${use.note}`;
  if (use.optional) text += " (optional)";
  return text;
}

export function scaleFor(recipe: Recipe, servings: number): number {
  return servings / recipe.servings;
}

export type Ranked = {
  recipe: Recipe;
  haveCount: number;
  requiredCount: number;
  missing: Use[];
  ratio: number;
  ready: boolean;
};

export function dietOk(recipe: Recipe, diet: Diet): boolean {
  if (diet === "any") return true;
  return recipe.diets.includes(diet);
}

export function rankRecipes(
  have: Set<string>,
  minutes: number,
  diet: Diet,
): Ranked[] {
  const picked = have.size > 0;
  return RECIPES.filter((recipe) => recipe.minutes <= minutes && dietOk(recipe, diet))
    .map((recipe) => {
      const required = recipe.uses.filter((use) => !use.optional);
      const haveCount = required.filter((use) => have.has(use.id)).length;
      const missing = required.filter((use) => !have.has(use.id));
      const ratio = required.length === 0 ? 1 : haveCount / required.length;
      return {
        recipe,
        haveCount,
        requiredCount: required.length,
        missing,
        ratio,
        ready: picked && missing.length === 0,
      };
    })
    .sort((a, b) => {
      if (picked && b.ratio !== a.ratio) return b.ratio - a.ratio;
      if (picked && a.missing.length !== b.missing.length) {
        return a.missing.length - b.missing.length;
      }
      if (a.recipe.minutes !== b.recipe.minutes) return a.recipe.minutes - b.recipe.minutes;
      return a.recipe.name.localeCompare(b.recipe.name);
    });
}

export function joinNames(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

export function missingLabel(missing: Use[]): string {
  const names = missing.map((use) => listName(use.id, 2, "x"));
  return joinNames(names);
}

const STORAGE_KEY = "larder.kitchen.v1";

const MINUTES = new Set<number>(TIME_OPTIONS.map((option) => option.minutes));
const DIETS = new Set<string>(DIET_OPTIONS.map((option) => option.diet));

export function loadKitchen(): KitchenState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<KitchenState>;
    const minutes = MINUTES.has(data.minutes ?? -1) ? (data.minutes as Minutes) : 35;
    const diet = DIETS.has(data.diet ?? "") ? (data.diet as Diet) : "any";
    const servings =
      typeof data.servings === "number"
        ? Math.min(8, Math.max(1, Math.round(data.servings)))
        : 2;
    const have = Array.isArray(data.have)
      ? data.have.filter((id): id is string => typeof id === "string" && INGREDIENT_IDS.has(id))
      : [];
    const saved = Array.isArray(data.saved)
      ? data.saved.filter((id): id is string => typeof id === "string" && RECIPE_IDS.has(id))
      : [];
    return { have, minutes, diet, servings, saved };
  } catch {
    return null;
  }
}

export function saveKitchen(state: KitchenState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function shoppingList(recipe: Recipe, missing: Use[], servings: number): string {
  const scale = scaleFor(recipe, servings);
  const lines = (missing.length > 0 ? missing : recipe.uses).map((use) => formatUse(use, scale));
  const heading =
    missing.length > 0
      ? `Still need for ${recipe.name} (serves ${servings})`
      : `${recipe.name} (serves ${servings})`;
  return [heading, ...lines.map((line) => `- ${line}`)].join("\n");
}
