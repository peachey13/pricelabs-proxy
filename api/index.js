const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const apiKey = '9UsFenY7QpHuDKyYG961seFUd8xwHFC8NIOSH4Ef';

  // Get today's date (dynamic)
  const today = new Date();
  // Set dateFrom to 1 year from today
  const dateFrom = new Date(today);
  dateFrom.setFullYear(today.getFullYear() + 1);
  // Set dateTo to 1 year from dateFrom
  const dateTo = new Date(dateFrom);
  dateTo.setFullYear(dateFrom.getFullYear() + 1);

  // Format dates as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];
  const dateFromStr = formatDate(dateFrom);
  const dateToStr = formatDate(dateTo);

  const body = {
    "listings": [
      {
        "id": "613014927246709169",
        "pms": "airbnb",
        "dateFrom": dateFromStr,
        "dateTo": dateToStr,
        "reason": true
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
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
