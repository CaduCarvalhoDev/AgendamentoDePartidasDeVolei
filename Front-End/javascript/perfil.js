
document.addEventListener('DOMContentLoaded', async () => {
    const loginUsuario = localStorage.getItem('login');

    if (!loginUsuario) {
        alert('Por favor, logue novamente.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3030/usuarios/${loginUsuario}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do usuário');
        }

        const usuario = await response.json();

        document.getElementById('name').value = usuario.name;
        document.getElementById('contact').value = usuario.email;
        document.getElementById('login').value = usuario.login;
        document.getElementById('password').value = usuario.senha;
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar os dados do perfil.');
    }
});

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = '👁️';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = '👁️';
    }
}

