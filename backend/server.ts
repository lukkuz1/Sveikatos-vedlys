import { Request, Response } from "express";

const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

const openai = new OpenAI({
  apiKey: 'sk-proj-uXzO4WC5cFrEvbt6tzjKT3BlbkFJ3lS1mJ6pBjqKAVSHS7K3',
  organization: 'org-AcH2LpYYF9Vfkrpcapdy91Uq',
});

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
};

app.use(cors(corsOptions));

type MealData = {
  calories: number;
  carbohydrates_total_g: number;
  protein_g: number;
  products: string[];
};

type Meals = {
  [mealType: string]: {
    [mealName: string]: MealData;
  };
};

type IMeal = {
  breakfast: string;
  lunch: string;
  dinner: string;
  products: string[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
}

type NutritionProductData = {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
};

type NutritionData = {
  data: NutritionProductData[]
}

let meals: Meals = {
  "breakfast": {
    "Greek yogurt with fresh berries and a sprinkle of chia seeds": {
      "calories": 582.5,
      "carbohydrates_total_g": 57,
      "protein_g": 27.8,
      "products": [
        "greek yogurt",
        "berries",
        "chia seeds"
      ]
    },
    "Overnight oats with almond milk, banana slices, and a dash of cinnamon": {
      "calories": 1330.4,
      "carbohydrates_total_g": 192.7,
      "protein_g": 39,
      "products": [
        "oats",
        "almond",
        "banana",
        "cinnamon"
      ]
    },
    "Avocado toast on whole-grain bread with a poached egg": {
      "calories": 872.5,
      "carbohydrates_total_g": 113.7,
      "protein_g": 32.5,
      "products": [
        "avocado",
        "toast",
        "bread",
        "poached egg"
      ]
    },
    "Smoothie with spinach, protein powder, almond milk, and frozen berries": {
      "calories": 1076,
      "carbohydrates_total_g": 55.2,
      "protein_g": 101.9,
      "products": [
        "smoothie",
        "protein",
        "almond",
        "berries"
      ]
    },
    "Scrambled egg whites with sautéed spinach and cherry tomatoes": {
      "calories": 187.20000000000002,
      "carbohydrates_total_g": 9.3,
      "protein_g": 13.8,
      "products": [
        "scrambled egg",
        "spinach",
        "cherry tomatoes"
      ]
    },
    "Cottage cheese with pineapple chunks and a handful of almonds": {
      "calories": 668.2,
      "carbohydrates_total_g": 30,
      "protein_g": 27.9,
      "products": [
        "cottage cheese with pineapple",
        "almonds"
      ]
    },
    "Whole-grain English muffin with natural peanut butter and apple slices": {
      "calories": 869.6,
      "carbohydrates_total_g": 81.1,
      "protein_g": 32.2,
      "products": [
        "english muffin",
        "natural peanut butter",
        "apple"
      ]
    },
    "Quinoa porridge with almond milk, blueberries, and honey": {
      "calories": 1122.5,
      "carbohydrates_total_g": 137.8,
      "protein_g": 30.1,
      "products": [
        "quinoa",
        "porridge",
        "almond",
        "honey"
      ]
    }
  },
  "lunch": {
    "Grilled chicken salad with mixed greens, cherry tomatoes, and balsamic vinaigrette": {
      "calories": 482.8,
      "carbohydrates_total_g": 33,
      "protein_g": 32.5,
      "products": [
        "grilled chicken",
        "salad",
        "cherry",
        "balsamic vinaigrette"
      ]
    },
    "Tuna salad with mixed greens, cucumbers, and lemon vinaigrette": {
      "calories": 610.5,
      "carbohydrates_total_g": 12.100000000000001,
      "protein_g": 16.8,
      "products": [
        "tuna salad",
        "lemon vinaigrette"
      ]
    },
    "Spaghetti squash with marinara sauce and a side of grilled vegetables": {
      "calories": 120.10000000000001,
      "carbohydrates_total_g": 18.2,
      "protein_g": 3.3999999999999995,
      "products": [
        "spaghetti squash",
        "marinara sauce",
        "grilled vegetables"
      ]
    },
    "Cottage cheese with pineapple chunks and a handful of almonds": {
      "calories": 668.2,
      "carbohydrates_total_g": 30,
      "protein_g": 27.9,
      "products": [
        "cottage cheese with pineapple",
        "almonds"
      ]
    },
    "Veggie stir-fry with tofu and brown rice": {
      "calories": 223.8,
      "carbohydrates_total_g": 31.200000000000003,
      "protein_g": 14,
      "products": [
        "veggie",
        "tofu",
        "brown rice"
      ]
    },
    "Chickpea salad with tomatoes, cucumbers, feta, and olive oil dressing": {
      "calories": 1232.6,
      "carbohydrates_total_g": 28,
      "protein_g": 5,
      "products": [
        "chickpea salad",
        "olive oil",
        "oil dressing"
      ]
    },
    "Greek salad with grilled chicken, olives, and feta cheese": {
      "calories": 354.29999999999995,
      "carbohydrates_total_g": 9.600000000000001,
      "protein_g": 17.099999999999998,
      "products": [
        "greek salad",
        "feta cheese"
      ]
    },
    "Lentil soup with a side of steamed broccoli": {
      "calories": 91.4,
      "carbohydrates_total_g": 15.399999999999999,
      "protein_g": 6.199999999999999,
      "products": [
        "lentil soup",
        "broccoli"
      ]
    }
  },
  "dinner": {
    "Baked salmon with roasted asparagus and quinoa": {
      "calories": 343.3,
      "carbohydrates_total_g": 25.2,
      "protein_g": 29,
      "products": [
        "baked salmon",
        "asparagus",
        "quinoa"
      ]
    },
    "Grilled chicken breast with steamed broccoli and sweet potato": {
      "calories": 261,
      "carbohydrates_total_g": 24.8,
      "protein_g": 33.5,
      "products": [
        "grilled chicken breast",
        "broccoli",
        "sweet potato"
      ]
    },
    "Shrimp stir-fry with mixed vegetables and brown rice": {
      "calories": 262.3,
      "carbohydrates_total_g": 31.700000000000003,
      "protein_g": 26.6,
      "products": [
        "shrimp",
        "mixed vegetables",
        "brown rice"
      ]
    },
    "Turkey meatballs with zucchini noodles and marinara sauce": {
      "calories": 172.8,
      "carbohydrates_total_g": 18.8,
      "protein_g": 9.6,
      "products": [
        "turkey meatballs",
        "zucchini noodles",
        "marinara sauce"
      ]
    },
    "Black bean and quinoa stuffed bell peppers": {
      "calories": 356.4,
      "carbohydrates_total_g": 51.4,
      "protein_g": 19.6,
      "products": [
        "black bean",
        "quinoa",
        "stuffed bell peppers"
      ]
    },
    "Baked cod with a side of sautéed spinach and wild rice": {
      "calories": 227.4,
      "carbohydrates_total_g": 25.3,
      "protein_g": 29.599999999999998,
      "products": [
        "cod",
        "spinach",
        "wild rice"
      ]
    },
    "Chicken and vegetable kabobs with a side of couscous": {
      "calories": 379.29999999999995,
      "carbohydrates_total_g": 27.799999999999997,
      "protein_g": 28.9,
      "products": [
        "chicken",
        "vegetable kabobs",
        "couscous"
      ]
    },
    "Beef and vegetable stir-fry with cauliflower rice": {
      "calories": 349.7,
      "carbohydrates_total_g": 11.7,
      "protein_g": 30.2,
      "products": [
        "beef",
        "vegetable",
        "cauliflower rice"
      ]
    }
  }
}

app.get('/api/food/initialize', async (req: Request, res: Response) => {

  for (let mealType in meals) {
    for (let mealName in meals[mealType]) {
      try {
        const nutritionRes: NutritionData = await axios.get('https://api.api-ninjas.com/v1/nutrition', {
          headers: {
            'X-Api-Key': '+zUN4owWiF5rCoJi9kTwhQ==rZcxhOCsJQeElreX'
          },
          params: {
            query: mealName
          }
        });

        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let products: string[] = [];

        nutritionRes.data.forEach(item => {
          totalCalories += item.calories;
          totalProtein += item.protein_g;
          totalCarbs += item.carbohydrates_total_g;
          products.push(item.name);
        })

        meals[mealType][mealName].calories = totalCalories;
        meals[mealType][mealName].protein_g = totalProtein;
        meals[mealType][mealName].carbohydrates_total_g = totalCarbs;
        meals[mealType][mealName].products = products;

      } catch (error: any) {
        console.error('Request failed:', error);
        if (error.response) {
          res.status(error.response.status).json({ error: error.response.data });
        }
      }

    }
  }


  return res.send("Success");
});

app.post('/api/food/getmeals', async (req: Request, res: Response) => {

  const criteria = req.body.criteria;

  const mealsFitCriteria: any[] = [];

  for (let breakfast in meals["breakfast"]) {
    for (let lunch in meals["lunch"]) {
      for (let dinner in meals["dinner"]) {
        let totalCalories = meals["breakfast"][breakfast].calories + meals["lunch"][lunch].calories + meals["dinner"][dinner].calories;
        let totalCarbs = meals["breakfast"][breakfast].carbohydrates_total_g + meals["lunch"][lunch].carbohydrates_total_g + meals["dinner"][dinner].carbohydrates_total_g;
        let totalProtein = meals["breakfast"][breakfast].protein_g + meals["lunch"][lunch].protein_g + meals["dinner"][dinner].protein_g;
        let products = meals["breakfast"][breakfast].products.concat(meals["lunch"][lunch].products, meals["dinner"][dinner].products);

        if (Math.abs(totalCarbs - criteria.carbsCount) < 60) {
          if (Math.abs(totalProtein - criteria.proteinCount) < 30) {
            if (criteria.type == "balanced" && totalCalories >= 1500 && totalCalories <= 1700) {
              mealsFitCriteria.push({
                breakfast: breakfast,
                lunch: lunch,
                dinner: dinner,
                totalCalories: totalCalories,
                totalCarbs: totalCarbs,
                totalProtein: totalProtein,
                products: products
              });
            } else if (criteria.type == "weight loss" && totalCalories <= 1500) {
              mealsFitCriteria.push({
                breakfast: breakfast,
                lunch: lunch,
                dinner: dinner,
                totalCalories: totalCalories,
                totalCarbs: totalCarbs,
                totalProtein: totalProtein,
                products: products
              });
            } else if (criteria.type == "weight gain" && totalCalories >= 1700) {
              mealsFitCriteria.push({
                breakfast: breakfast,
                lunch: lunch,
                dinner: dinner,
                totalCalories: totalCalories,
                totalCarbs: totalCarbs,
                totalProtein: totalProtein,
                products: products
              });
            }
          }
        }
      }
    }
  }

  const tempData: IMeal[] = [];
  if (criteria.duration == "day") {
    tempData.push(mealsFitCriteria[0])
  } else {
    for (let i = 0; i < (mealsFitCriteria.length > 7 ? 7 : mealsFitCriteria.length); i++) {
      tempData.push(mealsFitCriteria[i])
    }
  }

  return res.send(tempData)
});

const stores = [
  {
    name: "Iki",
    location: "Varnių g. 38a, Kaunas",
    distanceTo: 0,
  },
  {
    name: "Rimi",
    location: "Varnių g. 41, Kaunas",
    distanceTo: 0,
  },
  {
    name: "Maxima",
    location: "Jonavos g. 60, Kaunas",
    distanceTo: 0,
  }
];

const prices = [
  {
    "name": "Iki",
    "products": {
      "greek yogurt": 2.8,
      "berries": 3.5,
      "chia seeds": 2.2,
      "oats": 2.6,
      "almond": 3.4,
      "banana": 1.4,
      "cinnamon": 0.8,
      "avocado": 2.4,
      "toast": 1.9,
      "bread": 1.6,
      "poached egg": 1.2,
      "smoothie": 4.6,
      "protein": 4.0,
      "spinach": 2.8,
      "cherry tomatoes": 2.4,
      "scrambled egg": 1.6,
      "cottage cheese with pineapple": 3.3,
      "almonds": 4.0,
      "english muffin": 2.2,
      "natural peanut butter": 3.5,
      "apple": 1.9,
      "quinoa": 3.8,
      "porridge": 2.6,
      "honey": 2.9,
      "grilled chicken": 4.5,
      "salad": 1.9,
      "cherry": 2.4,
      "balsamic vinaigrette": 2.2,
      "tuna salad": 4.0,
      "lemon vinaigrette": 1.6,
      "spaghetti squash": 2.2,
      "marinara sauce": 2.4,
      "grilled vegetables": 3.0,
      "veggie": 2.6,
      "tofu": 3.2,
      "brown rice": 1.9,
      "chickpea salad": 3.8,
      "olive oil": 3.0,
      "oil dressing": 1.9,
      "greek salad": 3.1,
      "feta cheese": 3.5,
      "lentil soup": 2.5,
      "broccoli": 2.7,
      "baked salmon": 5.5,
      "asparagus": 4.0,
      "grilled chicken breast": 4.5,
      "sweet potato": 2.2,
      "shrimp": 5.0,
      "mixed vegetables": 3.0,
      "turkey meatballs": 4.0,
      "zucchini noodles": 2.5,
      "black bean": 2.2,
      "stuffed bell peppers": 2.6,
      "baked cod": 4.8,
      "sautéed spinach": 2.8,
      "wild rice": 3.0,
      "chicken": 4.5,
      "vegetable kabobs": 3.5,
      "couscous": 2.0,
      "beef": 5.5,
      "cauliflower rice": 2.5
    }
  },
  {
    "name": "Maxima",
    "products": {
      "greek yogurt": 2.5,
      "berries": 3.1,
      "chia seeds": 1.9,
      "oats": 2.4,
      "almond": 3.3,
      "banana": 1.2,
      "cinnamon": 0.7,
      "avocado": 2.1,
      "toast": 1.6,
      "bread": 1.3,
      "poached egg": 0.9,
      "smoothie": 4.2,
      "protein": 3.6,
      "spinach": 2.4,
      "cherry tomatoes": 2.1,
      "scrambled egg": 1.3,
      "cottage cheese with pineapple": 2.9,
      "almonds": 3.6,
      "english muffin": 1.8,
      "natural peanut butter": 3.1,
      "apple": 1.6,
      "quinoa": 3.3,
      "porridge": 2.2,
      "honey": 2.5,
      "grilled chicken": 4.1,
      "salad": 1.6,
      "cherry": 2.1,
      "balsamic vinaigrette": 1.9,
      "tuna salad": 3.6,
      "lemon vinaigrette": 1.3,
      "spaghetti squash": 1.9,
      "marinara sauce": 2.1,
      "grilled vegetables": 2.6,
      "veggie": 2.3,
      "tofu": 2.9,
      "brown rice": 1.6,
      "chickpea salad": 3.3,
      "olive oil": 2.6,
      "oil dressing": 1.6,
      "greek salad": 2.8,
      "feta cheese": 3.1,
      "lentil soup": 2.1,
      "broccoli": 2.3,
      "baked salmon": 5.1,
      "asparagus": 3.6,
      "grilled chicken breast": 4.1,
      "sweet potato": 1.9,
      "shrimp": 4.6,
      "mixed vegetables": 2.6,
      "turkey meatballs": 3.6,
      "zucchini noodles": 2.1,
      "black bean": 1.9,
      "stuffed bell peppers": 2.3,
      "baked cod": 4.3,
      "sautéed spinach": 2.4,
      "wild rice": 2.6,
      "chicken": 4.1,
      "vegetable kabobs": 3.1,
      "couscous": 1.6,
      "beef": 5.1,
      "cauliflower rice": 2.1
    }
  },
  {
    "name": "Rimi",
    "products": {
      "greek yogurt": 2.6,
      "berries": 3.2,
      "chia seeds": 2.0,
      "oats": 2.5,
      "almond": 3.2,
      "banana": 1.3,
      "cinnamon": 0.8,
      "avocado": 2.3,
      "toast": 1.7,
      "bread": 1.4,
      "poached egg": 1.0,
      "smoothie": 4.3,
      "protein": 3.7,
      "spinach": 2.5,
      "cherry tomatoes": 2.2,
      "scrambled egg": 1.4,
      "cottage cheese with pineapple": 3.0,
      "almonds": 3.7,
      "english muffin": 1.9,
      "natural peanut butter": 3.2,
      "apple": 1.7,
      "quinoa": 3.4,
      "porridge": 2.3,
      "honey": 2.6,
      "grilled chicken": 4.2,
      "salad": 1.7,
      "cherry": 2.2,
      "balsamic vinaigrette": 2.0,
      "tuna salad": 3.7,
      "lemon vinaigrette": 1.4,
      "spaghetti squash": 2.0,
      "marinara sauce": 2.2,
      "grilled vegetables": 2.7,
      "veggie": 2.4,
      "tofu": 3.0,
      "brown rice": 1.7,
      "chickpea salad": 3.4,
      "olive oil": 2.7,
      "oil dressing": 1.7,
      "greek salad": 2.9,
      "feta cheese": 3.2,
      "lentil soup": 2.2,
      "broccoli": 2.4,
      "baked salmon": 5.2,
      "asparagus": 3.7,
      "grilled chicken breast": 4.2,
      "sweet potato": 2.0,
      "shrimp": 4.7,
      "mixed vegetables": 2.7,
      "turkey meatballs": 3.7,
      "zucchini noodles": 2.2,
      "black bean": 2.0,
      "stuffed bell peppers": 2.4,
      "baked cod": 4.4,
      "sautéed spinach": 2.5,
      "wild rice": 2.7,
      "chicken": 4.2,
      "vegetable kabobs": 3.2,
      "couscous": 1.7,
      "beef": 5.2,
      "cauliflower rice": 2.2
    }
  }
]

app.post('/api/googlemaps/getdistance', async (req: Request, res: Response) => {
  const criteria = req.body.criteria;
  const location = req.body.location;

  const apiKey = 'AIzaSyDHYNqf489IMFuG_2LyE-txGx8fzeQvl3s';

  const endpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json';

  try {
    let tempStores = [];

    for (let i = 0; i < stores.length; i++) {
      const params = {
        origins: location,
        destinations: stores[i].location,
        key: apiKey,
      };

      const response = await axios.get(endpoint, { params });
      const data = response.data;
      if (data.rows[0].elements[0].status === 'OK' && criteria.distance * 1000 > data.rows[0].elements[0].distance.value) {
        stores[i].distanceTo = data.rows[0].elements[0].distance.value
        tempStores.push(stores[i]);
      } else {
      }
    }
    res.send(tempStores)
  } catch (error) {
    console.error('Error fetching distance data:', error);
    res.status(401).send(error)
  }


});

app.post('/api/shops/getshopinformation', async (req: Request, res: Response) => {
  const nearbyStores = req.body.stores;

  const tempData = [];

  for (let i = 0; i < nearbyStores.length; i++) {
    for (let j = 0; j < prices.length; j++) {
      if (nearbyStores[i].name == prices[j].name) {
        tempData.push(prices[j]);
      }
    }
  }

  res.send(tempData);
});

app.get('/api/food/getallmeals', async (req: Request, res: Response) => {
  return res.send(meals);
});

// Route to handle ChatGPT queries
app.post('/api/chat_gpt', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const filteredMessages = body.messages.filter((message: any) => message.content !== null);
    console.log('Filtered messages:', filteredMessages);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: filteredMessages,
    });
    const theResponse = completion.choices[0].message.content;
    console.log('ChatGPT response:', theResponse);
    res.status(200).json({ response: theResponse });
  } catch (error: any) {
    console.error('An unexpected error occurred:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
