document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const senha = document.getElementById('senha').value;

        try {
            const response = await fetch('http://localhost:3030/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                window.location.href = 'reserva.html';
            } else {
                alert(data.message || 'Login ou senha inválidos');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro na comunicação com o servidor');
        }
    });
});
