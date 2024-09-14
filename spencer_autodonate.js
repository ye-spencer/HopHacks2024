// Define your API key
const apiKey = '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';

function findCharitiesBasedOnDesireAndAmount(desire, amount)
{
    // Define the API endpoint and request headers
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const headers = 
    {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };
    // Define the request body
    const requestBody = 
    {
    model: 'gpt-3.5-turbo',
    messages: [{ 
        role: 'user', 
        content: `Can you find 2 to 5 charities that match up with this desire "i want to donate to support ${desire}", and distribute ${amount} dollars among the charities based on how well they match up. The format should be "name : $amount" for each charity. Please do not add anything else to your response.` 
        }]
    };

    // Make the API call
    fetch(endpoint, 
    {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => 
    {
        // Handle the response data
        console.log('Response:', data.choices[0].message.content);
    })
    .catch(error => 
    {
        // Handle any errors
        console.error('Error:', error);
    });
}





//console.log(`Can you find 2 to 5 charities that match up with this desire "i want to donate to support ${desire}", and distribute 100 points among the charities based on how well they match up`);
desire = "abortion in california"; // need to collect
amount = "15"; // need to collect
findCharitiesBasedOnDesireAndAmount(desire, amount);