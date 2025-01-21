async function carregarEventos() {
    try {
        // Obter o ID do usuário logado armazenado no localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Usuário não autenticado');
            window.location.href = 'login.html'; // Redirecionar para a página de login
            return;
        }

        // Fazer a requisição para buscar os eventos do usuário logado
        const response = await fetch(`http://localhost:3030/eventos?id_usuario=${userId}`);
        if (!response.ok) throw new Error('Erro ao carregar eventos');

        const eventos = await response.json();
        console.log(eventos);

        // Selecionar o elemento da grid onde os cards serão exibidos
        const grid = document.querySelector('.grid');
        grid.innerHTML = ''; // Limpar a grid antes de adicionar os novos eventos

        // Adicionar os eventos como cards na grid
        eventos.forEach(evento => {
            const card = `
                <div class="card">
                    <div class="card-header">${evento.quadra.nome}</div>
                    <img src="/Front-End/imagens/quadra 1.png" alt="${evento.quadra.nome}">
                    <div class="card-body">
                        <strong>Usuário:</strong> ${evento.usuario.name}<br>
                        <strong>Evento:</strong> ${evento.nome}<br>
                        <strong>Data:</strong> ${new Date(evento.data_horario).toLocaleDateString()}<br>
                        <strong>Horário:</strong> ${new Date(evento.data_horario).toISOString().substring(11, 16)}<br>
                    </div>
                </div>`;
            grid.innerHTML += card;
        });
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar eventos');
    }
}

// Quando o documento for carregado, chamar a função carregarEventos
document.addEventListener('DOMContentLoaded', carregarEventos);
