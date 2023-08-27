// Get references to the HTML elements
const colorChooser = document.getElementById("colorChooser");
const hexInput = document.getElementById("hexInput");
const createPopupButton = document.getElementById("createPopupButton");

// Add a click event listener to the button
createPopupButton.addEventListener("click", function () {
    // Get the selected color from the color chooser
    const selectedColor = colorChooser.value;

    // Or, if a hex color is provided, use that instead
    const hexColor = hexInput.value || selectedColor;

    // Create a new pop-up window with the selected color as the background
    const popup = window.open("", "_blank", "width=200,height=200");
    popup.document.body.style.backgroundColor = hexColor;
});