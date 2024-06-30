document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('postForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const content = document.getElementById('postContent').value;
        const schedule = document.getElementById('postSchedule').value;
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

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
                                loadUserPosts();
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

    loadUserPosts();
});
