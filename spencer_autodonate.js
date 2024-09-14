// Define your API key
const apiKey = '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';

// Define the API endpoint and request headers
const endpoint = 'https://api.openai.com/v1/chat/completions';
const headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json'
};

// Define the request body
const requestBody = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'user', content: 'Hello, how are you?' }
  ]
};

// Make the API call
fetch(endpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(requestBody)
})
.then(response => response.json())
.then(data => {
  // Handle the response data
  console.log('Response:', data.choices);
})
.catch(error => {
  // Handle any errors
  console.error('Error:', error);
});
