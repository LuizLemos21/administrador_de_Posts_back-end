document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('userForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nome: name, email, senha: password })
            });

            if (response.ok) {
                alert('User created successfully');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to create user');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });

    document.getElementById('postForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const content = document.getElementById('postContent').value;
        const schedule = document.getElementById('postSchedule').value;

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content, schedule, userId })
            });

            if (response.ok) {
                alert('Post created successfully');
                loadUserPosts();
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to create post');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });

    async function loadUserPosts() {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const posts = await response.json();
            const postsList = document.getElementById('postsList');
            postsList.innerHTML = '';

            posts.forEach(post => {
                const listItem = document.createElement('li');
                listItem.textContent = `${post.content} (Scheduled for: ${post.schedule})`;
                postsList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Failed to load posts:', error);
        }
    }

    loadUserPosts();
});
