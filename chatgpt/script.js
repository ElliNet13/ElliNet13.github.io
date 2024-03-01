let messages = [];

window.addEventListener('unhandledrejection', function(event) {
    document.getElementById('output').value = "Error! Please try again."
});

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
  document.getElementById('output').value = "Added system message.";
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
        //model: "gpt-3.5-turbo",
        model: "gpt-4",
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
