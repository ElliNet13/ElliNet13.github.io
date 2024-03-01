let messages = [];

async function sendUserInput() {
  const userInput = document.getElementById('prompt').value;
  messages.push({ role: "user", content: userInput });
  const response = await fetchData(messages, "user", userInput);
  const responseData = response.choices[0].message;
  messages.push({ role: "system", content: responseData.content });
  document.getElementById('output').value = responseData.content;
}

async function sendSystemMessage() {
  const systemMessage = document.getElementById('systemMessage').value;
  messages.push({ role: "system", content: systemMessage });
  const response = await fetchData(messages, "system", systemMessage);
  const responseData = response.choices[0].message;
  messages.push({ role: "user", content: responseData.content });
  document.getElementById('output').value = responseData.content;
}

async function resetBot() {
  messages = [];
  document.getElementById('prompt').value = '';
  document.getElementById('output').value = '';
}

async function fetchData(messages, role, content) {
  try {
    const response = await fetch("https://reverse.mubi.tech/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages.concat([{ role: role, content: content }])
      })
    });

    if (!response.ok) {
      console.log('Network response was not ok! Try again.');
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function updateInput(value) {
  document.getElementById('systemMessage').value = value
}

// Assuming you have a JSON object called 'data'
let data;

(async () => {
  try {
    const response = await fetch('prompts.json');
    data = await response.json();
  } catch (error) {
    console.error('Error fetching JSON:', error);
    // Handle errors if needed
  }
})();

// Getting the select element
var select = document.getElementById('dropdown')

// Iterating over the keys in the JSON object
for (var key in data) {
  if (data.hasOwnProperty(key)) {
    // Creating an option element
    var option = document.createElement("option");
    
    // Setting the option's text and value
    option.text = key;
    option.value = data[key];
    
    // Adding the option to the select element
    select.add(option);
  }
}
updateInput(data['DAN (Jailbreak)'])
