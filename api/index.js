const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const apiKey = '9UsFenY7QpHuDKyYG961seFUd8xwHFC8NIOSH4Ef';

  const today = new Date();
  const dateTo = new Date(today);
  dateTo.setFullYear(today.getFullYear() + 1);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const dateFromStr = formatDate(today);
  const dateToStr = formatDate(dateTo);

  const body = {
    listings: [
      {
        id: "613014927246709169",
        pms: "airbnb",
        dateFrom: dateFromStr,
        dateTo: dateToStr,
        reason: true
      }
    ]
  };

  try {
    const response = await fetch('https://api.pricelabs.co/v1/listing_prices', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'X-API-Key': apiKey,
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
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
