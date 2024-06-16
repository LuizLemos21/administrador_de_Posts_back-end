// auth.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('linkTwitter').addEventListener('click', async function() {
        try {
            const response = await fetch(`http://localhost:3000/auth/twitter`);
            const text = await response.text();

            if (response.ok) {
                alert('Contacting twitter...');
            } else {
                try {
                    const data = JSON.parse(text);
                    alert(data.message || 'Failed to contact twitter...');
                } catch (e) {
                    alert(`Unexpected response: ${text}`);
                }
            }
        } catch (error) {
            alert(error.message);
        }
    });

    document.getElementById('linkFacebook').addEventListener('click', async function() {
        try {
            const response = await fetch(`http://localhost:3000/auth/facebook`);
            if (response.ok) {
                alert('Contacting facebook...');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to contact facebook...');
            }
        } catch (error) {
            alert(error.message);
        }
    });

    document.getElementById('linkLinkedIn').addEventListener('click', async function() {
        try {
            const response = await fetch(`http://localhost:3000/auth/linkedin`);
            if (response.ok) {
                alert('Contacting linkedin...');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to contact linkedin...');
            }
        } catch (error) {
            alert(error.message);
        }
    });
});
