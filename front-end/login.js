// login.js
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id); 
            localStorage.setItem('userName', data.user.nome); 
            window.location.href = 'front.html';
        } else {
            document.getElementById('loginMessage').innerText = data.message || 'Login failed!';
        }
    } catch (error) {
        document.getElementById('loginMessage').innerText = 'An error occurred. Please try again.';
    }
});

document.getElementById('registerButton').addEventListener('click', function() {
    window.location.href = 'register.html'; 
})