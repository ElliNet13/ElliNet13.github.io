// Flag to track if Eruda is already initialized
var erudaInitialized = false;

// Regular error handling
window.onerror = function(message, source, lineno, colno, error) {
    alert("An error occurred: " + message);
    initEruda();
    return true; // Prevent default browser error handling
};

// Promise error handling
window.addEventListener('unhandledrejection', function(event) {
    alert("Unhandled Promise Rejection: " + event.reason);
    initEruda();
});

// Network error handling (for XMLHttpRequest)
document.addEventListener('error', function(event) {
    if (event.target.tagName.toLowerCase() === 'img' || event.target.tagName.toLowerCase() === 'script') {
        alert("Failed to load resource: " + event.target.src);
        initEruda();
    }
}, true);

// Initialize Eruda function
function initEruda() {
    if (!erudaInitialized) {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/eruda';
        script.onload = function () {
            eruda.init();
        };
        document.body.appendChild(script);
        erudaInitialized = true;
    }
}
