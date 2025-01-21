document.getElementById('register-button').addEventListener('click', async function () {
    const nome = document.getElementById('nome').value.trim();
    const contato = document.getElementById('contato').value.trim();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();
    

    if (nome && contato && login && senha) {
        try {
            const response = await fetch('http://localhost:3030/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nome,
                    email: contato,
                    login: login,
                    senha: senha,
                    adm: false
                }),
            });

            if (response.ok){
                const userInfoResponse = await fetch(`http://localhost:3030/usuarios/${login}`);
                if (userInfoResponse.ok){
                    const userInfo = await userInfoResponse.json();

                    localStorage.setItem('login', userInfo.login);
                    localStorage.setItem('userId', userInfo.id);
                }
            }

            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
                window.location.href = 'reserva.html';
            } else {
                const errorData = await response.json();
                alert(`Erro ao cadastrar: ${errorData.message || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro na comunicação com o servidor.');
        }
    } else {
        alert('Por favor, preencha todos os campos antes de continuar.');
    }
});
