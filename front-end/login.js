// login.js
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id); // Assuming the API returns the user ID
            window.location.href = 'index.html';
        } else {
            document.getElementById('loginMessage').innerText = data.message || 'Login failed!';
        }
    } catch (error) {
        document.getElementById('loginMessage').innerText = 'An error occurred. Please try again.';
    }
});
