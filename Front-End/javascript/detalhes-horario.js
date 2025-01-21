document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mes = urlParams.get("mes");
    const dia = urlParams.get("dia");
    const horario = urlParams.get("horario");
    const idUsuario = urlParams.get("id_usuario");
    const idQuadra = urlParams.get("id_quadra");

    const quadraInfo = document.querySelector(".quadra-info");
    const timeInfo = document.querySelector(".time-info");
    const confirmButton = document.querySelector(".confirm-button");
    const eventInput = document.getElementById("event-id");

    async function loadCourtDetails() {
        try {
            const response = await fetch(`http://localhost:3030/quadras?id=${idQuadra}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar informações da quadra.");
            }

            const quadras = await response.json();
            if (quadras.length === 0) {
                throw new Error("Quadra não encontrada.");
            }

            const quadra = quadras[0];
            quadraInfo.textContent = quadra.nome;
        } catch (error) {
            console.error(error);
            alert("Não foi possível carregar os detalhes da quadra.");
        }
    }

    function updateUI() {
        timeInfo.innerHTML = `${horario}<br>DIA ${dia}`;
    }

    async function confirmReservation() {
        const eventName = eventInput.value.trim();
        if (!eventName) {
            alert("Por favor, insira o nome do evento.");
            return;
        }
    
        try {

            const dataHorario = new Date(`2025-${String(mesIndex(mes)).padStart(2, '0')}-${String(dia).padStart(2, '0')}T${horario.split(' às ')[0]}:00.000Z`);
    
            const eventData = {
                nome: eventName,
                data_horario: dataHorario.toISOString(),
                confirmacao: true,
                id_usuario: idUsuario,
                id_quadra: idQuadra,
            };
    

            if (!idUsuario || !idQuadra || !eventName || !dataHorario) {
                throw new Error("Dados incompletos. Verifique se todos os campos foram preenchidos corretamente.");
            }
    
            const response = await fetch("http://localhost:3030/eventos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData),
            });
    
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Erro ao cadastrar o evento.");
            }
    
            localStorage.setItem("eventDetails", JSON.stringify({
                quadraNome: quadraInfo.textContent,
                horario: horario,
                dia: dia,
                mes: mes,
                nomeEvento: eventName,
                idUsuario: idUsuario,
                idQuadra: idQuadra,
            }));

            alert("Evento cadastrado com sucesso!");
            window.location.href = "eventoconfirmado.html";
        } catch (error) {
            console.error("Erro ao confirmar reserva:", error);
            alert(error.message || "Não foi possível confirmar a reserva. Tente novamente.");
        }
    }
    

    function mesIndex(mesNome) {
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
        ];
        return meses.indexOf(mesNome) + 1;
    }

    updateUI();
    await loadCourtDetails();
    confirmButton.addEventListener("click", confirmReservation);
});
