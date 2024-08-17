document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signupMessage = document.getElementById('signup-message');
    const internetIdentityInput = document.getElementById('internet-identity');

    // Handle Internet Identity authentication
    internetIdentityInput.addEventListener('click', async () => {
        try {
            // Replace the URL below with the actual URL of your Internet Identity service
            const iiUrl = "https://identity.ic0.app/";
            
            // Initiate the Internet Identity authentication process
            const identity = await window.ic.identityProvider.auth({ url: iiUrl });

            // Once authenticated, store the principal ID in the input field
            internetIdentityInput.value = identity.getPrincipal().toString();
        } catch (error) {
            console.error("Internet Identity authentication failed", error);
            signupMessage.textContent = "Failed to authenticate with Internet Identity.";
            signupMessage.style.color = "red";
        }
    });

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('signup-username').value.trim();
        const internetIdentity = document.getElementById('internet-identity').value.trim();

        // Clear any previous messages
        signupMessage.textContent = '';

        // Perform your sign-up logic here
        if (username && internetIdentity) {
            // Simulated sign-up check
            // In a real application, you'd send this data to your backend
            signupMessage.textContent = 'Sign up successful!';
            signupMessage.style.color = 'green';
        } else {
            signupMessage.textContent = 'Please fill in all fields and authenticate with Internet Identity';
            signupMessage.style.color = 'red';
        }
    });
});
