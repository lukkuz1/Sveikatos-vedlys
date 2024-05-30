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
app.use(cors());

const meals = {
  breakfast: {
    "Greek yogurt with fresh berries and a sprinkle of chia seeds": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    },
    "Overnight oats with almond milk, banana slices, and a dash of cinnamon": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    },
    "Avocado toast on whole-grain bread with a poached egg": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    },
  },
  lunch: {
    "Grilled chicken salad with mixed greens, cherry tomatoes, and balsamic vinaigrette": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    },
    "Tuna salad with mixed greens, cucumbers, and lemon vinaigrette": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    },
    "Spaghetti squash with marinara sauce and a side of grilled vegetables": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    },
  },
  dinner: {
    "Baked salmon with roasted asparagus and quinoa": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    },
    "Turkey meatballs with zucchini noodles and marinara sauce": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    },
    "Black bean and quinoa stuffed bell peppers": {
      calories: 0,
      carbohydrates_total_g: 0,
      protein_g: 0,
      products: [],
    }
  }
}

app.get('/initializeFoodData', async (req: Request, res: Response) => {
  return res.send("Success");
});

// Route to handle calories burned queries
app.post('/api/food', async (req: Request, res: Response) => {

  const query = req.body.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/nutrition', {
      headers: {
        'X-Api-Key': '+zUN4owWiF5rCoJi9kTwhQ==rZcxhOCsJQeElreX'
      },
      params: {
        query: query
      }
    });

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Request failed:', error);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Request failed' });
    }
  }
});

app.post('/api/nutrition', async (req: Request, res: Response) => {
  const activity = req.body.activity;

  if (!activity) {
    return res.status(400).json({ error: 'Activity is required' });
  }

  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/caloriesburned', {
      headers: {
        'X-Api-Key': '+zUN4owWiF5rCoJi9kTwhQ==rZcxhOCsJQeElreX'
      },
      params: {
        activity: activity
      }
    });

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Request failed:', error);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Request failed' });
    }
  }
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
