// auth.js
document.addEventListener('DOMContentLoaded', function() {

    const userId = localStorage.getItem('userId');
    if (!userId) {
      // Handle missing userId
      console.error('User ID not found in local storage.');
      return;
    } else {
        console.log("User ID: ", userId);
    }

    document.getElementById('linkTwitter').addEventListener('click', function() {
        console.log("Calling out to twitter api...")

        window.location.href = `http://localhost:3000/auth/twitter?userId=${userId}`;
    });
    
    document.getElementById('linkFacebook').addEventListener('click', function(){
        console.log("Calling out to facebook api...")

        window.location.href = `http://localhost:3000/auth/facebook?userId=${userId}`;
    });

    document.getElementById('linkLinkedIn').addEventListener('click', function(){
        window.location.href = `http://localhost:3000/auth/linkedin?userId=${userId}`;
    });

    document.getElementById('linkInstagram').addEventListener('click', function(){
        window.location.href = `http://localhost:3000/auth/instagram?userId=${userId}`;
    });
/*
    document.getElementById('linkTwitter').addEventListener('click', async function() {
        try {
          const response = await fetch(`http://localhost:3000/auth/twitter`);
          const text = await response.text(); // Read response as text
      
          if (response.ok) {
            alert('Contacting twitter...');
          } else {
            try {
              const data = JSON.parse(text); // Try to parse JSON
              alert(data.message || 'Failed to contact twitter...');
            } catch (e) {
              alert(`Unexpected response: ${text}`); // If not JSON, show the response text
            }
          }
        } catch (error) {
          alert(error.message);
        }
      });

    document.getElementById('linkFacebook').addEventListener('click', async function() {
        try{
            const response = await fetch(`http://localhost:3000/auth/facebook`);
            if (response.ok) {
                alert('Contacting facebook...');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to contact facebook...');
            }    
        } catch (error){
            alert(error.message);
        }
    });

    document.getElementById('linkLinkedIn').addEventListener('click', async function() {
        console.log("Testing...");
        try{
            const response = await fetch(`http://localhost:3000/auth/linkedin`);
            if (response.ok) {
                alert('Contacting linkedin...');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to contact linkedin...');
            }    
        } catch (error){
            alert(error.message);
        }
    });

    // Adding Instagram authentication
    document.getElementById('linkInstagram').addEventListener('click', async function() {
        try {
            const response = await fetch(`http://localhost:3000/auth/instagram`);
            if (response.ok) {
                alert('Contacting Instagram...');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to contact Instagram...');
            }
        } catch (error) {
            alert(error.message);
        }
    });

    */
});