const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

async function addDonation(username, amount, cause) 
{
  try 
  {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database
    const database = client.db('allDonations');
    const collection = database.collection('allDonations');

    // Insert a document
    const result = await collection.insertOne({ "user" : username, "amount" : amount, "cause" : cause });
    console.log('Inserted document:', result.insertedId);

  } 
  finally 
  {
    // Close the connection
    await client.close();
  }
}

export default addDonation;
