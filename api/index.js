const { fetch } = require('undici');

module.exports = async (req, res) => {
  const apiKey = 'UsFenY7QpHuDKyYG961seFUd8xwHFC8N';

  const body = {
    listings: [
      {
        id: "613014927246709169", // Use your actual listing IDs
        pms: "airbnb",
        dateFrom: "2025-03-01",
        dateTo: "2025-12-31",
        reason: true, // If this is part of the request you need to send
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
      const errorText = await response.text(); // Get detailed API error message
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching PriceLabs data:", error);
    res.status(500).json({ error: error.message });
  }
};
