const express = require('express');
const { fetch } = require('undici');
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON request bodies

app.post('/fetch-pricelabs', async (req, res) => {
  const apiKey = '9UsFenY7QpHuDKyYG961seFUd8xwHFC8NIOSH4Ef';

  const body = {
    listings: [
      {
        id: "613014927246709169", // Your listing ID
        pms: "airbnb",
        dateFrom: "2025-03-01",
        dateTo: "2025-12-31",
        reason: true,
      }
    ]
  };

  try {
    const response = await fetch('https://api.pricelabs.co/v1/pricesForListings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching PriceLabs data:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
