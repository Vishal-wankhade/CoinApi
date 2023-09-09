const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

const { MongoClient , ServerApiVersion  } = require('mongodb');
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
const params = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 50,
  page: 1,
  sparkline: false,
};

axios.get(apiUrl, { params })
  .then(async (response) => {
    const cryptocurrencyData = response.data;


    const uri = 'mongodb+srv://vwankhade120:Qwerty123456@cluster0.lgvxvxy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
   serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true, }
});

client.connect()
  .then(async () => {
    const db = client.db('gekoCoins');
    const collection = db.collection('geko');
    const cryptocurrencyData = response.data; // Replace with your actual data

    // Insert the data into MongoDB
    const result = await collection.insertMany(cryptocurrencyData);
    console.log(`${result.insertedCount} records inserted.`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  })
  .finally(() => {
    client.close();
  });

   
  })
  .catch((error) => {
    console.error('Error fetching data from CoinGecko API:', error);
  });

 


  
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  