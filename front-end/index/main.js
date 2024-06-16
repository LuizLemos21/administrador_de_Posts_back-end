// Checks if user is logged in, if not, redirects to login page
document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('greeting').innerText = `Hello ${userName}!`;
    } else {
        window.location.href = 'login.html';
        return;
    }
});

//Function to logout user
document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear local storage items
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('socialNetwork');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('token');
    localStorage.removeItem('socialEndpoint');
    window.location.href = 'login.html';


    
})