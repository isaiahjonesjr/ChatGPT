const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()); // need this line
app.use(cors());
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

app.post('/completions', async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100,
    })
  };

  try {
    const response = await fetch(OPENAI_API_URL, options);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));
