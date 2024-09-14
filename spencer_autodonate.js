// import addDonation from './mongo_connect.mjs';

// Define your API key
const apiKey = config.CHAT_GPT_KEY;

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
        document.getElementById("donation-result").innerHTML = "Your donation has gone to: <br><br>" + data.choices[0].message.content.replaceAll("\n", "<br>");
        // addDonation("not-applicable", amount, cause); Removed for now
    })
    .catch(error => 
    {
        // Handle any errors
        console.error('Error:', error);
    });
}


function onDonateButton()
{
    let amount = document.getElementById("amount-input").value;
    let desire = document.getElementById("desire-input").value;
    console.log(desire);
    console.log(amount);
    findCharitiesBasedOnDesireAndAmount(desire, amount);

}

document.getElementById("donate-button").addEventListener("click", onDonateButton);
