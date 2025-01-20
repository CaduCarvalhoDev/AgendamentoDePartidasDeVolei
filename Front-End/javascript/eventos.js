async function carregarEventos() {
    try {
        const resposta = await fetch(`http://localhost:3030/eventos`);
        if (!resposta.ok) throw new Error('Erro ao carregar eventos');
        
        const eventos = await resposta.json();
        console.log(eventos)
        const grid = document.querySelector('.grid');

        eventos.forEach(evento => {
            const card = `
                <div class="card">
                    <div class="card-header">${evento.quadra.nome}</div>
                    <img src="/Front-End/imagens/quadra 1.png" alt="${evento.quadra.nome}">
                    <div class="card-body">
                        ${evento.usuario.name}<br>
                        EVENTO: ${evento.nome}<br>
                        DATA: ${new Date(evento.data_horario).getDate()}<br>
                        HORARIO: ${new Date(evento.data_horario).toISOString().substring(11, 16)}<br>
                    </div>
                </div>`;
            grid.innerHTML += card;
        });
    } catch (erro) {
        console.error(erro);
        alert('Erro ao carregar eventos');
    }
}
document.addEventListener('DOMContentLoaded', carregarEventos);
