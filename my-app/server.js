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


// Route to handle calories burned queries
app.post('/api/nutrition', async (req, res) => {
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
  } catch (error) {
    console.error('Request failed:', error);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Request failed' });
    }
  }
});

app.post('/api/nutrition', async (req, res) => {
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
  } catch (error) {
    console.error('Request failed:', error);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Request failed' });
    }
  }
});

// Route to handle ChatGPT queries
app.post('/api/chat_gpt', async (req, res) => {
  try {
    const body = req.body;
    const filteredMessages = body.messages.filter(message => message.content !== null);
    console.log('Filtered messages:', filteredMessages);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: filteredMessages,
    });
    const theResponse = completion.choices[0].message.content;
    console.log('ChatGPT response:', theResponse);
    res.status(200).json({ response: theResponse });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
