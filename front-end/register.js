document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('registerMessage').innerText = 'Passwords do not match!';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: username, email, senha: password })
        });

        if (response.ok) {
            document.getElementById('registerMessage').innerText = 'Registration successful! Redirecting to login...';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            const data = await response.json();
            document.getElementById('registerMessage').innerText = data.message || 'Failed to register!';
        }
    } catch (error) {
        document.getElementById('registerMessage').innerText = 'An error occurred. Please try again.';
    }
});
