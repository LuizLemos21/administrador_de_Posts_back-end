document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    if (userName) {
      document.getElementById('greeting').innerText = `Hello ${userName}!`;
    } else {
      window.location.href = 'login.html'; // Redirect to login if no username is found
      return;
    }

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

    document.getElementById('postForm').addEventListener('submit', async function(event) {
        console.log("Creating post...");

        event.preventDefault();
        const content = document.getElementById('postContent').value;
        const schedule = document.getElementById('postSchedule').value;
        const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        try {
            const response = await fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    conteudo: content,
                    dataagendamento: schedule,
                    likes: 0,
                    comentarios: 0,
                    favoritacoes: 0,
                    compartilhamentos: 0,
                    userid: userId
                })
            });

            if (response.ok) {
                alert('Post created successfully');
                loadUserPosts(); // Function to reload posts
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to create post');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });

    async function loadUserPosts() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3000/posts/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const posts = await response.json();
                const postsList = document.getElementById('postsList');
                postsList.innerHTML = '';
                posts.forEach(post => {
                    const listItem = document.createElement('li');
                    listItem.className = 'post-item';
                    const countdown = document.createElement('div');
                    countdown.className = 'countdown';
                    updateCountdown(countdown, new Date(post.dataagendamento));
                    setInterval(() => updateCountdown(countdown, new Date(post.dataagendamento)), 1000);

                    listItem.innerHTML = `
                        <p>${post.conteudo}</p>
                        <div class="post-actions">
                            <label><input type="checkbox" value="twitter"> X/Twitter</label>
                            <label><input type="checkbox" value="facebook"> Facebook</label>
                            <label><input type="checkbox" value="instagram"> Instagram</label>
                            <label><input type="checkbox" value="linkedin"> LinkedIn</label>
                            <button class="publishButton" data-post-id="${post.id}">Publish</button>
                            <button class="delete-button" data-post-id="${post.id}"></button>
                        </div>
                    `;
                    listItem.insertBefore(countdown, listItem.querySelector('.post-actions'));
                    postsList.appendChild(listItem);
                });

                document.querySelectorAll('.publishButton').forEach(button => {
                    button.addEventListener('click', async function(event) {
                        const postId = event.target.getAttribute('data-post-id');
                        const selectedPlatforms = Array.from(button.closest('.post-actions').querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

                        if (selectedPlatforms.length === 0) {
                            alert('Please select at least one platform to publish');
                            return;
                        }

                        try {
                            const response = await fetch(`http://localhost:3000/posts/${postId}/publish`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ platforms: selectedPlatforms })
                            });

                            if (response.ok) {
                                alert('Post published successfully');
                            } else {
                                const data = await response.json();
                                alert(data.message || 'Failed to publish post');
                            }
                        } catch (error) {
                            alert('An error occurred. Please try again.');
                        }
                    });
                });

                document.querySelectorAll('.delete-button').forEach(button => {
                    button.addEventListener('click', async function(event) {
                        const postId = event.target.getAttribute('data-post-id');
                        const confirmation = confirm('Are you sure you want to delete this post?');

                        if (!confirmation) {
                            return;
                        }

                        try {
                            const response = await fetch(`http://localhost:3000/post/${postId}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                }
                            });

                            if (response.ok) {
                                alert('Post deleted successfully');
                                loadUserPosts(); // Reload posts after deletion
                            } else {
                                const data = await response.json();
                                alert(data.message || 'Failed to delete post');
                            }
                        } catch (error) {
                            alert('An error occurred. Please try again.');
                        }
                    });
                });
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to load posts');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    }

    function updateCountdown(element, targetDate) {
        const now = new Date();
        const diff = targetDate - now;

        // Adjust the countdown to end 3 hours earlier
        const adjustedTargetDate = new Date(targetDate);
        adjustedTargetDate.setHours(targetDate.getHours() - 3);

        const adjustedDiff = adjustedTargetDate - now;

        if (adjustedDiff <= 0) {
            element.innerText = 'Time to publish!';
            return;
        }

        const days = Math.floor(adjustedDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((adjustedDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((adjustedDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((adjustedDiff % (1000 * 60)) / 1000);

        element.innerText = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    loadUserPosts();
});
