if ('bluetooth' in navigator) {
  let characteristic; // Define characteristic globally
  
  class BluetoothError extends Error {
  constructor(message) {
    super(message);
    this.name = "BluetoothError";
  }
}

  async function connectBluetooth() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['generic_attribute'] }],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('generic_attribute');
      characteristic = await service.getCharacteristic('6BEE6C43-372A-4401-A653-2EB9528526BF');

      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const receivedMessage = new TextDecoder().decode(event.target.value);
        displayMessage(receivedMessage);
      });

      await characteristic.startNotifications();
    } catch (error) {
      displayError(`Bluetooth error: ${error}`);
    }
  }

  function displayError(errorMessage) {
    document.write(`<p style="color: red;">${errorMessage}</p>`);
    throw new BluetoothError(errorMessage)
  }

  function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message.trim() !== '') {
      const messageDiv = document.getElementById('messageDiv');
      messageDiv.innerHTML += `<p>${message}</p>`;

      characteristic.writeValue(new TextEncoder().encode(message))
        .catch((error) => {
          displayError(`Failed to send message: ${error}`);
        });
    }

    // Clear the input field
    messageInput.value = '';
  }

  function displayMessage(message) {
    const messageDiv = document.getElementById('messageDiv');
    messageDiv.innerHTML += `<p>${message}</p>`;
  }
} else {
  displayError('Web Bluetooth API not supported.');
}