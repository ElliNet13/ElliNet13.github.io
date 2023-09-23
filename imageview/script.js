// script.js
// Initialize variables
const imageInput = document.getElementById('imageInput');
const displayImage = document.getElementById('displayImage');
const removeButton = document.getElementById('removeButton');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
let blobUrl;

// Function to remove the image and the Blob
function removeImage() {
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
  }
  displayImage.style.display = 'none';
  removeButton.style.display = 'none';
  imageInput.value = ''; // Clear the file input
  widthInput.value = '';
  heightInput.value = '';
  localStorage.removeItem('blobUrl'); // Remove Blob URL from localStorage
}

// Function to save Blob URL to localStorage
function saveBlobUrl(url) {
  localStorage.setItem('blobUrl', url);
}

// Function to update image dimensions
function updateImageDimensions() {
  const newWidth = widthInput.value;
  const newHeight = heightInput.value;
  
  if (newWidth) {
    displayImage.style.width = newWidth + 'px';
  } else {
    displayImage.style.width = 'auto';
  }
  
  if (newHeight) {
    displayImage.style.height = newHeight + 'px';
  } else {
    displayImage.style.height = 'auto';
  }
}

// Check if a Blob URL is stored in localStorage
const storedBlobUrl = localStorage.getItem('blobUrl');
if (storedBlobUrl) {
  // If a Blob URL is found, display it and show the Remove button
  displayImage.src = storedBlobUrl;
  displayImage.style.display = 'block';
  removeButton.style.display = 'block';
  blobUrl = storedBlobUrl;
  
  // Update image dimensions based on stored values
  updateImageDimensions();
}

// Add an event listener to the file input
imageInput.addEventListener('change', function () {
  const file = imageInput.files[0];
  if (file) {
    // Create a Blob from the uploaded image
    const blob = new Blob([file], { type: file.type });

    // Create a Blob URL for the image
    blobUrl = URL.createObjectURL(blob);

    // Display the image and show the Remove button
    displayImage.src = blobUrl;
    displayImage.style.display = 'block';
    removeButton.style.display = 'block';
    
    // Save the Blob URL to localStorage
    saveBlobUrl(blobUrl);
    
    // Update image dimensions based on user input
    updateImageDimensions();
  }
});

// Add an event listener to the Remove button
removeButton.addEventListener('click', removeImage);

// Add a "beforeunload" event to remove Blob URL on page exit
window.addEventListener('beforeunload', function () {
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
    localStorage.removeItem('blobUrl');
  }
});

// Add event listeners for input changes to update image dimensions
widthInput.addEventListener('input', updateImageDimensions);
heightInput.addEventListener('input', updateImageDimensions);
