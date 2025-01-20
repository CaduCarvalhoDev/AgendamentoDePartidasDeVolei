document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Capturar os valores de login e senha
        const login = document.getElementById('login').value.trim();
        const senha = document.getElementById('senha').value.trim();

        try {
            // Enviar requisição ao servidor
            const response = await fetch('http://localhost:3030/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login bem-sucedido
                const { id, message } = data; // Certifique-se de que o backend está retornando o 'id'

                alert(message);

                // Salvar o ID e o login no localStorage
                localStorage.setItem('userId', id);
                localStorage.setItem('login', login);

                // Redirecionar para a página de reserva
                window.location.href = 'reserva.html';
            } else {
                // Tratamento de erro do servidor
                alert(data.message || 'Login ou senha inválidos');
            }
        } catch (error) {
            // Tratamento de erros de conexão ou exceção
            console.error('Erro:', error);
            alert('Erro na comunicação com o servidor');
        }
    });
});
