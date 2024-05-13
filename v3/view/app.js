document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: name, email: email , senha: password})
    })
    .then(response => response.json())
    .then(data => {
        alert('User created: ' + JSON.stringify(data));
        fetchUsers(); // Refresh the users list after adding a new user
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const content = document.getElementById('postContent').value;
    const userId = document.getElementById('userId').value;
    const scheduleDate = document.getElementById('postSchedule').value; 


    fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conteudo: content, userid: userId, dataagendamento: scheduleDate})
    })
    .then(response => response.json())
    .then(data => {
        alert('Post created: ' + JSON.stringify(data));
        fetchPosts(); // Refresh the posts list after adding a new post
    })
    .catch(error => console.error('Error:', error));
});

function fetchUsers() {
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = ''; // Clear existing users
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Name: ${user.nome}, Email: ${user.email}`;



            usersList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
}

function fetchPosts() {
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => {
        const postsList = document.getElementById('postsList');
        postsList.innerHTML = ''; // Clear existing posts
        posts.forEach(post => {
            const li = document.createElement('li');
            li.textContent = `Content: ${post.conteudo}, Data Agendada: ${post.dataagendamento}, Likes: ${post.likes}, Usuário: ${post.userid} `;
                        
            //Adicionar botões Edit e Delete
            const editButton = document.createElement('button');
            editButton.textContent='Edit';
            editButton.onclick = () => editPost(post.id);
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent='Delete';
            deleteButton.onclick = () => deletePost(post.id);
            li.appendChild(deleteButton);


            postsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching posts:', error));
}

function deletePost(id){
    if (confirm("Tem certeza de que quer deletar este post?")){
        fetch(`http://localhost:3000/post/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Post deletado!');
            fetchPosts();
        })
        .catch(error => console.error('Ocorreu um erro ao deletar o post!:', error));
    }

}

function editPost(id){
    const newContent = prompt("Insira novo conteudo");
    const newDate = prompt ("Insira nova data de agendamento");

    const updatedPost = {
        conteudo: newContent,
        dataagendamento: newDate
    };

    fetch(`http://localhost:3000/post/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(data => {
        alert('Post atualizado');
        fetchPosts();
    })
    .catch(error => console.error ('Erro ao atualizar post:', error));
}

// Fetch data initially on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
    fetchPosts();
});



