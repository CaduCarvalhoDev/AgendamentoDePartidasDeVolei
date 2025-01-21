document.addEventListener('DOMContentLoaded', () => {

    const userId = localStorage.getItem('userId');
    const loggedUserLogin = localStorage.getItem('login');

    console.log(userId)
    console.log(loggedUserLogin)

    if (!userId) {
        alert('Erro: ID do usuário não encontrado. Faça login novamente.');
        window.location.href = 'login.html';
        return;
    }


    const populateFields = async () => {
        try {
            const response = await fetch(`http://localhost:3030/usuarios/${loggedUserLogin}`);
            const userData = await response.json();

            if (response.ok) {
                document.getElementById('name').value = userData.name;
                document.getElementById('contact').value = userData.email;
                document.getElementById('login').value = userData.login;
                document.getElementById('password').value = userData.senha;
            } else {
                alert(userData.message || 'Erro ao buscar os dados do usuário');
            }
        } catch (error) {
            console.error('Erro ao carregar os dados do usuário:', error);
            alert('Erro ao carregar os dados do usuário');
        }
    };

    // Atualizar os dados do usuário
    const handleUpdate = () => {
        const confirmButton = document.querySelector('.btn-confirm');
        if (!confirmButton) return;

        confirmButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('contact').value.trim();
            const login = document.getElementById('login').value.trim();
            const senha = document.getElementById('password').value.trim();

            try {
                // Log para depuração
                console.log('Dados enviados:', { name, email, login, senha });

                const response = await fetch(`http://localhost:3030/usuarios/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, login, senha }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Dados atualizados com sucesso!');
                    localStorage.setItem('login', login);
                    window.location.href = 'perfil.html';
                } else {
                    console.error('Erro na resposta do servidor:', data);
                    alert(data.message || 'Erro ao atualizar os dados');
                }
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
                alert('Erro na comunicação com o servidor');
            }
        });
    };


    const handleDelete = () => {
        const deleteButton = document.querySelector('.btn-delete');
        if (!deleteButton) return;

        deleteButton.addEventListener('click', async (event) => {
            event.preventDefault();

            if (confirm('Tem certeza que deseja excluir sua conta?')) {
                try {
                    const response = await fetch(`http://localhost:3030/usuarios/${userId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        alert('Conta excluída com sucesso!');
                        localStorage.removeItem('login');
                        localStorage.removeItem('userId');
                        window.location.href = 'login.html';
                    } else {
                        const data = await response.json();
                        alert(data.message || 'Erro ao excluir a conta');
                    }
                } catch (error) {
                    console.error('Erro ao excluir usuário:', error);
                    alert('Erro na comunicação com o servidor');
                }
            }
        });
    };


    populateFields();
    handleUpdate();
    handleDelete();
});

document.addEventListener('DOMContentLoaded', () => {
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');

    toggleButton.addEventListener('click', () => {
        // Verifica o tipo atual do campo de senha
        if (passwordField.type === 'password') {
            passwordField.type = 'text'; // Altera para texto
            toggleButton.textContent = '👁️'; // Altera o ícone
        } else {
            passwordField.type = 'password'; // Altera para senha
            toggleButton.textContent = '👁️'; // Altera o ícone
        }
    });
});
