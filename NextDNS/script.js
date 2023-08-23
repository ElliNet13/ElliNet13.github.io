document.addEventListener("DOMContentLoaded", function () {
    fetch("https://test.nextdns.io")
        .then(response => response.json())
        .then(data => displayInfo(data))
        .catch(error => displayError(error));
});

function displayInfo(info) {
    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = `
        <h1>Status: ${info.status}</h1>
        <p>Protocol: ${info.protocol}</p>
        <p>Profile: ${info.profile}</p>
        <p>Client: ${info.client}</p>
        <p>Source IP: ${info.srcIP}</p>
        <p>Destination IP: ${info.destIP}</p>
        <p>Anycast: ${info.anycast ? "Yes" : "No"}</p>
        <p>Server: ${info.server}</p>
        <p>Client Name: ${info.clientName}</p>
        <p>Device Name: ${info.deviceName}</p>
        <p>Device ID: ${info.deviceID}</p>
        <p>Device Model: ${info.deviceModel}</p>
    `;
}

function displayError(error) {
    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = `<p>Error: ${error.message}</p>`;
}
