const colorChooser = document.getElementById("colorChooser");
const createPopupButton = document.getElementById("createPopupButton");
// Add a click event listener to the button
createPopupButton.addEventListener("click", function () {
// Get references to the HTML elements
    // Get the selected color from the color chooser
    const selectedColor = colorChooser.value;

    const hexColor = selectedColor;

    // Create a new pop-up window with the selected color as the background
    const popup = window.open("", "_blank", "width=200,height=200");
    popup.document.body.style.backgroundColor = hexColor;
});