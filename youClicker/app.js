// Function called when Google Sign-In is successful
function onSignIn(googleUser) {
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
}
