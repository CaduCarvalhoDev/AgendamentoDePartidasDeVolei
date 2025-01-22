async function carregarEventos() {
    try {

        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Usuário não autenticado');
            window.location.href = 'login.html';
            return;
        }


        const response = await fetch(`http://localhost:3030/eventos?id_usuario=${userId}`);
        if (!response.ok) throw new Error('Erro ao carregar eventos');

        const eventos = await response.json();


        const grid = document.querySelector('.grid');
        grid.innerHTML = '';


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


document.addEventListener('DOMContentLoaded', carregarEventos);
