document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signupMessage = document.getElementById('signup-message');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        // Clear any previous messages
        signupMessage.textContent = '';

        // Perform your sign-up logic here
        if (username && password) {
            // Simulated sign-up check
            // In a real application, you'd send this data to your backend
            signupMessage.textContent = 'Sign up successful!';
            signupMessage.style.color = 'green';
        } else {
            signupMessage.textContent = 'Please fill in all fields';
        }
    });
});
