document.addEventListener("DOMContentLoaded", () => {
    const quadraTitle = document.querySelector(".quadra-title");
    const timeInfo = document.querySelector(".time-info");
    const dateInfo = document.querySelector(".date-info");
    const eventNameElement = document.querySelector(".event-name");
    const userIdElement = document.querySelector(".user-id");
    const courtIdElement = document.querySelector(".court-id");

    function loadEventDetails() {
        try {

            const eventDetails = JSON.parse(localStorage.getItem("eventDetails"));

            if (!eventDetails) {
                throw new Error("Detalhes do evento não encontrados. Verifique se o processo de reserva foi concluído corretamente.");
            }


            quadraTitle.textContent = eventDetails.quadraNome || "Nome da quadra não disponível";
            timeInfo.textContent = eventDetails.horario || "Horário não disponível";
            dateInfo.textContent = `Dia ${eventDetails.dia} de ${eventDetails.mes}` || "Data não disponível";
            eventNameElement.textContent = eventDetails.nomeEvento || "Não informado";
            userIdElement.textContent = eventDetails.idUsuario || "Não informado";
            courtIdElement.textContent = eventDetails.idQuadra || "Não informado";


            localStorage.removeItem("eventDetails");
        } catch (error) {
            console.error("Erro ao carregar detalhes do evento:", error.message);
            alert("Erro ao carregar detalhes do evento. Tente novamente.");
        }
    }

    loadEventDetails();
});
