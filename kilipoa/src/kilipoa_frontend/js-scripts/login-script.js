document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const messageParagraph = document.getElementById('message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Clear any previous messages
        messageParagraph.textContent = '';

        // Perform your login logic here
        if (username && password) {
            // For demonstration, we're just checking if username and password are not empty
            // You should replace this with your actual authentication logic
            if (username === 'admin' && password === 'password') {
                messageParagraph.textContent = 'Login successful!';
                messageParagraph.style.color = 'green';
            } else {
                messageParagraph.textContent = 'Invalid username or password';
            }
        } else {
            messageParagraph.textContent = 'Please fill in all fields';
        }
    });
});
