// Function called when Google Sign-In is successful
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    score = getScore(id_token)
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score}`;
    // Get user profile information
    const profile = googleUser.getBasicProfile();

    // Display the user's profile picture
    const profilePicture = document.getElementById('profile-picture');
    profilePicture.src = profile.getImageUrl();

    // Display the user's name (optional)
    // const userName = profile.getName();
    // console.log(`Welcome, ${userName}!`);
}

// Function to sign the user out
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        console.log('User signed out.');
        // Clear the profile picture
        const profilePicture = document.getElementById('profile-picture');
        profilePicture.src = '';
    });
}

let score = 0;

// Function to increment the score
function incrementScore() {
    score++;
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score}`;
    saveScore(score, id_token)
}
// Function to save the score using the user's Google ID token
function saveScore(score, googleIdToken) {
    // Store the score along with the Google ID token
    localStorage.setItem(googleIdToken, score.toString());
}

// Function to retrieve the user's score using their Google ID token
function getScore(googleIdToken) {
    // Retrieve the score associated with the Google ID token
    const score = localStorage.getItem(googleIdToken);
    return score ? parseInt(score) : 0; // Parse the score as an integer or default to 0
}

