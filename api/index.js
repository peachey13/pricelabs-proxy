const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const apiKey = '9UsFenY7QpHuDKyYG961seFUd8xwHFC8NIOSH4Ef';
  const body = {
    "listing_ids": ["613014927246709169"],
    "start_date": "2025-03-01",
    "end_date": "2025-12-31",
    "pms": "airbnb" // Added per spec
  };
  try {
    const response = await fetch('https://api.pricelabs.co/pricesForListings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
